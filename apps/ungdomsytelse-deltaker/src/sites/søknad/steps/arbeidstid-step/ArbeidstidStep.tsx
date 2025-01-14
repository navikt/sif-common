import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { getTypedFormComponents, ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import { SøknadContextState } from '../../context/SøknadContextState';
import { useOnValidSubmit } from '../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../hooks/useStepNavigation';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import { StepId } from '../../types/StepId';
import { lagreSøknadState } from '../../utils/lagreSøknadState';
import { getArbeidstidSøknadsdataFromFormValues } from './arbeidstidStepUtils';

export enum ArbeidstidFormFields {
    'harArbeidetIPerioden' = 'harArbeidetIPerioden',
}

export interface ArbeidstidFormValues {
    [ArbeidstidFormFields.harArbeidetIPerioden]?: YesOrNo;
}

const { FormikWrapper, Form } = getTypedFormComponents<ArbeidstidFormFields, ArbeidstidFormValues, ValidationError>();

const ArbeidstidStep = () => {
    const intl = useIntl();

    const {
        state: { søknadsdata },
    } = useSøknadContext();

    const stepId = StepId.ARBEIDSTID;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

    const { goBack } = useStepNavigation(step);

    const { clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values) => {
        const ArbeidstidSøknadsdata = getArbeidstidSøknadsdataFromFormValues(values);
        if (ArbeidstidSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadArbeidstid(ArbeidstidSøknadsdata)];
        }
        return [];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        stepId,
        (state: SøknadContextState) => {
            return lagreSøknadState(state);
        },
    );

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={{}}
                onSubmit={handleSubmit}
                renderForm={({ values: {} }) => {
                    return (
                        <>
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                                includeValidationSummary={true}
                                submitPending={isSubmitting}
                                submitDisabled={isSubmitting}
                                onBack={goBack}
                                runDelayedFormValidation={true}>
                                <Block margin="xxl">Arbeidstid</Block>
                            </Form>
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default ArbeidstidStep;
