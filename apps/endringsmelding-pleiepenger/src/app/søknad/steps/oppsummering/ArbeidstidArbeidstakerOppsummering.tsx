import { Heading } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { ArbeiderIPeriodenSvar, ArbeidsgiverForEndring, ArbeidstakerApiData } from '@types';
import { AppText } from '../../../i18n';
import ArbeidstidUker from '../../../modules/arbeidstid-uker/ArbeidstidUker';
import { ArbeiderIPeriodenSvarIntlKey } from '../arbeidstid/arbeidsaktivitet-form-part/components/ArbeiderIPeriodenSpørsmål';
import { oppsummeringStepUtils } from './oppsummeringStepUtils';

type Props = {
    arbeidstaker: ArbeidstakerApiData;
    arbeidsgivere: ArbeidsgiverForEndring[];
    arbeidstidKolonneTittel?: string;
};

const ArbeidstidArbeidstakerOppsummering = ({ arbeidsgivere, arbeidstaker, arbeidstidKolonneTittel }: Props) => {
    const { organisasjonsnummer, arbeidstidInfo } = arbeidstaker;
    const arbeidsgiver = arbeidsgivere.find((a) => a.organisasjonsnummer === organisasjonsnummer);

    if (!arbeidsgiver) {
        return null;
    }

    return (
        <Block margin="xl" padBottom="l" data-testid={`oppsummering-${organisasjonsnummer}`}>
            <Heading level="3" size="small">
                {arbeidsgiver.navn}
            </Heading>
            {arbeidstaker._erUkjentArbeidsforhold && arbeidstaker._arbeiderIPerioden && (
                <>
                    <Heading level="3" size="xsmall">
                        <AppText id="arbeidstidStep.arbeiderIPeriodenSpm.legend" values={{ navn: arbeidsgiver.navn }} />
                    </Heading>
                    <AppText id={ArbeiderIPeriodenSvarIntlKey[arbeidstaker._arbeiderIPerioden]} />
                </>
            )}
            {(arbeidstaker._erUkjentArbeidsforhold === false ||
                (arbeidstaker._erUkjentArbeidsforhold === true &&
                    arbeidstaker._arbeiderIPerioden === ArbeiderIPeriodenSvar.redusert)) && (
                <Block margin={arbeidstaker._erUkjentArbeidsforhold === true ? 'l' : 'none'}>
                    <ArbeidstidUker
                        listItems={oppsummeringStepUtils.getArbeidstidUkerItems(arbeidstidInfo.perioder)}
                        arbeidstidKolonneTittel={arbeidstidKolonneTittel}
                        arbeidsgivernavn={arbeidstaker.organisasjonsnavn}
                        visEndringSomOpprinnelig={arbeidstaker._erUkjentArbeidsforhold}
                    />
                </Block>
            )}
        </Block>
    );
};

export default ArbeidstidArbeidstakerOppsummering;
