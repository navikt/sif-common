import { Alert, BodyShort, Heading, Ingress, ToggleGroup } from '@navikt/ds-react';
import React from 'react';
import { IntlShape, useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import { getDurationString } from '@navikt/sif-common-core-ds/lib/components/duration-text/DurationText';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import {
    getNumberFromNumberInputValue,
    getTypedFormComponents,
    ValidationError,
} from '@navikt/sif-common-formik-ds/lib';
import { getNumberValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import dayjs from 'dayjs';
import actionsCreator from '../../søknad/context/action/actionCreator';
import { useSøknadContext } from '../../søknad/context/hooks/useSøknadContext';
import { ArbeidstidAktivitetEndring } from '../../types/ArbeidstidAktivitetEndring';
import { Arbeidsuke } from '../../types/Sak';
import { TimerEllerProsent } from '../../types/TimerEllerProsent';
import {
    arbeidsukerHarLikNormaltidPerDag,
    erHelArbeidsuke,
    getArbeidsukeUkenummer,
    getDagerTekst,
} from '../../utils/arbeidsukeUtils';
import { getArbeidstidSpørsmålDescription, getArbeidsukerPerÅr } from './endreArbeidstidFormUtils';
import { getEndreArbeidstidIntlValues } from './endreArbeidstidIntlValues';
import './endreArbeidstidForm.scss';

export type EndreArbeidstidFormData = Omit<ArbeidstidAktivitetEndring, 'arbeidAktivitetId'>;

interface Props {
    arbeidsuker: Arbeidsuke[];
    onSubmit: (data: EndreArbeidstidFormData[]) => void;
    onCancel: () => void;
}

export enum EndreArbeidstidFormField {
    timerEllerProsent = 'timerEllerProsent',
    prosentAvNormalt = 'prosentAvNormalt',
    antallTimer = 'antallTimer',
}

export interface EndreArbeidstidFormValues {
    [EndreArbeidstidFormField.timerEllerProsent]?: TimerEllerProsent;
    [EndreArbeidstidFormField.prosentAvNormalt]?: string;
    [EndreArbeidstidFormField.antallTimer]?: string;
}

const { FormikWrapper, Form, NumberInput } = getTypedFormComponents<
    EndreArbeidstidFormField,
    EndreArbeidstidFormValues,
    ValidationError
>();

const EndreArbeidstidForm: React.FunctionComponent<Props> = ({ onCancel, onSubmit, arbeidsuker }) => {
    const intl = useIntl();
    const {
        dispatch,
        state: { inputPreferanser },
    } = useSøknadContext();

    const onFormSubmit = (values: EndreArbeidstidFormValues) => {
        if (values.timerEllerProsent === TimerEllerProsent.PROSENT && values.prosentAvNormalt) {
            const value = getNumberFromNumberInputValue(values.prosentAvNormalt);
            if (value) {
                onSubmit([
                    {
                        perioder: arbeidsuker.map((a) => a.periode),
                        endring: {
                            type: TimerEllerProsent.PROSENT,
                            prosent: value,
                        },
                    },
                ]);
            }
        }
        if (values.timerEllerProsent === TimerEllerProsent.TIMER) {
            const antallTimer = getNumberFromNumberInputValue(values.antallTimer);
            const endringer: EndreArbeidstidFormData[] = [];
            if (antallTimer) {
                const perioder = arbeidsuker.map((uke) => uke.periode);
                endringer.push({
                    perioder,
                    endring: {
                        type: TimerEllerProsent.TIMER,
                        timer: antallTimer,
                    },
                });
            }
            onSubmit(endringer);
        }
    };

    if (arbeidsuker.length === 0) {
        return null;
    }

    const gjelderKortUke = arbeidsuker.length === 1 && erHelArbeidsuke(arbeidsuker[0].periode) === false;

    return (
        <FormikWrapper
            initialValues={{ timerEllerProsent: inputPreferanser.timerEllerProsent }}
            onSubmit={onFormSubmit}
            renderForm={({ values, setValues }) => {
                const { timerEllerProsent } = values;
                const intlValues = getEndreArbeidstidIntlValues({
                    arbeidsuker,
                });

                return (
                    <div className="endreArbeidstidForm">
                        <Block margin="l" padBottom="l">
                            <Heading size="large" level="2">
                                {arbeidsuker.length === 1
                                    ? `Endre arbeidstid uke ${getArbeidsukeUkenummer(arbeidsuker[0], true)}`
                                    : 'Endre arbeidstid for flere uker'}
                            </Heading>
                            <Block margin="m">
                                <Ingress>{getUkerOgÅrBeskrivelse(arbeidsuker)}</Ingress>
                            </Block>
                        </Block>

                        <Form
                            formErrorHandler={getIntlFormErrorHandler(intl, 'endreArbeidstidForm')}
                            includeValidationSummary={true}
                            submitButtonLabel="Ok"
                            cancelButtonLabel="Avbryt"
                            onCancel={onCancel}
                            showButtonArrows={false}>
                            <Block padBottom="m">
                                <strong>Hvordan vil du oppgi arbeidstiden?</strong>
                            </Block>
                            <ToggleGroup
                                className="endreArbeidstidForm__timerProsentToggler"
                                value={timerEllerProsent}
                                size="small"
                                onChange={(value) => {
                                    dispatch(
                                        actionsCreator.setInputPreferanser({
                                            timerEllerProsent: value as TimerEllerProsent,
                                        })
                                    );
                                    setValues({ ...values, timerEllerProsent: value as TimerEllerProsent });
                                }}>
                                <ToggleGroup.Item value={TimerEllerProsent.PROSENT} data-testid="toggle-prosent">
                                    I prosent
                                </ToggleGroup.Item>
                                <ToggleGroup.Item value={TimerEllerProsent.TIMER} data-testid="toggle-timer">
                                    I timer
                                </ToggleGroup.Item>
                            </ToggleGroup>

                            {gjelderKortUke && (
                                <Block margin="xl">
                                    <Alert variant="info" inline={false}>
                                        Dette er en kort uke som går fra {getDagerTekst(arbeidsuker[0].periode)}. Du
                                        skal kun skal oppgi arbeidstiden for disse dagene.
                                    </Alert>
                                </Block>
                            )}

                            <FormBlock paddingBottom="l">
                                {timerEllerProsent === TimerEllerProsent.PROSENT && (
                                    <NumberInput
                                        className="arbeidstidUkeInput"
                                        name={EndreArbeidstidFormField.prosentAvNormalt}
                                        label={intlHelper(intl, 'endreArbeidstid.prosentAvNormalt.spm', intlValues)}
                                        data-testid="prosent-verdi"
                                        width="xs"
                                        description={getNormalarbeidstidDescription(intl, arbeidsuker)}
                                        maxLength={4}
                                        validate={(value) => {
                                            return getNumberValidator({
                                                required: true,
                                                min: 0,
                                                max: 100,
                                            })(value);
                                        }}
                                    />
                                )}
                                {timerEllerProsent === TimerEllerProsent.TIMER && (
                                    <>
                                        <NumberInput
                                            className="arbeidstidUkeInput"
                                            name={EndreArbeidstidFormField.antallTimer}
                                            label={intlHelper(
                                                intl,
                                                arbeidsuker.length === 1
                                                    ? `endreArbeidstid.timerAvNormalt.spm`
                                                    : `endreArbeidstid.timerAvNormalt.flereUker.spm`,
                                                intlValues
                                            )}
                                            data-testid="timer-verdi"
                                            width="xs"
                                            description={getNormalarbeidstidDescription(intl, arbeidsuker)}
                                            maxLength={4}
                                            validate={(value) => {
                                                return getNumberValidator({
                                                    required: true,
                                                    min: 0,
                                                    max: 24 * 7,
                                                })(value);
                                            }}
                                        />
                                    </>
                                )}
                            </FormBlock>
                        </Form>
                    </div>
                );
            }}
        />
    );
};

export default EndreArbeidstidForm;

const getUkerOgÅrBeskrivelse = (arbeidsuker: Arbeidsuke[]) => {
    if (arbeidsuker.length === 1) {
        return (
            <BodyShort className="capsFirstChar">{getArbeidstidSpørsmålDescription(arbeidsuker[0], true)}</BodyShort>
        );
    }
    const ukerPerÅr = getArbeidsukerPerÅr(arbeidsuker);
    const getUker = (uker: Arbeidsuke[]) => {
        if (!uker) {
            // eslint-disable-next-line no-console
            return 'Ingen uker valgt';
        }
        return uker ? uker.map((uke) => dayjs(uke.periode.from).isoWeek()).join(', ') : [];
    };

    const årKeys = Object.keys(ukerPerÅr);
    return (
        <>
            <Block margin="m">
                <ExpandableInfo title={`Vis hvilke ${arbeidsuker.length} uker som er valgt`}>
                    {årKeys.map((år) => {
                        return <div key={år}>{`${år}: Uke ${getUker(ukerPerÅr[år])}`}</div>;
                    })}
                </ExpandableInfo>
            </Block>
        </>
    );
};

const getNormalarbeidstidDescription = (intl: IntlShape, arbeidsuker: Arbeidsuke[]) => {
    if (arbeidsuker.length === 1) {
        const uke = arbeidsuker[0];
        const gjelderKortUke = erHelArbeidsuke(uke.periode) === false;
        const periodeTekst = gjelderKortUke ? ` ${getDagerTekst(uke.periode)}` : ' denne uken';
        return `Oppgitt normal arbeidstid for ${periodeTekst} er ${getDurationString(intl, {
            duration: uke.normalt.uke,
        })}`;
    }
    if (arbeidsukerHarLikNormaltidPerDag(arbeidsuker)) {
        const uke = arbeidsuker[0];
        return `Oppgitt normal arbeidstid for disse ukene er ${getDurationString(intl, {
            duration: uke.normalt.uke,
        })} per uke`;
    }
    return 'Merk: normal arbeidstid er ikke lik for alle disse ukene.';
};
