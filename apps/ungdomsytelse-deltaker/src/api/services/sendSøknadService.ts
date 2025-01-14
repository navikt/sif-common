import { SøknadApiData } from '@api/types';
import { k9BrukerdialogApiClient } from '@navikt/sif-common-api/src/api/apiClient';
import { søknadApiDataSchema } from '../schemas/søknadApiDataSchema';

export const sendSøknadService = {
    sendSøknad: async (data: SøknadApiData): Promise<any> => {
        const isValid = await søknadApiDataSchema.parse(data);
        if (isValid) {
            return await k9BrukerdialogApiClient.post(`/ungdomsytelse/soknad/innsending`, data);
        }
        return Promise.reject('Invalid data');
    },
};
