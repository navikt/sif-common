import { useParams } from 'react-router-dom';
import { DeltakerProvider } from '../../../../context/DeltakerContext';
import DeltakerPageHeader from '../../../../components/DeltakerPageHeader';
import DeltakerPageContent from '../../../../components/DeltakerPageContent';

type DeltakerPageParams = {
    deltakerId: string;
};

const DeltakerPage = () => {
    const { deltakerId } = useParams<DeltakerPageParams>();

    return (
        <DeltakerProvider deltakerId={deltakerId}>
            <DeltakerPageHeader />
            <DeltakerPageContent />
        </DeltakerProvider>
    );
};

export default DeltakerPage;
