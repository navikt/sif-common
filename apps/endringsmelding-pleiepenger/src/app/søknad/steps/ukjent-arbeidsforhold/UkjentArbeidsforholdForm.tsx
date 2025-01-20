import React from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import {
    FormikNumberInput,
    FormikYesOrNoQuestion,
    getTypedFormComponents,
    ValidationError,
    YesOrNo,
} from '@navikt/sif-common-formik-ds';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import {
    ArbeidsaktivitetType,
    ArbeidsgiverForEndring,
    SøknadContextState,
    UkjentArbeidsforholdSøknadsdata,
} from '@types';
import ArbeidsaktivitetBlock from '../../../components/arbeidsaktivitet-block/ArbeidsaktivitetBlock';
import IkkeAnsattMelding from '../../../components/ikke-ansatt-melding/IkkeAnsattMelding';
import InfoNormalarbeidstid from '../../../components/info-normalarbeidstid/InfoNormalarbeidstid';
import { useOnValidSubmit } from '../../../hooks';
import PersistStepFormValues from '../../../modules/persist-step-form-values/PersistStepFormValues';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import { StepId } from '../../config/StepId';
import actionsCreator from '../../context/action/actionCreator';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import {
    getErAnsattValidator,
    getTimerPerUkeValidator,
    getUkjentArbeidsforholdStepInitialValues,
    getUkjentArbeidsforholdSøknadsdataFromFormValues,
} from './ukjentArbeidsforholdStepUtils';

export enum UkjentArbeidsgiverFormField {
    erAnsatt = 'erAnsatt',
    timerPerUke = 'timerPerUke',
}

export interface UkjentArbeidsforholdArbeidsgiverFormValues {
    [UkjentArbeidsgiverFormField.erAnsatt]?: YesOrNo;
    [UkjentArbeidsgiverFormField.timerPerUke]?: string;
}

export interface UkjentArbeidsforholdArbeidsgiverMap {
    [arbeidsgiverKey: string]: UkjentArbeidsforholdArbeidsgiverFormValues;
}

export interface UkjentArbeidsforholdFormValues {
    [UkjentArbeidsforholdFormFields.arbeidsforhold]: UkjentArbeidsforholdArbeidsgiverMap;
}

enum UkjentArbeidsforholdFormFields {
    arbeidsforhold = 'arbeidsforhold',
    'arbeidsforhold.erAnsatt' = 'erAnsatt',
    'arbeidsforhold.timerPerUke' = 'timerPerUke',
}

const { FormikWrapper, Form } = getTypedFormComponents<
    UkjentArbeidsforholdFormFields,
    UkjentArbeidsforholdFormValues,
    ValidationError
>();

interface Props {
    arbeidsgivere: ArbeidsgiverForEndring[];
    arbeidsgivereIkkeISak: ArbeidsgiverForEndring[];
    ukjentArbeidsforholdSøknadsdata?: UkjentArbeidsforholdSøknadsdata;
    stepId: StepId;
    goBack?: () => void;
}

const UkjentArbeidsforholdForm: React.FunctionComponent<Props> = ({
    stepId,
    goBack,
    arbeidsgivere,
    arbeidsgivereIkkeISak,
    ukjentArbeidsforholdSøknadsdata,
}) => {
    const intl = useIntl();
    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: UkjentArbeidsforholdFormValues) => {
        const ukjentArbeidsforhold = getUkjentArbeidsforholdSøknadsdataFromFormValues(values, arbeidsgivere);
        if (ukjentArbeidsforhold) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadUkjentArbeidsforhold(ukjentArbeidsforhold)];
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
    const initialValues: UkjentArbeidsforholdFormValues = getUkjentArbeidsforholdStepInitialValues(
        ukjentArbeidsforholdSøknadsdata,
        stepFormValues?.ukjentArbeidsforhold,
        arbeidsgivereIkkeISak,
    );

    return (
        <FormikWrapper
            initialValues={initialValues}
            onSubmit={handleSubmit}
            renderForm={({ values }) => {
                return (
                    <>
                        <PersistStepFormValues stepId={stepId} />
                        <Form
                            formErrorHandler={getIntlFormErrorHandler(intl, 'ukjentArbeidsforholdForm')}
                            includeValidationSummary={true}
                            submitPending={isSubmitting}
                            runDelayedFormValidation={true}
                            onBack={goBack}>
                            {arbeidsgivereIkkeISak.map((arbeidsgiver) => {
                                const arbeidsgiverFieldName = `${UkjentArbeidsforholdFormFields.arbeidsforhold}.${arbeidsgiver.key}`;
                                const arbeidsgiverValues = (values.arbeidsforhold || {})[arbeidsgiver.key];
                                return (
                                    <FormBlock
                                        key={arbeidsgiver.key}
                                        data-testid={`ukjentArbeidsforhold_${arbeidsgiver.key}`}>
                                        <ArbeidsaktivitetBlock
                                            type={ArbeidsaktivitetType.arbeidstaker}
                                            navn={arbeidsgiver.navn}
                                            arbeidsgiver={arbeidsgiver}
                                            renderAsExpansionCard={false}>
                                            <FormikYesOrNoQuestion
                                                name={`${arbeidsgiverFieldName}.${UkjentArbeidsgiverFormField.erAnsatt}`}
                                                validate={getErAnsattValidator(arbeidsgiver.navn)}
                                                legend={`Stemmer det at du er ansatt hos ${arbeidsgiver.navn} i perioden du har søkt pleiepenger?`}
                                            />
                                            {arbeidsgiverValues.erAnsatt === YesOrNo.NO && (
                                                <Block margin="l" padBottom="l">
                                                    <IkkeAnsattMelding />
                                                </Block>
                                            )}
                                            {arbeidsgiverValues.erAnsatt === YesOrNo.YES && (
                                                <FormBlock>
                                                    <FormikNumberInput
                                                        name={`${arbeidsgiverFieldName}.${UkjentArbeidsgiverFormField.timerPerUke}`}
                                                        label={`Hvor mange timer jobber du normalt per uke hos ${arbeidsgiver.navn}?`}
                                                        description={<InfoNormalarbeidstid />}
                                                        min={0}
                                                        max={100}
                                                        width="xs"
                                                        maxLength={5}
                                                        validate={getTimerPerUkeValidator(arbeidsgiver.navn)}
                                                    />
                                                </FormBlock>
                                            )}
                                        </ArbeidsaktivitetBlock>
                                    </FormBlock>
                                );
                            })}
                        </Form>
                    </>
                );
            }}
        />
    );
};

export default UkjentArbeidsforholdForm;
