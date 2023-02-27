import { ISODate, ISODateRange, ISODuration } from '@navikt/sif-common-utils/lib';

export type ArbeidstidPeriodeApiData = {
    jobberNormaltTimerPerDag: ISODuration;
    faktiskArbeidTimerPerDag: ISODuration;
    _endretProsent?: number;
    _opprinneligNormaltPerDag: ISODuration;
    _opprinneligFaktiskPerDag: ISODuration;
};

export type ArbeidstidPeriodeApiDataMap = {
    [key: ISODateRange]: ArbeidstidPeriodeApiData;
};

export interface ArbeidstakerApiData {
    norskIdentitetsnummer?: string;
    organisasjonsnummer: string;
    arbeidstidInfo: {
        perioder: ArbeidstidPeriodeApiDataMap;
    };
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

interface BarnApiData {
    fødselsdato?: ISODate;
    norskIdentitetsnummer: string;
}

interface YtelseApiData {
    type: 'PLEIEPENGER_SYKT_BARN';
    arbeidstid: ArbeidstidApiData;
    barn: BarnApiData;
    dataBruktTilUtledning: {
        soknadDialogCommitSha: string;
    };
}

export interface SøknadApiData {
    id: string;
    språk: string;
    harForståttRettigheterOgPlikter: boolean;
    harBekreftetOpplysninger: boolean;
    ytelse: YtelseApiData;
}
