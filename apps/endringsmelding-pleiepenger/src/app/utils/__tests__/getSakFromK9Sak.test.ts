import {
    DateRange,
    dateRangeToISODateRange,
    dateToISODate,
    Duration,
    durationToISODuration,
    ISODateRangeToDateRange,
    ISODateToDate,
    ISODuration,
    ISODurationToDuration,
} from '@navikt/sif-common-utils';
import {
    ArbeidsgiverForEndring,
    ArbeidstidEnkeltdagMap,
    FaktiskOgNormalArbeidstid,
    K9SakArbeidstidPeriodeMap,
} from '@types';
import { _getSakFromK9Sak } from '../getSakFromK9Sak';

const {
    getEndringsperiodeForArbeidsgiver,
    trimArbeidstidTilTillattEndringsperiode,
    getArbeidstidPerioderIDateRange,
    grupperArbeidstidPerioder,
    getArbeidstidEnkeltdagMapFromPerioder,
    getArbeidsukeFromEnkeltdagerIUken,
    getArbeidsukerFromEnkeltdager,
    erArbeidsgiverInnenforSøknadsperioder,
} = _getSakFromK9Sak;

const faktiskISODuration: ISODuration = 'PT2H0M';
const normaltISODuration: ISODuration = 'PT7H30M';

const faktiskArbeidTimerPerDag: Duration = ISODurationToDuration(faktiskISODuration);
const jobberNormaltTimerPerDag: Duration = ISODurationToDuration(normaltISODuration);

describe('getSakFromK9Sak', () => {
    describe('getEndringsperiodeForArbeidsgiver', () => {
        const isoFrom = '2022-01-03';
        const isoTo = '2022-02-01';
        const isoSluttdato = '2022-01-17';

        const endringsperiode: DateRange = { from: ISODateToDate(isoFrom), to: ISODateToDate(isoTo) };
        it('beholder uendret endringsperiode hvis bruker er fortsatt ansatt', () => {
            const result = getEndringsperiodeForArbeidsgiver(endringsperiode, {
                ansettelsesperioder: [{ to: undefined }],
            } as ArbeidsgiverForEndring);
            expect(dateToISODate(result.from)).toEqual(isoFrom);
            expect(dateToISODate(result.to)).toEqual(isoTo);
        });
        it('justerer endringsperiode hvis sluttdato er før endringsperiode sluttdato', () => {
            const result = getEndringsperiodeForArbeidsgiver(endringsperiode, {
                ansettelsesperioder: [{ to: ISODateToDate(isoSluttdato) }],
            } as ArbeidsgiverForEndring);
            expect(dateToISODate(result.from)).toEqual(isoFrom);
            expect(dateToISODate(result.to)).toEqual(isoSluttdato);
        });
    });

    describe('trimArbeidstidTilTillattEndringsperiode', () => {
        const isoPeriode1 = '2022-01-03/2022-01-14';
        const isoPeriode2 = '2022-01-17/2022-02-01';

        const perioder: K9SakArbeidstidPeriodeMap = {
            [isoPeriode1]: {
                faktiskArbeidTimerPerDag,
                jobberNormaltTimerPerDag,
            },
            [isoPeriode2]: {
                faktiskArbeidTimerPerDag,
                jobberNormaltTimerPerDag,
            },
        };
        it('beholder alle perioder når endringsperioden er større enn perioder på sak', () => {
            const tillattPeriode = ISODateRangeToDateRange('2021-12-31/2022-02-02');
            const result = trimArbeidstidTilTillattEndringsperiode(perioder, tillattPeriode);
            const keys = Object.keys(result);
            expect(keys[0]).toEqual(isoPeriode1);
            expect(keys[1]).toEqual(isoPeriode2);
        });
        it('endrer startdato i en periode hvis endringsperioden ikke dekker hele perioden', () => {
            const tillattPeriode = ISODateRangeToDateRange('2022-01-05/2022-02-02');
            const result = trimArbeidstidTilTillattEndringsperiode(perioder, tillattPeriode);
            const keys = Object.keys(result);
            expect(keys[0]).toEqual('2022-01-05/2022-01-14');
            expect(keys[1]).toEqual(isoPeriode2);
        });
        it('endrer start og sluttdato hvis endringsperioden ikke dekker alle perioder', () => {
            const tillattPeriode = ISODateRangeToDateRange('2022-01-05/2022-01-18');
            const result = trimArbeidstidTilTillattEndringsperiode(perioder, tillattPeriode);
            const keys = Object.keys(result);
            expect(keys[0]).toEqual('2022-01-05/2022-01-14');
            expect(keys[1]).toEqual('2022-01-17/2022-01-18');
        });
        it('returnerer tomt objekt hvis alle perioder er utenfor endringsperiode', () => {
            const tillattPeriode = ISODateRangeToDateRange('2022-02-02/2022-02-03');
            const result = trimArbeidstidTilTillattEndringsperiode(perioder, tillattPeriode);
            expect(Object.keys(result)).toHaveLength(0);
        });
    });

    describe('getArbeidstidPerioderIDateRange', () => {
        const isoPeriode1 = '2022-01-03/2022-01-14';
        const isoPeriode2 = '2022-01-17/2022-02-01';

        const perioder: K9SakArbeidstidPeriodeMap = {
            [isoPeriode1]: {
                faktiskArbeidTimerPerDag,
                jobberNormaltTimerPerDag,
            },
            [isoPeriode2]: {
                faktiskArbeidTimerPerDag,
                jobberNormaltTimerPerDag,
            },
        };

        it('finner periode som starter i tidsrom', () => {
            const result = getArbeidstidPerioderIDateRange(ISODateRangeToDateRange('2022-01-03/2022-01-03'), perioder);
            const keys = Object.keys(result);
            expect(keys.length).toEqual(1);
            expect(keys[0]).toEqual('2022-01-03/2022-01-14');
        });
        it('returnerer {} hvis ingen perioder er innenfor tidsrom', () => {
            const result = getArbeidstidPerioderIDateRange(ISODateRangeToDateRange('2022-02-02/2022-02-07'), perioder);
            const keys = Object.keys(result);
            expect(keys.length).toEqual(0);
        });
        it('returnerer alle perioder hvis alle perioder er innenfor tidsrom', () => {
            const result = getArbeidstidPerioderIDateRange(ISODateRangeToDateRange('2022-01-03/2022-02-01'), perioder);
            const keys = Object.keys(result);
            expect(keys.length).toEqual(2);
            expect(keys[0]).toEqual('2022-01-03/2022-01-14');
            expect(keys[1]).toEqual('2022-01-17/2022-02-01');
        });
    });
    describe('grupperArbeidstidPerioder', () => {
        const isoPeriode1 = '2022-01-03/2022-01-14';
        const isoPeriode2 = '2022-01-17/2022-02-01';
        const isoPeriode3 = '2022-02-07/2022-02-11';

        const perioder: K9SakArbeidstidPeriodeMap = {
            [isoPeriode1]: {
                faktiskArbeidTimerPerDag,
                jobberNormaltTimerPerDag,
            },
            [isoPeriode2]: {
                faktiskArbeidTimerPerDag,
                jobberNormaltTimerPerDag,
            },
            [isoPeriode3]: {
                faktiskArbeidTimerPerDag,
                jobberNormaltTimerPerDag,
            },
        };

        it('slår sammen perioder som er sammenhengende', () => {
            const result = grupperArbeidstidPerioder(perioder);
            expect(result.length).toEqual(2);
            expect(dateRangeToISODateRange(result[0].periode)).toEqual('2022-01-03/2022-02-01');
            expect(Object.keys(result[0].arbeidstidPerioder).length).toEqual(2);
            expect(dateRangeToISODateRange(result[1].periode)).toEqual('2022-02-07/2022-02-11');
        });
    });

    describe('getArbeidstidEnkeltdagMapFromPerioder', () => {
        const isoPeriode1 = '2022-01-03/2022-01-05';
        const isoPeriode2 = '2022-01-12/2022-01-12';
        const periode2ISODuration = 'PT2H30M';

        const perioder: K9SakArbeidstidPeriodeMap = {
            [isoPeriode1]: {
                faktiskArbeidTimerPerDag,
                jobberNormaltTimerPerDag,
            },
            [isoPeriode2]: {
                faktiskArbeidTimerPerDag: ISODurationToDuration(periode2ISODuration),
                jobberNormaltTimerPerDag,
            },
        };
        it('returnerer riktig alle enkeltdager', () => {
            const result = getArbeidstidEnkeltdagMapFromPerioder(perioder);
            const keys = Object.keys(result);
            expect(keys.length).toEqual(4);
            const dag1 = result[keys[0]];
            const dag4 = result[keys[3]];
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            expect(durationToISODuration(dag1.faktisk!)).toEqual(faktiskISODuration);
            expect(durationToISODuration(dag1.normalt)).toEqual(normaltISODuration);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            expect(durationToISODuration(dag4.faktisk!)).toEqual(periode2ISODuration);
            expect(durationToISODuration(dag4.normalt)).toEqual(normaltISODuration);
        });
    });

    describe('getArbeidsukerFromEnkeltdager', () => {
        const arbeidstid: FaktiskOgNormalArbeidstid = {
            faktisk: faktiskArbeidTimerPerDag,
            normalt: jobberNormaltTimerPerDag,
        };
        const enkeltdag: ArbeidstidEnkeltdagMap = {
            '2022-01-03': arbeidstid,
        };
        const helUke: ArbeidstidEnkeltdagMap = {
            '2022-01-03': arbeidstid,
            '2022-01-04': arbeidstid,
            '2022-01-05': arbeidstid,
            '2022-01-06': arbeidstid,
            '2022-01-07': arbeidstid,
        };
        const flereUker: ArbeidstidEnkeltdagMap = {
            '2022-01-03': arbeidstid,
            '2022-01-04': arbeidstid,
            '2022-01-05': arbeidstid,
            '2022-01-06': arbeidstid,
            '2022-01-07': arbeidstid,
            '2022-01-10': arbeidstid,
            '2022-01-11': arbeidstid,
        };

        it('returnerer riktig for én enkeltdag', () => {
            const result = getArbeidsukerFromEnkeltdager(enkeltdag);
            expect(result.length).toEqual(1);
            const uke = result[0];
            expect(dateRangeToISODateRange(uke.periode)).toEqual('2022-01-03/2022-01-03');
            expect(uke.antallDagerMedArbeidstid).toEqual(1);
        });
        it('returnerer riktig for dager som går over én hel uke', () => {
            const result = getArbeidsukerFromEnkeltdager(helUke);
            expect(result.length).toEqual(1);
            const uke = result[0];
            expect(dateRangeToISODateRange(uke.periode)).toEqual('2022-01-03/2022-01-07');
            expect(uke.antallDagerMedArbeidstid).toEqual(5);
        });
        it('returnerer riktig for dager som går mer enn én uker', () => {
            const result = getArbeidsukerFromEnkeltdager(flereUker);
            expect(result.length).toEqual(2);
            const uke1 = result[0];
            const uke2 = result[1];
            expect(dateRangeToISODateRange(uke1.periode)).toEqual('2022-01-03/2022-01-09');
            expect(dateRangeToISODateRange(uke2.periode)).toEqual('2022-01-10/2022-01-11');
            expect(uke1.antallDagerMedArbeidstid).toEqual(5);
            expect(uke2.antallDagerMedArbeidstid).toEqual(2);
        });
    });

    describe('getArbeidsukeFromEnkeltdagerIUken', () => {
        const periodeEnDag: DateRange = ISODateRangeToDateRange('2022-01-03/2022-01-03');
        const periodeHelUke: DateRange = ISODateRangeToDateRange('2022-01-03/2022-01-07');

        const arbeidstid: FaktiskOgNormalArbeidstid = {
            faktisk: faktiskArbeidTimerPerDag,
            normalt: jobberNormaltTimerPerDag,
        };
        const enkeltdag: ArbeidstidEnkeltdagMap = {
            '2022-01-03': arbeidstid,
        };
        const helUke: ArbeidstidEnkeltdagMap = {
            '2022-01-03': arbeidstid,
            '2022-01-04': arbeidstid,
            '2022-01-05': arbeidstid,
            '2022-01-06': arbeidstid,
            '2022-01-07': arbeidstid,
        };

        it('returnerer riktig for én enkeltdag', () => {
            const uke = getArbeidsukeFromEnkeltdagerIUken(periodeEnDag, enkeltdag);
            expect(uke.antallDagerMedArbeidstid).toEqual(1);
            expect(durationToISODuration(uke.faktisk!.dag)).toEqual(durationToISODuration(arbeidstid.faktisk));
            expect(durationToISODuration(uke.faktisk!.uke)).toEqual(durationToISODuration(arbeidstid.faktisk));
            expect(durationToISODuration(uke.normalt.dag)).toEqual(durationToISODuration(arbeidstid.normalt));
            expect(durationToISODuration(uke.normalt.uke)).toEqual(durationToISODuration(arbeidstid.normalt));
        });

        it('fjerner dager som ikke er innenfor uken', () => {
            const uke = getArbeidsukeFromEnkeltdagerIUken(periodeEnDag, helUke);
            expect(uke.antallDagerMedArbeidstid).toEqual(1);
            expect(durationToISODuration(uke.faktisk!.dag)).toEqual(durationToISODuration(arbeidstid.faktisk));
            expect(durationToISODuration(uke.faktisk!.uke)).toEqual(durationToISODuration(arbeidstid.faktisk));
            expect(durationToISODuration(uke.normalt.dag)).toEqual(durationToISODuration(arbeidstid.normalt));
            expect(durationToISODuration(uke.normalt.uke)).toEqual(durationToISODuration(arbeidstid.normalt));
        });

        it('returnerer riktig for én uke', () => {
            const uke = getArbeidsukeFromEnkeltdagerIUken(periodeHelUke, helUke);
            expect(uke.antallDagerMedArbeidstid).toEqual(5);
            expect(uke.isoDateRange).toEqual(dateRangeToISODateRange(periodeHelUke));
            expect(durationToISODuration(uke.faktisk!.dag)).toEqual(durationToISODuration(arbeidstid.faktisk));
            expect(durationToISODuration(uke.faktisk!.uke)).toEqual('PT10H0M');
            expect(durationToISODuration(uke.normalt.dag)).toEqual(durationToISODuration(arbeidstid.normalt));
            expect(durationToISODuration(uke.normalt.uke)).toEqual('PT37H30M');
        });
    });
    describe('erArbeidsgiverInnenforSøknadsperioder', () => {
        const søknadsperioder: DateRange[] = [
            ISODateRangeToDateRange('2020-01-01/2020-02-01'),
            ISODateRangeToDateRange('2020-04-01/2020-05-01'),
        ];
        const arbeidsgiver: ArbeidsgiverForEndring = {
            ansettelsesperioder: [{ from: ISODateToDate('2019-01-01') }],
        } as ArbeidsgiverForEndring;

        describe('uten ansattTom', () => {
            it('returnerer true når ansattFom er før søknadsperiode', () => {
                expect(erArbeidsgiverInnenforSøknadsperioder(arbeidsgiver, søknadsperioder)).toBeTruthy();
            });
            it('returnerer true når ansattFom er mellom to søknadsperiode', () => {
                expect(
                    erArbeidsgiverInnenforSøknadsperioder(
                        {
                            ansettelsesperioder: [{ from: ISODateToDate('2020-02-03') }],
                        } as ArbeidsgiverForEndring,
                        søknadsperioder,
                    ),
                ).toBeTruthy();
            });
            it('returnerer true når ansattFom er i en søknadsperiode', () => {
                expect(
                    erArbeidsgiverInnenforSøknadsperioder(
                        {
                            ansettelsesperioder: [{ from: ISODateToDate('2020-03-02') }],
                        } as ArbeidsgiverForEndring,
                        søknadsperioder,
                    ),
                ).toBeTruthy();
            });
            it('returnerer false når ansattFom er etter søknadsperiode', () => {
                expect(
                    erArbeidsgiverInnenforSøknadsperioder(
                        {
                            ansettelsesperioder: [{ from: ISODateToDate('2020-05-02') }],
                        } as ArbeidsgiverForEndring,
                        søknadsperioder,
                    ),
                ).toBeFalsy();
            });
        });
        describe('med ansattTom', () => {
            it('returnerer true når ansattFom er før søknadsperiode og ansattTom er etter søknadsperioder', () => {
                expect(
                    erArbeidsgiverInnenforSøknadsperioder(
                        {
                            ansettelsesperioder: [
                                { from: ISODateToDate('2019-01-01'), to: ISODateToDate('2023-01-01') },
                            ],
                        } as ArbeidsgiverForEndring,
                        søknadsperioder,
                    ),
                ).toBeTruthy();
            });
            it('returnerer true når ansattTom er i mellom søknadsperioder', () => {
                expect(
                    erArbeidsgiverInnenforSøknadsperioder(
                        {
                            ansettelsesperioder: [
                                { from: ISODateToDate('2019-01-01'), to: ISODateToDate('2020-03-01') },
                            ],
                        } as ArbeidsgiverForEndring,
                        søknadsperioder,
                    ),
                ).toBeTruthy();
            });
            it('returnerer false når ansattTom er før søknadsperioder', () => {
                expect(
                    erArbeidsgiverInnenforSøknadsperioder(
                        {
                            ansettelsesperioder: [
                                {
                                    from: ISODateToDate('2019-01-01'),
                                    to: ISODateToDate('2019-12-31'),
                                },
                            ],
                        } as ArbeidsgiverForEndring,
                        søknadsperioder,
                    ),
                ).toBeFalsy();
            });
            it('returnerer false når ansattFom og ansattTom er mellom to søknadsperioder', () => {
                expect(
                    erArbeidsgiverInnenforSøknadsperioder(
                        {
                            ansettelsesperioder: [
                                { from: ISODateToDate('2020-03-01'), to: ISODateToDate('2020-03-02') },
                            ],
                        } as ArbeidsgiverForEndring,
                        søknadsperioder,
                    ),
                ).toBeFalsy();
            });
        });
    });
});
