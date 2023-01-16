export const sakMock = [
    {
        barn: {
            fødselsdato: '2020-04-20',
            fornavn: 'SKRIVEFØR',
            mellomnavn: null,
            etternavn: 'FRENDE',
            aktørId: '2990893847132',
            identitetsnummer: '20842099774',
        },
        søknad: {
            søknadId: 'generert',
            versjon: '1.0.0.',
            mottattDato: '2022-12-13T19:42:57.387Z',
            søker: { norskIdentitetsnummer: '00000000000' },
            ytelse: {
                type: 'PLEIEPENGER_SYKT_BARN',
                barn: { norskIdentitetsnummer: '00000000000', fødselsdato: null },
                søknadsperiode: ['2022-08-09/2022-09-10', '2022-11-03/2022-11-30', '2022-12-05/2022-12-19'],
                endringsperiode: [],
                trekkKravPerioder: [],
                opptjeningAktivitet: {},
                dataBruktTilUtledning: null,
                infoFraPunsj: null,
                bosteder: { perioder: {}, perioderSomSkalSlettes: {} },
                utenlandsopphold: { perioder: {}, perioderSomSkalSlettes: {} },
                beredskap: { perioder: {}, perioderSomSkalSlettes: {} },
                nattevåk: { perioder: {}, perioderSomSkalSlettes: {} },
                tilsynsordning: {
                    perioder: {
                        '2022-08-09/2022-09-10': { etablertTilsynTimerPerDag: 'PT0S' },
                        '2022-11-03/2022-11-30': { etablertTilsynTimerPerDag: 'PT0S' },
                        '2022-12-05/2022-12-19': { etablertTilsynTimerPerDag: 'PT0S' },
                    },
                },
                lovbestemtFerie: { perioder: {} },
                arbeidstid: {
                    arbeidstakerList: [
                        {
                            norskIdentitetsnummer: null,
                            organisasjonsnummer: '947064649',
                            arbeidstidInfo: {
                                perioder: {
                                    '2022-08-09/2022-08-10': {
                                        jobberNormaltTimerPerDag: 'PT4H',
                                        faktiskArbeidTimerPerDag: 'PT0S',
                                    },
                                    '2022-08-15/2022-08-16': {
                                        jobberNormaltTimerPerDag: 'PT4H',
                                        faktiskArbeidTimerPerDag: 'PT0S',
                                    },
                                    '2022-08-17/2022-08-17': {
                                        jobberNormaltTimerPerDag: 'PT4H',
                                        faktiskArbeidTimerPerDag: 'PT3H',
                                    },
                                    '2022-08-22/2022-08-23': {
                                        jobberNormaltTimerPerDag: 'PT4H',
                                        faktiskArbeidTimerPerDag: 'PT0S',
                                    },
                                    '2022-08-24/2022-08-24': {
                                        jobberNormaltTimerPerDag: 'PT4H',
                                        faktiskArbeidTimerPerDag: 'PT3H',
                                    },
                                    '2022-08-29/2022-08-30': {
                                        jobberNormaltTimerPerDag: 'PT4H',
                                        faktiskArbeidTimerPerDag: 'PT0S',
                                    },
                                    '2022-08-31/2022-08-31': {
                                        jobberNormaltTimerPerDag: 'PT4H',
                                        faktiskArbeidTimerPerDag: 'PT3H',
                                    },
                                    '2022-09-05/2022-09-06': {
                                        jobberNormaltTimerPerDag: 'PT4H',
                                        faktiskArbeidTimerPerDag: 'PT0S',
                                    },
                                    '2022-09-07/2022-09-07': {
                                        jobberNormaltTimerPerDag: 'PT4H',
                                        faktiskArbeidTimerPerDag: 'PT3H',
                                    },
                                    '2022-11-03/2022-11-20': {
                                        jobberNormaltTimerPerDag: 'PT4H',
                                        faktiskArbeidTimerPerDag: 'PT0S',
                                    },
                                    '2022-11-21/2022-11-30': {
                                        jobberNormaltTimerPerDag: 'PT4H',
                                        faktiskArbeidTimerPerDag: 'PT2H',
                                    },
                                    '2022-12-05/2022-12-19': {
                                        jobberNormaltTimerPerDag: 'PT8H',
                                        faktiskArbeidTimerPerDag: 'PT0S',
                                    },
                                },
                            },
                        },
                    ],
                    frilanserArbeidstidInfo: {
                        perioder: {
                            '2022-08-09/2022-09-10': {
                                jobberNormaltTimerPerDag: 'PT0S',
                                faktiskArbeidTimerPerDag: 'PT0S',
                            },
                            '2022-11-03/2022-11-08': {
                                jobberNormaltTimerPerDag: 'PT0S',
                                faktiskArbeidTimerPerDag: 'PT0S',
                            },
                            '2022-11-09/2022-11-25': {
                                jobberNormaltTimerPerDag: 'PT1H',
                                faktiskArbeidTimerPerDag: 'PT0S',
                            },
                            '2022-11-28/2022-11-30': {
                                jobberNormaltTimerPerDag: 'PT1H',
                                faktiskArbeidTimerPerDag: 'PT1H40M',
                            },
                            '2022-12-05/2022-12-19': {
                                jobberNormaltTimerPerDag: 'PT6H',
                                faktiskArbeidTimerPerDag: 'PT0S',
                            },
                        },
                    },
                    selvstendigNæringsdrivendeArbeidstidInfo: {},
                },
                uttak: { perioder: {} },
                omsorg: { relasjonTilBarnet: null, beskrivelseAvOmsorgsrollen: null },
            },
            språk: 'nb',
            journalposter: [],
            begrunnelseForInnsending: { tekst: null },
        },
    },
];
