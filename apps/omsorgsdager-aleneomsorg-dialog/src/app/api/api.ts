import { addCorrelationIdToAxionsConfig } from '@navikt/sif-common-core-ds';
import { isForbidden, isUnauthorized } from '@navikt/sif-common-core-ds/src/utils/apiUtils';
import { getEnvVariableOrDefault } from '@navikt/sif-common-core-ds/src/utils/envUtils';
import axios, { AxiosError, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import { relocateToLoginPage, relocateToNoAccessPage } from '../utils/navigationUtils';

export enum ApiEndpoint {
    'soker' = 'oppslag/soker',
    'barn' = 'oppslag/barn',
    'send_søknad' = 'omsorgsdager-aleneomsorg/innsending',
    'mellomlagring' = 'mellomlagring/OMSORGSDAGER_ALENEOMSORG',
}

const axiosConfigCommon: AxiosRequestConfig = {
    withCredentials: false,
    headers: { 'Content-type': 'application/json; charset=utf-8' },
};

export const axiosConfig: AxiosRequestConfig = {
    ...axiosConfigCommon,
    baseURL: getEnvVariableOrDefault('K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH', 'http://localhost:8089'),
};

export const axiosMultipartConfig: AxiosRequestConfig = {
    ...axiosConfig,
    headers: { 'Content-Type': 'multipart/form-data' },
};

export const handleAxiosError = (error: AxiosError) => {
    if (isUnauthorized(error)) {
        relocateToLoginPage();
    } else if (isForbidden(error)) {
        relocateToNoAccessPage();
    }
    return Promise.reject(error);
};

axios.interceptors.response.use((response) => {
    return response;
}, handleAxiosError);

const api = {
    get: <ResponseType>(endpoint: ApiEndpoint, paramString?: string, config?: AxiosRequestConfig) => {
        const url = `${endpoint}${paramString ? `?${paramString}` : ''}`;
        return axios.get<ResponseType>(url, addCorrelationIdToAxionsConfig(config || axiosConfig));
    },
    post: <DataType = any, ResponseType = any>(
        endpoint: ApiEndpoint,
        data: DataType,
        headers?: RawAxiosRequestHeaders,
    ) => {
        return axios.post<ResponseType>(
            endpoint,
            data,
            addCorrelationIdToAxionsConfig({
                ...axiosConfig,
                headers: { ...axiosConfig.headers, ...headers },
            }),
        );
    },

    deleteFile: (url: string) => axios.delete(url, addCorrelationIdToAxionsConfig(axiosConfig)),
};

export default api;
