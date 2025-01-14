import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { ArbeidstidSøknadsdata } from '../../types/søknadsdata/ArbeidstidSøknadsdata';
import { ArbeidstidFormValues } from './ArbeidstidStep';

export const getArbeidstidSøknadsdataFromFormValues = (formValues: ArbeidstidFormValues): ArbeidstidSøknadsdata => {
    return {
        harArbeidetIPerioden: formValues.harArbeidetIPerioden === YesOrNo.YES,
    };
};
