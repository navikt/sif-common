import {
    DateRange,
    dateRangesCollide,
    dateRangeToISODateRange,
    durationUtils,
    getDateRangesFromISODateRangeMap,
    getISODatesInISODateRange,
    getIsoWeekDateRangeForDate,
    isDateInDateRange,
    ISODateRangeToDateRange,
    ISODateToDate,
    ISODurationToDuration,
    joinAdjacentDateRanges,
    numberDurationAsDuration,
} from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { Arbeidsgiver } from '../types/Arbeidsgiver';
import {
    K9Format,
    K9FormatArbeidstaker,
    K9FormatArbeidstid,
    K9FormatArbeidstidInfoPerioder,
    K9FormatBarn,
} from '../types/k9Format';
import {
    ArbeidstakerMap,
    ArbeidstidEnkeltdagMap,
    Arbeidsuke,
    ArbeidsukeMap,
    Barn,
    K9Sak,
    YtelseArbeidstid,
} from '../types/K9Sak';
import { PeriodeMedArbeidstid } from '../types/PeriodeMedArbeidstid';
import { beregnSnittTimerPerDag } from './beregnUtils';
import {
    getEndringsdato,
    getMaksEndringsperiode,
    getSøknadsperioderInnenforTillattEndringsperiode,
} from './endringsperiode';

export const getDagerSøktFor = (arbeidstidEnkeltdager: ArbeidstidEnkeltdagMap) => {
    return Object.keys(arbeidstidEnkeltdager).sort();
};

/** Internt interface */
interface PeriodisertK9FormatArbeidstidPerioder {
    periode: DateRange;
    arbeidstidPerioder: K9FormatArbeidstidInfoPerioder;
}

/**
 * Mapper K9FormatArbeidstidPerioder om til enkeltdager med arbeidstid
 * @param arbeidstidPerioder
 * @returns
 */
const getArbeidstidEnkeltdagMapFromPerioder = (
    arbeidstidPerioder: K9FormatArbeidstidInfoPerioder
): ArbeidstidEnkeltdagMap => {
    const enkeltdager: ArbeidstidEnkeltdagMap = {};
    Object.keys(arbeidstidPerioder).forEach((isoDateRange) => {
        const arbeidstidPeriode = arbeidstidPerioder[isoDateRange];
        getISODatesInISODateRange(isoDateRange, true).forEach((isoDate) => {
            enkeltdager[isoDate] = {
                faktisk: ISODurationToDuration(arbeidstidPeriode.faktiskArbeidTimerPerDag),
                normalt: ISODurationToDuration(arbeidstidPeriode.jobberNormaltTimerPerDag),
            };
        });
    });
    return enkeltdager;
};

/**
 * Mapper periode og enkeltdager med arbeid om til Arbeidsuke. Summerer tid per dag om til timer per uke
 * @param periode DateRange for uken
 * @param arbeidstidEnkeltdager Enkeltdager med arbeidstid
 * @returns Arbeidsuke
 */
export const getArbeidsukeFromEnkeltdagerIUken = (
    periode: DateRange,
    arbeidstidEnkeltdager: ArbeidstidEnkeltdagMap
): Arbeidsuke => {
    const dagerSøktFor = Object.keys(arbeidstidEnkeltdager);
    const antallDagerMedArbeidstid = dagerSøktFor.length;
    const faktisk = dagerSøktFor.map((key) => arbeidstidEnkeltdager[key].faktisk);
    const normalt = dagerSøktFor.map((key) => arbeidstidEnkeltdager[key].normalt);
    const normaltSummertHeleUken = numberDurationAsDuration(durationUtils.summarizeDurations(normalt));
    const faktiskSummertHeleUken = numberDurationAsDuration(durationUtils.summarizeDurations(faktisk));

    const arbeidsuke: Arbeidsuke = {
        isoDateRange: dateRangeToISODateRange(periode),
        periode,
        arbeidstidEnkeltdager,
        faktisk: {
            uke: faktiskSummertHeleUken,
            dag: beregnSnittTimerPerDag(faktiskSummertHeleUken, antallDagerMedArbeidstid),
        },
        normalt: {
            uke: normaltSummertHeleUken,
            dag: beregnSnittTimerPerDag(normaltSummertHeleUken, antallDagerMedArbeidstid),
        },
        antallDagerMedArbeidstid: dagerSøktFor.length,
    };
    return arbeidsuke;
};

/**
 * Grupperer arbeidsdager inn i uker
 * Hver uke er hele uker, med unntak av første og siste uke som
 * justeres i henhold til første og siste arbeidsdag.
 *
 * @param enkeltdager
 * @returns Array av arbeidsuker
 */
const getArbeidsukerFromEnkeltdager = (enkeltdager: ArbeidstidEnkeltdagMap): Arbeidsuke[] => {
    const ukerMap: {
        [key: string]: {
            dagerMap: ArbeidstidEnkeltdagMap;
        };
    } = {};

    /** Legg dager til uker */
    Object.keys(enkeltdager).forEach((isoDate) => {
        const date = ISODateToDate(isoDate);
        const { faktisk, normalt } = enkeltdager[isoDate];

        /** Midlertidig nøkkel som tar hele uken */
        const isoDateRange = dateRangeToISODateRange(getIsoWeekDateRangeForDate(date));
        if (ukerMap[isoDateRange] === undefined) {
            ukerMap[isoDateRange] = {
                dagerMap: {},
            };
        }
        /** Legg til enkeltdag i arbeidsuken */
        ukerMap[isoDateRange].dagerMap[isoDate] = {
            faktisk,
            normalt,
        };
    });

    const arbeidsuker = Object.keys(ukerMap).map((isoDateRange) => {
        const uke = ISODateRangeToDateRange(isoDateRange);
        const dager = ukerMap[isoDateRange].dagerMap;
        return getArbeidsukeFromEnkeltdagerIUken(uke, dager);
    });

    /** Juster start og sluttdato til første og siste dag søkt for (dag med arbeidstid) */
    arbeidsuker[0] = setArbeidsukeStartdatoTilFørsteDagSøktFor(arbeidsuker[0]);
    arbeidsuker[arbeidsuker.length - 1] = setArbeidsukeSluttdatoTilSisteDagSøktFor(arbeidsuker[arbeidsuker.length - 1]);

    return arbeidsuker;
};

const setArbeidsukeStartdatoTilFørsteDagSøktFor = (arbeidsuke: Arbeidsuke): Arbeidsuke => {
    const dagerSøktFor = getDagerSøktFor(arbeidsuke.arbeidstidEnkeltdager);
    const periode: DateRange = { ...arbeidsuke.periode, from: ISODateToDate(dagerSøktFor[0]) };
    return {
        ...arbeidsuke,
        periode,
        isoDateRange: dateRangeToISODateRange(periode),
    };
};

const setArbeidsukeSluttdatoTilSisteDagSøktFor = (arbeidsuke: Arbeidsuke): Arbeidsuke => {
    const dagerSøktFor = getDagerSøktFor(arbeidsuke.arbeidstidEnkeltdager);
    const periode: DateRange = {
        ...arbeidsuke.periode,
        to: ISODateToDate(dagerSøktFor[dagerSøktFor.length - 1]),
    };
    return {
        ...arbeidsuke,
        periode,
        isoDateRange: dateRangeToISODateRange(periode),
    };
};

const getgetArbeidsukerMapFromArbeidsuker = (arbeidsuker: Arbeidsuke[]) => {
    const arbeidsukerMap: ArbeidsukeMap = {};
    arbeidsuker.forEach((arbeidsuke) => {
        arbeidsukerMap[arbeidsuke.isoDateRange] = arbeidsuke;
    });
    return arbeidsukerMap;
};

export const getK9FormatArbeidstidPerioderInnenforTillatEndringsperiode = (
    arbeidstidPerioder: K9FormatArbeidstidInfoPerioder,
    tillattEndringsperiode: DateRange
): K9FormatArbeidstidInfoPerioder => {
    const perioder: K9FormatArbeidstidInfoPerioder = {};
    Object.keys(arbeidstidPerioder).forEach((key) => {
        const { from, to } = ISODateRangeToDateRange(key);
        // Er ikke innenfor gyldig tidsrom
        if (dateRangesCollide([{ from, to }, tillattEndringsperiode], true) === false) {
            return;
        }
        const førsteDato = tillattEndringsperiode.from;
        const sisteDato = tillattEndringsperiode.to;
        const dateRangeToUse: DateRange = {
            from: dayjs(from).isBefore(førsteDato, 'day') ? førsteDato : from,
            to: dayjs(to).isAfter(sisteDato, 'day') ? sisteDato : to,
        };
        perioder[dateRangeToISODateRange(dateRangeToUse)] = arbeidstidPerioder[key];
    });
    return perioder;
};

/**
 * Mapper K9format-arbeidstid til perioder med arbeidstid
 * @param arbeidstidPerioder K9FormatArbeidstidPerioder
 * @returns PeriodeMedArbeidstid[]
 */
const getPerioderMedArbeidstid = (
    arbeidstidPerioder: K9FormatArbeidstidInfoPerioder,
    tillattEndringsperiode: DateRange
): PeriodeMedArbeidstid[] => {
    const perioder = getK9FormatArbeidstidPerioderInnenforTillatEndringsperiode(
        arbeidstidPerioder,
        tillattEndringsperiode
    );

    return grupperArbeidstidPerioder(perioder).map((gruppertPeriode) => {
        const enkeltdager = getArbeidstidEnkeltdagMapFromPerioder(gruppertPeriode.arbeidstidPerioder);
        const arbeidsuker = getgetArbeidsukerMapFromArbeidsuker(getArbeidsukerFromEnkeltdager(enkeltdager));
        const periode: PeriodeMedArbeidstid = {
            periode: gruppertPeriode.periode,
            enkeltdager,
            arbeidsuker,
        };
        return periode;
    });
};

/**
 * Finner alle arbeidstidPerioder innenfor et tidsrom
 * @param dateRange
 * @param arbeidstidPerioder K9FormatArbeidstidPerioder
 * @returns K9FormatArbeidstidPerioder
 */
export const getArbeidstidPerioderIDateRange = (
    dateRange: DateRange,
    arbeidstidPerioder: K9FormatArbeidstidInfoPerioder
): K9FormatArbeidstidInfoPerioder => {
    const arbeidstidPeriodeIPeriode: K9FormatArbeidstidInfoPerioder = {};
    Object.keys(arbeidstidPerioder)
        .filter((key) => isDateInDateRange(ISODateRangeToDateRange(key).from, dateRange))
        .forEach((key) => {
            arbeidstidPeriodeIPeriode[key] = arbeidstidPerioder[key];
        });
    return arbeidstidPeriodeIPeriode;
};

/**
 * Slår sammen arbeidstidperioder som henger sammen, også dem som kun har en helg mellom.
 * @param arbeidstidPerioder
 * @returns PeriodisertK9FormatArbeidstidPerioder
 */
export const grupperArbeidstidPerioder = (
    arbeidstidPerioder: K9FormatArbeidstidInfoPerioder
): PeriodisertK9FormatArbeidstidPerioder[] => {
    const dateRanges = getDateRangesFromISODateRangeMap(arbeidstidPerioder);
    const grupperteDateRanges = joinAdjacentDateRanges(dateRanges, true);
    return grupperteDateRanges.map((periode) => {
        const arbeidstidPerioderIPeriode = getArbeidstidPerioderIDateRange(periode, arbeidstidPerioder);
        return {
            periode,
            arbeidstidPerioder: arbeidstidPerioderIPeriode,
        };
    });
};

/**
 * Korter ned periode til sluttdato for arbeidsforholdet, dersom denne er satt
 * @param tillattEndringsperiode
 * @param arbeidsgiver
 * @returns DateRange
 */
const getEndringsperiodeForArbeidsgiver = (
    tillattEndringsperiode: DateRange,
    arbeidsgiver: Arbeidsgiver
): DateRange => {
    return {
        ...tillattEndringsperiode,
        to: arbeidsgiver.ansattTom || tillattEndringsperiode.to,
    };
};

/**
 * Henter ut arbeidstid for alle arbeidsgivere registrert på sak
 * @param k9FormatArbeidstaker
 * @returns
 */
const getArbeidstidArbeidsgivere = (
    k9FormatArbeidstaker: K9FormatArbeidstaker[],
    tillattEndringsperiode: DateRange,
    arbeidsgivere: Arbeidsgiver[]
): ArbeidstakerMap => {
    const arbeidsgivereMap: ArbeidstakerMap = {};
    k9FormatArbeidstaker.forEach((a) => {
        const id = a.norskIdentitetsnummer || a.organisasjonsnummer;
        const arbeidsgiver = arbeidsgivere.find((a) => a.id === id);
        if (a.arbeidstidInfo.perioder && arbeidsgiver) {
            arbeidsgivereMap[id] = {
                perioderMedArbeidstid: getPerioderMedArbeidstid(
                    a.arbeidstidInfo.perioder,
                    getEndringsperiodeForArbeidsgiver(tillattEndringsperiode, arbeidsgiver)
                ),
            };
        }
    });
    return arbeidsgivereMap;
};

/**
 * Henter ut informasjon om barn fra k9sak
 * @param barn K9FormatBarn
 * @returns Barn
 */
const getBarn = (barn: K9FormatBarn): Barn => {
    return {
        ...barn,
        fødselsdato: ISODateToDate(barn.fødselsdato),
        mellomnavn: barn.mellomnavn || undefined,
    };
};

/**
 *
 * @param arbeidstid: K9FormatArbeidstid
 * @returns YtelseArbeidstid
 */
const getArbeidstidInfo = (
    { arbeidstakerList, frilanserArbeidstidInfo, selvstendigNæringsdrivendeArbeidstidInfo }: K9FormatArbeidstid,
    tillattEndringsperiode: DateRange,
    arbeidsgivere: Arbeidsgiver[]
): YtelseArbeidstid => {
    return {
        arbeidstakerMap: getArbeidstidArbeidsgivere(arbeidstakerList, tillattEndringsperiode, arbeidsgivere),
        frilanserArbeidstidInfo: frilanserArbeidstidInfo?.perioder
            ? {
                  perioderMedArbeidstid: getPerioderMedArbeidstid(
                      frilanserArbeidstidInfo.perioder,
                      tillattEndringsperiode
                  ),
              }
            : undefined,
        selvstendigNæringsdrivendeArbeidstidInfo: selvstendigNæringsdrivendeArbeidstidInfo?.perioder
            ? {
                  perioderMedArbeidstid: getPerioderMedArbeidstid(
                      selvstendigNæringsdrivendeArbeidstidInfo.perioder,
                      tillattEndringsperiode
                  ),
              }
            : undefined,
    };
};

/**
 * Parser en hel sak fra K9
 * @param data data mottat fra backend
 * @returns K9Sak
 */
export const parseK9Format = (data: K9Format, arbeidsgivere: Arbeidsgiver[]): K9Sak => {
    const {
        søknad: { ytelse, søker, søknadId },
        barn,
    } = data;
    const endringsdato = getEndringsdato();
    const tillattEndringsperiode = getMaksEndringsperiode(endringsdato);
    const søknadsperioder = getSøknadsperioderInnenforTillattEndringsperiode(
        endringsdato,
        ytelse.søknadsperiode.map((periode) => ISODateRangeToDateRange(periode))
    );
    const sak: K9Sak = {
        søker: søker,
        søknadId: søknadId,
        språk: data.søknad.språk,
        mottattDato: dayjs(data.søknad.mottattDato).toDate(),
        barn: getBarn(data.barn),
        ytelse: {
            type: 'PLEIEPENGER_SYKT_BARN',
            barn: {
                norskIdentitetsnummer: barn.identitetsnummer,
                fødselsdato: barn.fødselsdato ? ISODateToDate(barn.fødselsdato) : undefined,
            },
            søknadsperioder,
            opptjeningAktivitet: {
                frilanser: ytelse.opptjeningAktivitet.frilanser
                    ? {
                          jobberFortsattSomFrilanser: ytelse.opptjeningAktivitet.frilanser.jobberFortsattSomFrilanser,
                          startdato: ISODateToDate(ytelse.opptjeningAktivitet.frilanser.startdato),
                          sluttdato: ytelse.opptjeningAktivitet.frilanser.sluttdato
                              ? ISODateToDate(ytelse.opptjeningAktivitet.frilanser.sluttdato)
                              : undefined,
                      }
                    : undefined,
            },
            arbeidstidInfo: getArbeidstidInfo(ytelse.arbeidstid, tillattEndringsperiode, arbeidsgivere),
        },
    };

    return sak;
};

export const parseK9FormatUtils = {
    getArbeidstidArbeidsgivere,
    getBarn,
    getArbeidstidInfo,
};
