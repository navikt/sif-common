/* eslint-disable no-console */
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { ArbeidIPeriode } from './ArbeidstidTypes';
import { DateRange, ValidationError } from '@navikt/sif-common-formik-ds/lib';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { StepId } from '../../../types/StepId';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import actionsCreator from '../../context/action/actionCreator';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { prettifyDateExtended } from '@navikt/sif-common-utils/lib';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import {
    getAntallArbeidsforhold,
    getArbeidstidStepInitialValues,
    getArbeidstidSøknadsdataFromFormValues,
} from './arbeidstidStepUtils';
import ArbeidIPeriodeSpørsmål from './form-parts/arbeid-i-periode-spørsmål/ArbeidIPeriodeSpørsmål';
import { ArbeidsforholdType } from './form-parts/types';
import { søkerKunHelgedager } from '../tidsrom/tidsromStepUtils';
import { Heading } from '@navikt/ds-react';
import { getPeriodeSomFrilanserInnenforPeriode } from '../arbeidssituasjon/form-parts/arbeidssituasjonFrilansUtils';
import { getPeriodeSomSelvstendigInnenforPeriode } from '../arbeidssituasjon/form-parts/arbeidssituasjonSelvstendigUtils';
import useLogSøknadInfo from '../../../hooks/useLogSøknadInfo';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import { useState } from 'react';
import { ConfirmationDialogType } from '../../../types/ConfirmationDialog';
import { harFraværIPerioden } from './form-parts/arbeidstidUtils';
import { getIngenFraværConfirmationDialog } from '../confirmation-dialogs/ingenFraværConfirmation';
import ConfirmationDialog from '@navikt/sif-common-core-ds/lib/components/dialogs/confirmation-dialog/ConfirmationDialog';
import { usePersistTempFormValues } from '../../../hooks/usePersistTempFormValues';

export enum ArbeidsaktivitetType {
    arbeidstaker = 'arbeidstaker',
    frilanser = 'frilanser',
    selvstendigNæringsdrivende = 'selvstendigNæringsdrivende',
}

export interface AnsattArbeidstid {
    organisasjonsnummer: string;
    navn: string;
    jobberNormaltTimer: number;
    arbeidIPeriode?: ArbeidIPeriode;
}

export enum SelvstendigArbeidstidFormFields {
    'type' = 'selvstendigArbeidstid.type',
    'jobberNormaltTimer' = 'selvstendigArbeidstid.jobberNormaltTimer',
    'arbeidIPeriode' = 'selvstendigArbeidstid.arbeidIPeriode',
}

export enum FrilansArbeidstidFormFields {
    'type' = 'frilansArbeidstid.type',
    'jobberNormaltTimer' = 'frilansArbeidstid.jobberNormaltTimer',
    'arbeidIPeriode' = 'frilansArbeidstid.arbeidIPeriode',
}

export interface FrilansSNArbeidstid {
    type: ArbeidsaktivitetType;
    jobberNormaltTimer: number;
    arbeidIPeriode?: ArbeidIPeriode;
}

export enum ArbeidstidFormFields {
    ansattArbeidstid = 'ansattArbeidstid',
    frilansArbeidstid = 'frilansArbeidstid',
    selvstendigArbeidstid = 'selvstendigArbeidstid',
}

export interface ArbeidstidFormValues {
    [ArbeidstidFormFields.ansattArbeidstid]?: AnsattArbeidstid[];
    [ArbeidstidFormFields.frilansArbeidstid]?: FrilansSNArbeidstid;
    [ArbeidstidFormFields.selvstendigArbeidstid]?: FrilansSNArbeidstid;
}

const { FormikWrapper, Form } = getTypedFormComponents<ArbeidstidFormFields, ArbeidstidFormValues, ValidationError>();

const ArbeidstidStep = () => {
    const intl = useIntl();
    const {
        state: { søknadsdata, tempFormData },
        dispatch,
    } = useSøknadContext();
    const [confirmationDialog, setConfirmationDialog] = useState<ConfirmationDialogType | undefined>(undefined);
    const { logArbeidPeriodeRegistrert, logArbeidEnkeltdagRegistrert, logBekreftIngenFraværFraJobb } =
        useLogSøknadInfo();

    const stepId = StepId.ARBEIDSTID;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

    const { goBack } = useStepNavigation(step);

    const { clearStepFormValues } = useStepFormValuesContext();

    const onBeforeValidSubmit = (values: ArbeidstidFormValues) => {
        const { ansattArbeidstid, frilansArbeidstid, selvstendigArbeidstid } = values;
        return new Promise((resolve) => {
            if (harFraværIPerioden(frilansArbeidstid, selvstendigArbeidstid, ansattArbeidstid) === false) {
                setTimeout(() => {
                    setConfirmationDialog(
                        getIngenFraværConfirmationDialog({
                            onCancel: () => {
                                logBekreftIngenFraværFraJobb(false);
                                setConfirmationDialog(undefined);
                            },
                            onConfirm: () => {
                                logBekreftIngenFraværFraJobb(true);
                                setConfirmationDialog(undefined);
                                resolve(true);
                            },
                        }),
                    );
                });
            } else {
                resolve(true);
            }
        });
    };

    const onValidSubmitHandler = (values: ArbeidstidFormValues) => {
        const arbeidstidSøknadsdata = getArbeidstidSøknadsdataFromFormValues(values);

        if (arbeidstidSøknadsdata) {
            clearStepFormValues(stepId);
            return [
                actionsCreator.setSøknadArbeidstid(arbeidstidSøknadsdata),
                actionsCreator.setSøknadTempFormData(undefined),
            ];
        }
        return [];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        stepId,
        (state: SøknadContextState) => {
            return lagreSøknadState({ ...state, tempFormData: undefined });
        },
    );

    const { persistTempFormValues } = usePersistTempFormValues();

    const handleArbeidstidChanged = (values: Partial<ArbeidstidFormValues>) => {
        dispatch(actionsCreator.setSøknadTempFormData({ stepId, values }));
        persistTempFormValues({ stepId, values });
    };
    const { tidsrom } = søknadsdata;
    if (!tidsrom) {
        return undefined;
    }

    const { søknadsperiode, dagerMedPleie } = tidsrom;
    const periodeFra = søknadsperiode.from;
    const periodeTil = søknadsperiode.to;

    if (!periodeFra || !periodeTil || !dagerMedPleie) {
        return undefined;
    }

    const periode: DateRange = { from: periodeFra, to: periodeTil };
    const antallArbeidsforhold = søknadsdata.arbeidssituasjon
        ? getAntallArbeidsforhold(søknadsdata.arbeidssituasjon)
        : 0;

    const tempArbeidstid = tempFormData?.stepId === stepId ? tempFormData.values : undefined;
    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getArbeidstidStepInitialValues(søknadsdata, tempArbeidstid)}
                onSubmit={async (values) => {
                    if (await onBeforeValidSubmit(values)) {
                        handleSubmit(values);
                    }
                }}
                renderForm={({ values: { ansattArbeidstid, frilansArbeidstid, selvstendigArbeidstid } }) => {
                    if (!ansattArbeidstid && !frilansArbeidstid && !selvstendigArbeidstid) {
                        return undefined;
                    }
                    const periodeSomFrilanserISøknadsperiode =
                        frilansArbeidstid && periode
                            ? getPeriodeSomFrilanserInnenforPeriode(periode, søknadsdata.arbeidssituasjon?.frilans)
                            : undefined;

                    const periodeSomSelvstendigISøknadsperiode =
                        selvstendigArbeidstid && periode
                            ? getPeriodeSomSelvstendigInnenforPeriode(
                                  periode,
                                  søknadsdata.arbeidssituasjon?.selvstendig,
                              )
                            : undefined;
                    const oppdatereArbeidstid = () =>
                        handleArbeidstidChanged({ ansattArbeidstid, frilansArbeidstid, selvstendigArbeidstid });
                    return (
                        <>
                            <PersistStepFormValues stepId={stepId} />
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                                includeValidationSummary={true}
                                submitPending={isSubmitting}
                                onBack={goBack}
                                runDelayedFormValidation={true}>
                                {confirmationDialog && (
                                    <ConfirmationDialog
                                        open={confirmationDialog !== undefined}
                                        okLabel={confirmationDialog.okLabel}
                                        cancelLabel={confirmationDialog.cancelLabel}
                                        onConfirm={confirmationDialog.onConfirm}
                                        onCancel={confirmationDialog.onCancel}
                                        title={confirmationDialog.title}>
                                        {confirmationDialog.content}
                                    </ConfirmationDialog>
                                )}
                                <FormBlock>
                                    <SifGuidePanel>
                                        <p>
                                            <FormattedMessage
                                                id={'arbeidIPeriode.StepInfo.1'}
                                                values={
                                                    periode
                                                        ? {
                                                              fra: prettifyDateExtended(periode.from),
                                                              til: prettifyDateExtended(periode.to),
                                                          }
                                                        : undefined
                                                }
                                            />
                                        </p>
                                        <p>
                                            <FormattedMessage id={'arbeidIPeriode.StepInfo.2'} />
                                        </p>
                                    </SifGuidePanel>

                                    {ansattArbeidstid && (
                                        <FormBlock>
                                            {ansattArbeidstid.map((arbeidsforhold, index) => {
                                                return (
                                                    <FormBlock key={arbeidsforhold.organisasjonsnummer}>
                                                        <Heading level="2" size="large">
                                                            {arbeidsforhold.navn}
                                                        </Heading>
                                                        <Block>
                                                            <ArbeidIPeriodeSpørsmål
                                                                arbeidsstedNavn={arbeidsforhold.navn}
                                                                arbeidsforholdType={ArbeidsforholdType.ANSATT}
                                                                arbeidIPeriode={arbeidsforhold.arbeidIPeriode}
                                                                jobberNormaltTimer={arbeidsforhold.jobberNormaltTimer}
                                                                dagerMedPleie={dagerMedPleie}
                                                                periode={periode}
                                                                parentFieldName={`${ArbeidstidFormFields.ansattArbeidstid}.${index}`}
                                                                søkerKunHelgedager={søkerKunHelgedager(
                                                                    periode.from,
                                                                    periode.to,
                                                                )}
                                                                onArbeidstidVariertChange={oppdatereArbeidstid}
                                                                onArbeidPeriodeRegistrert={logArbeidPeriodeRegistrert}
                                                                onArbeidstidEnkeltdagRegistrert={
                                                                    logArbeidEnkeltdagRegistrert
                                                                }
                                                                skjulJobberNormaltValg={antallArbeidsforhold === 1}
                                                            />
                                                        </Block>
                                                    </FormBlock>
                                                );
                                            })}
                                        </FormBlock>
                                    )}

                                    {frilansArbeidstid && periodeSomFrilanserISøknadsperiode && (
                                        <FormBlock>
                                            <Heading level="2" size="large">
                                                <FormattedMessage id="arbeidIPeriode.FrilansLabel" />
                                            </Heading>
                                            <Block>
                                                <ArbeidIPeriodeSpørsmål
                                                    arbeidsstedNavn="Frilansoppdrag"
                                                    arbeidsforholdType={ArbeidsforholdType.FRILANSER}
                                                    arbeidIPeriode={frilansArbeidstid.arbeidIPeriode}
                                                    jobberNormaltTimer={frilansArbeidstid.jobberNormaltTimer}
                                                    periode={periodeSomFrilanserISøknadsperiode}
                                                    dagerMedPleie={dagerMedPleie}
                                                    parentFieldName={ArbeidstidFormFields.frilansArbeidstid}
                                                    søkerKunHelgedager={søkerKunHelgedager(periode.from, periode.to)}
                                                    onArbeidstidVariertChange={oppdatereArbeidstid}
                                                    onArbeidPeriodeRegistrert={logArbeidPeriodeRegistrert}
                                                    onArbeidstidEnkeltdagRegistrert={logArbeidEnkeltdagRegistrert}
                                                    skjulJobberNormaltValg={antallArbeidsforhold === 1}
                                                />
                                            </Block>
                                        </FormBlock>
                                    )}

                                    {selvstendigArbeidstid && periode && periodeSomSelvstendigISøknadsperiode && (
                                        <FormBlock>
                                            <Heading level="2" size="large">
                                                <FormattedMessage id="arbeidIPeriode.SNLabel" />
                                            </Heading>
                                            <Block>
                                                <ArbeidIPeriodeSpørsmål
                                                    arbeidsstedNavn="Selvstendig næringsdrivende"
                                                    arbeidsforholdType={ArbeidsforholdType.SELVSTENDIG}
                                                    jobberNormaltTimer={selvstendigArbeidstid.jobberNormaltTimer}
                                                    arbeidIPeriode={selvstendigArbeidstid.arbeidIPeriode}
                                                    periode={periodeSomSelvstendigISøknadsperiode}
                                                    dagerMedPleie={dagerMedPleie}
                                                    parentFieldName={ArbeidstidFormFields.selvstendigArbeidstid}
                                                    søkerKunHelgedager={søkerKunHelgedager(periode.from, periode.to)}
                                                    onArbeidstidVariertChange={oppdatereArbeidstid}
                                                    onArbeidPeriodeRegistrert={logArbeidPeriodeRegistrert}
                                                    onArbeidstidEnkeltdagRegistrert={logArbeidEnkeltdagRegistrert}
                                                    skjulJobberNormaltValg={antallArbeidsforhold === 1}
                                                />
                                            </Block>
                                        </FormBlock>
                                    )}
                                </FormBlock>
                            </Form>
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default ArbeidstidStep;
