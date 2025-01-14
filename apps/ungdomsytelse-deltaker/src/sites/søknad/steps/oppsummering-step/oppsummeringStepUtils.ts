import { Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { OppsummeringFormValues } from './OppsummeringStep';

export const getOppsummeringStepInitialValues = (søknadsdata: Søknadsdata): OppsummeringFormValues => {
    return {
        harBekreftetOpplysninger: søknadsdata.oppsummering?.harBekreftetOpplysninger || false,
    };
};
