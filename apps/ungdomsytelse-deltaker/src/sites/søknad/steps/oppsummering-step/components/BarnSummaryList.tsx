import { RegistrertBarn } from '@navikt/sif-common-api';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { SummaryList } from '@navikt/sif-common-ui';

interface Props {
    barn: RegistrertBarn[];
}

const BarnSummaryList = ({ barn }: Props) => {
    return (
        <SummaryList
            items={barn}
            useAkselList={true}
            itemRenderer={({ fornavn, mellomnavn, etternavn }: RegistrertBarn) => {
                return formatName(fornavn, etternavn, mellomnavn);
            }}
        />
    );
};

export default BarnSummaryList;
