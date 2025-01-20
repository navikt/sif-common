import { durationToISODuration } from '@navikt/sif-common-utils';
import {
    ArbeiderIPeriodenSvar,
    Arbeidsforhold,
    ArbeidsgiverForEndring,
    ArbeidstidSøknadsdata,
    DataBruktTilUtledningApiData,
    DataBruktTilUtledningApiDataAnnetData as DataBruktTilUtledningAnnetDataApiData,
    UkjentArbeidsforholdApiData,
    UkjentArbeidsforholdSøknadsdata,
    ValgteEndringer,
} from '@types';
import { getOrgNummerFromArbeidsgiverKey } from '../arbeidsgiverUtils';

export const getDataBruktTilUtledningApiData = (
    ukjentArbeidsforhold: UkjentArbeidsforholdSøknadsdata | undefined,
    arbeidstid: ArbeidstidSøknadsdata | undefined,
    arbeidsgivere: ArbeidsgiverForEndring[],
): DataBruktTilUtledningApiData => {
    return {
        ukjenteArbeidsforhold: getUkjentArbeidsforholdApiDataFromSøknadsdata(
            ukjentArbeidsforhold?.arbeidsforhold,
            arbeidstid,
            arbeidsgivere,
        ),
    };
};
export const getDataBruktTilUtledningAnnetDataApiData = (
    valgteEndringer: ValgteEndringer,
): DataBruktTilUtledningAnnetDataApiData => {
    return {
        valgteEndringer,
    };
};

export const mapArbeidsforholdToArbeidsforholdApiData = (
    arbeidsforhold: Arbeidsforhold,
    arbeidsgiver: ArbeidsgiverForEndring,
    arbeiderIPerioden?: ArbeiderIPeriodenSvar,
): UkjentArbeidsforholdApiData => {
    const organisasjonsnummer = getOrgNummerFromArbeidsgiverKey(arbeidsforhold.arbeidsgiverKey);
    if (arbeidsforhold.erAnsatt) {
        if (!arbeiderIPerioden) {
            throw 'mapArbeidsforholdToArbeidsforholdApiData: arbeiderIPerioden er ikke besvart ukjent arbeidsforhold hvor en er ansatt';
        }
        return {
            organisasjonsnummer,
            organisasjonsnavn: arbeidsgiver.navn,
            erAnsatt: true,
            arbeiderIPerioden,
            normalarbeidstid: {
                timerPerUke: durationToISODuration(arbeidsforhold.normalarbeidstid.timerPerUke),
            },
        };
    }
    return {
        organisasjonsnummer,
        organisasjonsnavn: arbeidsgiver.navn,
        erAnsatt: false,
    };
};

export const getUkjentArbeidsforholdApiDataFromSøknadsdata = (
    ukjenteArbeidsforhold: Arbeidsforhold[] | undefined,
    arbeidstid: ArbeidstidSøknadsdata | undefined,
    arbeidsgivere: ArbeidsgiverForEndring[],
): UkjentArbeidsforholdApiData[] => {
    if (ukjenteArbeidsforhold === undefined) {
        return [];
    }
    return ukjenteArbeidsforhold.map((arbeidsforhold): UkjentArbeidsforholdApiData => {
        const arbeiderIPerioden = arbeidstid
            ? arbeidstid.arbeidsaktivitet[arbeidsforhold.arbeidsgiverKey]?.arbeiderIPerioden
            : undefined;
        const arbeidsgiver = arbeidsgivere.find((a) => a.key === arbeidsforhold.arbeidsgiverKey);
        if (!arbeidsgiver) {
            throw 'Arbeidsgiver ikke funnet for arbeidsforhold';
        }
        return mapArbeidsforholdToArbeidsforholdApiData(arbeidsforhold, arbeidsgiver, arbeiderIPerioden);
    });
};
