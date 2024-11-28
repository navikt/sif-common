import { VStack } from '@navikt/ds-react';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { getTypedFormComponents, ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds';
import { getListValidator, getStringValidator, getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { AppText, useAppIntl } from '../../../i18n';
import { Kursperiode } from '../../../types/Kursperiode';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import { getKursStepInitialValues, getKursSøknadsdataFromFormValues } from './kursStepUtils';
import { getTillattSøknadsperiode } from '../../../utils/søknadsperiodeUtils';
import KursperioderFormPart from './kursperioder-form-part/KursperioderFormPart';
import FerieuttakListAndDialog from '@navikt/sif-common-forms-ds/src/forms/ferieuttak/FerieuttakListAndDialog';
import { Ferieuttak } from '@navikt/sif-common-forms-ds/src';
import { FormLayout } from '@navikt/sif-common-ui';

export enum KursFormFields {
    opplæringsinstitusjon = 'opplæringsinstitusjon',
    kursperioder = 'kursperioder',
    arbeiderIKursperiode = 'arbeiderIKursperiode',
    harFerieIPerioden = 'harFerieIPerioden',
    ferieuttak = 'ferieuttak',
}

export interface KursFormValues {
    [KursFormFields.opplæringsinstitusjon]?: string;
    [KursFormFields.kursperioder]?: Kursperiode[];
    [KursFormFields.arbeiderIKursperiode]?: YesOrNo;
    [KursFormFields.harFerieIPerioden]?: YesOrNo;
    [KursFormFields.ferieuttak]?: Ferieuttak[];
}

const { FormikWrapper, Form, TextField, YesOrNoQuestion } = getTypedFormComponents<
    KursFormFields,
    KursFormValues,
    ValidationError
>();

const KursStep = () => {
    const { intl, text } = useAppIntl();

    const {
        state: { søknadsdata },
    } = useSøknadContext();

    const stepId = StepId.KURS;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);
    const gyldigSøknadsperiode = getTillattSøknadsperiode();

    const { goBack } = useStepNavigation(step);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values) => {
        const kursSøknadsdata = getKursSøknadsdataFromFormValues(values);
        if (kursSøknadsdata) {
            clearStepFormValues(stepId);
            return [
                actionsCreator.setSøknadKurs(kursSøknadsdata),
                actionsCreator.syncArbeidstidMedKursperioder(kursSøknadsdata),
            ];
        }
        return [];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        stepId,
        (state: SøknadContextState) => {
            return lagreSøknadState({ ...state });
        },
    );

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getKursStepInitialValues(søknadsdata, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={({ values }) => {
                    return (
                        <>
                            <PersistStepFormValues stepId={stepId} />
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'steg.kurs.validation')}
                                includeValidationSummary={true}
                                submitPending={isSubmitting}
                                submitDisabled={isSubmitting}
                                onBack={goBack}
                                runDelayedFormValidation={true}>
                                <VStack gap={'8'}>
                                    <SifGuidePanel>
                                        <p>
                                            <AppText id="steg.kurs.counsellorPanel.avsnitt.1" />
                                        </p>
                                        <p>
                                            <AppText id="steg.kurs.counsellorPanel.avsnitt.2" />
                                        </p>
                                        <p>
                                            <AppText id="steg.kurs.counsellorPanel.avsnitt.3" />
                                        </p>
                                    </SifGuidePanel>

                                    <VStack gap={'4'}>
                                        <TextField
                                            label={text('steg.kurs.opplæringsinstitusjon.label')}
                                            name={KursFormFields.opplæringsinstitusjon}
                                            description={text('steg.kurs.opplæringsinstitusjon.description')}
                                            max={50}
                                            validate={getStringValidator({
                                                required: true,
                                                minLength: 5,
                                                maxLength: 50,
                                            })}
                                        />
                                    </VStack>

                                    <KursperioderFormPart
                                        kursperioder={values[KursFormFields.kursperioder]}
                                        gyldigSøknadsperiode={gyldigSøknadsperiode}
                                    />

                                    <YesOrNoQuestion
                                        name={KursFormFields.arbeiderIKursperiode}
                                        legend={text('steg.kurs.arbeiderIKursperiode.label')}
                                        validate={getYesOrNoValidator()}
                                    />

                                    <YesOrNoQuestion
                                        name={KursFormFields.harFerieIPerioden}
                                        legend={text('steg.kurs.harFerieIPerioden.label')}
                                        validate={getYesOrNoValidator()}
                                    />

                                    {values[KursFormFields.harFerieIPerioden] === YesOrNo.YES && (
                                        <FormLayout.QuestionBleedTop>
                                            <FormLayout.Panel>
                                                <FerieuttakListAndDialog
                                                    labels={{
                                                        addLabel: text('steg.kurs.ferie.addLabel'),
                                                        modalTitle: text('steg.kurs.ferie.modalTitle'),
                                                        listTitle: text('steg.kurs.ferie.listTitle'),
                                                    }}
                                                    name={KursFormFields.ferieuttak}
                                                    minDate={gyldigSøknadsperiode.from}
                                                    maxDate={gyldigSøknadsperiode.to}
                                                    validate={getListValidator({ required: true })}
                                                />
                                            </FormLayout.Panel>
                                        </FormLayout.QuestionBleedTop>
                                    )}
                                </VStack>
                            </Form>
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default KursStep;
