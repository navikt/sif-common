import { Tabs } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import { Clock } from '@navikt/ds-icons';
import { getDurationString } from '@navikt/sif-common-core-ds/lib/components/duration-text/DurationText';
import { DateRange, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds/lib';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { getNumberFromStringInput } from '@navikt/sif-common-formik-ds/lib/validation/validationUtils';
import { durationToDecimalDuration } from '@navikt/sif-common-utils/lib';
import { ArbeidstidAktivitetUkeEndring } from '../../types/ArbeidstidAktivitetEndring';
import { Arbeidsuke } from '../../types/K9Sak';
import { ArbeidAktivitet } from '../../types/Sak';
import { TimerEllerProsent } from '../../types/TimerEllerProsent';
import { getArbeidAktivitetNavn } from '../../utils/arbeidAktivitetUtils';
import { ArbeidIPeriodeFormField, ArbeidIPeriodeFormValues } from './ArbeidIPeriodeFormValues';
import ArbeidstidInput from './ArbeidstidInput';
import { getArbeidstidIPeriodeIntlValues } from './arbeidstidPeriodeIntlValuesUtils';
import { erHelArbeidsuke, getDagerTekst } from '../../utils/arbeidsukeUtils';
import { useSøknadContext } from '../../søknad/context/hooks/useSøknadContext';
import actionsCreator from '../../søknad/context/action/actionCreator';

interface ArbeidIPeriodeTimer {
    periode: DateRange;
    timer: number;
}
interface ArbeidIPeriodeProsent {
    periode: DateRange;
    prosent: number;
}
export type ArbeidPeriodeData = ArbeidIPeriodeTimer | ArbeidIPeriodeProsent;

interface Props {
    arbeidsuke: Arbeidsuke;
    arbeidAktivitet: ArbeidAktivitet;
    onSubmit: (endring: ArbeidstidAktivitetUkeEndring) => void;
    onCancel: () => void;
}

const { FormikWrapper, Form } = getTypedFormComponents<
    ArbeidIPeriodeFormField,
    ArbeidIPeriodeFormValues,
    ValidationError
>();

const ArbeidIPeriodeForm: React.FunctionComponent<Props> = ({ arbeidAktivitet, arbeidsuke, onSubmit, onCancel }) => {
    const {
        dispatch,
        state: { inputPreferanser },
    } = useSøknadContext();

    const intl = useIntl();

    const onFormSubmit = (values: ArbeidIPeriodeFormValues) => {
        const { periode } = arbeidsuke;

        if (!periode) {
            return;
        }
        if (values.timerEllerProsent === TimerEllerProsent.PROSENT && values.prosentAvNormalt) {
            onSubmit({
                arbeidAktivitetId: arbeidAktivitet.id,
                periode,
                endring: {
                    type: TimerEllerProsent.PROSENT,
                    prosent: parseFloat(values.prosentAvNormalt),
                },
            });
        }
        if (values.timerEllerProsent === TimerEllerProsent.TIMER && values.snittTimerPerUke) {
            const timer = getNumberFromStringInput(values.snittTimerPerUke);
            if (!timer) {
                /** TODO */
                return;
            }
            onSubmit({
                arbeidAktivitetId: arbeidAktivitet.id,
                periode,
                endring: {
                    type: TimerEllerProsent.TIMER,
                    timer,
                },
            });
        }
    };

    return (
        <FormikWrapper
            initialValues={{ timerEllerProsent: inputPreferanser.timerEllerProsent }}
            onSubmit={onFormSubmit}
            renderForm={({ values, setValues }) => {
                const { timerEllerProsent } = values;

                const intlValues = getArbeidstidIPeriodeIntlValues(intl, {
                    timerNormaltString: getDurationString(intl, { duration: arbeidsuke.normalt }),
                    dagerTekst: erHelArbeidsuke(arbeidsuke) ? 'denne uken' : getDagerTekst(arbeidsuke.periode),
                    arbeidsforhold: {
                        type: arbeidAktivitet.type,
                        arbeidsstedNavn: getArbeidAktivitetNavn(arbeidAktivitet),
                    },
                });

                return (
                    <Form
                        formErrorHandler={getIntlFormErrorHandler(intl, 'arbeidIPeriodeForm')}
                        includeValidationSummary={true}
                        submitButtonLabel="Ok"
                        cancelButtonLabel="Avbryt"
                        onCancel={onCancel}
                        showButtonArrows={false}>
                        <Tabs
                            value={timerEllerProsent}
                            onChange={(value) => {
                                dispatch(
                                    actionsCreator.setInputPreferanser({
                                        timerEllerProsent: value as TimerEllerProsent,
                                    })
                                );
                                setValues({ ...values, timerEllerProsent: value as TimerEllerProsent });
                            }}>
                            <Tabs.List>
                                <Tabs.Tab
                                    value="prosent"
                                    label={<strong>Endre prosent</strong>}
                                    icon={<div style={{ minWidth: '1rem', textAlign: 'center' }}>%</div>}
                                />
                                <Tabs.Tab value="timer" label={<strong>Endre timer</strong>} icon={<Clock />} />
                            </Tabs.List>
                        </Tabs>
                        {timerEllerProsent && (
                            <ArbeidstidInput
                                arbeidIPeriode={values}
                                intlValues={intlValues}
                                timerEllerProsent={timerEllerProsent}
                                maksTimer={durationToDecimalDuration(arbeidsuke.normalt)}
                            />
                        )}
                    </Form>
                );
            }}
        />
    );
};

export default ArbeidIPeriodeForm;
