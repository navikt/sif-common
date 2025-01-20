import { Heading } from '@navikt/ds-react';
import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { ArbeidsgiverForEndring, ArbeidstidApiData } from '@types';
import ArbeidstidUker from '../../../modules/arbeidstid-uker/ArbeidstidUker';
import ArbeidstidArbeidstakerOppsummering from './ArbeidstidArbeidstakerOppsummering';
import { oppsummeringStepUtils } from './oppsummeringStepUtils';
import { AppText, useAppIntl } from '../../../i18n';

interface Props {
    arbeidstid: ArbeidstidApiData;
    arbeidsgivere: ArbeidsgiverForEndring[];
}

const ArbeidstidOppsummering: React.FunctionComponent<Props> = ({ arbeidstid, arbeidsgivere }) => {
    const { text } = useAppIntl();
    const { arbeidstakerList, frilanserArbeidstidInfo, selvstendigNæringsdrivendeArbeidstidInfo } = arbeidstid;
    const arbeidstidKolonneTittel = text('oppsummeringStep.arbeidstid.kolonne.endretArbeidstid');

    const eksisterendeArbeidstakere = arbeidstakerList.filter((a) => a._erUkjentArbeidsforhold === false);
    const ukjenteArbeidsforhold = arbeidstakerList.filter((a) => a._erUkjentArbeidsforhold === true);
    return (
        <>
            {ukjenteArbeidsforhold &&
                Object.keys(ukjenteArbeidsforhold).map((key) => (
                    <ArbeidstidArbeidstakerOppsummering
                        key={key}
                        arbeidstaker={ukjenteArbeidsforhold[key]}
                        arbeidsgivere={arbeidsgivere}
                        arbeidstidKolonneTittel={text('oppsummeringStep.arbeidstid.kolonne.iPerioden')}
                    />
                ))}

            {eksisterendeArbeidstakere &&
                Object.keys(eksisterendeArbeidstakere).map((key) => (
                    <ArbeidstidArbeidstakerOppsummering
                        key={key}
                        arbeidstaker={eksisterendeArbeidstakere[key]}
                        arbeidsgivere={arbeidsgivere}
                    />
                ))}

            {frilanserArbeidstidInfo && (
                <Block margin="xl" padBottom="l">
                    <Heading level="3" size="small">
                        <AppText id="oppsummeringStep.arbeidstid.frilanser.tittel" />
                    </Heading>
                    <>
                        <ArbeidstidUker
                            arbeidsgivernavn={'Frilanser'}
                            listItems={oppsummeringStepUtils.getArbeidstidUkerItems(frilanserArbeidstidInfo.perioder)}
                            arbeidstidKolonneTittel={arbeidstidKolonneTittel}
                        />
                    </>
                </Block>
            )}
            {selvstendigNæringsdrivendeArbeidstidInfo && (
                <Block margin="xl" padBottom="l">
                    <Heading level="3" size="small">
                        <AppText id="oppsummeringStep.arbeidstid.sn.tittel" />
                    </Heading>
                    <>
                        <ArbeidstidUker
                            listItems={oppsummeringStepUtils.getArbeidstidUkerItems(
                                selvstendigNæringsdrivendeArbeidstidInfo.perioder,
                            )}
                            arbeidsgivernavn="Selvstendig næringsdrivende"
                            arbeidstidKolonneTittel={arbeidstidKolonneTittel}
                        />
                    </>
                </Block>
            )}
        </>
    );
};

export default ArbeidstidOppsummering;
