import { ArbeidsaktivitetType, Sak } from '../../app/types';

export const sakMock: Sak = {
    ytelse: {
        type: 'PLEIEPENGER_SYKT_BARN',
    },
    arbeidsgivereIkkeISak: [
        {
            key: 'a_947064642',
            organisasjonsnummer: '947064642',
            navn: 'IKKE-I-SAK-AS 1',
            ansettelsesperioder: [{ from: new Date('2023-02-01T00:00:00.000Z') }],
        },
        {
            key: 'a_947064643',
            organisasjonsnummer: '947064643',
            navn: 'IKKE-I-SAK-AS 2',
            ansettelsesperioder: [{ from: new Date('2023-02-01T00:00:00.000Z') }],
        },
    ],
    harArbeidsgivereIkkeISak: false,
    søknadsperioder: [
        {
            from: new Date('2024-02-26T00:00:00.000Z'),
            to: new Date('2024-02-29T00:00:00.000Z'),
        },
        {
            from: new Date('2024-03-25T00:00:00.000Z'),
            to: new Date('2024-05-31T00:00:00.000Z'),
        },
    ],
    samletSøknadsperiode: {
        from: new Date('2024-02-26T00:00:00.000Z'),
        to: new Date('2024-05-31T00:00:00.000Z'),
    },
    barn: {
        fødselsdato: new Date('2008-07-27T00:00:00.000Z'),
        fornavn: 'RAVGUL',
        etternavn: 'LØVETANN',
        aktørId: '2175638020356',
        identitetsnummer: '27870899799',
    },
    arbeidsaktivitetMedUkjentArbeidsgiver: [],
    arbeidsaktiviteter: {
        arbeidstakerAktiviteter: [
            {
                key: 'a_839942907',
                arbeidsgiver: {
                    key: 'a_839942907',
                    organisasjonsnummer: '839942907',
                    navn: 'HÅRREISENDE FRISØR',
                    ansettelsesperioder: [{ from: new Date('2002-05-09T00:00:00.000Z') }],
                },
                type: ArbeidsaktivitetType.arbeidstaker,
                navn: 'HÅRREISENDE FRISØR',
                erUkjentArbeidsforhold: false,
                ansettelsesperioderInnenforEndringsperiode: [
                    { from: new Date('2002-05-09T00:00:00.000Z'), to: new Date('2025-05-09T00:00:00.000Z') },
                ],
                perioderMedArbeidstid: [
                    {
                        from: new Date('2024-02-26T00:00:00.000Z'),
                        to: new Date('2024-02-29T00:00:00.000Z'),
                        arbeidsuker: {
                            '2024-02-26/2024-02-29': {
                                isoDateRange: '2024-02-26/2024-02-29',
                                periode: {
                                    from: new Date('2024-02-26T00:00:00.000Z'),
                                    to: new Date('2024-02-29T00:00:00.000Z'),
                                },
                                dagerIkkeAnsatt: [],
                                arbeidstidEnkeltdager: {
                                    '2024-02-26': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '8',
                                            minutes: '0',
                                        },
                                    },
                                    '2024-02-27': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '8',
                                            minutes: '0',
                                        },
                                    },
                                    '2024-02-28': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '8',
                                            minutes: '0',
                                        },
                                    },
                                    '2024-02-29': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '8',
                                            minutes: '0',
                                        },
                                    },
                                },
                                faktisk: {
                                    uke: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                    dag: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                },
                                normalt: {
                                    uke: {
                                        hours: '32',
                                        minutes: '0',
                                    },
                                    dag: {
                                        hours: '8',
                                        minutes: '0',
                                    },
                                },
                                antallDagerMedArbeidstid: 4,
                            },
                        },
                    },
                    {
                        from: new Date('2024-03-25T00:00:00.000Z'),
                        to: new Date('2024-05-31T00:00:00.000Z'),
                        arbeidsuker: {
                            '2024-03-25/2024-03-31': {
                                isoDateRange: '2024-03-25/2024-03-31',
                                periode: {
                                    from: new Date('2024-03-25T00:00:00.000Z'),
                                    to: new Date('2024-03-31T00:00:00.000Z'),
                                },
                                dagerIkkeAnsatt: [],
                                arbeidstidEnkeltdager: {
                                    '2024-03-25': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-03-26': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-03-27': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '4',
                                            minutes: '0',
                                        },
                                    },
                                    '2024-03-28': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '4',
                                            minutes: '0',
                                        },
                                    },
                                    '2024-03-29': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '4',
                                            minutes: '0',
                                        },
                                    },
                                },
                                faktisk: {
                                    uke: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                    dag: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                },
                                normalt: {
                                    uke: {
                                        hours: '27',
                                        minutes: '0',
                                    },
                                    dag: {
                                        hours: '5',
                                        minutes: '24',
                                    },
                                },
                                antallDagerMedArbeidstid: 5,
                            },
                            '2024-04-01/2024-04-07': {
                                isoDateRange: '2024-04-01/2024-04-07',
                                periode: {
                                    from: new Date('2024-04-01T00:00:00.000Z'),
                                    to: new Date('2024-04-07T00:00:00.000Z'),
                                },
                                dagerIkkeAnsatt: [],
                                arbeidstidEnkeltdager: {
                                    '2024-04-01': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                    },
                                    '2024-04-02': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                    },
                                    '2024-04-03': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                    },
                                    '2024-04-04': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                    },
                                    '2024-04-05': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                    },
                                },
                                faktisk: {
                                    uke: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                    dag: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                },
                                normalt: {
                                    uke: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                    dag: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                },
                                antallDagerMedArbeidstid: 5,
                            },
                            '2024-04-08/2024-04-14': {
                                isoDateRange: '2024-04-08/2024-04-14',
                                periode: {
                                    from: new Date('2024-04-08T00:00:00.000Z'),
                                    to: new Date('2024-04-14T00:00:00.000Z'),
                                },
                                dagerIkkeAnsatt: [],
                                arbeidstidEnkeltdager: {
                                    '2024-04-08': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                    },
                                    '2024-04-09': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                    },
                                    '2024-04-10': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-04-11': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-04-12': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                },
                                faktisk: {
                                    uke: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                    dag: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                },
                                normalt: {
                                    uke: {
                                        hours: '22',
                                        minutes: '30',
                                    },
                                    dag: {
                                        hours: '4',
                                        minutes: '30',
                                    },
                                },
                                antallDagerMedArbeidstid: 5,
                            },
                            '2024-04-15/2024-04-21': {
                                isoDateRange: '2024-04-15/2024-04-21',
                                periode: {
                                    from: new Date('2024-04-15T00:00:00.000Z'),
                                    to: new Date('2024-04-21T00:00:00.000Z'),
                                },
                                dagerIkkeAnsatt: [],
                                arbeidstidEnkeltdager: {
                                    '2024-04-15': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-04-16': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-04-17': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-04-18': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-04-19': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                },
                                faktisk: {
                                    uke: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                    dag: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                },
                                normalt: {
                                    uke: {
                                        hours: '37',
                                        minutes: '30',
                                    },
                                    dag: {
                                        hours: '7',
                                        minutes: '30',
                                    },
                                },
                                antallDagerMedArbeidstid: 5,
                            },
                            '2024-04-22/2024-04-28': {
                                isoDateRange: '2024-04-22/2024-04-28',
                                periode: {
                                    from: new Date('2024-04-22T00:00:00.000Z'),
                                    to: new Date('2024-04-28T00:00:00.000Z'),
                                },
                                dagerIkkeAnsatt: [],
                                arbeidstidEnkeltdager: {
                                    '2024-04-22': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-04-23': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-04-24': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-04-25': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-04-26': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                },
                                faktisk: {
                                    uke: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                    dag: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                },
                                normalt: {
                                    uke: {
                                        hours: '37',
                                        minutes: '30',
                                    },
                                    dag: {
                                        hours: '7',
                                        minutes: '30',
                                    },
                                },
                                antallDagerMedArbeidstid: 5,
                            },
                            '2024-04-29/2024-05-05': {
                                isoDateRange: '2024-04-29/2024-05-05',
                                periode: {
                                    from: new Date('2024-04-29T00:00:00.000Z'),
                                    to: new Date('2024-05-05T00:00:00.000Z'),
                                },
                                dagerIkkeAnsatt: [],
                                arbeidstidEnkeltdager: {
                                    '2024-04-29': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-04-30': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-05-01': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-05-02': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-05-03': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                },
                                faktisk: {
                                    uke: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                    dag: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                },
                                normalt: {
                                    uke: {
                                        hours: '37',
                                        minutes: '30',
                                    },
                                    dag: {
                                        hours: '7',
                                        minutes: '30',
                                    },
                                },
                                antallDagerMedArbeidstid: 5,
                            },
                            '2024-05-06/2024-05-12': {
                                isoDateRange: '2024-05-06/2024-05-12',
                                periode: {
                                    from: new Date('2024-05-06T00:00:00.000Z'),
                                    to: new Date('2024-05-12T00:00:00.000Z'),
                                },
                                dagerIkkeAnsatt: [],
                                arbeidstidEnkeltdager: {
                                    '2024-05-06': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-05-07': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-05-08': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-05-09': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-05-10': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                },
                                faktisk: {
                                    uke: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                    dag: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                },
                                normalt: {
                                    uke: {
                                        hours: '37',
                                        minutes: '30',
                                    },
                                    dag: {
                                        hours: '7',
                                        minutes: '30',
                                    },
                                },
                                antallDagerMedArbeidstid: 5,
                            },
                            '2024-05-13/2024-05-19': {
                                isoDateRange: '2024-05-13/2024-05-19',
                                periode: {
                                    from: new Date('2024-05-13T00:00:00.000Z'),
                                    to: new Date('2024-05-19T00:00:00.000Z'),
                                },
                                dagerIkkeAnsatt: [],
                                arbeidstidEnkeltdager: {
                                    '2024-05-13': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-05-14': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-05-15': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-05-16': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-05-17': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                },
                                faktisk: {
                                    uke: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                    dag: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                },
                                normalt: {
                                    uke: {
                                        hours: '37',
                                        minutes: '30',
                                    },
                                    dag: {
                                        hours: '7',
                                        minutes: '30',
                                    },
                                },
                                antallDagerMedArbeidstid: 5,
                            },
                            '2024-05-20/2024-05-26': {
                                isoDateRange: '2024-05-20/2024-05-26',
                                periode: {
                                    from: new Date('2024-05-20T00:00:00.000Z'),
                                    to: new Date('2024-05-26T00:00:00.000Z'),
                                },
                                dagerIkkeAnsatt: [],
                                arbeidstidEnkeltdager: {
                                    '2024-05-20': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-05-21': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-05-22': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-05-23': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-05-24': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                },
                                faktisk: {
                                    uke: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                    dag: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                },
                                normalt: {
                                    uke: {
                                        hours: '37',
                                        minutes: '30',
                                    },
                                    dag: {
                                        hours: '7',
                                        minutes: '30',
                                    },
                                },
                                antallDagerMedArbeidstid: 5,
                            },
                            '2024-05-27/2024-05-31': {
                                isoDateRange: '2024-05-27/2024-05-31',
                                periode: {
                                    from: new Date('2024-05-27T00:00:00.000Z'),
                                    to: new Date('2024-05-31T00:00:00.000Z'),
                                },
                                dagerIkkeAnsatt: [],
                                arbeidstidEnkeltdager: {
                                    '2024-05-27': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-05-28': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-05-29': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-05-30': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-05-31': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                },
                                faktisk: {
                                    uke: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                    dag: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                },
                                normalt: {
                                    uke: {
                                        hours: '37',
                                        minutes: '30',
                                    },
                                    dag: {
                                        hours: '7',
                                        minutes: '30',
                                    },
                                },
                                antallDagerMedArbeidstid: 5,
                            },
                        },
                    },
                ],
                harPerioderFørTillattEndringsperiode: false,
                harPerioderEtterTillattEndringsperiode: false,
            },
        ],
        selvstendigNæringsdrivende: {
            key: 'selvstendigNæringsdrivende',
            type: ArbeidsaktivitetType.selvstendigNæringsdrivende,
            navn: 'Selvstendig næringsdrivende',
            ansettelsesperioderInnenforEndringsperiode: [
                { from: new Date('2024-04-08T00:00:00.000Z'), to: new Date('2024-04-09T00:00:00.000Z') },
            ],
            perioderMedArbeidstid: [
                {
                    from: new Date('2024-04-08T00:00:00.000Z'),
                    to: new Date('2024-04-09T00:00:00.000Z'),
                    arbeidsuker: {
                        '2024-04-08/2024-04-09': {
                            isoDateRange: '2024-04-08/2024-04-09',
                            periode: {
                                from: new Date('2024-04-08T00:00:00.000Z'),
                                to: new Date('2024-04-09T00:00:00.000Z'),
                            },
                            dagerIkkeAnsatt: [],
                            arbeidstidEnkeltdager: {
                                '2024-04-08': {
                                    faktisk: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                    normalt: {
                                        hours: '0',
                                        minutes: '48',
                                    },
                                },
                                '2024-04-09': {
                                    faktisk: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                    normalt: {
                                        hours: '0',
                                        minutes: '48',
                                    },
                                },
                            },
                            faktisk: {
                                uke: {
                                    hours: '0',
                                    minutes: '0',
                                },
                                dag: {
                                    hours: '0',
                                    minutes: '0',
                                },
                            },
                            normalt: {
                                uke: {
                                    hours: '1',
                                    minutes: '36',
                                },
                                dag: {
                                    hours: '0',
                                    minutes: '48',
                                },
                            },
                            antallDagerMedArbeidstid: 2,
                        },
                    },
                },
            ],
            harPerioderFørTillattEndringsperiode: false,
            harPerioderEtterTillattEndringsperiode: false,
        },
    },
    lovbestemtFerie: {
        feriedager: {
            '2024-02-27': {
                dato: new Date('2024-02-27T00:00:00.000Z'),
                skalHaFerie: true,
                liggerISak: true,
            },
            '2024-02-28': {
                dato: new Date('2024-02-28T00:00:00.000Z'),
                skalHaFerie: true,
                liggerISak: true,
            },
        },
    },
    utledet: {
        aktiviteterSomKanEndres: [
            {
                key: 'a_839942907',
                arbeidsgiver: {
                    key: 'a_839942907',
                    organisasjonsnummer: '839942907',
                    navn: 'HÅRREISENDE FRISØR',
                    ansettelsesperioder: [{ from: new Date('2002-05-09T00:00:00.000Z') }],
                },
                type: ArbeidsaktivitetType.arbeidstaker,
                navn: 'HÅRREISENDE FRISØR',
                erUkjentArbeidsforhold: false,
                ansettelsesperioderInnenforEndringsperiode: [
                    { from: new Date('2002-05-09T00:00:00.000Z'), to: new Date('2025-05-09T00:00:00.000Z') },
                ],
                perioderMedArbeidstid: [
                    {
                        from: new Date('2024-02-26T00:00:00.000Z'),
                        to: new Date('2024-02-29T00:00:00.000Z'),
                        arbeidsuker: {
                            '2024-02-26/2024-02-29': {
                                isoDateRange: '2024-02-26/2024-02-29',
                                periode: {
                                    from: new Date('2024-02-26T00:00:00.000Z'),
                                    to: new Date('2024-02-29T00:00:00.000Z'),
                                },
                                dagerIkkeAnsatt: [],
                                arbeidstidEnkeltdager: {
                                    '2024-02-26': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '8',
                                            minutes: '0',
                                        },
                                    },
                                    '2024-02-27': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '8',
                                            minutes: '0',
                                        },
                                    },
                                    '2024-02-28': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '8',
                                            minutes: '0',
                                        },
                                    },
                                    '2024-02-29': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '8',
                                            minutes: '0',
                                        },
                                    },
                                },
                                faktisk: {
                                    uke: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                    dag: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                },
                                normalt: {
                                    uke: {
                                        hours: '32',
                                        minutes: '0',
                                    },
                                    dag: {
                                        hours: '8',
                                        minutes: '0',
                                    },
                                },
                                antallDagerMedArbeidstid: 4,
                            },
                        },
                    },
                    {
                        from: new Date('2024-03-25T00:00:00.000Z'),
                        to: new Date('2024-05-31T00:00:00.000Z'),
                        arbeidsuker: {
                            '2024-03-25/2024-03-31': {
                                isoDateRange: '2024-03-25/2024-03-31',
                                periode: {
                                    from: new Date('2024-03-25T00:00:00.000Z'),
                                    to: new Date('2024-03-31T00:00:00.000Z'),
                                },
                                dagerIkkeAnsatt: [],
                                arbeidstidEnkeltdager: {
                                    '2024-03-25': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-03-26': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-03-27': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '4',
                                            minutes: '0',
                                        },
                                    },
                                    '2024-03-28': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '4',
                                            minutes: '0',
                                        },
                                    },
                                    '2024-03-29': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '4',
                                            minutes: '0',
                                        },
                                    },
                                },
                                faktisk: {
                                    uke: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                    dag: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                },
                                normalt: {
                                    uke: {
                                        hours: '27',
                                        minutes: '0',
                                    },
                                    dag: {
                                        hours: '5',
                                        minutes: '24',
                                    },
                                },
                                antallDagerMedArbeidstid: 5,
                            },
                            '2024-04-01/2024-04-07': {
                                isoDateRange: '2024-04-01/2024-04-07',
                                periode: {
                                    from: new Date('2024-04-01T00:00:00.000Z'),
                                    to: new Date('2024-04-07T00:00:00.000Z'),
                                },
                                dagerIkkeAnsatt: [],
                                arbeidstidEnkeltdager: {
                                    '2024-04-01': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                    },
                                    '2024-04-02': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                    },
                                    '2024-04-03': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                    },
                                    '2024-04-04': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                    },
                                    '2024-04-05': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                    },
                                },
                                faktisk: {
                                    uke: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                    dag: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                },
                                normalt: {
                                    uke: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                    dag: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                },
                                antallDagerMedArbeidstid: 5,
                            },
                            '2024-04-08/2024-04-14': {
                                isoDateRange: '2024-04-08/2024-04-14',
                                periode: {
                                    from: new Date('2024-04-08T00:00:00.000Z'),
                                    to: new Date('2024-04-14T00:00:00.000Z'),
                                },
                                dagerIkkeAnsatt: [],
                                arbeidstidEnkeltdager: {
                                    '2024-04-08': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                    },
                                    '2024-04-09': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                    },
                                    '2024-04-10': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-04-11': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-04-12': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                },
                                faktisk: {
                                    uke: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                    dag: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                },
                                normalt: {
                                    uke: {
                                        hours: '22',
                                        minutes: '30',
                                    },
                                    dag: {
                                        hours: '4',
                                        minutes: '30',
                                    },
                                },
                                antallDagerMedArbeidstid: 5,
                            },
                            '2024-04-15/2024-04-21': {
                                isoDateRange: '2024-04-15/2024-04-21',
                                periode: {
                                    from: new Date('2024-04-15T00:00:00.000Z'),
                                    to: new Date('2024-04-21T00:00:00.000Z'),
                                },
                                dagerIkkeAnsatt: [],
                                arbeidstidEnkeltdager: {
                                    '2024-04-15': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-04-16': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-04-17': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-04-18': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-04-19': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                },
                                faktisk: {
                                    uke: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                    dag: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                },
                                normalt: {
                                    uke: {
                                        hours: '37',
                                        minutes: '30',
                                    },
                                    dag: {
                                        hours: '7',
                                        minutes: '30',
                                    },
                                },
                                antallDagerMedArbeidstid: 5,
                            },
                            '2024-04-22/2024-04-28': {
                                isoDateRange: '2024-04-22/2024-04-28',
                                periode: {
                                    from: new Date('2024-04-22T00:00:00.000Z'),
                                    to: new Date('2024-04-28T00:00:00.000Z'),
                                },
                                dagerIkkeAnsatt: [],
                                arbeidstidEnkeltdager: {
                                    '2024-04-22': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-04-23': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-04-24': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-04-25': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-04-26': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                },
                                faktisk: {
                                    uke: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                    dag: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                },
                                normalt: {
                                    uke: {
                                        hours: '37',
                                        minutes: '30',
                                    },
                                    dag: {
                                        hours: '7',
                                        minutes: '30',
                                    },
                                },
                                antallDagerMedArbeidstid: 5,
                            },
                            '2024-04-29/2024-05-05': {
                                isoDateRange: '2024-04-29/2024-05-05',
                                periode: {
                                    from: new Date('2024-04-29T00:00:00.000Z'),
                                    to: new Date('2024-05-05T00:00:00.000Z'),
                                },
                                dagerIkkeAnsatt: [],
                                arbeidstidEnkeltdager: {
                                    '2024-04-29': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-04-30': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-05-01': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-05-02': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-05-03': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                },
                                faktisk: {
                                    uke: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                    dag: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                },
                                normalt: {
                                    uke: {
                                        hours: '37',
                                        minutes: '30',
                                    },
                                    dag: {
                                        hours: '7',
                                        minutes: '30',
                                    },
                                },
                                antallDagerMedArbeidstid: 5,
                            },
                            '2024-05-06/2024-05-12': {
                                isoDateRange: '2024-05-06/2024-05-12',
                                periode: {
                                    from: new Date('2024-05-06T00:00:00.000Z'),
                                    to: new Date('2024-05-12T00:00:00.000Z'),
                                },
                                dagerIkkeAnsatt: [],
                                arbeidstidEnkeltdager: {
                                    '2024-05-06': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-05-07': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-05-08': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-05-09': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-05-10': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                },
                                faktisk: {
                                    uke: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                    dag: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                },
                                normalt: {
                                    uke: {
                                        hours: '37',
                                        minutes: '30',
                                    },
                                    dag: {
                                        hours: '7',
                                        minutes: '30',
                                    },
                                },
                                antallDagerMedArbeidstid: 5,
                            },
                            '2024-05-13/2024-05-19': {
                                isoDateRange: '2024-05-13/2024-05-19',
                                periode: {
                                    from: new Date('2024-05-13T00:00:00.000Z'),
                                    to: new Date('2024-05-19T00:00:00.000Z'),
                                },
                                dagerIkkeAnsatt: [],
                                arbeidstidEnkeltdager: {
                                    '2024-05-13': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-05-14': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-05-15': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-05-16': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-05-17': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                },
                                faktisk: {
                                    uke: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                    dag: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                },
                                normalt: {
                                    uke: {
                                        hours: '37',
                                        minutes: '30',
                                    },
                                    dag: {
                                        hours: '7',
                                        minutes: '30',
                                    },
                                },
                                antallDagerMedArbeidstid: 5,
                            },
                            '2024-05-20/2024-05-26': {
                                isoDateRange: '2024-05-20/2024-05-26',
                                periode: {
                                    from: new Date('2024-05-20T00:00:00.000Z'),
                                    to: new Date('2024-05-26T00:00:00.000Z'),
                                },
                                dagerIkkeAnsatt: [],
                                arbeidstidEnkeltdager: {
                                    '2024-05-20': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-05-21': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-05-22': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-05-23': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-05-24': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                },
                                faktisk: {
                                    uke: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                    dag: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                },
                                normalt: {
                                    uke: {
                                        hours: '37',
                                        minutes: '30',
                                    },
                                    dag: {
                                        hours: '7',
                                        minutes: '30',
                                    },
                                },
                                antallDagerMedArbeidstid: 5,
                            },
                            '2024-05-27/2024-05-31': {
                                isoDateRange: '2024-05-27/2024-05-31',
                                periode: {
                                    from: new Date('2024-05-27T00:00:00.000Z'),
                                    to: new Date('2024-05-31T00:00:00.000Z'),
                                },
                                dagerIkkeAnsatt: [],
                                arbeidstidEnkeltdager: {
                                    '2024-05-27': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-05-28': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-05-29': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-05-30': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                    '2024-05-31': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '7',
                                            minutes: '30',
                                        },
                                    },
                                },
                                faktisk: {
                                    uke: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                    dag: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                },
                                normalt: {
                                    uke: {
                                        hours: '37',
                                        minutes: '30',
                                    },
                                    dag: {
                                        hours: '7',
                                        minutes: '30',
                                    },
                                },
                                antallDagerMedArbeidstid: 5,
                            },
                        },
                    },
                ],
                harPerioderFørTillattEndringsperiode: false,
                harPerioderEtterTillattEndringsperiode: false,
            },
            {
                key: 'selvstendigNæringsdrivende',
                type: ArbeidsaktivitetType.selvstendigNæringsdrivende,
                navn: 'Selvstendig næringsdrivende',
                ansettelsesperioderInnenforEndringsperiode: [
                    { from: new Date('2024-04-08T00:00:00.000Z'), to: new Date('2024-04-09T00:00:00.000Z') },
                ],
                perioderMedArbeidstid: [
                    {
                        from: new Date('2024-04-08T00:00:00.000Z'),
                        to: new Date('2024-04-09T00:00:00.000Z'),
                        arbeidsuker: {
                            '2024-04-08/2024-04-09': {
                                isoDateRange: '2024-04-08/2024-04-09',
                                periode: {
                                    from: new Date('2024-04-08T00:00:00.000Z'),
                                    to: new Date('2024-04-09T00:00:00.000Z'),
                                },
                                dagerIkkeAnsatt: [],
                                arbeidstidEnkeltdager: {
                                    '2024-04-08': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '0',
                                            minutes: '48',
                                        },
                                    },
                                    '2024-04-09': {
                                        faktisk: {
                                            hours: '0',
                                            minutes: '0',
                                        },
                                        normalt: {
                                            hours: '0',
                                            minutes: '48',
                                        },
                                    },
                                },
                                faktisk: {
                                    uke: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                    dag: {
                                        hours: '0',
                                        minutes: '0',
                                    },
                                },
                                normalt: {
                                    uke: {
                                        hours: '1',
                                        minutes: '36',
                                    },
                                    dag: {
                                        hours: '0',
                                        minutes: '48',
                                    },
                                },
                                antallDagerMedArbeidstid: 2,
                            },
                        },
                    },
                ],
                harPerioderFørTillattEndringsperiode: false,
                harPerioderEtterTillattEndringsperiode: false,
            },
        ],
    },
};
