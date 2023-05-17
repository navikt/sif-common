import { Alert, BodyLong, Heading } from '@navikt/ds-react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import InfoList from '@navikt/sif-common-core-ds/lib/components/lists/info-list/InfoList';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { dateFormatter, ISODate } from '@navikt/sif-common-utils';
import { SøknadContextState } from '@types';
import DateRangeAccordion from '../../../components/date-range-accordion/DateRangeAccordion';
import EndretTag from '../../../components/tags/EndretTag';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import PersistStepFormValues from '../../../modules/persist-step-form-values/PersistStepFormValues';
import { getValgteEndringer } from '../../../utils/endringTypeUtils';
import { erFeriedagerEndretIPeriode } from '../../../utils/ferieUtils';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import { StepId } from '../../config/StepId';
import { getSøknadStepConfig } from '../../config/søknadStepConfig';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import FeriedagerISøknadsperiode from './FeriedagerISøknadperiode';
import {
    getLovbestemtFerieStepInitialValues,
    getLovbestemtFerieSøknadsdataFromFormValues,
} from './lovbestemtFerieStepUtils';

export enum LovbestemtFerieFormFields {
    perioder = 'perioder',
    feriedager = 'feriedager',
}

export interface Feriedag {
    dato: Date;
    liggerISak: boolean;
    skalHaFerie: boolean;
}
export interface FeriedagMap {
    [isoDate: ISODate]: Feriedag;
}

export interface LovbestemtFerieFormValues {
    [LovbestemtFerieFormFields.feriedager]: FeriedagMap;
}

const { FormikWrapper, Form } = getTypedFormComponents<LovbestemtFerieFormFields, LovbestemtFerieFormValues>();

const LovbestemtFerieStep = () => {
    const stepId = StepId.LOVBESTEMT_FERIE;
    const intl = useIntl();

    const {
        dispatch,
        state: { søknadsdata, sak, valgtHvaSkalEndres: hvaSkalEndres },
    } = useSøknadContext();
    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();
    const stepConfig = getSøknadStepConfig(hvaSkalEndres, søknadsdata, sak.harUkjentArbeidsforhold);
    const step = stepConfig[stepId];

    const { goBack } = useStepNavigation(step);
    const harValgtAtArbeidstidSkalEndres = getValgteEndringer(hvaSkalEndres).arbeidstidSkalEndres;

    const onValidSubmitHandler = (values: LovbestemtFerieFormValues) => {
        const perioder = getLovbestemtFerieSøknadsdataFromFormValues(values);
        if (perioder) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadLovbestemtFerie(perioder)];
        }
        return [];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        stepId,
        (state: SøknadContextState) => {
            return lagreSøknadState(state);
        }
    );

    /** Kalles hver gang values i formik endres */
    const oppdaterSøknadState = (values: LovbestemtFerieFormValues) => {
        const ferie = getLovbestemtFerieSøknadsdataFromFormValues(values);
        dispatch(actionsCreator.setSøknadLovbestemtFerie(ferie));
        dispatch(actionsCreator.requestLagreSøknad());
    };

    const initialValues = getLovbestemtFerieStepInitialValues(søknadsdata, stepFormValues.lovbestemtFerie);

    return (
        <SøknadStep stepId={stepId} stepConfig={stepConfig}>
            <SifGuidePanel>
                <>
                    <BodyLong as="div">
                        <Heading level="2" size="xsmall" spacing={true}>
                            Slik endrer du ferie
                        </Heading>
                        <InfoList>
                            <li>Du kan endre, legge til, eller fjerne ferie i pleiepengeperioden din.</li>
                            <li>Du skal kun registrere ferie for ukedager (mandag til fredag).</li>
                        </InfoList>
                    </BodyLong>
                </>
            </SifGuidePanel>

            <FormikWrapper
                initialValues={initialValues}
                onSubmit={handleSubmit}
                renderForm={({ values, setFieldValue }) => {
                    const feriedager: FeriedagMap = values[LovbestemtFerieFormFields.feriedager] || {};
                    // Raskere sjekk som sjekker values i stedet for søknadsdata
                    const harFjernetFerieIValues = Object.keys(feriedager)
                        .map((key) => feriedager[key])
                        .some((feriedag) => feriedag.skalHaFerie === false);
                    return (
                        <>
                            <PersistStepFormValues
                                stepId={stepId}
                                onChange={() => {
                                    oppdaterSøknadState({ feriedager });
                                }}
                            />
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'lovbestemtFerieForm')}
                                includeValidationSummary={true}
                                submitPending={isSubmitting}
                                runDelayedFormValidation={true}
                                onBack={goBack}>
                                <FormBlock>
                                    {sak.søknadsperioder.length === 1 ? null : (
                                        <Block margin="xl">
                                            <Heading level="3" size="small" spacing={true}>
                                                Dine perioder med pleiepenger
                                            </Heading>
                                        </Block>
                                    )}
                                    <DateRangeAccordion
                                        dateRanges={sak.søknadsperioder}
                                        defaultOpenState={'none'}
                                        renderContent={(søknadsperiode) => {
                                            return (
                                                <Block
                                                    margin={sak.søknadsperioder.length === 1 ? 'l' : 'm'}
                                                    padBottom="l">
                                                    <Heading
                                                        level={sak.søknadsperioder.length === 1 ? '3' : '4'}
                                                        size={sak.søknadsperioder.length === 1 ? 'small' : 'xsmall'}
                                                        spacing={true}
                                                        onChange={(feriedager) => {
                                                            setFieldValue(
                                                                LovbestemtFerieFormFields.feriedager,
                                                                feriedager
                                                            );
                                                        }}>
                                                        Registrert ferie
                                                    </Heading>
                                                    <FeriedagerISøknadsperiode
                                                        alleFeriedager={values.feriedager || {}}
                                                        søknadsperiode={søknadsperiode}
                                                        onChange={(feriedager) => {
                                                            setFieldValue(
                                                                LovbestemtFerieFormFields.feriedager,
                                                                feriedager
                                                            );
                                                        }}
                                                    />
                                                </Block>
                                            );
                                        }}
                                        renderHeader={(periode) => {
                                            return (
                                                <>
                                                    <span style={{ display: 'inlineBlock' }}>
                                                        {dateFormatter.full(periode.from)} -{' '}
                                                        {dateFormatter.full(periode.to)}
                                                    </span>
                                                    {erFeriedagerEndretIPeriode(feriedager, periode) && (
                                                        <span
                                                            style={{
                                                                position: 'relative',
                                                                marginLeft: '.5rem',
                                                                top: '-.125rem',
                                                            }}>
                                                            {` `}
                                                            <EndretTag>Ferie endret</EndretTag>
                                                        </span>
                                                    )}
                                                </>
                                            );
                                        }}
                                    />
                                </FormBlock>
                                {harFjernetFerieIValues && harValgtAtArbeidstidSkalEndres === false && (
                                    <Block margin="l">
                                        <Alert variant="warning">
                                            Du har fjernet dager med ferie. Hvis du skal du jobbe disse dagene må du se
                                            over at jobb i perioden er riktig. Dette gjør du på neste steg.
                                        </Alert>
                                    </Block>
                                )}
                            </Form>
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default LovbestemtFerieStep;
