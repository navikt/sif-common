import { Alert, BodyShort, Heading, Ingress, ToggleGroup } from '@navikt/ds-react';
import React from 'react';
import { useSøknadContext } from '@hooks';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { getNumberFromNumberInputValue, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { getNumberValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { getDurationString } from '@navikt/sif-common-ui';
import { DateRange } from '@navikt/sif-common-utils';
import { ArbeidstidEndring, Arbeidsuke, LovbestemtFerieSøknadsdata, TimerEllerProsent } from '@types';
import {
    arbeidsukerHarLikNormaltidPerDag,
    erKortArbeidsuke,
    getArbeidsukeUkenummer,
    getDagerTekst,
    getFeriedagerIUke,
    getFeriedagerIUkeTekst,
} from '@utils';
import dayjs from 'dayjs';
import { AppIntlShape, AppText, useAppIntl } from '../../i18n';
import actionsCreator from '../../søknad/context/action/actionCreator';
import UkeTags from '../arbeidstid-uker/components/UkeTags';
import { getArbeidstidSpørsmålDescription, getArbeidsukerPerÅr } from './endreArbeidstidFormUtils';
import { getEndreArbeidstidIntlValues } from './endreArbeidstidIntlValues';
import './endreArbeidstidForm.scss';
import KortUkeEllerIkkeAnsattInformasjon from '../arbeidstid-uker/components/KortUkeEllerIkkeAnsattInfo';

type EndreArbeidstidData = {
    perioder: DateRange[];
    endring: ArbeidstidEndring;
};

export interface EndreArbeidstidFormProps {
    arbeidsuker: Arbeidsuke[];
    lovbestemtFerie?: LovbestemtFerieSøknadsdata;
    endring?: ArbeidstidEndring;
    arbeidsgivernavn: string;
    onSubmit: (data: EndreArbeidstidData) => void;
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

const EndreArbeidstidForm: React.FunctionComponent<EndreArbeidstidFormProps> = ({
    arbeidsuker,
    lovbestemtFerie,
    endring,
    arbeidsgivernavn,
    onCancel,
    onSubmit,
}) => {
    const appIntl = useAppIntl();
    const { text, intl } = appIntl;
    const {
        dispatch,
        state: { inputPreferanser },
    } = useSøknadContext();

    const onFormSubmit = (values: EndreArbeidstidFormValues) => {
        if (values.timerEllerProsent === TimerEllerProsent.PROSENT && values.prosentAvNormalt) {
            const value = getNumberFromNumberInputValue(values.prosentAvNormalt);
            if (value !== undefined) {
                onSubmit({
                    perioder: arbeidsuker.map((a) => a.periode),
                    endring: {
                        type: TimerEllerProsent.PROSENT,
                        prosent: value,
                    },
                });
            }
        }
        if (values.timerEllerProsent === TimerEllerProsent.TIMER) {
            const antallTimer = getNumberFromNumberInputValue(values.antallTimer);
            if (antallTimer !== undefined) {
                const perioder = arbeidsuker.map((uke) => uke.periode);
                onSubmit({
                    perioder,
                    endring: {
                        type: TimerEllerProsent.TIMER,
                        timer: antallTimer,
                    },
                });
            }
        }
    };

    if (arbeidsuker.length === 0) {
        return null;
    }

    const dagerMedFjernetFerie = lovbestemtFerie
        ? getFeriedagerIUke(lovbestemtFerie.feriedagerMeta.datoerFjernet, arbeidsuker[0].periode, true)
        : [];

    const getMaksTimer = () => {
        const antallDager = arbeidsuker.length === 1 ? arbeidsuker[0].antallDagerMedArbeidstid : 7;
        return 24 * antallDager;
    };

    const getInitialValues = (): EndreArbeidstidFormValues => {
        if (endring?.type === TimerEllerProsent.PROSENT) {
            return {
                timerEllerProsent: TimerEllerProsent.PROSENT,
                prosentAvNormalt: `${endring.prosent}`,
            };
        }
        if (endring?.type === TimerEllerProsent.TIMER) {
            return {
                timerEllerProsent: TimerEllerProsent.TIMER,
                antallTimer: `${endring.timer}`,
            };
        }
        return { timerEllerProsent: inputPreferanser.timerEllerProsent };
    };
    return (
        <FormikWrapper
            initialValues={getInitialValues()}
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
                                    ? text('endreArbeidstidForm.heading.endreForEnUke', {
                                          ukenummer: getArbeidsukeUkenummer(arbeidsuker[0], true),
                                      })
                                    : text('endreArbeidstidForm.heading.endreForFlereUker')}
                            </Heading>
                            <Block margin="m">
                                <Ingress as="div">
                                    {getUkerOgÅrBeskrivelse(arbeidsuker, appIntl, lovbestemtFerie)}
                                </Ingress>
                            </Block>
                        </Block>
                        {dagerMedFjernetFerie && dagerMedFjernetFerie.length > 0 && (
                            <Block margin="s" padBottom="l">
                                <Alert variant="warning">
                                    <AppText
                                        id="endreArbeidstidForm.dagerMedFerieFjernet.melding"
                                        values={{ feriedagerTekst: getFeriedagerIUkeTekst(dagerMedFjernetFerie) }}
                                    />
                                </Alert>
                            </Block>
                        )}
                        <Form
                            formErrorHandler={getIntlFormErrorHandler(intl, 'endreArbeidstidForm')}
                            includeValidationSummary={true}
                            submitButtonLabel="Ok"
                            cancelButtonLabel="Avbryt"
                            onCancel={onCancel}
                            showButtonArrows={false}>
                            <Block padBottom="m">
                                <strong>
                                    <AppText id="endreArbeidstidForm.hvordanOppgiArbeid.spm" />
                                </strong>
                            </Block>
                            <ToggleGroup
                                className="endreArbeidstidForm__timerProsentToggler"
                                value={timerEllerProsent}
                                size="small"
                                onChange={(value) => {
                                    dispatch(
                                        actionsCreator.setInputPreferanser({
                                            timerEllerProsent: value as TimerEllerProsent,
                                        }),
                                    );
                                    setValues({ ...values, timerEllerProsent: value as TimerEllerProsent });
                                }}>
                                <ToggleGroup.Item value={TimerEllerProsent.PROSENT} data-testid="toggle-prosent">
                                    <AppText id="endreArbeidstidForm.hvordanOppgiArbeid.iProsent" />
                                </ToggleGroup.Item>
                                <ToggleGroup.Item value={TimerEllerProsent.TIMER} data-testid="toggle-timer">
                                    <AppText id="endreArbeidstidForm.hvordanOppgiArbeid.iTimer" />
                                </ToggleGroup.Item>
                            </ToggleGroup>

                            {arbeidsuker.length === 1 ? (
                                <KortUkeEllerIkkeAnsattInformasjon
                                    arbeidsuke={arbeidsuker[0]}
                                    arbeidsgivernavn={arbeidsgivernavn}
                                />
                            ) : null}

                            <FormBlock paddingBottom="l">
                                {timerEllerProsent === TimerEllerProsent.PROSENT && (
                                    <NumberInput
                                        className="arbeidstidUkeInput"
                                        name={EndreArbeidstidFormField.prosentAvNormalt}
                                        label={text('endreArbeidstidForm.prosentAvNormalt.spm', intlValues)}
                                        data-testid="prosent-verdi"
                                        width="xs"
                                        description={getNormalarbeidstidDescription(appIntl, arbeidsuker)}
                                        maxLength={5}
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
                                            label={text(
                                                arbeidsuker.length === 1
                                                    ? `endreArbeidstidForm.timerAvNormalt.spm`
                                                    : `endreArbeidstidForm.timerAvNormalt.flereUker.spm`,
                                                intlValues,
                                            )}
                                            data-testid="timer-verdi"
                                            width="xs"
                                            description={getNormalarbeidstidDescription(appIntl, arbeidsuker)}
                                            maxLength={5}
                                            validate={(value) => {
                                                const max = getMaksTimer();
                                                const error = getNumberValidator({
                                                    required: true,
                                                    min: 0,
                                                    max,
                                                })(value);
                                                return error ? { key: error, values: { maksTimer: max } } : undefined;
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

const getUkerOgÅrBeskrivelse = (
    arbeidsuker: Arbeidsuke[],
    { text, intl }: AppIntlShape,
    lovbestemtFerie?: LovbestemtFerieSøknadsdata,
) => {
    if (arbeidsuker.length === 1) {
        const dagerMedFerie = lovbestemtFerie
            ? getFeriedagerIUke(lovbestemtFerie.feriedagerMeta.datoerMedFerie, arbeidsuker[0].periode, true)
            : [];
        return (
            <BodyShort as="div" className="capsFirstChar">
                {getArbeidstidSpørsmålDescription(arbeidsuker[0], intl.locale)}
                {dagerMedFerie.length > 0 && (
                    <Block margin="m">
                        <UkeTags
                            visDagNavn={true}
                            dagerMedFerie={dagerMedFerie}
                            arbeidsdagerIkkeAnsatt={arbeidsuker[0].dagerIkkeAnsatt}
                        />
                    </Block>
                )}
            </BodyShort>
        );
    }
    const ukerPerÅr = getArbeidsukerPerÅr(arbeidsuker);
    const getUker = (uker: Arbeidsuke[]) => {
        if (!uker) {
            return text('endreArbeidstidForm.ukerOgÅr.ingenUkerValgt');
        }
        return uker ? uker.map((uke) => dayjs(uke.periode.from).isoWeek()).join(', ') : [];
    };

    const årKeys = Object.keys(ukerPerÅr);
    return (
        <>
            <Block margin="m">
                <ExpandableInfo
                    title={text('endreArbeidstidForm.ukerOgÅr.visValgteUker.tittel', {
                        antallUker: arbeidsuker.length,
                    })}>
                    {årKeys.map((år) => {
                        return (
                            <div key={år}>
                                <AppText
                                    id="endreArbeidstidForm.ukerOgÅr.årOgUke"
                                    values={{ år, uker: getUker(ukerPerÅr[år]) }}
                                />
                            </div>
                        );
                    })}
                </ExpandableInfo>
            </Block>
        </>
    );
};

const getNormalarbeidstidDescription = ({ text, intl }: AppIntlShape, arbeidsuker: Arbeidsuke[]) => {
    if (arbeidsuker.length === 1) {
        const uke = arbeidsuker[0];
        const gjelderKortUke = erKortArbeidsuke(uke.periode);
        const periodeTekst = gjelderKortUke ? ` ${getDagerTekst(uke.periode)}` : ' denne uken';
        return text('endreArbeidstidForm.normalarbeidstid.enUke', {
            periodeTekst,
            varighet: getDurationString(intl, { duration: uke.normalt.uke }),
        });
    }
    if (arbeidsukerHarLikNormaltidPerDag(arbeidsuker)) {
        const uke = arbeidsuker[0];
        return text('endreArbeidstidForm.normalarbeidstid.likHverUke', {
            varighet: getDurationString(intl, {
                duration: uke.normalt.uke,
            }),
        });
    }
    return text('endreArbeidstidForm.normalarbeidstid.ulikMellomUker');
};
