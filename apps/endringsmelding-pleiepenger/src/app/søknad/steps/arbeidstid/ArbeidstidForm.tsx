import { Alert, Box, Link } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import { useOnValidSubmit, useSøknadContext } from '@hooks';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { ArbeiderIPeriodenSvar, ArbeidsaktivitetType, ArbeidstidEndringMap, SøknadContextState } from '@types';
import { getArbeidsaktiviteterForUkjenteArbeidsforhold, getEndringsdato, getTillattEndringsperiode } from '@utils';
import { AppText } from '../../../i18n';
import { getLenker } from '../../../lenker';
import PersistStepFormValues from '../../../modules/persist-step-form-values/PersistStepFormValues';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import { StepId } from '../../config/StepId';
import actionsCreator from '../../context/action/actionCreator';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import ArbeidsaktivitetFormPart from './arbeidsaktivitet-form-part/ArbeidsaktivitetFormPart';
import {
    getAktiviteterSomSkalEndres,
    getArbeidstidStepInitialValues,
    getArbeidstidSøknadsdataFromFormValues,
} from './arbeidstidStepUtils';

const { FormikWrapper, Form } = getTypedFormComponents<ArbeidstidFormFields, ArbeidstidFormValues, ValidationError>();

export type ArbeidsaktivitetFormValuesMap = {
    [aktivitetId: string]: ArbeidsaktivitetFormValues;
};

export interface ArbeidstidFormValues {
    [ArbeidstidFormFields.arbeidsaktivitet]: ArbeidsaktivitetFormValuesMap;
}
export interface ArbeidsaktivitetFormValues {
    endringer: ArbeidstidEndringMap;
    arbeiderIPerioden?: ArbeiderIPeriodenSvar;
}

export enum ArbeidstidFormFields {
    arbeidsaktivitet = 'arbeidsaktivitet',
}

interface Props {
    goBack?: () => void;
}

const ArbeidstidForm: React.FunctionComponent<Props> = ({ goBack }) => {
    const stepId = StepId.ARBEIDSTID;
    const intl = useIntl();
    const {
        dispatch,
        state: { søknadsdata, sak },
    } = useSøknadContext();
    const { clearStepFormValues, stepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: ArbeidstidFormValues) => {
        const arbeidstidSøknadsdata = getArbeidstidSøknadsdataFromFormValues(values);
        if (arbeidstidSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadArbeidstid(arbeidstidSøknadsdata)];
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

    const onArbeidstidAktivitetChange = (
        arbeidsaktivitetKey: string,
        arbeidstidEndringMap: ArbeidstidEndringMap,
        values: Partial<ArbeidstidFormValues>,
        setValues: (values: ArbeidstidFormValues) => void,
    ) => {
        const currentAktivitetValues = (values.arbeidsaktivitet || {})[arbeidsaktivitetKey];
        const newValues: ArbeidstidFormValues = {
            arbeidsaktivitet: {
                ...values.arbeidsaktivitet,
                [arbeidsaktivitetKey]: {
                    arbeiderIPerioden: currentAktivitetValues?.arbeiderIPerioden,
                    endringer: arbeidstidEndringMap,
                },
            },
        };

        setValues(newValues);

        /** Oppdater state før mellomlagring */
        const arbeidstidSøknadsdata = getArbeidstidSøknadsdataFromFormValues(newValues);
        if (arbeidstidSøknadsdata) {
            dispatch(actionsCreator.setSøknadArbeidstid(arbeidstidSøknadsdata));
            dispatch(actionsCreator.requestLagreSøknad());
        }
    };
    return (
        <FormikWrapper
            initialValues={getArbeidstidStepInitialValues(søknadsdata, stepFormValues?.arbeidstid)}
            onSubmit={handleSubmit}
            renderForm={({ setValues, values, validateForm }) => {
                const aktiviteterValuesMap = values.arbeidsaktivitet || {};
                const arbeidsaktiviteter = [
                    ...getArbeidsaktiviteterForUkjenteArbeidsforhold(
                        sak.søknadsperioder,
                        sak.arbeidsgivereIkkeISak,
                        aktiviteterValuesMap,
                        getTillattEndringsperiode(getEndringsdato()),
                        søknadsdata.ukjentArbeidsforhold,
                    ),
                    ...getAktiviteterSomSkalEndres(sak.arbeidsaktiviteter),
                ];

                if (arbeidsaktiviteter.length === 0) {
                    return (
                        <Box marginBlock={'10 0'}>
                            <Alert variant="warning">
                                <AppText
                                    id="arbeidstidStep.ingenArbeidsaktiviteter"
                                    values={{
                                        Lenke: (txt: string) => (
                                            <Link href={getLenker(intl.locale).beskjedOmFamilie}>{txt}</Link>
                                        ),
                                    }}
                                />
                            </Alert>
                        </Box>
                    );
                }

                return (
                    <>
                        <PersistStepFormValues stepId={stepId} />
                        <Form
                            formErrorHandler={getIntlFormErrorHandler(intl, 'arbeidstidForm')}
                            includeValidationSummary={true}
                            submitPending={isSubmitting}
                            runDelayedFormValidation={true}
                            onBack={goBack}>
                            {arbeidsaktiviteter.map((arbeidsaktivitet) => (
                                <Block margin="l" key={arbeidsaktivitet.key}>
                                    <ArbeidsaktivitetFormPart
                                        arbeidsaktivitet={arbeidsaktivitet}
                                        lovbestemtFerie={søknadsdata.lovbestemtFerie}
                                        aktivitetFormValues={(values.arbeidsaktivitet || {})[arbeidsaktivitet.key]}
                                        onArbeidstidChange={(arbeidstidEndringer) => {
                                            onArbeidstidAktivitetChange(
                                                arbeidsaktivitet.key,
                                                arbeidstidEndringer,
                                                values,
                                                setValues,
                                            );
                                            setTimeout(() => {
                                                validateForm();
                                            });
                                        }}
                                        renderAsExpansionCard={arbeidsaktiviteter.length > 1}
                                        expansionCardDefaultOpen={
                                            arbeidsaktiviteter.length <= 2 ||
                                            (arbeidsaktivitet.type === ArbeidsaktivitetType.arbeidstaker &&
                                                arbeidsaktivitet.erUkjentArbeidsforhold === true)
                                        }
                                    />
                                </Block>
                            ))}
                        </Form>
                    </>
                );
            }}
        />
    );
};

export default ArbeidstidForm;
