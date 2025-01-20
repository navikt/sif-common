import { DateRange, dateRangeUtils, getDateRangeFromDateRanges } from '@navikt/sif-common-utils';
import { ArbeidsgiverForEndring, K9Sak, K9SakArbeidstaker } from '@types';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrAfter);

export const getSamletDateRangeForK9Saker = (saker: K9Sak[]): DateRange | undefined => {
    const sakerDateRanges = saker
        .filter((sak) => sak.ytelse.søknadsperioder.length > 0)
        .map((sak) => {
            return getDateRangeFromDateRanges(sak.ytelse.søknadsperioder);
        });
    return sakerDateRanges.length === 0 ? undefined : getDateRangeFromDateRanges(sakerDateRanges);
};

export const finnesArbeidsgiverIK9Sak = (
    arbeidsgiver: ArbeidsgiverForEndring,
    arbeidsgivereISak: K9SakArbeidstaker[],
): boolean => {
    return arbeidsgivereISak.some(
        ({ organisasjonsnummer }) => organisasjonsnummer === arbeidsgiver.organisasjonsnummer,
    );
};

export const getSisteSøknadsperiodeIK9Sak = (sak: K9Sak): DateRange => {
    const perioder = sak.ytelse.søknadsperioder.sort(dateRangeUtils.sortDateRangeByToDate);
    return perioder[perioder.length - 1];
};

export const isK9SakErInnenforGyldigEndringsperiode = (sak: K9Sak, endringsperiode: DateRange): boolean => {
    return sak.ytelse.søknadsperioder.length === 0
        ? false
        : dayjs(getSisteSøknadsperiodeIK9Sak(sak).to).isSameOrAfter(endringsperiode.from, 'day');
};
