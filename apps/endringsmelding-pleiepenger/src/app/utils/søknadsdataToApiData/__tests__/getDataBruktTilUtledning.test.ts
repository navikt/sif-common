import { ISODateToDate } from '@navikt/sif-common-utils';
import {
    ArbeiderIPeriodenSvar,
    ArbeidsforholdAktivt,
    ArbeidsgiverForEndring,
    ArbeidstidSøknadsdata,
    TimerEllerProsent,
} from '../../../types';
import {
    getDataBruktTilUtledningAnnetDataApiData,
    getUkjentArbeidsforholdApiDataFromSøknadsdata,
    mapArbeidsforholdToArbeidsforholdApiData,
} from '../getDataBruktTilUtledning';

describe('getDataBruktTilUtledningAnnetData', () => {
    it('returnerer riktig valgte endringer når kun ferie er valgt', () => {
        const result = getDataBruktTilUtledningAnnetDataApiData({ lovbestemtFerie: true, arbeidstid: false });
        expect(result.valgteEndringer.lovbestemtFerie).toBeTruthy();
        expect(result.valgteEndringer.arbeidstid).toBeFalsy();
    });
    it('returnerer riktig valgte endringer når kun arbeidstid er valgt', () => {
        const result = getDataBruktTilUtledningAnnetDataApiData({ arbeidstid: true, lovbestemtFerie: false });
        expect(result.valgteEndringer.arbeidstid).toBeTruthy();
        expect(result.valgteEndringer.lovbestemtFerie).toBeFalsy();
    });
    it('returnerer riktig valgte endringer når både ferie og arbeidstid er valgt', () => {
        const result = getDataBruktTilUtledningAnnetDataApiData({ arbeidstid: true, lovbestemtFerie: true });
        expect(result.valgteEndringer.lovbestemtFerie).toBeTruthy();
        expect(result.valgteEndringer.arbeidstid).toBeTruthy();
    });
});

describe('getUkjentArbeidsforholdApiDataFromSøknadsdata', () => {
    const arbeidsgivere: ArbeidsgiverForEndring[] = [
        {
            organisasjonsnummer: '123',
            key: 'a_123',
            navn: 'Arbeidsgibvernavn',
            ansettelsesperioder: [{ from: ISODateToDate('2001-01-01') }],
        },
    ];
    const arbeidstid: ArbeidstidSøknadsdata = {
        arbeidsaktivitet: {
            a_123: {
                endringer: {
                    '2020-01-01/2020-02-01': {
                        type: TimerEllerProsent.PROSENT,
                        prosent: 50,
                    },
                },
            },
        },
    };
    it('returnerer tomt array hvis ukjent arbeidsforhold er undefined', () => {
        expect(getUkjentArbeidsforholdApiDataFromSøknadsdata(undefined, undefined, arbeidsgivere)).toHaveLength(0);
        expect(getUkjentArbeidsforholdApiDataFromSøknadsdata(undefined, arbeidstid, arbeidsgivere)).toHaveLength(0);
    });
});

describe('mapArbeidsforholdToArbeidsforholdApiData', () => {
    const arbeidsgiver: ArbeidsgiverForEndring = {
        organisasjonsnummer: '123',
        key: 'a_123',
        navn: 'Arbeidsgibvernavn',
        ansettelsesperioder: [{ from: ISODateToDate('2001-01-01') }],
    };

    it('returnerer riktig hvis en ikke er ansatt i arbeidsforholdet', () => {
        const result = mapArbeidsforholdToArbeidsforholdApiData(
            { arbeidsgiverKey: '123', erAnsatt: false },
            arbeidsgiver,
            undefined,
        );
        expect(result.erAnsatt).toBeFalsy();
        expect(result.organisasjonsnummer).toEqual('123');
    });

    describe('Hvis en er ansatt i arbeidsforholdet', () => {
        const arbeidsforhold: ArbeidsforholdAktivt = {
            arbeidsgiverKey: '123',
            erAnsatt: true,
            normalarbeidstid: { timerPerUke: { hours: '40', minutes: '5' } },
        };
        it('returnerer riktig når bruker jobber som normalt i perioden', () => {
            const result = mapArbeidsforholdToArbeidsforholdApiData(
                arbeidsforhold,
                arbeidsgiver,
                ArbeiderIPeriodenSvar.somVanlig,
            );
            expect(result.organisasjonsnummer).toEqual('123');
            expect(result.erAnsatt).toBeTruthy();
            if (result.erAnsatt) {
                expect(result.arbeiderIPerioden).toEqual(ArbeiderIPeriodenSvar.somVanlig);
                expect(result.normalarbeidstid.timerPerUke).toEqual('PT40H5M');
            }
        });
        it('returnerer riktig når en ikke jobber i perioden', () => {
            const result = mapArbeidsforholdToArbeidsforholdApiData(
                arbeidsforhold,
                arbeidsgiver,
                ArbeiderIPeriodenSvar.heltFravær,
            );
            expect(result.organisasjonsnummer).toEqual('123');
            expect(result.erAnsatt).toBeTruthy();
            if (result.erAnsatt) {
                expect(result.arbeiderIPerioden).toEqual(ArbeiderIPeriodenSvar.heltFravær);
                expect(result.normalarbeidstid.timerPerUke).toEqual('PT40H5M');
            }
        });
        it('returnerer riktig når en kombinerer jobb og pleiepenger i perioden', () => {
            const result = mapArbeidsforholdToArbeidsforholdApiData(
                arbeidsforhold,
                arbeidsgiver,
                ArbeiderIPeriodenSvar.redusert,
            );
            expect(result.organisasjonsnummer).toEqual('123');
            expect(result.erAnsatt).toBeTruthy();
            if (result.erAnsatt) {
                expect(result.arbeiderIPerioden).toEqual(ArbeiderIPeriodenSvar.redusert);
                expect(result.normalarbeidstid.timerPerUke).toEqual('PT40H5M');
            }
        });
    });
});
