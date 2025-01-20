import {
    DateRange,
    dateRangeToISODateRange,
    dateToISODate,
    Duration,
    ensureDateRange,
    getDateRangeFromDateRanges,
    getDateRangesWithinDateRange,
    getDatesInDateRange,
    getWeeksInDateRange,
} from '@navikt/sif-common-utils';
import {
    ArbeiderIPeriodenSvar,
    Arbeidsaktivitet,
    ArbeidsaktivitetType,
    ArbeidsforholdAktivt,
    ArbeidsgiverForEndring,
    ArbeidstidEnkeltdagMap,
    ArbeidstidPerDag,
    ArbeidsukeMap,
    PeriodeMedArbeidstid,
    UkjentArbeidsforholdSøknadsdata,
} from '@types';
import { ArbeidsaktivitetFormValuesMap } from '../søknad/steps/arbeidstid/ArbeidstidForm';
// import { getArbeidsukeFromEnkeltdagerIUken } from './arbeidsukeUtils';
import { beregnSnittTimerPerDag } from './beregnUtils';
import { getArbeidsukeFromEnkeltdagerIUken } from './getSakFromK9Sak';
import { getEndringsdato, getTillattEndringsperiode } from './endringsperiode';

export const getSøknadsperioderForUkjentArbeidsforhold = (
    søknadsperioder: DateRange[],
    ansattFom: Date | undefined,
    ansattTom: Date | undefined,
): DateRange[] => {
    const alleSøknadsperioder: DateRange = getDateRangeFromDateRanges(søknadsperioder);
    /** TODO - sjekke denne opp mot flere ansattelsesperioder */
    const ansettelsesperiode = {
        from: ansattFom || alleSøknadsperioder.from,
        to: ansattTom || alleSøknadsperioder.to,
    };
    return ansettelsesperiode ? getDateRangesWithinDateRange(søknadsperioder, ansettelsesperiode) : søknadsperioder;
};

export const getPerioderMedArbeidstidForUkjentArbeidsforhold = (
    søknadsperioder: DateRange[],
    { ansettelsesperioder }: ArbeidsgiverForEndring,
    normalarbeidstidPerUke: Duration,
    faktiskArbeidstidPerUke: Duration | undefined,
): PeriodeMedArbeidstid[] => {
    if (ansettelsesperioder.length === 0) {
        return [];
    }
    /** TODO - håndtere flere ansettelsesperioder */
    const søknadsperioderForArbeidsforhold =
        ansettelsesperioder.length === 1
            ? getSøknadsperioderForUkjentArbeidsforhold(
                  søknadsperioder,
                  ansettelsesperioder[0].from,
                  ansettelsesperioder[0].to,
              )
            : [];
    const perioderMedArbeidstid: PeriodeMedArbeidstid[] = [];

    const arbeidstidPerDag: ArbeidstidPerDag = {
        faktisk: faktiskArbeidstidPerUke ? beregnSnittTimerPerDag(faktiskArbeidstidPerUke, 5) : undefined,
        normalt: beregnSnittTimerPerDag(normalarbeidstidPerUke, 5),
    };
    søknadsperioderForArbeidsforhold.forEach((periode) => {
        const uker = getWeeksInDateRange(periode);
        const arbeidsuker: ArbeidsukeMap = {};
        uker.forEach((uke) => {
            const enkeldagerMap: ArbeidstidEnkeltdagMap = {};
            getDatesInDateRange(uke, true).forEach((date) => {
                enkeldagerMap[dateToISODate(date)] = arbeidstidPerDag;
            });
            arbeidsuker[dateRangeToISODateRange(uke)] = getArbeidsukeFromEnkeltdagerIUken(
                uke,
                enkeldagerMap,
                [getTillattEndringsperiode(getEndringsdato())], // TODO - fikses når andre todos i denne er tatt
            );
        });
        perioderMedArbeidstid.push({
            arbeidsuker,
            ...periode,
        });
    });
    return perioderMedArbeidstid;
};

export const getFaktiskArbeidstidPerUkeForUkjentArbeidsforhold = (
    arbeidsforhold: ArbeidsforholdAktivt,
    arbeiderIPerioden?: ArbeiderIPeriodenSvar,
): Duration | undefined => {
    switch (arbeiderIPerioden) {
        case ArbeiderIPeriodenSvar.heltFravær:
            return { hours: '0', minutes: '0' };
        case ArbeiderIPeriodenSvar.somVanlig:
            return { ...arbeidsforhold.normalarbeidstid.timerPerUke };
        case ArbeiderIPeriodenSvar.redusert:
        default:
            return undefined;
    }
};

export const getArbeidsaktivitetForUkjentArbeidsforhold = (
    søknadsperioder: DateRange[],
    arbeidsgiver: ArbeidsgiverForEndring,
    arbeidsforhold: ArbeidsforholdAktivt,
    endringsperiode: DateRange,
    arbeiderIPerioden?: ArbeiderIPeriodenSvar,
): Arbeidsaktivitet => {
    const faktiskArbeidstid = getFaktiskArbeidstidPerUkeForUkjentArbeidsforhold(arbeidsforhold, arbeiderIPerioden);

    const aktivitet: Arbeidsaktivitet = {
        key: arbeidsgiver.key,
        type: ArbeidsaktivitetType.arbeidstaker,
        arbeidsgiver,
        erUkjentArbeidsforhold: true,
        navn: arbeidsgiver.navn,
        harPerioderEtterTillattEndringsperiode: false,
        harPerioderFørTillattEndringsperiode: false,
        ansettelsesperioderInnenforEndringsperiode: arbeidsgiver.ansettelsesperioder.map((periode) =>
            ensureDateRange(periode, endringsperiode),
        ),
        perioderMedArbeidstid: getPerioderMedArbeidstidForUkjentArbeidsforhold(
            søknadsperioder,
            arbeidsgiver,
            arbeidsforhold.normalarbeidstid.timerPerUke,
            faktiskArbeidstid,
        ),
    };
    return aktivitet;
};

export const getArbeidsaktiviteterForUkjenteArbeidsforhold = (
    søknadsperioder: DateRange[],
    arbeidsgivereIkkeISak: ArbeidsgiverForEndring[],
    arbeidsaktivitetFormValues: ArbeidsaktivitetFormValuesMap,
    endringsperiode: DateRange,
    ukjentArbeidsforhold?: UkjentArbeidsforholdSøknadsdata,
): Arbeidsaktivitet[] => {
    const aktiviteter: Arbeidsaktivitet[] = [];
    arbeidsgivereIkkeISak.forEach((arbeidsgiver) => {
        const arbeidsforhold = ukjentArbeidsforhold?.arbeidsforhold.find((s) => s.arbeidsgiverKey === arbeidsgiver.key);
        if (!arbeidsforhold) {
            throw 'UkjentArbeidsforholdinfo mangler for arbeidsgiver';
        }
        if (arbeidsforhold.erAnsatt === false) {
            return;
        }
        const arbeiderIPerioden = arbeidsaktivitetFormValues[arbeidsgiver.key]?.arbeiderIPerioden;
        aktiviteter.push(
            getArbeidsaktivitetForUkjentArbeidsforhold(
                søknadsperioder,
                arbeidsgiver,
                arbeidsforhold,
                endringsperiode,
                arbeiderIPerioden,
            ),
        );
    });
    return aktiviteter;
};
