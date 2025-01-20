import {
    DateRange,
    dateRangeToISODateRange,
    Duration,
    durationToISODuration,
    getDateRangesFromDates,
    ISODateToDate,
    sortDateRange,
} from '@navikt/sif-common-utils';
import {
    Arbeidsaktivitet,
    ArbeidstidArbeidsaktivitetMap,
    Arbeidsaktiviteter,
    ArbeidsaktivitetType,
    ArbeiderIPeriodenSvar,
    ArbeidsgiverForEndring,
    ArbeidstakerApiData,
    ArbeidstidApiData,
    ArbeidstidEndring,
    ArbeidstidEndringMap,
    ArbeidstidPeriodeApiDataMap,
    Arbeidsuke,
    ArbeidsukeMap,
    PeriodeMedArbeidstid,
    TimerEllerProsent,
    UkjentArbeidsforholdSøknadsdata,
} from '@types';
import { getArbeidsukerIArbeidsaktivitet } from '../../søknad/steps/arbeidstid/arbeidstidStepUtils';
import { getDagerFraEnkeltdagMap } from '../arbeidsukeUtils';
import { beregnEndretFaktiskArbeidstidPerDag, beregnSnittTimerPerDag } from '../beregnUtils';
import { getArbeidsaktivitetForUkjentArbeidsforhold } from '../ukjentArbeidsforholdUtils';

type ArbeidstidInfo = { perioder: ArbeidstidPeriodeApiDataMap };

const getAlleArbeidsukerIPerioder = (perioder: PeriodeMedArbeidstid[]): ArbeidsukeMap => {
    const arbeidsukerMap: ArbeidsukeMap = {};
    perioder.forEach(({ arbeidsuker }) => {
        Object.keys(arbeidsuker).forEach((key) => {
            arbeidsukerMap[key] = arbeidsuker[key];
        });
    });
    return arbeidsukerMap;
};

const getEndretArbeidstid = (
    endringUkeMap: ArbeidstidEndringMap,
    arbeidsaktivitet: Arbeidsaktivitet,
): ArbeidstidPeriodeApiDataMap => {
    const perioderMedEndretArbeidstid: ArbeidstidPeriodeApiDataMap = {};

    const endringKeys = Object.keys(endringUkeMap).sort();

    endringKeys.forEach((isoDateRange) => {
        const endring = endringUkeMap[isoDateRange];
        const arbeidsuker = getAlleArbeidsukerIPerioder(arbeidsaktivitet.perioderMedArbeidstid);
        const arbeidsuke = arbeidsuker[isoDateRange];
        const dagerSøktFor = getDagerFraEnkeltdagMap(arbeidsuke.arbeidstidEnkeltdager);
        const { antallDagerMedArbeidstid } = arbeidsuke;

        const jobberNormaltTimerPerDag = beregnSnittTimerPerDag(arbeidsuke.normalt.uke, antallDagerMedArbeidstid);
        const faktiskArbeidTimerPerDag = beregnEndretFaktiskArbeidstidPerDag(
            arbeidsuke.normalt.uke,
            endring,
            antallDagerMedArbeidstid,
        );

        /** Splitt opp hvis det er enkeltdager i uken */
        const perioder = getDateRangesFromDates(dagerSøktFor.map(ISODateToDate));
        perioder.sort(sortDateRange).forEach((periode) => {
            perioderMedEndretArbeidstid[dateRangeToISODateRange(periode)] = {
                jobberNormaltTimerPerDag: durationToISODuration(jobberNormaltTimerPerDag),
                faktiskArbeidTimerPerDag: durationToISODuration(faktiskArbeidTimerPerDag),
                _endretProsent: endring.type === TimerEllerProsent.PROSENT ? endring.prosent : undefined,
                _opprinneligNormaltPerDag: durationToISODuration(arbeidsuke.normalt.dag),
                _opprinneligFaktiskPerDag: arbeidsuke.faktisk
                    ? durationToISODuration(arbeidsuke.faktisk.dag)
                    : undefined,
            };
        });
    });

    return perioderMedEndretArbeidstid;
};

const getArbeidsaktivitetArbeidstidInfo = (
    aktivitet: Arbeidsaktivitet,
    aktivitetEndring?: ArbeidstidEndringMap,
): ArbeidstidInfo | undefined => {
    if (aktivitetEndring && aktivitet && Object.keys(aktivitetEndring).length > 0) {
        return {
            perioder: getEndretArbeidstid(aktivitetEndring, aktivitet),
        };
    }
    return undefined;
};

export const getArbeidstidApiDataFromSøknadsdata = (
    endringsperiode: DateRange,
    søknadsperioder: DateRange[],
    arbeidsaktivitetEndring: ArbeidstidArbeidsaktivitetMap,
    arbeidsaktiviteter: Arbeidsaktiviteter,
    arbeidsgivereIkkeISak: ArbeidsgiverForEndring[],
    ukjentArbeidsforhold?: UkjentArbeidsforholdSøknadsdata,
): ArbeidstidApiData => {
    const frilansAktivitetEndring = arbeidsaktivitetEndring[ArbeidsaktivitetType.frilanser]?.endringer;
    const selvstendigNæringsdrivendeAktivitetEndring =
        arbeidsaktivitetEndring[ArbeidsaktivitetType.selvstendigNæringsdrivende]?.endringer;
    const arbeidstakerList: ArbeidstakerApiData[] = [];

    /** Eksisterende arbeidsaktiviteter */
    arbeidsaktiviteter.arbeidstakerAktiviteter.forEach((aktivitet) => {
        const endringer = arbeidsaktivitetEndring[aktivitet.key]?.endringer;

        if (endringer) {
            const {
                arbeidsgiver: { organisasjonsnummer, navn },
            } = aktivitet;
            const arbeidstidInfo = getArbeidsaktivitetArbeidstidInfo(aktivitet, endringer);
            if (arbeidstidInfo) {
                arbeidstakerList.push({
                    organisasjonsnavn: navn,
                    organisasjonsnummer,
                    arbeidstidInfo,
                    _erUkjentArbeidsforhold: false,
                });
            }
        }
    });

    /** Ukjente arbeidsgivere */
    if (ukjentArbeidsforhold) {
        arbeidsgivereIkkeISak.forEach((arbeidsgiver) => {
            const endring = arbeidsaktivitetEndring[arbeidsgiver.key];
            if (!endring) {
                return;
            }
            const { arbeiderIPerioden } = endring;
            const arbeidsforhold = ukjentArbeidsforhold.arbeidsforhold.find(
                (a) => a.arbeidsgiverKey === arbeidsgiver.key,
            );
            if (!arbeidsforhold || !arbeiderIPerioden) {
                throw 'Ukjent arbeidsgiver mangler informasjon om arbeidstid';
            }
            if (arbeidsforhold.erAnsatt === false) {
                return;
            }

            const arbeidsaktivitet = getArbeidsaktivitetForUkjentArbeidsforhold(
                søknadsperioder,
                arbeidsgiver,
                arbeidsforhold,
                endringsperiode,
            );

            const arbeidsuker = getArbeidsukerIArbeidsaktivitet(arbeidsaktivitet);
            const arbeidstidInfo: ArbeidstidInfo = {
                perioder: {},
            };
            Object.keys(arbeidsuker).forEach((key) => {
                const arbeidsuke = arbeidsuker[key];
                const ukeEndring = endring.endringer[key];

                const faktiskArbeidTimerPerDag = getFaktiskArbeidTimerPerDagForUkjentArbeidsforhold(
                    arbeiderIPerioden,
                    arbeidsuke,
                    ukeEndring,
                );

                const jobberNormaltTimerPerDag = beregnSnittTimerPerDag(
                    arbeidsuke.normalt.uke,
                    arbeidsuke.antallDagerMedArbeidstid,
                );

                /** Splitt opp hvis det er enkeltdager i uken */
                const dagerSøktFor = getDagerFraEnkeltdagMap(arbeidsuke.arbeidstidEnkeltdager);
                const perioder = getDateRangesFromDates(dagerSøktFor.map(ISODateToDate));
                perioder.sort(sortDateRange).forEach((periode) => {
                    arbeidstidInfo.perioder[dateRangeToISODateRange(periode)] = {
                        jobberNormaltTimerPerDag: durationToISODuration(jobberNormaltTimerPerDag),
                        faktiskArbeidTimerPerDag: durationToISODuration(faktiskArbeidTimerPerDag),
                        _endretProsent:
                            ukeEndring !== undefined && ukeEndring.type === TimerEllerProsent.PROSENT
                                ? ukeEndring.prosent
                                : undefined,
                        _opprinneligNormaltPerDag: durationToISODuration(arbeidsuke.normalt.dag),
                        _opprinneligFaktiskPerDag: arbeidsuke.faktisk
                            ? durationToISODuration(arbeidsuke.faktisk.dag)
                            : undefined,
                    };
                });
            });

            arbeidstakerList.push({
                _erUkjentArbeidsforhold: true,
                _arbeiderIPerioden: arbeiderIPerioden,
                arbeidstidInfo,
                organisasjonsnummer: arbeidsgiver.organisasjonsnummer,
                organisasjonsnavn: arbeidsgiver.navn,
            });
        });
    }

    return {
        arbeidstakerList,
        frilanserArbeidstidInfo: arbeidsaktiviteter.frilanser
            ? getArbeidsaktivitetArbeidstidInfo(arbeidsaktiviteter.frilanser, frilansAktivitetEndring)
            : undefined,
        selvstendigNæringsdrivendeArbeidstidInfo: arbeidsaktiviteter.selvstendigNæringsdrivende
            ? getArbeidsaktivitetArbeidstidInfo(
                  arbeidsaktiviteter.selvstendigNæringsdrivende,
                  selvstendigNæringsdrivendeAktivitetEndring,
              )
            : undefined,
    };
};

export const getFaktiskArbeidTimerPerDagForUkjentArbeidsforhold = (
    arbeiderIPerioden: ArbeiderIPeriodenSvar,
    arbeidsuke: Pick<Arbeidsuke, 'normalt' | 'antallDagerMedArbeidstid'>,
    endring?: ArbeidstidEndring,
): Duration => {
    if (!endring && arbeiderIPerioden === ArbeiderIPeriodenSvar.redusert) {
        throw 'Faktisk arbeidstid mangler for redusert arbeidsforhold';
    }
    if (endring) {
        return beregnEndretFaktiskArbeidstidPerDag(
            arbeidsuke.normalt.uke,
            endring,
            arbeidsuke.antallDagerMedArbeidstid,
        );
    }
    return arbeiderIPerioden === ArbeiderIPeriodenSvar.heltFravær
        ? {
              hours: '0',
              minutes: '0',
          }
        : arbeidsuke.normalt.dag;
};
