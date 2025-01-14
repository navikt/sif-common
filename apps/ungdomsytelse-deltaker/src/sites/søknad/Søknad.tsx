import { Alert } from '@navikt/ds-react';
import { RegistrertBarn, Søker } from '@navikt/sif-common-api';
import { guid } from '@navikt/sif-common-utils';
import useSWR from 'swr';
import {
    MellomlagringData,
    mellomlagringEndpointUrl,
    mellomlagringIsValid,
    mellomlagringService,
} from '../../api/services/mellomlagringService';
import { Deltakelse } from '../../api/types';
import { useDeltakerContext } from '../../context/DeltakerContext';
import { StepFormValuesContextProvider } from './context/StepFormValuesContext';
import { SøknadContextProvider } from './context/SøknadContext';
import { SøknadContextState } from './context/SøknadContextState';
import SøknadRouter from './SøknadRouter';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { SOKNAD_VERSJON } from './utils/søknadUtils';
import { Søknadsdata } from './types/søknadsdata/Søknadsdata';

const getInitialSøknadsdata = (
    søker: Søker,
    registrerteBarn: RegistrertBarn[],
    deltakelse: Deltakelse,
    mellomlagring?: MellomlagringData,
): SøknadContextState => {
    const søknadsdata: Søknadsdata =
        mellomlagring && mellomlagringIsValid(mellomlagring, søker, deltakelse)
            ? mellomlagring.søknadsdata
            : { id: guid(), deltakelse };
    return {
        søker,
        registrerteBarn,
        versjon: SOKNAD_VERSJON,
        søknadsdata,
    };
};

const Søknad = () => {
    const {
        data: { barn, deltakelserIkkeSøktFor, søker },
    } = useDeltakerContext();

    const {
        data: mellomlagring,
        error,
        isLoading,
    } = useSWR<MellomlagringData>(mellomlagringEndpointUrl, mellomlagringService.fetcher);

    if (isLoading) {
        return (
            <Page title="Henter informasjon">
                <center>
                    <LoadingSpinner size="3xlarge" />
                </center>
            </Page>
        );
    }

    if (error) {
        return (
            <Page title="Det oppstod en feil">
                <Alert variant="error">Feil: {JSON.stringify(error)}</Alert>
            </Page>
        );
    }

    return (
        <SøknadContextProvider
            initialData={getInitialSøknadsdata(søker, barn, deltakelserIkkeSøktFor[0], mellomlagring)}>
            <StepFormValuesContextProvider>
                <SøknadRouter />
            </StepFormValuesContextProvider>
        </SøknadContextProvider>
    );
};

export default Søknad;
