import dayjs from 'dayjs';
import { DateRange, ValidationError, ValidationResult } from '@navikt/sif-common-formik-ds/lib';
import { Virksomhet } from '@navikt/sif-common-forms-ds/lib';

export const getSelvstendigIPeriodeValidator = (
    søknadsperiode: DateRange,
    virksomhet?: Virksomhet
): ValidationResult<ValidationError> => {
    if (!virksomhet) {
        return undefined;
    }

    if (virksomhet.tom && dayjs(virksomhet.tom).isBefore(søknadsperiode.from, 'day')) {
        return 'sluttetFørSøknadsperiode';
    }

    if (dayjs(virksomhet.fom).isAfter(søknadsperiode.to, 'day')) {
        return 'startetEtterSøknadsperiode';
    }

    return undefined;
};
