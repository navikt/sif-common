import { BodyLong, Heading, Panel } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import InfoList from '@navikt/sif-common-core-ds/lib/components/info-list/InfoList';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import Arbeidsaktivitet from '../../../components/arbeidsaktivitet/Arbeidsaktivitet';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { ArbeidstidEndringMap } from '../../../types/ArbeidstidEndring';
import { ArbeidAktivitet, ArbeidAktiviteter, ArbeidAktivitetType } from '../../../types/Sak';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import { StepId } from '../../config/StepId';
import { getSøknadStepConfig } from '../../config/søknadStepConfig';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getArbeidstidStepInitialValues, getArbeidstidSøknadsdataFromFormValues } from './arbeidstidStepUtils';

export interface ArbeidstidFormValues {
    [ArbeidstidFormFields.arbeidAktivitetEndring]: { [aktivitetId: string]: ArbeidstidEndringMap };
}

enum ArbeidstidFormFields {
    arbeidAktivitetEndring = 'arbeidAktivitetEndring',
}

const { FormikWrapper, Form } = getTypedFormComponents<ArbeidstidFormFields, ArbeidstidFormValues, ValidationError>();

const ArbeidstidStep = () => {
    const stepId = StepId.ARBEIDSTID;
    const intl = useIntl();

    const {
        dispatch,
        state: { søknadsdata, sak },
    } = useSøknadContext();
    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const stepConfig = getSøknadStepConfig(sak);
    const step = stepConfig[stepId];

    const { goBack } = useStepNavigation(step);

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
        }
    );

    const valgteAktiviteter = søknadsdata.aktivitet?.aktiviteterSomSkalEndres || [];
    const arbeidAktiviteter: ArbeidAktivitet[] = getAktiviteterSomSkalEndres(sak.arbeidAktiviteter, valgteAktiviteter);

    const onArbeidstidAktivitetChange = (
        arbeidAktivitetId: string,
        arbeidstidEndringMap: ArbeidstidEndringMap,
        values: Partial<ArbeidstidFormValues>,
        setValues: (values: ArbeidstidFormValues) => void
    ) => {
        const newValues: ArbeidstidFormValues = {
            arbeidAktivitetEndring: {
                ...values.arbeidAktivitetEndring,
                [arbeidAktivitetId]: arbeidstidEndringMap,
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
        <SøknadStep stepId={stepId} sak={sak}>
            <SifGuidePanel>
                <>
                    <Heading level="2" size="small">
                        Slik endrer du hvor mye du jobber i perioden med pleiepenger
                    </Heading>
                    <BodyLong as="div">
                        <InfoList>
                            <li>Arbeidstiden endrer du per uke, enten i timer eller prosent av normalarbeidstiden.</li>
                            <li>Du kan endre én og én uke, eller du kan velge flere uker og endre disse samtidig.</li>
                            <li>
                                Du kan melde ifra om endringer i opptil 3 måneder tilbake i tid, og 12 måneder frem i
                                tid.
                            </li>
                        </InfoList>
                        <Block margin="l">
                            <ExpandableInfo title="Hvordan endrer jeg enkeltdager i én uke?">
                                Når du vil endre enkeltdager i en uke, skal du fortsatt oppgi hvor mye du jobber hele
                                den uken. Du kan oppgi antall timer, eller en prosentandel av hvor mye du jobbet normalt
                                før du begynte på pleiepenger. Du velger det som passer best for deg.
                                <Block margin="l">
                                    <Heading level="3" size="small" spacing={true}>
                                        Noen eksempler
                                    </Heading>
                                </Block>
                                Du jobbet normalt 40 timer i uken (8 timer hver dag) og har oppgitt at du ikke jobber
                                mens du har pleiepenger.
                                <p>
                                    <strong>Eksempel 1:</strong> Nå får du allikevel jobbet 2 dager i én uke, og skal
                                    melde ifra om det.
                                </p>
                                <p>
                                    Da oppgir du 16 timer for den uken, eller 40 prosent, som er det samme som 2 dager.
                                </p>
                                <p>
                                    <strong>Eksempel 2: </strong>Du har oppgitt at du jobber 50 prosent i perioden med
                                    pleiepenger, men i én av uken får du bare jobbet 1 dag.
                                </p>
                                <p>Da oppgir du 8 timer for den uken, eller 20 prosent, som er det samme som 1 dag.</p>
                            </ExpandableInfo>
                        </Block>

                        <Block margin="m">
                            <ExpandableInfo title="Hva er forskjellen på normal og faktisk arbeidstid?">
                                <p>
                                    Med <strong>«normal arbeidstid»</strong> mener vi hvor mye du jobbet før du startet
                                    med pleiepenger, og som du har oppgitt som normal arbeidstid i søknaden.
                                </p>
                                <p>
                                    Med <strong>«faktisk arbeidstid»</strong> mener vi hvor mye du får jobbet i perioden
                                    når du har pleiepenger.
                                </p>
                            </ExpandableInfo>
                        </Block>
                    </BodyLong>
                </>
            </SifGuidePanel>
            <FormikWrapper
                initialValues={getArbeidstidStepInitialValues(søknadsdata, stepFormValues?.arbeidstid)}
                onSubmit={handleSubmit}
                renderForm={({ setValues, values }) => {
                    const endringer = values.arbeidAktivitetEndring || {};
                    return (
                        <>
                            <PersistStepFormValues stepId={stepId} />
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'arbeidAktivitetForm')}
                                includeValidationSummary={true}
                                submitPending={isSubmitting}
                                runDelayedFormValidation={true}
                                onBack={goBack}>
                                {arbeidAktiviteter.map((arbeidAktivitet) => {
                                    return (
                                        <FormBlock key={arbeidAktivitet.id}>
                                            <Panel border={true}>
                                                <Arbeidsaktivitet
                                                    arbeidAktivitet={arbeidAktivitet}
                                                    endringer={endringer[arbeidAktivitet.id]}
                                                    onArbeidstidAktivitetChange={(arbeidstidEndringer) => {
                                                        onArbeidstidAktivitetChange(
                                                            arbeidAktivitet.id,
                                                            arbeidstidEndringer,
                                                            values,
                                                            setValues
                                                        );
                                                    }}
                                                />
                                            </Panel>
                                        </FormBlock>
                                    );
                                })}
                            </Form>
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default ArbeidstidStep;

const getAktiviteterSomSkalEndres = (
    arbeidAktiviteter: ArbeidAktiviteter,
    valgteAktiviteter: string[] = []
): ArbeidAktivitet[] => {
    const { arbeidstakerArktiviteter: arbeidstaker, frilanser, selvstendigNæringsdrivende } = arbeidAktiviteter;

    const aktiviteter: ArbeidAktivitet[] = arbeidstaker.filter((a) => (valgteAktiviteter || []).includes(a.id));
    if (frilanser !== undefined && valgteAktiviteter.includes(ArbeidAktivitetType.frilanser)) {
        aktiviteter.push({ ...frilanser });
    }

    if (
        selvstendigNæringsdrivende !== undefined &&
        valgteAktiviteter.includes(ArbeidAktivitetType.selvstendigNæringsdrivende)
    ) {
        aktiviteter.push({ ...selvstendigNæringsdrivende });
    }
    return aktiviteter;
};
