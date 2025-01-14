import { Heading } from '@navikt/ds-react';
import { DeltakerContextProvider } from '@context/DeltakerContext';
import { useInitialData } from '@hooks/useInitialData';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { ErrorPage } from '@navikt/sif-common-soknad-ds/src';
import InnsynRouter from './innsyn/InnsynRouter';
import Søknad from './søknad/Søknad';

const InitialDataLoader = () => {
    const { initialData, isLoading, error } = useInitialData();

    if (error) {
        return (
            <ErrorPage
                pageTitle="Det oppstod en feil"
                bannerTitle="sdf"
                contentRenderer={() => {
                    return (
                        <SifGuidePanel mood="uncertain">
                            <Heading level="2" size="medium">
                                Det oppstod en feil
                            </Heading>
                            <pre style={{ fontSize: '.8rem', lineHeight: '1rem' }}>
                                {JSON.stringify(error, undefined, 2)}
                            </pre>
                        </SifGuidePanel>
                    );
                }}></ErrorPage>
        );
    }

    if (isLoading || !initialData) {
        return (
            <Page title="Henter informasjon">
                <center>
                    <LoadingSpinner size="3xlarge" />
                </center>
            </Page>
        );
    }

    return (
        <DeltakerContextProvider initialData={initialData}>
            {initialData.deltakelserIkkeSøktFor.length === 1 ? <Søknad /> : <InnsynRouter />}
        </DeltakerContextProvider>
    );
};

export default InitialDataLoader;
