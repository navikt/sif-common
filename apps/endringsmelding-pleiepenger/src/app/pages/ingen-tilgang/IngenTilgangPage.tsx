import { BodyLong, Heading } from '@navikt/ds-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude/lib';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { getLenker } from '../../lenker';
import { IngenTilgangÅrsak } from '../../types/IngenTilgangÅrsak';
import { Søker } from '../../types/Søker';

interface Props {
    søker: Søker;
    årsak: IngenTilgangÅrsak;
}

const getÅrsakMelding = (årsak: IngenTilgangÅrsak) => {
    switch (årsak) {
        case IngenTilgangÅrsak.harIngenPerioder:
        case IngenTilgangÅrsak.harIngenSak:
            return (
                <BodyLong as="div">
                    <p>
                        Vi kan ikke finne noen sak om pleiepenger på deg. Dersom du akkurat har sendt inn en søknad, kan
                        det være du må vente litt før saken kommer opp her.
                    </p>
                    <p>
                        Dersom dette ikke stemmer, send inn en melding via{' '}
                        <Link to={getLenker().skrivTilOss}>Skriv til oss</Link>.
                    </p>
                </BodyLong>
            );
        case IngenTilgangÅrsak.harArbeidsgiverSomIkkeErISak:
            return (
                <BodyLong as="div">
                    <p>
                        Vi har funnet arbeidsforhold på deg som ikke er registrert på din pleiepengesak. Du må da sende
                        inn ny søknad.
                    </p>
                    <p>
                        Dersom dette ikke stemmer, send inn en melding via{' '}
                        <Link to={getLenker().skrivTilOss}>Skriv til oss</Link>.
                    </p>
                </BodyLong>
            );
        case IngenTilgangÅrsak.harArbeidstidSomSelvstendigNæringsdrivende:
            return (
                <BodyLong as="div">
                    <p>
                        Saken din har registrert arbeidstid på deg som selvstendig næringsdrivende. Enn så lenge støtter
                        ikke denne løsningen endring av arbeidstid for selvstendig næringsdrivende.
                    </p>
                    <p>
                        For å melde inn endringer kan du sende inn ny søknad, eller send inn en melding via Skriv til
                        oss.
                    </p>
                </BodyLong>
            );
        case IngenTilgangÅrsak.harMerEnnEnSak:
            return (
                <BodyLong as="div">
                    <p>
                        Du kan desverre ikke bruke denne løsningen for å sende inn melding om endring enda. Løsningen
                        støtter kun dem som har én sak, og vi ser at du har flere saker.
                    </p>
                    <p>
                        Vi har valgt å lage løsningen for dem som har kun én sak til å begynne med, fordi de fleste har
                        kun én sak, og vi ønsker å tilby løsningen så fort som mulig, og heller utvide etter hvert. Det
                        å støtte dem med flere saker, står høyt på listen over hva vi ønsker å utvide med.
                    </p>
                    <p>
                        For å melde inn endring kan du sende inn en ny søknad med endringen, eller send inn en melding
                        via <Link to={getLenker().skrivTilOss}>Skriv til oss</Link>.
                    </p>
                </BodyLong>
            );
    }
};

const IngenTilgangPage = ({ årsak, søker }: Props) => {
    useLogSidevisning(SIFCommonPageKey.ikkeTilgang);
    return (
        <Page title="Ingen tilgang">
            <SifGuidePanel poster={true}>
                <Heading level="1" size="large" spacing={true} data-testid="ingen-tilgang-heading">
                    Hei {søker.fornavn}
                </Heading>
                {getÅrsakMelding(årsak)}
            </SifGuidePanel>
        </Page>
    );
};

export default IngenTilgangPage;
