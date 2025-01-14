import { ungDeltakelseOpplyserApiClient } from '@api/apiClient';
import { Deltakelse, PeriodeMedInntekt } from '@api/types';
import getSentryLoggerForApp from '@navikt/sif-common-sentry';
import { deltakelserSchema } from '../schemas/deltakelserSchema';

const getDeltakelser = async (): Promise<Deltakelse[]> => {
    const response = await ungDeltakelseOpplyserApiClient.get(`/deltakelse/register/hent/alle`);
    try {
        return deltakelserSchema.parse(response.data);
    } catch (e) {
        getSentryLoggerForApp('sif-common', []).logError('ZOD parse error', e);
        return Promise.reject(e);
    }
};

const putMarkerHarSøkt = async (id: string): Promise<void> => {
    return await ungDeltakelseOpplyserApiClient.put(`/deltakelse/register/${id}/marker-har-sokt`);
};

const rapporterInntekt = async (periodeMedInntekt: PeriodeMedInntekt): Promise<void> => {
    return await ungDeltakelseOpplyserApiClient.post(
        `/deltakelse/register/registrer-inntekt-i-periode`,
        periodeMedInntekt,
    );
};

export const deltakerService = {
    getDeltakelser,
    putMarkerHarSøkt,
    rapporterInntekt,
};
