import { BodyLong } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { useFormikContext } from 'formik';
import GeneralErrorPage from '../../pages/general-error-page/GeneralErrorPage';
import { StepCommonProps } from '../../types/StepCommonProps';
import { StepID } from '../../types/StepID';
import { SøknadFormValues } from '../../types/SøknadFormValues';
import { ArbeidssituasjonAnsattType } from '../../types/søknadsdata/ArbeidssituasjonAnsattSøknadsdata';
import { søkerNoeFremtid } from '../../utils/søknadsperiodeUtils';
import SøknadFormStep from '../SøknadFormStep';
import { useSøknadsdataContext } from '../SøknadsdataContext';
import ArbeidstidAnsatt from './components/ArbeidstidAnsatt';
import ArbeidstidSelvstendig from './components/ArbeidstidSelvstendig';
import ArbeidstidFrilans from './components/ArbeidstidFrilans';

const ArbeidstidStep = ({ onValidSubmit }: StepCommonProps) => {
    const { values } = useFormikContext<SøknadFormValues>();

    const {
        søknadsdata: { arbeidssituasjon, søknadsperiode },
    } = useSøknadsdataContext();

    if (!arbeidssituasjon || !søknadsperiode) {
        return <GeneralErrorPage />;
    }

    const { frilans } = arbeidssituasjon;

    const søkerFremITid = søkerNoeFremtid(søknadsperiode);

    return (
        <SøknadFormStep stepId={StepID.ARBEIDSTID} onValidFormSubmit={onValidSubmit}>
            <Block padBottom="m">
                <SifGuidePanel>
                    <BodyLong as="div">
                        <p>
                            <FormattedMessage id={'arbeidIPeriode.StepInfo.1'} />
                        </p>
                        <p>
                            <FormattedMessage id={'arbeidIPeriode.StepInfo.2'} />
                        </p>
                    </BodyLong>
                </SifGuidePanel>
            </Block>

            {arbeidssituasjon.arbeidsgivere.length > 0 && (
                <FormBlock>
                    {arbeidssituasjon.arbeidsgivere.map((ansatt) => {
                        if (ansatt.type === ArbeidssituasjonAnsattType.sluttetFørSøknadsperiode) {
                            return null;
                        }
                        const { arbeidsgiver, normalarbeidstid, index } = ansatt;
                        return (
                            <ArbeidstidAnsatt
                                key={index}
                                index={index}
                                søknadsperiode={søknadsperiode}
                                arbeidIPeriode={values.ansatt_arbeidsforhold[index].arbeidIPeriode}
                                arbeidsgiver={arbeidsgiver}
                                normalarbeidstid={normalarbeidstid.timerPerUkeISnitt}
                                søkerFremITid={søkerFremITid}
                            />
                        );
                    })}
                </FormBlock>
            )}

            {frilans &&
                frilans.harInntektSomFrilanser &&
                frilans.misterInntektSomFrilanser &&
                frilans.normalarbeidstid && (
                    <FormBlock>
                        <ArbeidstidFrilans
                            frilanstype={frilans.type}
                            periode={frilans.periodeSomFrilanserISøknadsperiode}
                            arbeidIPeriode={values.frilans.arbeidsforhold?.arbeidIPeriode}
                            normalarbeidstid={frilans.normalarbeidstid.timerPerUkeISnitt}
                            søkerFremITid={søkerFremITid}
                        />
                    </FormBlock>
                )}

            {arbeidssituasjon.selvstendig &&
                arbeidssituasjon.selvstendig.erSN &&
                arbeidssituasjon.selvstendig.periodeSomSelvstendigISøknadsperiode && (
                    <FormBlock>
                        <ArbeidstidSelvstendig
                            periode={arbeidssituasjon.selvstendig.periodeSomSelvstendigISøknadsperiode}
                            arbeidIPeriode={values.selvstendig.arbeidsforhold?.arbeidIPeriode}
                            normalarbeidstid={arbeidssituasjon.selvstendig.normalarbeidstid.timerPerUkeISnitt}
                            søkerFremITid={søkerFremITid}
                        />
                    </FormBlock>
                )}
        </SøknadFormStep>
    );
};

export default ArbeidstidStep;
