import { ExpansionCard, Panel } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { ArbeidsaktivitetType, ArbeidsgiverForEndring } from '@types';
import ArbeidsaktivitetBlockHeader from './ArbeidsaktivitetBlockHeader';

interface Props {
    navn: string;
    type: ArbeidsaktivitetType;
    arbeidsgiver?: ArbeidsgiverForEndring;
    endret?: { tekst: string };
    erUkjent?: boolean;
    renderAsExpansionCard?: boolean;
    expansionCardDefaultOpen?: boolean;
    children: React.ReactNode;
}

const ArbeidsaktivitetBlock: React.FunctionComponent<Props> = ({
    navn,
    type,
    arbeidsgiver,
    renderAsExpansionCard,
    expansionCardDefaultOpen = true,
    endret,
    erUkjent,
    children,
}) => {
    const renderHeader = () => {
        return (
            <ArbeidsaktivitetBlockHeader
                type={type}
                navn={navn}
                arbeidsgiver={arbeidsgiver}
                endret={endret}
                erUkjentAktivitet={erUkjent}
            />
        );
    };
    return renderAsExpansionCard ? (
        <ExpansionCard aria-label={navn} defaultOpen={expansionCardDefaultOpen}>
            <ExpansionCard.Header>{renderHeader()}</ExpansionCard.Header>
            <ExpansionCard.Content>{children}</ExpansionCard.Content>
        </ExpansionCard>
    ) : (
        <Panel border={true}>
            {renderHeader()}
            <Block margin="xl">{children}</Block>
        </Panel>
    );
};

export default ArbeidsaktivitetBlock;
