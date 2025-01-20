import { isForbidden, isUnauthorized } from '@navikt/sif-common-core-ds/src/utils/apiUtils';
import { getMaybeEnv } from '@navikt/sif-common-env';
import { DateRange, dateRangeUtils } from '@navikt/sif-common-utils';
import {
    ArbeidsgiverForEndring,
    IngenTilgangÅrsak,
    isK9Sak,
    isUgyldigK9SakFormat,
    K9Sak,
    RequestStatus,
    Søker,
    SøknadInitialIkkeTilgang,
    UgyldigK9SakFormat,
} from '@types';
import { appSentryLogger } from '@utils';
import { IngenTilgangMeta, isSøknadInitialDataErrorState } from '../hooks/useSøknadInitialData';
import { maskK9Sak } from '../utils/getSakOgArbeidsgivereDebugInfo';
import { getPeriodeForArbeidsgiverOppslag } from '../utils/initialDataUtils';
import { getSamletDateRangeForK9Saker } from '../utils/k9SakUtils';
import { tilgangskontroll } from '../utils/tilgangskontroll';
import { arbeidsgivereEndpoint } from './endpoints/arbeidsgivereEndpoint';
import sakerEndpoint, { K9SakResult } from './endpoints/sakerEndpoint';
import søkerEndpoint from './endpoints/søkerEndpoint';
import søknadStateEndpoint, {
    isPersistedSøknadStateValid,
    SøknadStatePersistence,
} from './endpoints/søknadStateEndpoint';

export const fetchInitialData = async (
    tillattEndringsperiode: DateRange,
): Promise<{
    søker: Søker;
    k9saker: K9Sak[];
    antallSakerFørEndringsperiode: number;
    arbeidsgivere: ArbeidsgiverForEndring[];
    lagretSøknadState?: SøknadStatePersistence;
}> => {
    const [søker, k9sakerResult] = await Promise.all([søkerEndpoint.fetch(), sakerEndpoint.fetch()]);

    if (k9sakerResult.k9Saker.length === 0 && k9sakerResult.eldreSaker.length === 0) {
        appSentryLogger.logInfo('fetchInitialData.ingenSaker');
    }

    const handleInitialDataError = (error: any) => {
        if (isSøknadInitialDataErrorState(error)) {
            return Promise.reject({
                ...error,
                søker,
            });
        }
        return Promise.reject(error);
    };

    try {
        let k9saker: K9Sak[];
        let arbeidsgivere: ArbeidsgiverForEndring[];

        const sakerInnenforEndringsperiode = k9sakerResult.k9Saker;
        const sakerFørEndringsperiode = k9sakerResult.eldreSaker;

        return kontrollerSaker(sakerInnenforEndringsperiode, sakerFørEndringsperiode.length, tillattEndringsperiode)
            .then((result) => {
                k9saker = result.k9saker;
                const periodeForArbeidsgiveroppslag = getPeriodeForArbeidsgiverOppslag(
                    result.dateRangeAlleSaker,
                    tillattEndringsperiode,
                );
                if (!periodeForArbeidsgiveroppslag) {
                    return Promise.reject(
                        getKanIkkeBrukeSøknadRejection([
                            IngenTilgangÅrsak.søknadsperioderUtenforTillattEndringsperiode,
                        ]),
                    );
                }
                return arbeidsgivereEndpoint.fetch(periodeForArbeidsgiveroppslag);
            })
            .then((result) => {
                arbeidsgivere = result;
                return kontrollerTilgang(k9saker, tillattEndringsperiode);
            })
            .then(() => hentOgKontrollerLagretSøknadState(søker, k9saker))
            .then((lagretSøknadState) => {
                return Promise.resolve({
                    søker,
                    arbeidsgivere,
                    k9saker,
                    antallSakerFørEndringsperiode: sakerFørEndringsperiode.length,
                    lagretSøknadState,
                });
            })
            .catch(handleInitialDataError);
    } catch (error) {
        if (isUnauthorized(error)) {
            return Promise.reject({
                status: RequestStatus.redirectingToLogin,
            });
        } else if (isForbidden(error)) {
            return Promise.reject({
                status: RequestStatus.forbidden,
            });
        } else {
            return Promise.reject({
                status: RequestStatus.error,
                error,
            });
        }
    }
};

const getKanIkkeBrukeSøknadRejection = (
    årsak: IngenTilgangÅrsak[],
    ingenTilgangMeta?: IngenTilgangMeta,
): Pick<SøknadInitialIkkeTilgang, 'årsak' | 'kanBrukeSøknad' | 'status' | 'ingenTilgangMeta'> => {
    return {
        status: RequestStatus.success,
        kanBrukeSøknad: false,
        årsak,
        ingenTilgangMeta,
    };
};

const kontrollerSaker = (
    k9sakerResult: K9SakResult[],
    antallSakerFørEndringsperiode: number,
    tillattEndringsperiode: DateRange,
): Promise<{ k9saker: K9Sak[]; dateRangeAlleSaker: DateRange }> => {
    if (k9sakerResult.length === 0 && antallSakerFørEndringsperiode === 0) {
        return Promise.reject(getKanIkkeBrukeSøknadRejection([IngenTilgangÅrsak.harIngenSak]));
    }
    if (k9sakerResult.length === 0 && antallSakerFørEndringsperiode > 0) {
        return Promise.reject(
            getKanIkkeBrukeSøknadRejection([IngenTilgangÅrsak.søknadsperioderUtenforTillattEndringsperiode]),
        );
    }

    const ugyldigk9FormatSaker: UgyldigK9SakFormat[] = k9sakerResult.filter(isUgyldigK9SakFormat);
    const k9saker: K9Sak[] = k9sakerResult.filter(isK9Sak);

    if (ugyldigk9FormatSaker.length > 0) {
        return Promise.reject(getKanIkkeBrukeSøknadRejection([IngenTilgangÅrsak.harUgyldigK9FormatSak]));
    }
    const dateRangeAlleSaker = getSamletDateRangeForK9Saker(k9saker);
    if (dateRangeAlleSaker === undefined) {
        return Promise.reject(getKanIkkeBrukeSøknadRejection([IngenTilgangÅrsak.harIngenPerioder]));
    }
    if (dateRangeUtils.dateRangesCollide([dateRangeAlleSaker, tillattEndringsperiode]) === false) {
        return Promise.reject(
            getKanIkkeBrukeSøknadRejection([IngenTilgangÅrsak.søknadsperioderUtenforTillattEndringsperiode]),
        );
    }

    return Promise.resolve({ k9saker, dateRangeAlleSaker });
};

const kontrollerTilgang = async (k9saker: K9Sak[], tillattEndringsperiode: DateRange): Promise<boolean> => {
    const resultat = tilgangskontroll(k9saker, tillattEndringsperiode);
    if (resultat.kanBrukeSøknad) {
        return Promise.resolve(true);
    }
    if (getMaybeEnv('DEBUG') === 'true') {
        if (k9saker.length === 1) {
            appSentryLogger.logInfo(
                'IkkeTilgangSakInfo',
                JSON.stringify({
                    årsak: resultat.årsak,
                    sak: maskK9Sak(k9saker[0]),
                }),
            );
        } else {
            appSentryLogger.logInfo(
                'IkkeTilgangSakInfo',
                JSON.stringify({
                    årsak: resultat.årsak,
                }),
            );
        }
    }

    return Promise.reject(getKanIkkeBrukeSøknadRejection(resultat.årsak, resultat.ingenTilgangMeta));
};

const hentOgKontrollerLagretSøknadState = async (
    søker: Søker,
    k9saker: K9Sak[],
): Promise<SøknadStatePersistence | undefined> => {
    const lagretSøknadState = await søknadStateEndpoint.fetch();

    if (lagretSøknadState === undefined) {
        return undefined;
    }
    const isValid = isPersistedSøknadStateValid(
        lagretSøknadState,
        {
            søker,
            barnAktørId: lagretSøknadState.barnAktørId,
        },
        k9saker,
    );
    if (!isValid) {
        await søknadStateEndpoint.purge();
        return Promise.resolve(undefined);
    }
    return Promise.resolve(lagretSøknadState);
};
