import { useIntl } from 'react-intl';
import { RegistrertBarn } from '@navikt/sif-common-api';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import ItemList from '@navikt/sif-common-core-ds/src/components/lists/item-list/ItemList';
import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import RegistrerteBarnListeHeading from '@navikt/sif-common-ui/src/components/registrerte-barn-liste/RegistrerteBarnListeHeading';
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
import { barnItemLabelRenderer, getBarnSøknadsdataFromFormValues } from './barnStepUtils';

export enum BarnFormFields {}

export interface BarnFormValues {}

const { FormikWrapper, Form } = getTypedFormComponents<BarnFormFields, BarnFormValues, ValidationError>();

const BarnStep = () => {
    const intl = useIntl();

    const {
        state: { søknadsdata, registrerteBarn: registrertBarn },
    } = useSøknadContext();

    const stepId = StepId.BARN;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

    const { goBack } = useStepNavigation(step);

    const { clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = () => {
        const BarnSøknadsdata = getBarnSøknadsdataFromFormValues(registrertBarn);
        if (BarnSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadBarn(BarnSøknadsdata)];
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
                                <Block margin="xxl">
                                    <RegistrerteBarnListeHeading level="2" size="medium">
                                        Barn registrert på deg
                                    </RegistrerteBarnListeHeading>

                                    {registrertBarn.length > 0 && (
                                        <Block margin="l">
                                            <ItemList<RegistrertBarn>
                                                getItemId={(barn): string => barn.aktørId}
                                                getItemTitle={(barn): string => barn.etternavn}
                                                labelRenderer={(barn): React.ReactNode => barnItemLabelRenderer(barn)}
                                                items={registrertBarn}
                                            />
                                        </Block>
                                    )}
                                </Block>
                            </Form>
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default BarnStep;
