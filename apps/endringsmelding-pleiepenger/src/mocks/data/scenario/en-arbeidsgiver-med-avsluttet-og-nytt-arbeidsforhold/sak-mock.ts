export default [
    {
        barn: {
            fødselsdato: '2017-03-03',
            fornavn: 'NORA',
            mellomnavn: null,
            etternavn: 'Nordmann',
            aktørId: '2559652436225',
            identitetsnummer: '03831799748',
        },
        søknad: {
            søknadId: 'generert',
            versjon: '1.0.0.',
            mottattDato: '2023-01-18T08:13:37.525Z',
            søker: { norskIdentitetsnummer: '00000000000' },
            ytelse: {
                type: 'PLEIEPENGER_SYKT_BARN',
                barn: { norskIdentitetsnummer: '00000000000', fødselsdato: null },
                søknadsperiode: ['2024-02-01/2025-02-01'],
                endringsperiode: [],
                trekkKravPerioder: [],
                opptjeningAktivitet: {},
                dataBruktTilUtledning: null,
                infoFraPunsj: null,
                bosteder: { perioder: {}, perioderSomSkalSlettes: {} },
                utenlandsopphold: {
                    perioder: {
                        '2018-12-30/2019-10-20': {
                            land: 'DNK',
                            årsak: 'barnetInnlagtIHelseinstitusjonForNorskOffentligRegning',
                        },
                    },
                },
                beredskap: { perioder: {}, perioderSomSkalSlettes: {} },
                nattevåk: { perioder: {}, perioderSomSkalSlettes: {} },
                tilsynsordning: {
                    perioder: {
                        '2022-12-01/2023-01-31': { etablertTilsynTimerPerDag: 'PT8H' },
                        '2023-02-14/2023-03-16': { etablertTilsynTimerPerDag: 'PT8H' },
                    },
                },
                lovbestemtFerie: {
                    perioder: {
                        '2023-01-01/2023-01-10': {
                            skalHaFerie: true,
                        },
                        '2023-01-12/2023-01-15': {
                            skalHaFerie: false,
                        },
                    },
                },
                arbeidstid: {
                    arbeidstakerList: [
                        {
                            norskIdentitetsnummer: null,
                            organisasjonsnummer: '967170232',
                            organisasjonsnavn: null,
                            arbeidstidInfo: {
                                perioder: {
                                    '2024-02-01/2024-10-31': {
                                        jobberNormaltTimerPerDag: 'PT4H',
                                        faktiskArbeidTimerPerDag: 'PT2H',
                                    },
                                    '2024-11-01/2025-01-31': {
                                        jobberNormaltTimerPerDag: 'PT4H',
                                        faktiskArbeidTimerPerDag: 'PT0S',
                                    },
                                    '2025-02-01/2025-02-01': {
                                        jobberNormaltTimerPerDag: 'PT4H',
                                        faktiskArbeidTimerPerDag: 'PT2H',
                                    },
                                },
                            },
                        },
                    ],
                    frilanserArbeidstidInfo: {},
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
