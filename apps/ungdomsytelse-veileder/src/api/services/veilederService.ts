import getSentryLoggerForApp from '@navikt/sif-common-sentry';
import { v4 } from 'uuid';
import { ungDeltakelseOpplyserApiClient } from '../apiClient';
import { deltakelserResponseSchema } from '../schemas/deltakelserSchema';
import { deltakelseSchema } from '../schemas/deltakelseSchema';
import { Deltakelse, Søker } from '../types';
import { deltakerSchema } from '../schemas/deltakerSchema';

const getDeltaker = async (deltakerIdent: string): Promise<Søker> => {
    const response = await ungDeltakelseOpplyserApiClient.post(`/oppslag/deltaker`, { deltakerIdent });
    try {
        const deltaker = deltakerSchema.parse(response.data);
        return deltaker;
    } catch (e) {
        getSentryLoggerForApp('sif-common', []).logError('ZOD parse error', e);
        throw e;
    }
};
const getDeltakelser = async (deltakerIdent: string): Promise<Deltakelse[]> => {
    const response = await ungDeltakelseOpplyserApiClient.post(`/veileder/register/hent/alle`, { deltakerIdent });
    try {
        const deltakelse = deltakelserResponseSchema.parse(response.data);
        return deltakelse;
    } catch (e) {
        getSentryLoggerForApp('sif-common', []).logError('ZOD parse error', e);
        throw e;
    }
};

const createDeltakelse = async (data: {
    deltakerIdent: string;
    fraOgMed: string;
    tilOgMed?: string;
}): Promise<Deltakelse> => {
    const response = await ungDeltakelseOpplyserApiClient.post(`/veileder/register/legg-til`, {
        id: v4(),
        ...data,
    });
    try {
        const deltakelse = deltakelseSchema.parse(response.data);
        return deltakelse;
    } catch (e) {
        getSentryLoggerForApp('sif-common', []).logError('ZOD parse error', e);
        throw e;
    }
};

const updateDeltakelse = async (data: {
    id: string;
    deltakerIdent: string;
    fraOgMed?: string;
    tilOgMed?: string;
}): Promise<Deltakelse> => {
    const response = await ungDeltakelseOpplyserApiClient.put(`/veileder/register/oppdater/${data.id}`, data);
    try {
        const deltakelse = deltakelseSchema.parse(response.data);
        return deltakelse;
    } catch (e) {
        getSentryLoggerForApp('sif-common', []).logError('ZOD parse error', e);
        throw e;
    }
};

const deleteDeltakelse = async (id: string): Promise<any> => {
    return await ungDeltakelseOpplyserApiClient.delete(`/veileder/register/fjern/${id}`);
};

export const veilederService = {
    getDeltaker,
    getDeltakelser,
    createDeltakelse,
    updateDeltakelse,
    deleteDeltakelse,
};
