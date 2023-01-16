import { useEffect, useState } from 'react';
import { isForbidden, isUnauthorized } from '@navikt/sif-common-core-ds/lib/utils/apiUtils';
import { dateToISODate } from '@navikt/sif-common-utils/lib';
import { APP_VERSJON } from '../constants/APP_VERSJON';
import { SøknadRoutes } from '../søknad/config/SøknadRoutes';
import { Arbeidsgiver } from '../types/Arbeidsgiver';
import { IngenTilgangÅrsak } from '../types/IngenTilgangÅrsak';
import { K9Sak } from '../types/K9Sak';
import { RequestStatus } from '../types/RequestStatus';
import { Søker } from '../types/Søker';
import { SøknadContextState } from '../types/SøknadContextState';
import { TimerEllerProsent } from '../types/TimerEllerProsent';
import appSentryLogger from '../utils/appSentryLogger';
import { getEndringsdato, getEndringsperiode } from '../utils/endringsperiode';
import { getDateRangeForK9Saker } from '../utils/k9SakUtils';
import { kontrollerK9Saker } from '../utils/kontrollerK9Saker';
import { relocateToLoginPage } from '../utils/navigationUtils';
import { arbeidsgivereEndpoint } from './endpoints/arbeidsgivereEndpoint';
import sakerEndpoint from './endpoints/sakerEndpoint';
import søkerEndpoint from './endpoints/søkerEndpoint';
import søknadStateEndpoint, {
    isPersistedSøknadStateValid,
    SøknadStatePersistence,
} from './endpoints/søknadStateEndpoint';
import { getSakFromK9Sak } from '../utils/getSakFromK9Sak';

export type SøknadInitialData = Omit<SøknadContextState, 'sak'>;

type SøknadInitialSuccess = {
    status: RequestStatus.success;
    data: SøknadInitialData;
};

type SøknadInitialError = {
    status: RequestStatus.error;
    error: any;
};

type SøknadInitialNoAccess = {
    status: RequestStatus.noAccess;
    reason: IngenTilgangÅrsak;
};

type SøknadInitialLoading = {
    status: RequestStatus.loading;
};

export type SøknadInitialDataState =
    | SøknadInitialSuccess
    | SøknadInitialError
    | SøknadInitialLoading
    | SøknadInitialNoAccess;

export const defaultSøknadState: Partial<SøknadContextState> = {
    søknadRoute: SøknadRoutes.VELKOMMEN,
};

const setupSøknadInitialData = async (loadedData: {
    søker: Søker;
    k9saker: K9Sak[];
    arbeidsgivere: Arbeidsgiver[];
    lagretSøknadState: SøknadStatePersistence;
}): Promise<SøknadInitialData> => {
    const { arbeidsgivere, lagretSøknadState, k9saker, søker } = loadedData;

    const persistedSøknadStateIsValid = isPersistedSøknadStateValid(
        lagretSøknadState,
        {
            søker,
            barnAktørId: lagretSøknadState.barnAktørId,
        },
        k9saker
    );

    if (!persistedSøknadStateIsValid) {
        await søknadStateEndpoint.purge();
    }

    const persistedSak = persistedSøknadStateIsValid
        ? k9saker.find((k9sak) => k9sak.barn.aktørId === lagretSøknadState.barnAktørId)
        : undefined;

    return Promise.resolve({
        versjon: APP_VERSJON,
        søker,
        k9saker,
        sak: persistedSak ? getSakFromK9Sak(persistedSak, arbeidsgivere) : undefined,
        arbeidsgivere,
        søknadsdata: {} as any,
        inputPreferanser: {
            timerEllerProsent: TimerEllerProsent.TIMER,
        },
        ...(persistedSøknadStateIsValid ? lagretSøknadState : defaultSøknadState),
    });
};

function useSøknadInitialData(): SøknadInitialDataState {
    const [initialData, setInitialData] = useState<SøknadInitialDataState>({ status: RequestStatus.loading });

    const fetch = async () => {
        try {
            const [søker, k9saker, lagretSøknadState] = await Promise.all([
                søkerEndpoint.fetch(),
                sakerEndpoint.fetch(),
                søknadStateEndpoint.fetch(),
            ]);

            const resultat = kontrollerK9Saker(k9saker);
            if (resultat.kanBrukeSøknad === false) {
                setInitialData({
                    status: RequestStatus.noAccess,
                    reason: resultat.årsak,
                });
                return Promise.resolve();
            }

            const samletTidsperiode = getDateRangeForK9Saker(k9saker);
            if (samletTidsperiode === undefined) {
                setInitialData({
                    status: RequestStatus.noAccess,
                    reason: IngenTilgangÅrsak.harIkkeSøknadsperiode,
                });
                return Promise.resolve();
            }

            const endringsperiode = getEndringsperiode(getEndringsdato(), [samletTidsperiode]);
            const arbeidsgivere = await arbeidsgivereEndpoint.fetch(
                dateToISODate(endringsperiode.from),
                dateToISODate(endringsperiode.to)
            );
            setInitialData({
                status: RequestStatus.success,
                data: await setupSøknadInitialData({ søker, arbeidsgivere, k9saker, lagretSøknadState }),
            });
            return Promise.resolve();
        } catch (error: any) {
            if (isUnauthorized(error)) {
                relocateToLoginPage();
            } else if (isForbidden(error)) {
                setInitialData({
                    status: RequestStatus.noAccess,
                    reason: IngenTilgangÅrsak.code403,
                });
            } else {
                appSentryLogger.logError('fetchInitialData', error);
                setInitialData({
                    status: RequestStatus.error,
                    error,
                });
            }
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    return initialData;
}

export default useSøknadInitialData;
