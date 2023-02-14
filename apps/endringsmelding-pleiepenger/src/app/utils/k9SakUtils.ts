import { DateRange, getDateRangeFromDateRanges } from '@navikt/sif-common-utils';
import { Arbeidsgiver } from '../types/Arbeidsgiver';
import { K9Sak } from '../types/K9Sak';

export const getArbeidsgivereIK9Sak = (arbeidsgivere: Arbeidsgiver[], sak: K9Sak): Arbeidsgiver[] => {
    const { arbeidstakerList } = sak.ytelse.arbeidstid;
    if (arbeidstakerList === undefined || arbeidstakerList.length === 0) {
        return [];
    }
    return arbeidsgivere.filter((arbeidsgiver) => {
        return arbeidstakerList.some(
            ({ organisasjonsnummer }) => organisasjonsnummer === arbeidsgiver.organisasjonsnummer
        );
    });
};

export const getSamletDateRangeForK9Saker = (saker: K9Sak[]): DateRange | undefined => {
    const sakerDateRanges = saker
        .filter((sak) => sak.ytelse.søknadsperioder.length > 0)
        .map((sak) => {
            return getDateRangeFromDateRanges(sak.ytelse.søknadsperioder);
        });
    return sakerDateRanges.length === 0 ? undefined : getDateRangeFromDateRanges(sakerDateRanges);
};
