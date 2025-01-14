import { Heading, VStack } from '@navikt/ds-react';
import { Deltakelse, KontonummerInfo } from '../../../api/types';
import { Søker } from '@navikt/sif-common-api';
import { List } from '@navikt/ds-react/List';
import { dateFormatter } from '@navikt/sif-common-utils';
import KontonummerStatusTekst from './KontonummerStatusTekst';

interface Props {
    deltakelse: Deltakelse;
    søker: Søker;
    kontonummerInfo?: KontonummerInfo;
}
const DeltakelseInfo = ({ deltakelse, kontonummerInfo }: Props) => {
    const { programPeriode } = deltakelse;
    return (
        <VStack>
            <Heading level="2" size="medium" spacing={true}>
                Om deg og ungdomsprogrammet
            </Heading>
            <List>
                <List.Item title="Deltakerperiode">
                    Fra: {dateFormatter.dateShortMonthYear(programPeriode.from)}
                    {programPeriode.to ? ` til ${dateFormatter.dateShortMonthYear(programPeriode.to)}` : ''}
                </List.Item>
                <List.Item title="Dager brukt">[TODO]</List.Item>
                <List.Item title="Kontonummer">
                    <KontonummerStatusTekst kontonummerInfo={kontonummerInfo} />
                </List.Item>
            </List>
        </VStack>
    );
};

export default DeltakelseInfo;
