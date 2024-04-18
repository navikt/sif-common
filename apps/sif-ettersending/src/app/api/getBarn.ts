import { ISODateToDate } from '@navikt/sif-common-utils';
import { isObject, isString } from 'formik';
import { isArray } from 'lodash';
import { RegistrertBarn } from '../types/RegistrertBarn';
import { ApiEndpoint } from '../types/ApiEndpoint';
import api from './api';

export interface BarnDTO {
    barn: {
        aktørId: string;
        fornavn: string;
        etternavn: string;
        mellomnavn?: string;
        fødselsdato: string;
    }[];
}
export const isValidRegistrertBarnResponse = (response: any): response is RegistrertBarn => {
    if (
        isObject(response) &&
        isString(response.aktørId) &&
        isString(response.fornavn) &&
        isString(response.etternavn) &&
        isString(response.fødselsdato)
    ) {
        return true;
    } else {
        return false;
    }
};

const getBarnRemoteData = async (): Promise<RegistrertBarn[]> => {
    const { data } = await api.get<BarnDTO>(ApiEndpoint.BARN);
    const registrertBarn: RegistrertBarn[] = [];

    let hasInvalidBarnRespons = false;
    if (data?.barn && isArray(data.barn)) {
        data.barn.forEach((barn) => {
            if (isValidRegistrertBarnResponse(barn)) {
                registrertBarn.push({
                    ...barn,
                    fødselsdato: ISODateToDate(barn.fødselsdato),
                });
            } else {
                hasInvalidBarnRespons = true;
            }
        });
    }
    if (hasInvalidBarnRespons) {
        return Promise.reject('Invalid barn respons');
    }
    return Promise.resolve(registrertBarn);
};

export default getBarnRemoteData;