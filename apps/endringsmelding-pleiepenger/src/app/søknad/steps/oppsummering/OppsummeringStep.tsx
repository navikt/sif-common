import { Alert, Button, ErrorSummary, Heading, Ingress } from '@navikt/ds-react';
import { useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import { Back } from '@navikt/ds-icons';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import DurationText from '@navikt/sif-common-core-ds/lib/components/duration-text/DurationText';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { usePrevious } from '@navikt/sif-common-core-ds/lib/hooks/usePrevious';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import JaNeiSvar from '@navikt/sif-common-forms-ds/lib/components/summary/JaNeiSvar';
import { SummaryBlock, SummarySection } from '@navikt/sif-common-soknad-ds';
import { useSendSøknad } from '../../../hooks/useSendSøknad';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { useSøknadsdataStatus } from '../../../hooks/useSøknadsdataStatus';
import { getEndringerSomSkalGjøres } from '../../../utils/endringTypeUtils';
import { harFjernetLovbestemtFerie } from '../../../utils/lovbestemtFerieUtils';
import { getApiDataFromSøknadsdata } from '../../../utils/søknadsdataToApiData/getApiDataFromSøknadsdata';
import { StepId } from '../../config/StepId';
import { getSøknadStepConfig } from '../../config/søknadStepConfig';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import SøknadStep from '../../SøknadStep';
import ArbeidstidOppsummering from './ArbeidstidOppsummering';
import LovbestemtFerieOppsummering from './LovbestemtFerieOppsummering';
import { getOppsummeringStepInitialValues, oppsummeringStepUtils } from './oppsummeringStepUtils';
import './oppsummering.css';

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
    const stepId = StepId.OPPSUMMERING;
    const intl = useIntl();
    const {
        state: { søknadsdata, sak, arbeidsgivere, hvaSkalEndres },
    } = useSøknadContext();

    const stepConfig = getSøknadStepConfig(hvaSkalEndres, søknadsdata, sak.harNyArbeidsgiver);
    const step = stepConfig[stepId];
    const { hasInvalidSteps } = useSøknadsdataStatus(stepId, stepConfig, arbeidsgivere);

    const { goBack } = useStepNavigation(step);

    const { sendSøknad, isSubmitting, sendSøknadError } = useSendSøknad();
    const previousSøknadError = usePrevious(sendSøknadError);
    const sendSøknadErrorSummary = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (previousSøknadError === undefined && sendSøknadError !== undefined) {
            sendSøknadErrorSummary.current?.focus();
        }
    }, [previousSøknadError, sendSøknadError]);

    const apiData = getApiDataFromSøknadsdata(søknadsdata, sak, hvaSkalEndres);

    if (!apiData) {
        return <Alert variant="error">ApiData er undefined</Alert>;
    }

    const {
        arbeidstid,
        lovbestemtFerie,
        dataBruktTilUtledning: { nyeArbeidsforhold },
    } = apiData.ytelse;

    const arbeidstidErEndret = oppsummeringStepUtils.harEndringerIArbeidstid(arbeidstid);
    const harGyldigArbeidstid = oppsummeringStepUtils.erArbeidstidEndringerGyldig(arbeidstid);
    const lovbestemtFerieErEndret = oppsummeringStepUtils.harEndringerILovbestemtFerieApiData(lovbestemtFerie);
    const harIngenEndringer = arbeidstidErEndret === false && lovbestemtFerieErEndret === false;

    const { arbeidstidSkalEndres, lovbestemtFerieSkalEndres } = getEndringerSomSkalGjøres(
        hvaSkalEndres,
        harFjernetLovbestemtFerie(søknadsdata.lovbestemtFerie),
        sak.harNyArbeidsgiver
    );

    return (
        <SøknadStep stepId={stepId} stepConfig={stepConfig}>
            <SifGuidePanel>
                <Ingress as="div">
                    <p>
                        Nedenfor ser du endringene som du har lagt inn. Se over at alt stemmer før du sender inn. Hvis
                        noe ikke stemmer, kan du gå tilbake og endre igjen.
                    </p>
                </Ingress>
            </SifGuidePanel>

            {sak.harNyArbeidsgiver && nyeArbeidsforhold && (
                <Block margin="xxl">
                    <SummarySection header="Arbeidssituasjon">
                        {sak.nyeArbeidsgivere.map((arbeidsgiver) => {
                            const arbeidsforhold = nyeArbeidsforhold.find(
                                (a) => a.arbeidsgiverId === arbeidsgiver.organisasjonsnummer
                            );

                            if (!arbeidsforhold) {
                                return;
                            }

                            return (
                                <>
                                    <Heading level="3" size="medium">
                                        {arbeidsgiver.navn}
                                    </Heading>
                                    <SummaryBlock
                                        header={`Er ansatt hos ${arbeidsgiver.navn} i perioden med pleiepenger`}>
                                        <JaNeiSvar harSvartJa={true} />
                                    </SummaryBlock>
                                    {arbeidsforhold.erAnsatt && (
                                        <SummaryBlock
                                            header={`Hvor mange timer jobber du normalt per uke hos ${arbeidsgiver.navn}?`}>
                                            <DurationText duration={arbeidsforhold.normalarbeidstid.timerPerUke} />
                                        </SummaryBlock>
                                    )}
                                </>
                            );
                        })}
                    </SummarySection>
                </Block>
            )}

            {arbeidstidSkalEndres && (
                <Block margin="xxl">
                    <SummarySection header="Arbeidstid">
                        {arbeidstid && arbeidstidErEndret ? (
                            <>
                                <ArbeidstidOppsummering
                                    arbeidstid={arbeidstid}
                                    arbeidsgivere={[...arbeidsgivere, ...sak.nyeArbeidsgivere]}
                                />
                                {!harGyldigArbeidstid && (
                                    <Block margin="none" padBottom="l">
                                        <Alert variant="error">
                                            Det er registrert flere timer enn det er tilgjengelig for en periode.
                                            Vennligst gå tilbake til steget for arbeidstid og korriger dette.
                                        </Alert>
                                    </Block>
                                )}
                            </>
                        ) : (
                            <Block padBottom="l">
                                <Alert variant="info">Det er ikke registrert noen endringer i arbeidstid</Alert>
                            </Block>
                        )}
                    </SummarySection>
                </Block>
            )}
            {lovbestemtFerieSkalEndres && (
                <Block margin="xxl" padBottom="m">
                    <SummarySection header="Endringer i ferie">
                        {lovbestemtFerie !== undefined && lovbestemtFerieErEndret ? (
                            <LovbestemtFerieOppsummering lovbestemtFerie={lovbestemtFerie} />
                        ) : (
                            <Block padBottom="l">
                                <Alert variant="info">Det er ikke registrert noen endringer i ferie</Alert>
                            </Block>
                        )}
                    </SummarySection>
                </Block>
            )}
            {harIngenEndringer ? (
                <FormBlock margin="l">
                    <Button type="button" variant="secondary" onClick={goBack} icon={<Back aria-label="Pil venstre" />}>
                        Forrige
                    </Button>
                </FormBlock>
            ) : (
                <FormBlock margin="l">
                    <FormikWrapper
                        initialValues={getOppsummeringStepInitialValues(søknadsdata)}
                        onSubmit={(values) => {
                            apiData
                                ? sendSøknad({
                                      ...apiData,
                                      harBekreftetOpplysninger:
                                          values[OppsummeringFormFields.harBekreftetOpplysninger] === true,
                                  })
                                : undefined;
                        }}
                        renderForm={() => {
                            return (
                                <>
                                    <Form
                                        formErrorHandler={getIntlFormErrorHandler(intl, 'oppsummeringForm')}
                                        submitDisabled={
                                            isSubmitting || hasInvalidSteps || harIngenEndringer || !harGyldigArbeidstid
                                        }
                                        includeValidationSummary={true}
                                        submitButtonLabel="Send melding om endring"
                                        submitPending={isSubmitting}
                                        backButtonDisabled={isSubmitting}
                                        onBack={goBack}>
                                        <ConfirmationCheckbox
                                            disabled={isSubmitting || harIngenEndringer || !harGyldigArbeidstid}
                                            label="Jeg bekrefter at opplysningene jeg har gitt er riktige, og at jeg ikke har holdt tilbake opplysninger som har betydning for min rett til pleiepenger."
                                            validate={getCheckedValidator()}
                                            data-testid="bekreft-opplysninger"
                                            name={OppsummeringFormFields.harBekreftetOpplysninger}
                                        />
                                    </Form>
                                    {sendSøknadError && (
                                        <FormBlock>
                                            <ErrorSummary ref={sendSøknadErrorSummary}>
                                                {sendSøknadError.message}
                                            </ErrorSummary>
                                        </FormBlock>
                                    )}
                                </>
                            );
                        }}
                    />
                </FormBlock>
            )}
        </SøknadStep>
    );
};

export default OppsummeringStep;
