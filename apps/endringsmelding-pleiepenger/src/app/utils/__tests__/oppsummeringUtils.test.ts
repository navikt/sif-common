import { TimerEllerProsent } from '../../types/TimerEllerProsent';
import { harEndretArbeidstidForArbeidsgiver } from '../oppsummeringUtils';

describe('oppsummeringUtils', () => {
    describe('harEndretArbeidstidForArbeidsgiver', () => {
        it('returnerer false dersom endringer er undefined', () => {
            expect(harEndretArbeidstidForArbeidsgiver('123', undefined)).toBeFalsy();
        });
        it('returnerer false dersom endringer er defined, men ingen endringer for arbeidsgiver', () => {
            expect(
                harEndretArbeidstidForArbeidsgiver('123', [
                    {
                        _erUkjentArbeidsaktivitet: false,
                        arbeidstidInfo: {
                            perioder: {},
                        },
                        organisasjonsnummer: '456',
                    },
                ])
            ).toBeFalsy();
        });
        it('returnerer true dersom endringer er defined, og endringer finnes for arbeidsgiver', () => {
            expect(
                harEndretArbeidstidForArbeidsgiver('123', [
                    {
                        _erUkjentArbeidsaktivitet: false,
                        arbeidstidInfo: {
                            perioder: {
                                '2020-01-01/2020-02-01': {
                                    faktiskArbeidTimerPerDag: 'PT5H',
                                    jobberNormaltTimerPerDag: 'PT7H30M',
                                    _opprinneligNormaltPerDag: 'PT7H30M',
                                },
                            },
                        },
                        organisasjonsnummer: '123',
                    },
                ])
            ).toBeTruthy();
        });
    });
});
