import { ISODate, ISODateRangeMap, ISODuration } from '@navikt/sif-common-utils';
import { ArbeiderIPeriodenSvar } from './ArbeiderIPeriodenSvar';
import { LovbestemtFerieType } from './LovbestemtFerieType';
import { ValgteEndringer } from './ValgteEndringer';

export type ArbeidstidPeriodeApiData = {
    jobberNormaltTimerPerDag: ISODuration;
    faktiskArbeidTimerPerDag: ISODuration;
    _endretProsent?: number;
    _opprinneligNormaltPerDag: ISODuration;
    _opprinneligFaktiskPerDag?: ISODuration;
};

export type ArbeidstidPeriodeApiDataMap = ISODateRangeMap<ArbeidstidPeriodeApiData>;

export interface ArbeidstakerApiData {
    organisasjonsnummer: string;
    arbeidstidInfo: {
        perioder: ArbeidstidPeriodeApiDataMap;
    };
    _erUkjentArbeidsforhold: boolean;
    _arbeiderIPerioden?: ArbeiderIPeriodenSvar;
}

export interface ArbeidstidApiData {
    arbeidstakerList: ArbeidstakerApiData[];
    frilanserArbeidstidInfo?: {
        perioder: ArbeidstidPeriodeApiDataMap;
    };
    selvstendigNæringsdrivendeArbeidstidInfo?: {
        perioder: ArbeidstidPeriodeApiDataMap;
    };
}

export type LovbestemtFerieApiData = {
    perioder: ISODateRangeMap<LovbestemtFerieType>;
};

interface BarnApiData {
    fødselsdato?: ISODate;
    norskIdentitetsnummer: string;
}

interface ArbeidsgiverMedNavn {
    organisasjonsnummer: string;
    navn: string;
}
export interface DataBruktTilUtledningApiData {
    soknadDialogCommitSha: string;
    valgteEndringer: ValgteEndringer;
    ukjenteArbeidsforhold?: UkjentArbeidsforholdApiData[];
    arbeidsgivere: ArbeidsgiverMedNavn[];
}

interface YtelseApiData {
    type: 'PLEIEPENGER_SYKT_BARN';
    arbeidstid?: ArbeidstidApiData;
    lovbestemtFerie?: LovbestemtFerieApiData;
    barn: BarnApiData;
    dataBruktTilUtledning: DataBruktTilUtledningApiData;
}

interface UkjentArbeidsforholdApiDataBase {
    organisasjonsnummer: string;
    erAnsatt: boolean;
}

interface UkjentArbeidsforholdApiDataErAnsatt extends UkjentArbeidsforholdApiDataBase {
    erAnsatt: true;
    normalarbeidstid: {
        timerPerUke: ISODuration;
    };
    arbeiderIPerioden: ArbeiderIPeriodenSvar;
}
interface UkjentArbeidsforholdApiDataErIkkeAnsatt extends UkjentArbeidsforholdApiDataBase {
    erAnsatt: false;
}

export type UkjentArbeidsforholdApiData = UkjentArbeidsforholdApiDataErAnsatt | UkjentArbeidsforholdApiDataErIkkeAnsatt;

export interface SøknadApiData {
    id: string;
    språk: string;
    harForståttRettigheterOgPlikter: boolean;
    harBekreftetOpplysninger: boolean;
    ytelse: YtelseApiData;
}
