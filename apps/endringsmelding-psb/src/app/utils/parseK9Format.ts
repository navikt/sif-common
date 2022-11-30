import {
    DateRange,
    dateRangeUtils,
    Duration,
    getISODatesInISODateRange,
    isDateInDateRange,
    ISODateRangeToDateRange,
    ISODateToDate,
    ISODurationToDuration,
} from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import {
    K9Format,
    K9FormatArbeidstaker,
    K9FormatArbeidstidPeriode,
    K9FormatBarn,
    K9FormatOpptjeningAktivitetFrilanser,
    K9FormatOpptjeningAktivitetSelvstendig,
    K9FormatTilsynsordningPerioder,
} from '../types/k9Format';
import {
    ArbeidstakerMap,
    ArbeidstidEnkeltdagSak,
    Barn,
    K9OpptjeningAktivitetArbeidstaker,
    K9OpptjeningAktivitetFrilanser,
    K9OpptjeningAktivitetSelvstendig,
    K9Sak,
    TidEnkeltdag,
} from '../types/K9Sak';
import { getEndringsdato, getSøknadsperioderInnenforTillattEndringsperiode } from './endringsperiode';

export const getTilsynsdagerFromK9Format = (data: K9FormatTilsynsordningPerioder): TidEnkeltdag => {
    const enkeltdager: TidEnkeltdag = {};

    Object.keys(data).forEach((isoDateRange) => {
        const duration = data[isoDateRange].etablertTilsynTimerPerDag;
        const time = ISODurationToDuration(duration);
        if (time) {
            const isoDates = getISODatesInISODateRange(isoDateRange, true);
            isoDates.forEach((isoDate) => {
                enkeltdager[isoDate] = { hours: time.hours, minutes: time.minutes };
            });
        }
    });
    return enkeltdager;
};

const dateIsIWithinDateRanges = (date: Date, dateRanges: DateRange[]) =>
    dateRanges.some((dateRange) => isDateInDateRange(date, dateRange));

export const getAktivitetArbeidstidFromK9Format = (
    arbeidstidPerioder: K9FormatArbeidstidPeriode,
    søknadsperioder: DateRange[]
): ArbeidstidEnkeltdagSak => {
    const arbeidstid: ArbeidstidEnkeltdagSak = {
        faktisk: {},
        normalt: {},
    };

    const getTid = (tid: Duration | undefined): Duration => {
        return {
            hours: tid?.hours || '0',
            minutes: tid?.minutes || '0',
        };
    };
    Object.keys(arbeidstidPerioder).forEach((isoDateRange) => {
        const isoDates = getISODatesInISODateRange(isoDateRange, true);
        isoDates.forEach((isoDate) => {
            const date = ISODateToDate(isoDate);
            const dateIsInSøknadsperioder = dateIsIWithinDateRanges(date, søknadsperioder);
            if (dateIsInSøknadsperioder) {
                arbeidstid.faktisk[isoDate] = getTid(
                    ISODurationToDuration(arbeidstidPerioder[isoDateRange].faktiskArbeidTimerPerDag)
                );
                arbeidstid.normalt[isoDate] = getTid(
                    ISODurationToDuration(arbeidstidPerioder[isoDateRange].jobberNormaltTimerPerDag)
                );
            }
        });
    });

    return arbeidstid;
};

const getArbeidstidArbeidsgivere = (
    arbeidsgivere: K9FormatArbeidstaker[],
    søknadsperioder: DateRange[]
): ArbeidstakerMap => {
    const arbeidsgivereMap: ArbeidstakerMap = {};
    arbeidsgivere.forEach((a) => {
        const id = a.norskIdentitetsnummer || a.organisasjonsnummer;
        arbeidsgivereMap[id] = getAktivitetArbeidstidFromK9Format(a.arbeidstidInfo.perioder, søknadsperioder);
    });
    return arbeidsgivereMap;
};

const getBarn = (barn: K9FormatBarn): Barn => {
    return {
        aktørId: barn.aktørId,
        identitetsnummer: barn.identitetsnummer,
        fødselsdato: ISODateToDate(barn.fødselsdato),
        fornavn: barn.fornavn,
        etternavn: barn.etternavn,
        mellomnavn: barn.mellomnavn || undefined,
    };
};

export const getOppgjeningsaktivitetArbeidstaker = (
    k9Arbeidstaker: K9FormatArbeidstaker[]
): K9OpptjeningAktivitetArbeidstaker[] => {
    return k9Arbeidstaker.map(({ arbeidstidInfo, organisasjonsnummer }) => {
        const allePerioder = dateRangeUtils.getDateRangesFromISODateRangeMap(arbeidstidInfo.perioder);
        const samletPeriode = dateRangeUtils.getDateRangeFromDateRanges(allePerioder);
        return {
            organisasjonsnummer,
            samletPeriode,
            allePerioder,
        };
    });
};

export const getOppgjeningsaktivitetFrilanser = ({
    jobberFortsattSomFrilanser,
    startdato,
    sluttdato,
}: K9FormatOpptjeningAktivitetFrilanser): K9OpptjeningAktivitetFrilanser => {
    return {
        startdato: ISODateToDate(startdato),
        jobberFortsattSomFrilanser,
        sluttdato: jobberFortsattSomFrilanser === false && sluttdato ? ISODateToDate(sluttdato) : undefined,
    };
};

export const getOppgjeningsaktivitetSelvstendig = ({
    organisasjonsnummer,
    startdato,
    sluttdato,
}: K9FormatOpptjeningAktivitetSelvstendig): K9OpptjeningAktivitetSelvstendig => {
    return {
        organisasjonsnummer,
        startdato: ISODateToDate(startdato),
        sluttdato: sluttdato ? ISODateToDate(sluttdato) : undefined,
    };
};

export const parseK9Format = (data: K9Format): K9Sak => {
    const {
        søknad: { ytelse, søker, søknadId },
        barn,
    } = data;
    const endringsdato = getEndringsdato();
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
                arbeidstaker: getOppgjeningsaktivitetArbeidstaker(ytelse.arbeidstid.arbeidstakerList),
                selvstendig: ytelse.opptjeningAktivitet.selvstendig
                    ? getOppgjeningsaktivitetSelvstendig(ytelse.opptjeningAktivitet.selvstendig)
                    : undefined,

                frilanser: ytelse.opptjeningAktivitet.frilanser
                    ? getOppgjeningsaktivitetFrilanser(ytelse.opptjeningAktivitet.frilanser)
                    : undefined,
            },
            tilsynsordning: {
                enkeltdager: getTilsynsdagerFromK9Format(ytelse.tilsynsordning.perioder),
            },
            arbeidstid: {
                arbeidstakerMap: getArbeidstidArbeidsgivere(ytelse.arbeidstid.arbeidstakerList, søknadsperioder),
                frilanser: ytelse.arbeidstid.frilanserArbeidstidInfo?.perioder
                    ? getAktivitetArbeidstidFromK9Format(
                          ytelse.arbeidstid.frilanserArbeidstidInfo.perioder,
                          søknadsperioder
                      )
                    : undefined,
                selvstendig: ytelse.arbeidstid.selvstendigNæringsdrivendeArbeidstidInfo?.perioder
                    ? getAktivitetArbeidstidFromK9Format(
                          ytelse.arbeidstid.selvstendigNæringsdrivendeArbeidstidInfo.perioder,
                          søknadsperioder
                      )
                    : undefined,
            },
        },
    };

    return sak;
};
