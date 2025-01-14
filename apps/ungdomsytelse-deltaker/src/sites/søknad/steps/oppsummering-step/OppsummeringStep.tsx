import { ErrorSummary, FormSummary, VStack } from '@navikt/ds-react';
import { ErrorSummaryItem } from '@navikt/ds-react/ErrorSummary';
import { useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { usePrevious } from '@navikt/sif-common-hooks';
import { ErrorPage } from '@navikt/sif-common-soknad-ds';
import { AppText } from '../../../../i18n';
import { useSøknadContext } from '../../../søknad/context/hooks/useSøknadContext';
import SøknadStep from '../../../søknad/SøknadStep';
import { getSøknadStepConfig, getSøknadStepConfigForStep } from '../../../søknad/søknadStepConfig';
import { useSendSøknad } from '../../hooks/useSendSøknad';
import { useStepNavigation } from '../../hooks/useStepNavigation';
import { useSøknadsdataStatus } from '../../hooks/useSøknadsdataStatus';
import { StepId } from '../../types/StepId';
import { getApiDataFromSøknadsdata } from '../../utils/søknadsdataToApiData/getApiDataFromSøknadsdata';
import BarnSummaryList from './components/BarnSummaryList';
import OmSøkerOppsummering from './components/OmSøkerOppsummering';
import { getOppsummeringStepInitialValues } from './oppsummeringStepUtils';
import DeltakelseOppsummering from './components/DeltakelseOppsummering';
import { relocateToRootPage } from '../../utils/navigationUtils';

enum OppsummeringFormFields {
    harBekreftetOpplysninger = 'harBekreftetOpplysninger',
}

export interface OppsummeringFormValues {
    [OppsummeringFormFields.harBekreftetOpplysninger]: boolean;
}

const { FormikWrapper, Form, ConfirmationCheckbox } = getTypedFormComponents<
    OppsummeringFormFields,
    OppsummeringFormValues
>();

const OppsummeringStep = () => {
    const intl = useIntl();

    const {
        state: { søknadsdata, søker, registrerteBarn: registrertBarn },
    } = useSøknadContext();

    if (!søknadsdata.deltakelse) {
        relocateToRootPage();
    }
    const stepId = StepId.OPPSUMMERING;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

    const { invalidSteps } = useSøknadsdataStatus(stepId, getSøknadStepConfig(søknadsdata.deltakelse));
    const hasInvalidSteps = invalidSteps.length > 0;

    const { goBack } = useStepNavigation(step);

    const { sendSøknad, isSubmitting, sendSøknadError } = useSendSøknad();
    const previousSøknadError = usePrevious(sendSøknadError);
    const sendSøknadErrorSummary = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (previousSøknadError === undefined && sendSøknadError !== undefined) {
            sendSøknadErrorSummary.current?.focus();
        }
    }, [previousSøknadError, sendSøknadError]);

    const apiData = getApiDataFromSøknadsdata(søker.fødselsnummer, søknadsdata);

    if (!apiData) {
        return (
            <ErrorPage
                contentRenderer={() => {
                    return <>Manglende API data</>;
                }}
            />
        );
    }

    return (
        <SøknadStep stepId={StepId.OPPSUMMERING}>
            <FormikWrapper
                initialValues={getOppsummeringStepInitialValues(søknadsdata)}
                onSubmit={(values) => {
                    if (apiData) {
                        sendSøknad({
                            ...apiData,
                            harBekreftetOpplysninger: values[OppsummeringFormFields.harBekreftetOpplysninger] === true,
                        });
                    }
                }}
                renderForm={() => {
                    return (
                        <>
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                                submitDisabled={isSubmitting || hasInvalidSteps}
                                includeValidationSummary={true}
                                submitButtonLabel={'Send søknad'}
                                isFinalSubmit={true}
                                submitPending={isSubmitting}
                                backButtonDisabled={isSubmitting}
                                onBack={goBack}>
                                <VStack gap="8">
                                    <OmSøkerOppsummering søker={søker} />
                                    <DeltakelseOppsummering deltakelse={søknadsdata.deltakelse} />
                                    <FormSummary>
                                        <FormSummary.Header>
                                            <FormSummary.Heading level="2">Dine barn</FormSummary.Heading>
                                        </FormSummary.Header>
                                        <FormSummary.Answers>
                                            <FormSummary.Answer>
                                                <FormSummary.Value>
                                                    <BarnSummaryList barn={registrertBarn} />
                                                </FormSummary.Value>
                                            </FormSummary.Answer>
                                        </FormSummary.Answers>
                                    </FormSummary>
                                    <ConfirmationCheckbox
                                        disabled={isSubmitting}
                                        label={<AppText id="step.oppsummering.bekrefterOpplysninger" />}
                                        validate={getCheckedValidator()}
                                        name={OppsummeringFormFields.harBekreftetOpplysninger}
                                    />
                                </VStack>
                            </Form>
                            {sendSøknadError && (
                                <FormBlock>
                                    <ErrorSummary ref={sendSøknadErrorSummary}>
                                        <ErrorSummaryItem>{sendSøknadError.message}</ErrorSummaryItem>
                                    </ErrorSummary>
                                </FormBlock>
                            )}
                        </>
                    );
                }}></FormikWrapper>
        </SøknadStep>
    );
};

export default OppsummeringStep;
