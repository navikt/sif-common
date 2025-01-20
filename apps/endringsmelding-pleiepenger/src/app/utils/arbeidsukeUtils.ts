import {
    dateFormatter,
    DateRange,
    durationToISODuration,
    getDatesInDateRange,
    ISODate,
} from '@navikt/sif-common-utils';
import { ArbeidstidEnkeltdagMap, Arbeidsuke } from '@types';
import dayjs from 'dayjs';

export const sorterArbeidsuker = (a1: Arbeidsuke, a2: Arbeidsuke): number => {
    return dayjs(a1.periode.from).isBefore(a2.periode.from) ? -1 : 1;
};

export const erKortArbeidsuke = (periode: DateRange): boolean => {
    return getDatesInDateRange(periode, true).length < 5;
};

export const getArbeidsukeUkenummer = (uke: Arbeidsuke, medÅrstall?: boolean): string => {
    const day = dayjs(uke.periode.from);
    const ukenummer = `${day.isoWeek()}`;
    return medÅrstall ? `${ukenummer}, ${day.isoWeekYear()}` : ukenummer;
};

export const getDagerTekst = ({ from, to }: DateRange, medDato?: boolean): string => {
    const fra = medDato ? dateFormatter.dayDateMonthYear(from) : dateFormatter.day(from);
    const til = medDato ? dateFormatter.dayDateMonthYear(to) : dateFormatter.day(to);
    if (fra === til) {
        return `${fra}`;
    }
    return `${fra} til ${til}`;
};

export const arbeidsukerHarLikNormaltidPerDag = (arbeidsuker: Arbeidsuke[]): boolean => {
    if (arbeidsuker.length === 0) {
        return true;
    }
    const normaltidPerDagFørsteUke = durationToISODuration(arbeidsuker[0].normalt.dag);
    const harUlikNormalarbeidstid = arbeidsuker.some((arbeidsuke) => {
        const normaltid = durationToISODuration(arbeidsuke.normalt.dag);
        return normaltidPerDagFørsteUke !== normaltid;
    });

    return harUlikNormalarbeidstid === false;
};

/**
 * Henter ut alle datoer i @arbeidstidEnkeltdager, sorterer dem på dato og returnerer array med ISODate
 * @param arbeidstidEnkeltdager
 * @returns ISODate[]
 */
export const getDagerFraEnkeltdagMap = (arbeidstidEnkeltdager: ArbeidstidEnkeltdagMap): ISODate[] => {
    return Object.keys(arbeidstidEnkeltdager).sort();
};
