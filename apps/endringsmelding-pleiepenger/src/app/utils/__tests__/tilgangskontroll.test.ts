import { DateRange, ISODateRangeToDateRange, ISODurationToDuration } from '@navikt/sif-common-utils';
import { ArbeidsgiverForEndring, K9SakArbeidstaker, K9SakArbeidstidPeriodeMap } from '@types';
import { tilgangskontroll, tilgangskontrollUtils } from '../tilgangskontroll';
import { vi } from 'vitest';

const arbeidsgiver1: ArbeidsgiverForEndring = { key: 'a_1', organisasjonsnummer: '1' } as ArbeidsgiverForEndring;
const arbeidsgiver2: ArbeidsgiverForEndring = { key: 'a_2', organisasjonsnummer: '2' } as ArbeidsgiverForEndring;
const arbeidsgiver3: ArbeidsgiverForEndring = { key: 'a_3', organisasjonsnummer: '3' } as ArbeidsgiverForEndring;

const arbeidstaker1: K9SakArbeidstaker = { organisasjonsnummer: '1' } as K9SakArbeidstaker;
const arbeidstaker2: K9SakArbeidstaker = { organisasjonsnummer: '2' } as K9SakArbeidstaker;

vi.mock('@navikt/sif-common-env', () => ({
    getRequiredEnv: () => {
        return false;
    },
}));

vi.mock('../featureToggleUtils', () => ({
    Feature: {
        UKJENT_ARBEIDSFOHOLD: 'on',
    },
    isFeatureEnabled: () => {
        return true;
    },
}));

describe('tilgangskontroll', () => {
    const tillattEndringsperiode = ISODateRangeToDateRange('2022-01-01/2023-03-01');

    it('stopper ved ingen sak', () => {
        const result = tilgangskontroll([], tillattEndringsperiode);
        expect(result.kanBrukeSøknad).toBeFalsy();
    });
    it('stopper hvis bruker har flere enn én sak', () => {
        const result = tilgangskontroll([true, false] as any, tillattEndringsperiode);
        expect(result.kanBrukeSøknad).toBeFalsy();
    });
});

describe('harArbeidsgiverUtenArbeidstakerK9Sak', () => {
    it('returnerer true hvis arbeidsgiver ikke har arbeidsaktivitet i sak', () => {
        const result = tilgangskontrollUtils.harArbeidsgiverUtenArbeidsaktivitet(
            [arbeidsgiver3],
            [arbeidstaker1, arbeidstaker2],
        );
        expect(result).toBeTruthy();
    });
    it('returnerer false hvis alle arbeidsgivere har arbeidsaktivitet i sak', () => {
        const result = tilgangskontrollUtils.harArbeidsgiverUtenArbeidsaktivitet(
            [arbeidsgiver1, arbeidsgiver2],
            [arbeidstaker1, arbeidstaker2],
        );
        expect(result).toBeFalsy();
    });
});

describe('harSakSøknadsperiodeInnenforTillattEndringsperiode', () => {
    const tillatEndringsperiode = ISODateRangeToDateRange('2022-01-02/2022-02-01');
    const søknadsperiodeUtenfor: DateRange = ISODateRangeToDateRange('2022-01-01/2022-01-01');
    const søknadsperiodeInnenfor: DateRange = ISODateRangeToDateRange('2022-01-02/2022-02-01');

    it('returnerer true hvis søknadsperioder er innenfor tillatt endringsperiode', () => {
        const result = tilgangskontrollUtils.harSøknadsperiodeInnenforTillattEndringsperiode(
            søknadsperiodeInnenfor,
            tillatEndringsperiode,
        );
        expect(result).toBeTruthy();
    });

    it('returnerer false hvis søknadsperioder er før tillatt endringsperiode', () => {
        const result = tilgangskontrollUtils.harSøknadsperiodeInnenforTillattEndringsperiode(
            søknadsperiodeUtenfor,
            tillatEndringsperiode,
        );
        expect(result).toBeFalsy();
    });
});

describe('ingenTilgangMeta', () => {
    const perioder: K9SakArbeidstidPeriodeMap = {
        '2020-01-01/2020-02-01': {
            faktiskArbeidTimerPerDag: ISODurationToDuration('PT10H0M'),
            jobberNormaltTimerPerDag: ISODurationToDuration('PT10H0M'),
        },
    };
    const perioderIngenTid: K9SakArbeidstidPeriodeMap = {
        '2020-01-01/2020-02-01': {
            faktiskArbeidTimerPerDag: ISODurationToDuration('PT0H0M'),
            jobberNormaltTimerPerDag: ISODurationToDuration('PT0H0M'),
        },
    };
    const arbeidstaker: K9SakArbeidstaker = {
        arbeidstidInfo: { perioder },
        organisasjonsnummer: '234',
    };

    it('returnerer erArbeidstaker: true når bruker er arbeidstaker', () => {
        const result = tilgangskontrollUtils.getIngenTilgangMeta({
            arbeidstakerList: [arbeidstaker],
        });
        expect(result.erArbeidstaker).toBeTruthy();
    });
    it('returnerer erArbeidstaker: false når bruker ikke er arbeidstaker', () => {
        const result = tilgangskontrollUtils.getIngenTilgangMeta({
            arbeidstakerList: [],
        });
        expect(result.erArbeidstaker).toBeFalsy();
    });
    it('returnerer erFrilanser:false hvis bruker ikke har timer som frilanser', () => {
        const result = tilgangskontrollUtils.getIngenTilgangMeta({
            arbeidstakerList: [],
            frilanserArbeidstidInfo: { perioder: perioderIngenTid },
            selvstendigNæringsdrivendeArbeidstidInfo: { perioder: perioder },
        });
        expect(result.erFrilanser).toBeFalsy();
    });
    it('returnerer erFrilanser:true hvis bruker har timer som frilanser', () => {
        const result = tilgangskontrollUtils.getIngenTilgangMeta({
            arbeidstakerList: [],
            frilanserArbeidstidInfo: { perioder: perioder },
            selvstendigNæringsdrivendeArbeidstidInfo: { perioder: perioder },
        });
        expect(result.erFrilanser).toBeTruthy();
    });
    it('returnerer erSN: true når bruker er SN', () => {
        const result = tilgangskontrollUtils.getIngenTilgangMeta({
            selvstendigNæringsdrivendeArbeidstidInfo: { perioder },
        });
        expect(result.erSN).toBeTruthy();
    });
    it('returnerer erSN: false når bruker ikke er SN', () => {
        const result = tilgangskontrollUtils.getIngenTilgangMeta({
            selvstendigNæringsdrivendeArbeidstidInfo: undefined,
        });
        expect(result.erSN).toBeFalsy();
    });
    it('returnerer riktig når bruker er alt', () => {
        const result = tilgangskontrollUtils.getIngenTilgangMeta({
            arbeidstakerList: [arbeidstaker],
            frilanserArbeidstidInfo: { perioder: perioder },
            selvstendigNæringsdrivendeArbeidstidInfo: { perioder },
        });
        expect(result.erArbeidstaker).toBeTruthy();
        expect(result.erFrilanser).toBeTruthy();
        expect(result.erSN).toBeTruthy();
    });
});
