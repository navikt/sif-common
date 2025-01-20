import { DateRange } from '@navikt/sif-common-utils';
import { ArbeidsgiverForEndring, K9Sak, K9SakArbeidstaker, Sak } from '@types';
import { maskString } from './maskString';

const maskK9Arbeidstaker = (k9Arbeidstaker: K9SakArbeidstaker) => {
    return {
        id: maskString(k9Arbeidstaker.organisasjonsnummer),
        arbeidstidInfo: k9Arbeidstaker.arbeidstidInfo,
    };
};

export const maskK9Sak = (sak: K9Sak) => {
    const { ytelse } = sak;
    const { søknadsperioder, arbeidstid } = ytelse;
    const { arbeidstakerList } = arbeidstid;

    return {
        ytelse: {
            søknadsperioder,
            arbeidstid: {
                arbeidstakerList: arbeidstakerList?.map(maskK9Arbeidstaker),
                selvstendigNæringsdrivendeArbeidstidInfo: sak.ytelse.arbeidstid.selvstendigNæringsdrivendeArbeidstidInfo
                    ? sak.ytelse.arbeidstid.selvstendigNæringsdrivendeArbeidstidInfo.perioder
                    : undefined,
                frilanserArbeidstidInfo: sak.ytelse.arbeidstid.frilanserArbeidstidInfo
                    ? sak.ytelse.arbeidstid.frilanserArbeidstidInfo.perioder
                    : undefined,
            },
        },
    };
};

const maskSak = (sak: Sak) => {
    return {
        arbeidsaktiviteter: sak.utledet.aktiviteterSomKanEndres.map((aktivitet) => ({
            id: maskString(aktivitet.key),
            perioderMedArbeidstid: aktivitet.perioderMedArbeidstid,
        })),
    };
};

const maskArbeidsgivere = (arbeidsgivere: ArbeidsgiverForEndring[]) => {
    return arbeidsgivere.map((a) => ({
        ansettelsesperioder: a.ansettelsesperioder,
        a: maskString(a.key),
    }));
};

export const getSakOgArbeidsgivereDebugInfo = (
    k9sak: K9Sak,
    sak: Sak,
    arbeidsgivere: ArbeidsgiverForEndring[],
    endringsperiode: DateRange,
) => {
    return {
        k9sak: maskK9Sak(k9sak),
        sak: maskSak(sak),
        arbeidsgivere: maskArbeidsgivere(arbeidsgivere),
        endringsperiode,
    };
};
