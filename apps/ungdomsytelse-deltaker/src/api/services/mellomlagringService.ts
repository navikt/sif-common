import { Søker } from '@navikt/sif-common-api';
import { k9BrukerdialogApiClient } from '@navikt/sif-common-api/src/api/apiClient';
import { jsonSort } from '@navikt/sif-common-utils';
import hash from 'object-hash';
import { SøknadContextState } from '../../sites/søknad/context/SøknadContextState';
import { SOKNAD_VERSJON } from '../../sites/søknad/utils/søknadUtils';
import { Deltakelse } from '../types';

export const mellomlagringEndpointUrl = `/mellomlagring/UNGDOMSYTELSE_DELTAKER_SOKNAD`;

export type MellomlagringData = Omit<SøknadContextState, 'søker'> & {
    søknadHashString: string;
};

interface SøknadStateHashInfo {
    søkerKey: string;
    deltakelseKey: string;
}

const createSøknadHashString = (søker: Søker, deltakelse: Deltakelse) => {
    const hashData: SøknadStateHashInfo = {
        søkerKey: søker.aktørId,
        deltakelseKey: deltakelse.id,
    };
    return hash(JSON.stringify(jsonSort(hashData)));
};

export const mellomlagringIsValid = (
    mellomlagring: MellomlagringData,
    søker: Søker,
    deltakelse: Deltakelse,
): boolean => {
    return (
        mellomlagring.søknadHashString === createSøknadHashString(søker, deltakelse) &&
        mellomlagring.versjon === SOKNAD_VERSJON
    );
};

export const mellomlagringService = {
    create: async (data: MellomlagringData) => {
        return k9BrukerdialogApiClient.post(mellomlagringEndpointUrl, data);
    },
    update: ({ søker, søknadsdata, søknadRoute, søknadSendt, registrerteBarn }: SøknadContextState) => {
        const data: MellomlagringData = {
            søknadHashString: createSøknadHashString(søker, søknadsdata.deltakelse),
            søknadsdata,
            søknadRoute,
            søknadSendt,
            registrerteBarn,
            versjon: SOKNAD_VERSJON,
        };
        return k9BrukerdialogApiClient.put(mellomlagringEndpointUrl, data);
    },
    purge: () => {
        return k9BrukerdialogApiClient.delete(mellomlagringEndpointUrl);
    },
    fetch: async (): Promise<any> => {
        const result = await k9BrukerdialogApiClient.get(mellomlagringEndpointUrl);
        return result.data;
    },
    fetcher: (url: string) => k9BrukerdialogApiClient.get(url).then((res) => res.data),
};
