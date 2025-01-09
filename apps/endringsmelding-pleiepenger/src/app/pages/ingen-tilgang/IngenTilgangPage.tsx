import { BodyLong, Heading } from '@navikt/ds-react';
import { IngenTilgangMeta } from '@hooks';
import { useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { getMaybeEnv } from '@navikt/sif-common-env';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { IngenTilgangÅrsak, Søker } from '@types';
import DevFooter from '../../dev/DevFooter';
import { AppText, useAppIntl } from '../../i18n';
import { SkrivTilOssLink } from '../../lenker';
import { SøknadContextProvider } from '../../søknad/context/SøknadContext';
import { ANTALL_MÅNEDER_TILLATT_FOR_ENDRING } from '../../utils/endringsperiode';

export interface IngenTilgangPageProps {
    søker: Søker;
    årsak: IngenTilgangÅrsak[];
    ingenTilgangMeta?: IngenTilgangMeta;
}

const getÅrsakMelding = (årsak: IngenTilgangÅrsak) => {
    const skrivTilOssGenerell = (
        <AppText
            id="ingenTilgangPage.skrivTilOssGenerell"
            values={{
                SkrivTilOssLink: <SkrivTilOssLink key="lenke" />,
            }}
        />
    );
    switch (årsak) {
        case IngenTilgangÅrsak.harUgyldigK9FormatSak:
            return (
                <BodyLong as="div" data-testid="ugyldigK9FormatSak">
                    <p>
                        <AppText id="ingenTilgangPage.harUgyldigK9FormatSak.1" />
                    </p>
                    <p>{skrivTilOssGenerell}</p>
                </BodyLong>
            );

        case IngenTilgangÅrsak.harIngenPerioder:
        case IngenTilgangÅrsak.harIngenSak:
            return (
                <BodyLong as="div" data-testid="ingenSak">
                    <p>
                        <AppText id="ingenTilgangPage.harIngenSak.1" />
                    </p>
                    <p>
                        <AppText
                            id="ingenTilgangPage.harIngenSak.2"
                            values={{ SkrivTilOssLink: <SkrivTilOssLink key="lenke" /> }}
                        />
                    </p>
                    <p>
                        <AppText id="ingenTilgangPage.harIngenSak.3" />
                    </p>
                </BodyLong>
            );
        case IngenTilgangÅrsak.harArbeidsgiverUtenArbeidsaktivitet:
            return (
                <BodyLong as="div" data-testid="ukjentArbeidsforhold">
                    <p>
                        <AppText id="ingenTilgangPage.harArbeidsgiverUtenArbeidsaktivitet.1" />
                    </p>
                    <p>
                        <AppText
                            id="ingenTilgangPage.harArbeidsgiverUtenArbeidsaktivitet.2"
                            values={{ SkrivTilOssLink: <SkrivTilOssLink key="lenke" /> }}
                        />
                    </p>
                </BodyLong>
            );
        case IngenTilgangÅrsak.harArbeidstidSomSelvstendigNæringsdrivende:
            return (
                <BodyLong as="div" data-testid="erSN">
                    <p>
                        <AppText id="ingenTilgangPage.harArbeidstidSomSelvstendigNæringsdrivende.1" />
                    </p>
                    <p>{skrivTilOssGenerell}</p>
                </BodyLong>
            );
        case IngenTilgangÅrsak.harMerEnnEnSak:
            return (
                <BodyLong as="div" data-testid="flereSaker">
                    <p>
                        <AppText id="ingenTilgangPage.harMerEnnEnSak.1" />
                    </p>
                    <p>{skrivTilOssGenerell}</p>
                </BodyLong>
            );
        case IngenTilgangÅrsak.søknadsperioderUtenforTillattEndringsperiode:
            return (
                <BodyLong as="div" data-testid="søknadsperiodeAvsluttetFørTillattEndringsperiode">
                    <p>
                        <AppText
                            id="ingenTilgangPage.utenforEndringsperiode.1"
                            values={{
                                ANTALL_MÅNEDER_TILLATT_FOR_ENDRING,
                                SkrivTilOssLink: <SkrivTilOssLink key="lenke" />,
                            }}
                        />
                    </p>
                    <p>
                        <AppText
                            id="ingenTilgangPage.utenforEndringsperiode.2"
                            values={{ SkrivTilOssLink: <SkrivTilOssLink key="lenke" /> }}
                        />
                    </p>
                </BodyLong>
            );
    }
};

const IngenTilgangPage = ({ årsak = [], søker, ingenTilgangMeta }: IngenTilgangPageProps) => {
    const { logInfo } = useAmplitudeInstance();
    const { text } = useAppIntl();

    useEffectOnce(() => {
        logInfo({ brukerIkkeTilgang: årsak, ...ingenTilgangMeta });
    });

    return (
        <SøknadContextProvider initialData={{} as any}>
            <Page title={text('ingenTilgangPage.pageTitle')}>
                <SifGuidePanel poster={true}>
                    <Heading level="1" size="large" spacing={true} data-testid="ingen-tilgang-heading">
                        <AppText id="ingenTilgangPage.tittel" values={{ navn: søker.fornavn }} />
                    </Heading>
                    {getÅrsakMelding(årsak[0])}
                </SifGuidePanel>
                {getMaybeEnv('MSW') === 'on' && <DevFooter />}
            </Page>
        </SøknadContextProvider>
    );
};

export default IngenTilgangPage;
