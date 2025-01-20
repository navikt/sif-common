import { BodyShort, Box, HelpText, Tooltip, VStack } from '@navikt/ds-react';
import React from 'react';
import { InformationColored } from '@navikt/ds-icons';
import { dateFormatter, DateRange } from '@navikt/sif-common-utils';
import { ArbeidstidUkerItem } from '../types/ArbeidstidUkerItem';

interface Props {
    uke: ArbeidstidUkerItem;
    arbeidsgivernavn: string;
}

const UkeInfoTooltip: React.FunctionComponent<Props> = ({ uke, arbeidsgivernavn }) => {
    const { dagerIkkeAnsatt: arbeidsdagerIkkeAnsatt, erKortUke } = uke;
    if (erKortUke && arbeidsdagerIkkeAnsatt.length === 0) {
        return (
            <Tooltip content={`Kort uke - ${getDagerPeriode(uke.periode, false)}`}>
                <span style={{ fontSize: '1.4rem' }}>
                    <InformationColored aria-label={`Kort uke - ${getDagerPeriode(uke.periode, false)}`} />
                </span>
            </Tooltip>
        );
    }
    if (!erKortUke && arbeidsdagerIkkeAnsatt.length > 0) {
        const dager = arbeidsdagerIkkeAnsatt.map((d) => dateFormatter.day(d));
        const info = (
            <VStack gap="4">
                <Box>
                    Kort uke - du er ikke registrert som ansatt hos {arbeidsgivernavn} alle dagene denne uken. Dager du
                    ikke registrert som ansatt er: <strong>{dager.join(',')}</strong>.
                </Box>
                <Box>Hvis dette ikke stemmer, må du ta kontakt med {arbeidsgivernavn}.</Box>
            </VStack>
        );
        return (
            <HelpText title="Kort uke - du er ikke ansatt alle dagene i uken" className="whitespace-normal">
                <BodyShort style={{ maxWidth: '15rem' }}>{info}</BodyShort>
            </HelpText>
        );
    }
};

const getDagerPeriode = ({ from, to }: DateRange, visDato = true): string => {
    const fra = visDato ? dateFormatter.dayDateMonthYear(from) : dateFormatter.day(from);
    const til = visDato ? dateFormatter.dayDateMonthYear(to) : dateFormatter.day(to);
    if (fra === til) {
        return fra;
    }
    return `${fra} til ${til}`;
};

export default UkeInfoTooltip;
