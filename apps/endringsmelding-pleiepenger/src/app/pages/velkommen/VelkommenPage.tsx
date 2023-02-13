import { Heading, Ingress } from '@navikt/ds-react';
import React from 'react';
import InfoList from '@navikt/sif-common-core-ds/lib/components/info-list/InfoList';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { formatName } from '@navikt/sif-common-core-ds/lib/utils/personUtils';
import SamtykkeForm from '@navikt/sif-common-soknad-ds/lib/samtykke-form/SamtykkeForm';
import { getSøknadStepRoute } from '../../søknad/config/SøknadRoutes';
import { getSøknadSteps } from '../../søknad/config/søknadStepConfig';
import actionsCreator from '../../søknad/context/action/actionCreator';
import { useSøknadContext } from '../../søknad/context/hooks/useSøknadContext';
import { Sak } from '../../types/Sak';
import { getAktiviteterSomKanEndres, getArbeidAktivitetNavn } from '../../utils/arbeidAktivitetUtils';
import OmSøknaden from './OmSøknaden';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude/lib';
// import { getLenker } from '../../lenker';

const VelkommenPage = () => {
    const {
        state: { søker, sak },
        dispatch,
    } = useSøknadContext();

    const aktiviteterSomKanEndres = sak ? getAktiviteterSomKanEndres(sak.arbeidAktiviteter) : [];

    useLogSidevisning(SIFCommonPageKey.velkommen);

    const startSøknad = (sak: Sak) => {
        const steps = getSøknadSteps(sak);
        dispatch(
            actionsCreator.startSøknad(sak, aktiviteterSomKanEndres.length === 1 ? aktiviteterSomKanEndres : undefined)
        );
        dispatch(actionsCreator.setSøknadRoute(getSøknadStepRoute(steps[0])));
    };

    if (!sak) {
        return (
            <Page title="Velkommen">
                <SifGuidePanel>
                    <Heading level="1" size="large">
                        Velkommen {søker.fornavn}
                    </Heading>
                    <p>Vi kan ikke finne en aktiv sak på deg</p>
                </SifGuidePanel>
            </Page>
        );
    }

    const { fornavn, mellomnavn, etternavn } = sak.barn;
    const barnetsNavn = formatName(fornavn, etternavn, mellomnavn);

    return (
        <Page title="Velkommen">
            <SifGuidePanel poster={true}>
                <Heading level="1" size="large" data-testid="velkommen-header" spacing={true}>
                    Hei {søker.fornavn}
                </Heading>
                <Ingress as="div">
                    <p>
                        Her kan du kan melde inn hvor mye du jobber i perioden med pleiepenger for{' '}
                        <strong>{barnetsNavn}</strong>.
                    </p>
                    <p>Arbeidsforhold du kan melde endring på:</p>
                    <InfoList>
                        {aktiviteterSomKanEndres.map((aktivitet, index) => {
                            return (
                                <li key={index}>
                                    <strong>{getArbeidAktivitetNavn(aktivitet)}</strong>
                                </li>
                            );
                        })}
                    </InfoList>
                    {/* <p>
                        Dersom det mangler et arbeidsforhold, kan du ta{' '}
                        <Link href={getLenker().kontaktOss}>kontakt med oss</Link>.
                    </p> */}
                </Ingress>
                <OmSøknaden />
            </SifGuidePanel>

            <SamtykkeForm onValidSubmit={() => startSøknad(sak)} submitButtonLabel="Start" />
        </Page>
    );
};

export default VelkommenPage;
