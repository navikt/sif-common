import React from 'react';
import { AppText, useAppIntl } from '@i18n/index';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { YesOrNo } from '@navikt/sif-common-formik-ds/src';
import { FormikRadioProp } from '@navikt/sif-common-formik-ds/src/components/formik-radio-group/FormikRadioGroup';
import { DateRange } from '@navikt/sif-common-utils';
import ResponsivePanel from '../../../components/responsive-panel/ResponsivePanel';
import {
    ArbeiderIPeriodenSvar,
    ArbeidIPeriodeIntlValues,
    ArbeidsforholdType,
} from '../../../local-sif-common-pleiepenger';
import { TimerEllerProsent } from '../../../types';
import {
    ArbeidIPeriodeFormField,
    ArbeidIPeriodeFormValues,
} from '../../../types/søknad-form-values/ArbeidIPeriodeFormValues';
import { ArbeidsukeInfo } from '../../../types/ArbeidsukeInfo';
import SøknadFormComponents from '../../SøknadFormComponents';
import { getArbeidstidSpørsmålstekst } from '../utils/arbeidIPeriodeTekstUtils';
import { skalSvarePåOmEnJobberLiktIPerioden } from '../utils/arbeidstidStepUtils';
import {
    getArbeidIPeriodeArbeiderIPeriodenValidator,
    getArbeidIPeriodeErLiktHverUkeValidator,
    getArbeidIPeriodeProsentAvNormaltValidator,
    getArbeidIPeriodeSnittTimerEnArbeidsukeValidator,
    getArbeidIPeriodeSnittTimerPerUkeValidator,
    getArbeidIPeriodeTimerEllerProsentValidator,
} from '../validationArbeidIPeriodeSpørsmål';
import ArbeidstidEnkeltuker from './ArbeidstidEnkeltuker';
import { Alert } from '@navikt/ds-react';

interface Props {
    arbeidsforholdType: ArbeidsforholdType;
    periode: DateRange;
    parentFieldName: string;
    formValues?: ArbeidIPeriodeFormValues;
    arbeiderIPeriodenAlternativer?: FormikRadioProp[];
    intlValues: ArbeidIPeriodeIntlValues;
    normalarbeidstid: number;
    info?: React.ReactNode;
    arbeiderIPeriodenDescription?: React.ReactNode;
}

const ArbeidIPeriodeSpørsmål: React.FunctionComponent<Props> = ({
    periode,
    parentFieldName,
    formValues,
    arbeiderIPeriodenAlternativer,
    intlValues,
    info,
    normalarbeidstid,
    arbeidsforholdType,
    arbeiderIPeriodenDescription,
}) => {
    const appIntl = useAppIntl();
    const { text } = appIntl;
    const getFieldName = (field: ArbeidIPeriodeFormField) => `${parentFieldName}.arbeidIPeriode.${field}` as any;
    const visKunArbeidstidPerUke = skalSvarePåOmEnJobberLiktIPerioden(periode) === false;

    const visArbeidstidPerUke =
        formValues?.arbeiderIPerioden === ArbeiderIPeriodenSvar.redusert &&
        (visKunArbeidstidPerUke || formValues?.erLiktHverUke === YesOrNo.NO);

    const spørsmål = getArbeidstidSpørsmålstekst(appIntl, arbeidsforholdType, intlValues);

    const visInntektsmeldingInfo =
        arbeidsforholdType === ArbeidsforholdType.ANSATT &&
        (formValues?.arbeiderIPerioden === ArbeiderIPeriodenSvar.redusert ||
            formValues?.arbeiderIPerioden === ArbeiderIPeriodenSvar.heltFravær);
    return (
        <>
            <SøknadFormComponents.RadioGroup
                name={getFieldName(ArbeidIPeriodeFormField.arbeiderIPerioden)}
                legend={spørsmål.arbeiderIPerioden}
                validate={getArbeidIPeriodeArbeiderIPeriodenValidator(intlValues)}
                description={arbeiderIPeriodenDescription}
                radios={
                    arbeiderIPeriodenAlternativer || [
                        {
                            label: text('arbeidIPeriode.arbeiderIPerioden.svar.jobberIkke'),
                            value: ArbeiderIPeriodenSvar.heltFravær,
                        },
                        {
                            label: text('arbeidIPeriode.arbeiderIPerioden.svar.jobberRedusert'),
                            value: ArbeiderIPeriodenSvar.redusert,
                        },
                        {
                            label: text('arbeidIPeriode.arbeiderIPerioden.svar.jobberVanlig'),
                            value: ArbeiderIPeriodenSvar.somVanlig,
                        },
                    ]
                }
            />

            {visInntektsmeldingInfo && (
                <Alert variant="info" className="mt-4">
                    <AppText id="arbeidIPeriode.ANSATT.kontaktArbeidsgiver.info" />
                </Alert>
            )}

            {formValues?.arbeiderIPerioden === ArbeiderIPeriodenSvar.redusert && (
                <FormBlock margin="l">
                    <ResponsivePanel border={true}>
                        {info}
                        {visKunArbeidstidPerUke === false && (
                            <FormBlock>
                                <SøknadFormComponents.YesOrNoQuestion
                                    name={getFieldName(ArbeidIPeriodeFormField.erLiktHverUke)}
                                    legend={spørsmål.erLiktHverUke}
                                    validate={getArbeidIPeriodeErLiktHverUkeValidator(intlValues)}
                                    labels={{
                                        yes: text(`arbeidIPeriode.erLiktHverUke.ja`),
                                        no: text(`arbeidIPeriode.erLiktHverUke.nei`),
                                    }}
                                />
                            </FormBlock>
                        )}
                        {visKunArbeidstidPerUke === false && formValues?.erLiktHverUke === YesOrNo.YES && (
                            <>
                                <FormBlock>
                                    <SøknadFormComponents.RadioGroup
                                        name={getFieldName(ArbeidIPeriodeFormField.timerEllerProsent)}
                                        legend={spørsmål.timerEllerProsent}
                                        radios={[
                                            {
                                                label: text(`arbeidIPeriode.timerEllerProsent.prosent`),
                                                value: TimerEllerProsent.PROSENT,
                                                'data-testid': TimerEllerProsent.PROSENT,
                                            },
                                            {
                                                label: text(`arbeidIPeriode.timerEllerProsent.timer`),
                                                value: TimerEllerProsent.TIMER,
                                                'data-testid': TimerEllerProsent.TIMER,
                                            },
                                        ]}
                                        validate={getArbeidIPeriodeTimerEllerProsentValidator(intlValues)}
                                    />
                                </FormBlock>
                                {formValues.timerEllerProsent === TimerEllerProsent.PROSENT && (
                                    <FormBlock>
                                        <SøknadFormComponents.NumberInput
                                            className="arbeidstidUkeInput"
                                            name={getFieldName(ArbeidIPeriodeFormField.prosentAvNormalt)}
                                            label={spørsmål.prosentAvNormalt}
                                            data-testid="prosent-verdi"
                                            validate={getArbeidIPeriodeProsentAvNormaltValidator(intlValues)}
                                            width="xs"
                                            maxLength={4}
                                        />
                                    </FormBlock>
                                )}
                                {formValues.timerEllerProsent === TimerEllerProsent.TIMER && (
                                    <FormBlock>
                                        <SøknadFormComponents.NumberInput
                                            className="arbeidstidUkeInput"
                                            name={getFieldName(ArbeidIPeriodeFormField.snittTimerPerUke)}
                                            label={spørsmål.snittTimerPerUke}
                                            validate={getArbeidIPeriodeSnittTimerPerUkeValidator(
                                                appIntl,
                                                intlValues,
                                                normalarbeidstid,
                                            )}
                                            data-testid="timer-verdi"
                                            width="xs"
                                            maxLength={5}
                                        />
                                    </FormBlock>
                                )}
                            </>
                        )}
                        {visArbeidstidPerUke && (
                            <FormBlock>
                                <ArbeidstidEnkeltuker
                                    parentFieldName={getFieldName(ArbeidIPeriodeFormField.arbeidsuker)}
                                    label={spørsmål.arbeidsuker}
                                    periode={periode}
                                    arbeidIPeriode={formValues}
                                    timerPerUkeValidator={(arbeidsuke: ArbeidsukeInfo) =>
                                        getArbeidIPeriodeSnittTimerEnArbeidsukeValidator(
                                            appIntl,
                                            intlValues,
                                            normalarbeidstid,
                                            arbeidsuke,
                                        )
                                    }
                                    arbeidsforholdType={arbeidsforholdType}
                                />
                            </FormBlock>
                        )}
                    </ResponsivePanel>
                </FormBlock>
            )}
        </>
    );
};

export default ArbeidIPeriodeSpørsmål;
