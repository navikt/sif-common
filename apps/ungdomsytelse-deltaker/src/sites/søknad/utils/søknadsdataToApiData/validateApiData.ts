import { SøknadApiData } from '../../../../api/types';
import { AppIntlShape } from '../../../../i18n';
import { StepId } from '../../types/StepId';
import { Søknadsdata } from '../../types/søknadsdata/Søknadsdata';

export enum API_DATA_VALIDATION_ERROR {
    'undefined' = 'undefined',
}

export const validateApiDataMessages = {
    nb: {
        'apiDataValidation.undefined': 'Det oppstod en feil ved visningen av siden.',
    },
    nn: {
        'apiDataValidation.undefined': 'Det oppstod ein feil ved visning av sida.',
    },
};

interface ApiDataValidationError {
    error: API_DATA_VALIDATION_ERROR;
    step?: StepId;
    message: React.ReactNode;
}

/** Ikke tatt i bruk enda */
export const validateApiData = (
    apiData: SøknadApiData | undefined,
    _søknadsdata: Søknadsdata,
    { text }: AppIntlShape,
): undefined | ApiDataValidationError => {
    if (!apiData) {
        return {
            error: API_DATA_VALIDATION_ERROR.undefined,
            message: text('apiDataValidation.undefined'),
        };
    }

    return undefined;
};
