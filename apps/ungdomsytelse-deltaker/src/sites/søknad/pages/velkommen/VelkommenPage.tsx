import { useDeltakerContext } from '@context/DeltakerContext';
import { UngdomsytelseDeltakerApp } from '@navikt/sif-app-register';
import { useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import { SoknadVelkommenPage } from '@navikt/sif-common-soknad-ds/src';
import OmSøknaden from '../../components/OmSøknaden';
import VelkommenGuideContent from '../../components/VelkommenGuideContent';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { SøknadRoutes } from '../../types/SøknadRoutes';

const VelkommenPage = () => {
    const {
        data: { søker },
    } = useDeltakerContext();

    const { dispatch } = useSøknadContext();

    const { logSoknadStartet } = useAmplitudeInstance();

    const startSøknad = async () => {
        await logSoknadStartet(UngdomsytelseDeltakerApp.key);
        dispatch(actionsCreator.startSøknad());
        dispatch(actionsCreator.setSøknadRoute(SøknadRoutes.BARN));
    };

    return (
        <SoknadVelkommenPage
            onStartSøknad={startSøknad}
            guide={{
                navn: søker.fornavn,
                content: <VelkommenGuideContent />,
            }}
            title="Søknad om deltakelse i ungdoms&shy;programmet">
            <OmSøknaden />
        </SoknadVelkommenPage>
    );
};

export default VelkommenPage;
