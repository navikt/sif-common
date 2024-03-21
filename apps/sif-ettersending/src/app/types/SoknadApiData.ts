import { Locale } from '@navikt/sif-common-core-ds/src/types/Locale';

export type ISO8601Duration = string;

export enum YtelseTypeApi {
    'PLEIEPENGER_SYKT_BARN' = 'PLEIEPENGER_SYKT_BARN',
    'PLEIEPENGER_LIVETS_SLUTTFASE' = 'PLEIEPENGER_LIVETS_SLUTTFASE',
    'OMP_UTV_KS' = 'OMP_UTV_KS',
    'OMP_UT_SNF' = 'OMP_UT_SNF',
    'OMP_UT_ARBEIDSTAKER' = 'OMP_UT_ARBEIDSTAKER',
    'OMP_UTV_MA' = 'OMP_UTV_MA',
    // 'OMP_ALENEOMSORG' = 'OMP_ALENEOMSORG', ikke i bruk frem til backend støtter denne
}

export interface BarnetLegeerklæringGjelderApiData {
    fødselsnummer?: string;
    aktørId?: string;
}

export interface SoknadApiData {
    id: string;
    språk: Locale;
    harForståttRettigheterOgPlikter: boolean;
    harBekreftetOpplysninger: boolean;
    beskrivelse?: string;
    isLegeerklæring?: boolean;
    barn?: BarnetLegeerklæringGjelderApiData;
    vedlegg: string[];
    søknadstype: YtelseTypeApi;
    ytelseTittel: string;
}
