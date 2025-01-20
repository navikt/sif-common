import {
    DateRange,
    dateRangesCollide,
    dateRangeToISODateRange,
    dateRangeUtils,
    dateToISODate,
    durationUtils,
    getDateRangesFromISODateRangeMap,
    getDatesInDateRange,
    getISODatesInISODateRange,
    getIsoWeekDateRangeForDate,
    getLastDateInDateRanges,
    isDateInDateRange,
    isDateInDateRanges,
    ISODateRangeToDateRange,
    ISODateToDate,
    joinAdjacentDateRanges,
    MaybeDateRange,
    numberDurationAsDuration,
    sortMaybeDateRange,
} from '@navikt/sif-common-utils';
import {
    Arbeidsaktivitet,
    ArbeidsaktivitetArbeidstaker,
    Arbeidsaktiviteter,
    ArbeidsaktivitetFrilanser,
    ArbeidsaktivitetSelvstendigNæringsdrivende,
    ArbeidsaktivitetType,
    ArbeidsgiverForEndring,
    ArbeidsgiverIkkeFunnetError,
    ArbeidstidEnkeltdagMap,
    Arbeidsuke,
    ArbeidsukeMap,
    K9Sak,
    K9SakArbeidstaker,
    K9SakArbeidstidInfo,
    K9SakArbeidstidPeriodeMap,
    K9SakLovbestemtFerie,
    PeriodeMedArbeidstid,
    Sak,
} from '@types';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { FeriedagMap } from '../søknad/steps/lovbestemt-ferie/LovbestemtFerieStep';
import { getDagerFraEnkeltdagMap } from './arbeidsukeUtils';
import { beregnSnittTimerPerDag } from './beregnUtils';
import { getFeriedagerMapFromPerioder } from './ferieUtils';
import { finnesArbeidsgiverIK9Sak } from './k9SakUtils';
import { maskString } from './maskString';

dayjs.extend(isSameOrBefore);

interface _PeriodisertK9FormatArbeidstidPerioder {
    periode: DateRange;
    arbeidstidPerioder: K9SakArbeidstidPeriodeMap;
}

/**
 *
 * Henter ut info fra K9Sak og klargjør sak for videre behandling i dialogen
 * @param k9sak Sak hentet fra K9
 * @param alleArbeidsgivere Liste med arbeidsgivere
 * @param tillattEndringsperiode Periode hvor en kan endre
 * @returns Sak
 */
export const getSakFromK9Sak = (
    k9sak: K9Sak,
    alleArbeidsgivere: ArbeidsgiverForEndring[],
    tillattEndringsperiode: DateRange,
): Sak => {
    const { arbeidstakerList, frilanserArbeidstidInfo, selvstendigNæringsdrivendeArbeidstidInfo } =
        k9sak.ytelse.arbeidstid;

    const søknadsperioderInneforTillattEndringsperiode = dateRangeUtils.getDateRangesWithinDateRange(
        k9sak.ytelse.søknadsperioder,
        tillattEndringsperiode,
    );

    const arbeidsgivereISøknadsperioder = alleArbeidsgivere.filter((a) =>
        erArbeidsgiverInnenforSøknadsperioder(a, k9sak.ytelse.søknadsperioder),
    );

    const arbeidsgivereIkkeISak = arbeidsgivereISøknadsperioder.filter((arbeidsgiver) => {
        return !finnesArbeidsgiverIK9Sak(arbeidsgiver, k9sak.ytelse.arbeidstid.arbeidstakerList || []);
    });

    const arbeidstakerAktiviteterMedArbeidsgiver = arbeidstakerList
        ? getArbeidsaktiviteterMedKjentArbeidsgiver(arbeidstakerList, arbeidsgivereISøknadsperioder)
        : [];

    const arbeidsaktivitetMedUkjentArbeidsgiver = (
        arbeidstakerList
            ? getArbeidsaktiviteterMedUkjentArbeidsgiver(arbeidstakerList, arbeidsgivereISøknadsperioder)
            : []
    ).map((a) => ({
        organisasjonsnummer: a.organisasjonsnummer,
    }));

    const arbeidstakerAktiviteter = arbeidstakerAktiviteterMedArbeidsgiver.map((arbeidstaker) =>
        getArbeidsaktivitetArbeidstaker(arbeidstaker, arbeidsgivereISøknadsperioder, tillattEndringsperiode),
    );

    const frilanser = getArbeidsaktivitetFrilanser(frilanserArbeidstidInfo, tillattEndringsperiode);
    const selvstendigNæringsdrivende = getArbeidsaktivitetSelvstendigNæringsdrivende(
        selvstendigNæringsdrivendeArbeidstidInfo,
        tillattEndringsperiode,
    );
    const aktiviteterSomKanEndres = getAktiviteterSomKanEndres({
        arbeidstakerAktiviteter,
        frilanser,
        selvstendigNæringsdrivende,
    });

    return {
        ytelse: {
            type: 'PLEIEPENGER_SYKT_BARN',
        },
        arbeidsgivereIkkeISak,
        harArbeidsgivereIkkeISak: arbeidsgivereIkkeISak.length > 0,
        søknadsperioder: søknadsperioderInneforTillattEndringsperiode,
        samletSøknadsperiode: dateRangeUtils.getDateRangeFromDateRanges(søknadsperioderInneforTillattEndringsperiode),
        barn: k9sak.barn,
        arbeidsaktivitetMedUkjentArbeidsgiver,
        arbeidsaktiviteter: {
            arbeidstakerAktiviteter,
            frilanser,
            selvstendigNæringsdrivende,
        },
        lovbestemtFerie: {
            feriedager: getFeriedagerFromLovbestemtFerie(k9sak.ytelse.lovbestemtFerie.perioder),
        },
        utledet: {
            aktiviteterSomKanEndres,
        },
    };
};

/** Henter utk9SakArbeidstakere med arbeidsgiver funnet i AA-reg */
export const getArbeidsaktiviteterMedKjentArbeidsgiver = (
    k9SakArbeidstakere: K9SakArbeidstaker[],
    arbeidsgivere: ArbeidsgiverForEndring[],
): K9SakArbeidstaker[] => {
    return k9SakArbeidstakere.filter((a) =>
        arbeidsgivere.some((arbg) => arbg.organisasjonsnummer === a.organisasjonsnummer),
    );
};

/** Henter utk9SakArbeidstakere hvor arbeidsgiver IKKE er funnet i AA-reg */
export const getArbeidsaktiviteterMedUkjentArbeidsgiver = (
    k9SakArbeidstakere: K9SakArbeidstaker[],
    arbeidsgivere: ArbeidsgiverForEndring[],
) => {
    return k9SakArbeidstakere.filter(
        (a) => arbeidsgivere.some((arbg) => arbg.organisasjonsnummer === a.organisasjonsnummer) === false,
    );
};

/**
 * Korter ned periode til sluttdato for arbeidsforholdet, hvis denne er satt
 * @param tillattEndringsperiode
 * @param arbeidsgiver
 * @returns DateRange
 */
const getEndringsperiodeForArbeidsgiver = (
    tillattEndringsperiode: DateRange,
    arbeidsgiver: ArbeidsgiverForEndring,
): DateRange => {
    const { ansettelsesperioder } = arbeidsgiver;
    const sisteAnsattTom = ansettelsesperioder.sort(sortMaybeDateRange).reverse()[0]?.to;
    return {
        ...tillattEndringsperiode,
        to: sisteAnsattTom || tillattEndringsperiode.to,
    };
};

/**
 * Fjerner arbeidstid fra @K9SakArbeidstidPeriodeMap som ikke er en del av tillatt endringsperiode
 * @param arbeidstidPeriodeMap
 * @param tillattEndringsperiode
 * @returns
 */
const trimArbeidstidTilTillattEndringsperiode = (
    arbeidstidPeriodeMap: K9SakArbeidstidPeriodeMap,
    tillattEndringsperiode: DateRange,
): K9SakArbeidstidPeriodeMap => {
    const perioder: K9SakArbeidstidPeriodeMap = {};
    Object.keys(arbeidstidPeriodeMap).forEach((key) => {
        const { from, to } = ISODateRangeToDateRange(key);
        if (dateRangesCollide([{ from, to }, tillattEndringsperiode], true) === false) {
            return; // Er ikke innenfor gyldig tidsrom
        }
        const førsteDato = tillattEndringsperiode.from;
        const sisteDato = tillattEndringsperiode.to;
        const dateRangeToUse: DateRange = {
            from: dayjs(from).isBefore(førsteDato, 'day') ? førsteDato : from,
            to: dayjs(to).isAfter(sisteDato, 'day') ? sisteDato : to,
        };
        perioder[dateRangeToISODateRange(dateRangeToUse)] = arbeidstidPeriodeMap[key];
    });
    return perioder;
};

// /**
//  * Fjerner arbeidstid fra @K9SakArbeidstidPeriodeMap som ikke er en del av ansettelsesperioder
//  * @param arbeidstidPeriodeMap
//  * @param ansettelsesperioder
//  * @returns
//  */
// const trimArbeidstidTilAnsettelsesperioder = (
//     arbeidstidPeriodeMap: K9SakArbeidstidPeriodeMap,
//     _ansettelsesperioder: MaybeDateRange[],
// ): K9SakArbeidstidPeriodeMap => {
//     const perioder: K9SakArbeidstidPeriodeMap = {};
//     Object.keys(arbeidstidPeriodeMap).forEach(() => {
//         // const { from, to } = ISODateRangeToDateRange(key);
//         // if (dateRangesCollide([{ from, to }, tillattEndringsperiode], true) === false) {
//         //     return; // Er ikke innenfor gyldig tidsrom
//         // }
//         // const førsteDato = tillattEndringsperiode.from;
//         // const sisteDato = tillattEndringsperiode.to;
//         // const dateRangeToUse: DateRange = {
//         //     from: dayjs(from).isBefore(førsteDato, 'day') ? førsteDato : from,
//         //     to: dayjs(to).isAfter(sisteDato, 'day') ? sisteDato : to,
//         // };
//         // perioder[dateRangeToISODateRange(dateRangeToUse)] = arbeidstidPeriodeMap[key];
//     });
//     return perioder;
// };

/**
 * Finner alle arbeidstidPerioder innenfor et tidsrom
 * @param dateRange
 * @param arbeidstidPerioder K9FormatArbeidstidPerioder
 * @returns K9FormatArbeidstidPerioder
 */
const getArbeidstidPerioderIDateRange = (
    dateRange: DateRange,
    arbeidstidPerioder: K9SakArbeidstidPeriodeMap,
): K9SakArbeidstidPeriodeMap => {
    const arbeidstidPeriodeIPeriode: K9SakArbeidstidPeriodeMap = {};
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
const grupperArbeidstidPerioder = (
    arbeidstidPeriodeMap: K9SakArbeidstidPeriodeMap,
): _PeriodisertK9FormatArbeidstidPerioder[] => {
    const dateRanges = getDateRangesFromISODateRangeMap(arbeidstidPeriodeMap);
    const grupperteDateRanges = joinAdjacentDateRanges(dateRanges, true);
    return grupperteDateRanges.map((periode) => {
        const arbeidstidPerioderIPeriode = getArbeidstidPerioderIDateRange(periode, arbeidstidPeriodeMap);
        return {
            periode,
            arbeidstidPerioder: arbeidstidPerioderIPeriode,
        };
    });
};

/**
 * Konverterer array med arbeidsuker til ArbeidsukeMap
 * @param arbeidsuker
 * @returns ArbeidsukeMap
 */
const getArbeidsukerMapFromArbeidsuker = (arbeidsuker: Arbeidsuke[]): ArbeidsukeMap => {
    const arbeidsukerMap: ArbeidsukeMap = {};
    arbeidsuker.forEach((arbeidsuke) => {
        arbeidsukerMap[arbeidsuke.isoDateRange] = arbeidsuke;
    });
    return arbeidsukerMap;
};

/**
 * Mapper K9FormatArbeidstidPerioder om til enkeltdager med arbeidstid. Uavhengig av ukedager eller helg
 * @param arbeidstidPeriodeMap
 * @returns
 */
const getArbeidstidEnkeltdagMapFromPerioder = (
    arbeidstidPeriodeMap: K9SakArbeidstidPeriodeMap,
): ArbeidstidEnkeltdagMap => {
    const enkeltdager: ArbeidstidEnkeltdagMap = {};
    Object.keys(arbeidstidPeriodeMap).forEach((isoDateRange) => {
        const arbeidstidPeriode = arbeidstidPeriodeMap[isoDateRange];
        getISODatesInISODateRange(isoDateRange, true).forEach((isoDate) => {
            enkeltdager[isoDate] = {
                faktisk: arbeidstidPeriode.faktiskArbeidTimerPerDag,
                normalt: arbeidstidPeriode.jobberNormaltTimerPerDag,
            };
        });
    });
    return enkeltdager;
};

const fjernArbeidstidEnkeltdagerUtenforPeriode = (
    periode: DateRange,
    arbeidstidEnkeltdager: ArbeidstidEnkeltdagMap,
): ArbeidstidEnkeltdagMap => {
    const enkeltdagerMap: ArbeidstidEnkeltdagMap = {};
    getDatesInDateRange(periode)
        .map(dateToISODate)
        .sort()
        .filter((isoDate) => arbeidstidEnkeltdager[isoDate] !== undefined)
        .forEach((isoDate) => {
            enkeltdagerMap[isoDate] = arbeidstidEnkeltdager[isoDate];
        });
    return enkeltdagerMap;
};

const getDagerIkkeAnsattIPeriode = (periode: DateRange, ansettelsesperioder?: DateRange[]): Date[] => {
    if (!ansettelsesperioder) {
        return [];
    }
    return getDatesInDateRange(periode).filter((d) => !isDateInDateRanges(d, ansettelsesperioder));
};

/**
 * Mapper periode og enkeltdager med arbeid om til Arbeidsuke. Summerer tid per dag om til timer per uke
 * @param periode DateRange for uken
 * @param arbeidstidEnkeltdagerIUken Enkeltdager med arbeidstid
 * @returns Arbeidsuke
 */
export const getArbeidsukeFromEnkeltdagerIUken = (
    periode: DateRange,
    arbeidstidEnkeltdager: ArbeidstidEnkeltdagMap,
    ansettelsesperioder?: DateRange[],
): Arbeidsuke => {
    const arbeidstidEnkeltdagerIUken = fjernArbeidstidEnkeltdagerUtenforPeriode(periode, arbeidstidEnkeltdager);
    const dagerSøktFor = Object.keys(arbeidstidEnkeltdagerIUken);
    const antallDagerMedArbeidstid = dagerSøktFor.length;
    const faktisk = dagerSøktFor.map((key) => arbeidstidEnkeltdagerIUken[key].faktisk);
    const normalt = dagerSøktFor.map((key) => arbeidstidEnkeltdagerIUken[key].normalt);
    const normaltSummertHeleUken = numberDurationAsDuration(durationUtils.summarizeDurations(normalt));
    const faktiskSummertHeleUken = numberDurationAsDuration(durationUtils.summarizeDurations(faktisk));

    const arbeidsuke: Arbeidsuke = {
        isoDateRange: dateRangeToISODateRange(periode),
        periode: periode,
        arbeidstidEnkeltdager: arbeidstidEnkeltdagerIUken,
        dagerIkkeAnsatt: getDagerIkkeAnsattIPeriode(periode, ansettelsesperioder),
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

const setArbeidsukeStartdatoTilFørsteDagSøktFor = (arbeidsuke: Arbeidsuke): Arbeidsuke => {
    const dagerSøktFor = getDagerFraEnkeltdagMap(arbeidsuke.arbeidstidEnkeltdager);
    const periode: DateRange = { ...arbeidsuke.periode, from: ISODateToDate(dagerSøktFor[0]) };
    return {
        ...arbeidsuke,
        periode,
        isoDateRange: dateRangeToISODateRange(periode),
    };
};

const setArbeidsukeSluttdatoTilSisteDagSøktFor = (arbeidsuke: Arbeidsuke): Arbeidsuke => {
    const dagerSøktFor = getDagerFraEnkeltdagMap(arbeidsuke.arbeidstidEnkeltdager);
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
/**
 * Grupperer arbeidsdager inn i uker
 * Hver uke er hele uker, inklusiv helg, med unntak av første og siste uke som
 * justeres i henhold til første og siste arbeidsdag.
 *
 * @param enkeltdager
 * @returns Array av arbeidsuker
 */
const getArbeidsukerFromEnkeltdager = (
    enkeltdager: ArbeidstidEnkeltdagMap,
    ansettelsesperioder?: DateRange[],
): Arbeidsuke[] => {
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
        return getArbeidsukeFromEnkeltdagerIUken(uke, dager, ansettelsesperioder);
    });

    /** Juster start og sluttdato til første og siste dag søkt for (dag med arbeidstid) */
    if (arbeidsuker.length > 0) {
        arbeidsuker[0] = setArbeidsukeStartdatoTilFørsteDagSøktFor(arbeidsuker[0]);
        arbeidsuker[arbeidsuker.length - 1] = setArbeidsukeSluttdatoTilSisteDagSøktFor(
            arbeidsuker[arbeidsuker.length - 1],
        );
    }

    return arbeidsuker;
};

/**
 * Mapper K9format-arbeidstid til perioder med arbeidstid
 * @param arbeidstidPeriodeMap
 * @returns PeriodeMedArbeidstid[]
 */
const getPerioderMedArbeidstid = (
    arbeidstidPeriodeMap: K9SakArbeidstidPeriodeMap,
    tillattEndringsperiode: DateRange,
    ansettelsesperioderInnenforEndringsperiode: DateRange[],
): PeriodeMedArbeidstid[] => {
    const perioder = trimArbeidstidTilTillattEndringsperiode(arbeidstidPeriodeMap, tillattEndringsperiode);

    return grupperArbeidstidPerioder(perioder).map((gruppertPeriode) => {
        const enkeltdagerIPeriode = getArbeidstidEnkeltdagMapFromPerioder(gruppertPeriode.arbeidstidPerioder);
        const arbeidsdagerSomKanEndres = getArbeidsdagerInneforEndringsperiodeOgAnsettelsesperioder(
            enkeltdagerIPeriode,
            tillattEndringsperiode,
            ansettelsesperioderInnenforEndringsperiode,
        );
        const uker = getArbeidsukerFromEnkeltdager(
            arbeidsdagerSomKanEndres,
            ansettelsesperioderInnenforEndringsperiode,
        );
        const periodeSomKanEndres: DateRange = { from: uker[0].periode.from, to: uker[uker.length - 1].periode.to };
        const arbeidsuker = getArbeidsukerMapFromArbeidsuker(uker);
        const periode: PeriodeMedArbeidstid = {
            ...periodeSomKanEndres,
            arbeidsuker,
        };
        return periode;
    });
};

/**
 * Sjekker om bruker har perioder med pleiepenger som er før endringsperiode
 */
const harPerioderFørEndringsperiode = (
    arbeidstidPeriodeMap: K9SakArbeidstidPeriodeMap,
    tillattEndringsperiode: DateRange,
): boolean => {
    return Object.keys(arbeidstidPeriodeMap)
        .map(ISODateRangeToDateRange)
        .some(
            ({ to, from }) =>
                dayjs(to).isBefore(tillattEndringsperiode.from, 'day') ||
                dayjs(from).isBefore(tillattEndringsperiode.from, 'day'),
        );
};

/**
 * Sjekker om bruker har perioder med pleiepenger som er etter endringsperiode
 */
const harPerioderEtterEndringsperiode = (
    arbeidstidPeriodeMap: K9SakArbeidstidPeriodeMap,
    tillattEndringsperiode: DateRange,
): boolean => {
    return Object.keys(arbeidstidPeriodeMap)
        .map(ISODateRangeToDateRange)
        .some(
            ({ to, from }) =>
                dayjs(to).isAfter(tillattEndringsperiode.to, 'day') ||
                dayjs(from).isAfter(tillattEndringsperiode.to, 'day'),
        );
};

/**
 * Henter ut perioder med arbeidstid og info om en har perioder med pleiepenger før og etter endringsperiode
 * @param arbeidstidPerioder
 * @param endringsperiode
 * @returns
 */
const getArbeidsaktivitetPerioderPart = (
    arbeidstidPerioder: K9SakArbeidstidPeriodeMap,
    endringsperiode: DateRange,
    ansettelsesperioderInnenforEndringsperiode: DateRange[],
): Pick<
    Arbeidsaktivitet,
    'perioderMedArbeidstid' | 'harPerioderEtterTillattEndringsperiode' | 'harPerioderFørTillattEndringsperiode'
> => {
    return {
        perioderMedArbeidstid: getPerioderMedArbeidstid(
            arbeidstidPerioder,
            endringsperiode,
            ansettelsesperioderInnenforEndringsperiode,
        ),
        harPerioderFørTillattEndringsperiode: harPerioderFørEndringsperiode(arbeidstidPerioder, endringsperiode),
        harPerioderEtterTillattEndringsperiode: harPerioderEtterEndringsperiode(arbeidstidPerioder, endringsperiode),
    };
};

/**
 *
 * @param arbeidstaker
 * @param arbeidsgivere
 * @param endringsperiode
 * @returns
 */
const getArbeidsaktivitetArbeidstaker = (
    arbeidstaker: K9SakArbeidstaker,
    arbeidsgivere: ArbeidsgiverForEndring[],
    endringsperiode: DateRange,
): ArbeidsaktivitetArbeidstaker => {
    const {
        arbeidstidInfo: { perioder },
        organisasjonsnummer,
    } = arbeidstaker;
    const arbeidsgiver = arbeidsgivere.find((a) => a.organisasjonsnummer === organisasjonsnummer);
    if (!arbeidsgiver) {
        const error: ArbeidsgiverIkkeFunnetError = {
            type: 'ArbeidsgiverIkkeFunnet',
            message: 'getArbeidsaktivitetArbeidstaker - arbeidsgiver ikke funnet',
            maskedArbeidsgivere: arbeidsgivere.map((a) => maskString(a.key)),
        };
        throw error;
    }
    const endringsperiodeForArbeidsgiver = getEndringsperiodeForArbeidsgiver(endringsperiode, arbeidsgiver);
    const ansettelsesperioderInnenforEndringsperiode = ensureAnsettelsesperioderIsValidDateRange(
        arbeidsgiver.ansettelsesperioder,
        endringsperiode,
    );
    return {
        key: arbeidsgiver.key,
        arbeidsgiver,
        type: ArbeidsaktivitetType.arbeidstaker,
        navn: arbeidsgiver.navn,
        erUkjentArbeidsforhold: false,
        ansettelsesperioderInnenforEndringsperiode,
        ...getArbeidsaktivitetPerioderPart(
            perioder,
            endringsperiodeForArbeidsgiver,
            ansettelsesperioderInnenforEndringsperiode,
        ),
    };
};

/** Går gjennom og endrer ansettelsesperioder til gyldig DateRange
 * Bruker tillattEndringsperiode som erstatning hvis ansettelsesperiode mangler daga
 */

const ensureAnsettelsesperioderIsValidDateRange = (
    ansettelsesperioder: MaybeDateRange[],
    endringsperiode: DateRange,
): DateRange[] => {
    return ansettelsesperioder.map((a) => ({
        from: a.from || endringsperiode.from,
        to: a.to || endringsperiode.to,
    }));
};

/**
 *
 * @param frilanserArbeidstidInfo
 * @param endringsperiode
 * @returns
 */
const getArbeidsaktivitetFrilanser = (
    frilanserArbeidstidInfo: K9SakArbeidstidInfo | undefined,
    endringsperiode: DateRange,
): ArbeidsaktivitetFrilanser | undefined => {
    return frilanserArbeidstidInfo !== undefined
        ? {
              key: ArbeidsaktivitetType.frilanser,
              type: ArbeidsaktivitetType.frilanser,
              navn: 'Frilanser',
              ansettelsesperioderInnenforEndringsperiode: [endringsperiode], // TODO
              ...getArbeidsaktivitetPerioderPart(frilanserArbeidstidInfo.perioder, endringsperiode, [endringsperiode]),
          }
        : undefined;
};

/**
 *
 * @param selvstendigNæringsdrivendeArbeidstidInfo
 * @param endringsperiode
 * @returns
 */
const getArbeidsaktivitetSelvstendigNæringsdrivende = (
    selvstendigNæringsdrivendeArbeidstidInfo: K9SakArbeidstidInfo | undefined,
    endringsperiode: DateRange,
): ArbeidsaktivitetSelvstendigNæringsdrivende | undefined => {
    return selvstendigNæringsdrivendeArbeidstidInfo
        ? {
              key: ArbeidsaktivitetType.selvstendigNæringsdrivende,
              type: ArbeidsaktivitetType.selvstendigNæringsdrivende,
              navn: 'Selvstendig næringsdrivende',
              ansettelsesperioderInnenforEndringsperiode: [], // TODO
              ...getArbeidsaktivitetPerioderPart(selvstendigNæringsdrivendeArbeidstidInfo.perioder, endringsperiode, [
                  endringsperiode,
              ]),
          }
        : undefined;
};

/**
 * Sjekker om en er ansatt hos arbeidsgiver innenfor søknadsperioder
 * @param arbeidsgiver
 * @param søknadsperioder
 * @returns boolean
 */
const erArbeidsgiverInnenforSøknadsperioder = (
    arbeidsgiver: ArbeidsgiverForEndring,
    søknadsperioder: DateRange[],
): boolean => {
    const { ansettelsesperioder = [] } = arbeidsgiver;
    return ansettelsesperioder.some((ansettelsesperiode) =>
        erAnsattPeriodeInnenforSøknadsperioder(ansettelsesperiode, søknadsperioder),
    );
};

/**
 * Sjekker om ansatt-periode hos arbeidsgiver er innenfor søknadsperioder
 * @param arbeidsgiver
 * @param søknadsperioder
 * @returns boolean
 */
const erAnsattPeriodeInnenforSøknadsperioder = (
    ansettelsesperiode: MaybeDateRange,
    søknadsperioder: DateRange[],
): boolean => {
    const sisteSøknadsdag = getLastDateInDateRanges(søknadsperioder);

    if (!ansettelsesperiode.from || !sisteSøknadsdag) {
        return false;
    }
    if (!ansettelsesperiode.to) {
        return dayjs(ansettelsesperiode.from).isSameOrBefore(sisteSøknadsdag);
    }
    const periode: DateRange = {
        from: ansettelsesperiode.from,
        to: ansettelsesperiode.to || sisteSøknadsdag,
    };
    return søknadsperioder.some((søknadsperiode) => dateRangesCollide([søknadsperiode, periode]));
};

/**
 * Henter ut
 * @param lovbestemtFerie
 * @returns
 */
const getFeriedagerFromLovbestemtFerie = (lovbestemtFerie: K9SakLovbestemtFerie[]): FeriedagMap => {
    return getFeriedagerMapFromPerioder(lovbestemtFerie, true, true);
};

/**
 * Henter ut alle arbeidsaktiviteter som kan endres i sak
 * @param Arbeidsaktiviteter
 * @returns array av Arbeidsaktivitet
 */

const getAktiviteterSomKanEndres = ({
    arbeidstakerAktiviteter,
    frilanser,
    selvstendigNæringsdrivende,
}: Arbeidsaktiviteter): Arbeidsaktivitet[] => {
    const aktiviteter: Arbeidsaktivitet[] = [...arbeidstakerAktiviteter];
    if (frilanser) {
        aktiviteter.push(frilanser);
    }
    if (selvstendigNæringsdrivende) {
        aktiviteter.push(selvstendigNæringsdrivende);
    }
    return aktiviteter;
};

/**
 * Eksporterer interne funksjoner for test
 */
export const _getSakFromK9Sak = {
    erArbeidsgiverInnenforSøknadsperioder,
    getArbeidsaktivitetArbeidstaker,
    getArbeidsaktivitetFrilanser,
    getArbeidstidPerioderIDateRange,
    getArbeidsaktivitetSelvstendigNæringsdrivende,
    getArbeidsukerMapFromArbeidsuker,
    getArbeidstidEnkeltdagMapFromPerioder,
    getEndringsperiodeForArbeidsgiver,
    getArbeidsukerFromEnkeltdager,
    getArbeidsukeFromEnkeltdagerIUken,
    grupperArbeidstidPerioder,
    trimArbeidstidTilTillattEndringsperiode,
};

const getArbeidsdagerInneforEndringsperiodeOgAnsettelsesperioder = (
    arbeidsdager: ArbeidstidEnkeltdagMap,
    tillattEndringsperiode: DateRange,
    ansettelsesperioderInnenforEndringsperiode: DateRange[],
) => {
    const arbeidsdagerInnenforPerioder: ArbeidstidEnkeltdagMap = {};
    for (const [dato, info] of Object.entries(arbeidsdager)) {
        const d = ISODateToDate(dato);
        if (
            isDateInDateRange(d, tillattEndringsperiode) &&
            isDateInDateRanges(d, ansettelsesperioderInnenforEndringsperiode)
        ) {
            arbeidsdagerInnenforPerioder[dato] = info;
        }
    }
    return arbeidsdagerInnenforPerioder;
};
