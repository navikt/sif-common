import { Meta, StoryObj } from '@storybook/react';
import { withIntl } from '../../../storybook/decorators/withIntl';
import ArbeidstidUker from './ArbeidstidUker';

const meta: Meta<typeof ArbeidstidUker> = {
    title: 'Modules/ArbeidstidUker',
    component: ArbeidstidUker,
    decorators: [withIntl],
};

export default meta;

type Story = StoryObj<typeof ArbeidstidUker>;

export const Default: Story = {
    args: {
        onEndreUker: () => {},
        listItems: [
            {
                id: '2024-02-01/2024-02-04',
                isoDateRange: '2024-02-01/2024-02-04',
                periode: {
                    from: new Date('2024-02-01T00:00:00.000Z'),
                    to: new Date('2024-02-04T00:00:00.000Z'),
                },
                kanEndres: true,
                kanVelges: false,
                antallDagerMedArbeidstid: 2,
                dagerIkkeAnsatt: [],
                erKortUke: true,
                harFeriedager: false,
                harFjernetFeriedager: false,
                ferie: {
                    dagerMedFerie: [],
                    dagerMedFjernetFerie: [],
                },
                opprinnelig: {
                    faktisk: {
                        hours: '9',
                        minutes: '4',
                    },
                    normalt: {
                        hours: '16',
                        minutes: '0',
                    },
                },
            },
            {
                id: '2024-02-05/2024-02-11',
                isoDateRange: '2024-02-05/2024-02-11',
                periode: {
                    from: new Date('2024-02-05T00:00:00.000Z'),
                    to: new Date('2024-02-11T00:00:00.000Z'),
                },
                kanEndres: true,
                kanVelges: true,
                antallDagerMedArbeidstid: 5,
                dagerIkkeAnsatt: [],
                erKortUke: false,
                harFeriedager: false,
                harFjernetFeriedager: false,
                ferie: {
                    dagerMedFerie: [],
                    dagerMedFjernetFerie: [],
                },
                opprinnelig: {
                    faktisk: {
                        hours: '22',
                        minutes: '40',
                    },
                    normalt: {
                        hours: '40',
                        minutes: '0',
                    },
                },
            },
            {
                id: '2024-02-12/2024-02-18',
                isoDateRange: '2024-02-12/2024-02-18',
                periode: {
                    from: new Date('2024-02-12T00:00:00.000Z'),
                    to: new Date('2024-02-18T00:00:00.000Z'),
                },
                kanEndres: true,
                kanVelges: true,
                antallDagerMedArbeidstid: 5,
                dagerIkkeAnsatt: [],
                erKortUke: false,
                harFeriedager: false,
                harFjernetFeriedager: false,
                ferie: {
                    dagerMedFerie: [],
                    dagerMedFjernetFerie: [],
                },
                opprinnelig: {
                    faktisk: {
                        hours: '22',
                        minutes: '40',
                    },
                    normalt: {
                        hours: '40',
                        minutes: '0',
                    },
                },
            },
            {
                id: '2024-02-19/2024-02-25',
                isoDateRange: '2024-02-19/2024-02-25',
                periode: {
                    from: new Date('2024-02-19T00:00:00.000Z'),
                    to: new Date('2024-02-25T00:00:00.000Z'),
                },
                kanEndres: true,
                kanVelges: true,
                antallDagerMedArbeidstid: 5,
                dagerIkkeAnsatt: [],
                erKortUke: false,
                harFeriedager: false,
                harFjernetFeriedager: false,
                ferie: {
                    dagerMedFerie: [],
                    dagerMedFjernetFerie: [],
                },
                opprinnelig: {
                    faktisk: {
                        hours: '22',
                        minutes: '40',
                    },
                    normalt: {
                        hours: '40',
                        minutes: '0',
                    },
                },
            },
            {
                id: '2024-02-26/2024-03-03',
                isoDateRange: '2024-02-26/2024-03-03',
                periode: {
                    from: new Date('2024-02-26T00:00:00.000Z'),
                    to: new Date('2024-03-03T00:00:00.000Z'),
                },
                kanEndres: true,
                kanVelges: true,
                antallDagerMedArbeidstid: 5,
                dagerIkkeAnsatt: [],
                erKortUke: false,
                harFeriedager: false,
                harFjernetFeriedager: false,
                ferie: {
                    dagerMedFerie: [],
                    dagerMedFjernetFerie: [],
                },
                opprinnelig: {
                    faktisk: {
                        hours: '22',
                        minutes: '40',
                    },
                    normalt: {
                        hours: '40',
                        minutes: '0',
                    },
                },
            },
            {
                id: '2024-03-04/2024-03-10',
                isoDateRange: '2024-03-04/2024-03-10',
                periode: {
                    from: new Date('2024-03-04T00:00:00.000Z'),
                    to: new Date('2024-03-10T00:00:00.000Z'),
                },
                kanEndres: true,
                kanVelges: true,
                antallDagerMedArbeidstid: 5,
                dagerIkkeAnsatt: [],
                erKortUke: false,
                harFeriedager: false,
                harFjernetFeriedager: false,
                ferie: {
                    dagerMedFerie: [],
                    dagerMedFjernetFerie: [],
                },
                opprinnelig: {
                    faktisk: {
                        hours: '22',
                        minutes: '40',
                    },
                    normalt: {
                        hours: '40',
                        minutes: '0',
                    },
                },
            },
            {
                id: '2024-03-11/2024-03-17',
                isoDateRange: '2024-03-11/2024-03-17',
                periode: {
                    from: new Date('2024-03-11T00:00:00.000Z'),
                    to: new Date('2024-03-17T00:00:00.000Z'),
                },
                kanEndres: true,
                kanVelges: true,
                antallDagerMedArbeidstid: 5,
                dagerIkkeAnsatt: [],
                erKortUke: false,
                harFeriedager: false,
                harFjernetFeriedager: false,
                ferie: {
                    dagerMedFerie: [],
                    dagerMedFjernetFerie: [],
                },
                opprinnelig: {
                    faktisk: {
                        hours: '22',
                        minutes: '40',
                    },
                    normalt: {
                        hours: '40',
                        minutes: '0',
                    },
                },
            },
            {
                id: '2024-03-18/2024-03-24',
                isoDateRange: '2024-03-18/2024-03-24',
                periode: {
                    from: new Date('2024-03-18T00:00:00.000Z'),
                    to: new Date('2024-03-24T00:00:00.000Z'),
                },
                kanEndres: true,
                kanVelges: true,
                antallDagerMedArbeidstid: 5,
                dagerIkkeAnsatt: [],
                erKortUke: false,
                harFeriedager: false,
                harFjernetFeriedager: false,
                ferie: {
                    dagerMedFerie: [],
                    dagerMedFjernetFerie: [],
                },
                opprinnelig: {
                    faktisk: {
                        hours: '22',
                        minutes: '40',
                    },
                    normalt: {
                        hours: '40',
                        minutes: '0',
                    },
                },
            },
            {
                id: '2024-03-25/2024-03-31',
                isoDateRange: '2024-03-25/2024-03-31',
                periode: {
                    from: new Date('2024-03-25T00:00:00.000Z'),
                    to: new Date('2024-03-31T00:00:00.000Z'),
                },
                kanEndres: true,
                kanVelges: true,
                antallDagerMedArbeidstid: 5,
                dagerIkkeAnsatt: [],
                erKortUke: false,
                harFeriedager: false,
                harFjernetFeriedager: false,
                ferie: {
                    dagerMedFerie: [],
                    dagerMedFjernetFerie: [],
                },
                opprinnelig: {
                    faktisk: {
                        hours: '22',
                        minutes: '40',
                    },
                    normalt: {
                        hours: '40',
                        minutes: '0',
                    },
                },
            },
            {
                id: '2024-04-01/2024-04-07',
                isoDateRange: '2024-04-01/2024-04-07',
                periode: {
                    from: new Date('2024-04-01T00:00:00.000Z'),
                    to: new Date('2024-04-07T00:00:00.000Z'),
                },
                kanEndres: true,
                kanVelges: true,
                antallDagerMedArbeidstid: 5,
                dagerIkkeAnsatt: [],
                erKortUke: false,
                harFeriedager: false,
                harFjernetFeriedager: false,
                ferie: {
                    dagerMedFerie: [],
                    dagerMedFjernetFerie: [],
                },
                opprinnelig: {
                    faktisk: {
                        hours: '22',
                        minutes: '40',
                    },
                    normalt: {
                        hours: '40',
                        minutes: '0',
                    },
                },
            },
            {
                id: '2024-04-08/2024-04-14',
                isoDateRange: '2024-04-08/2024-04-14',
                periode: {
                    from: new Date('2024-04-08T00:00:00.000Z'),
                    to: new Date('2024-04-14T00:00:00.000Z'),
                },
                kanEndres: true,
                kanVelges: true,
                antallDagerMedArbeidstid: 5,
                dagerIkkeAnsatt: [],
                erKortUke: false,
                harFeriedager: false,
                harFjernetFeriedager: false,
                ferie: {
                    dagerMedFerie: [],
                    dagerMedFjernetFerie: [],
                },
                opprinnelig: {
                    faktisk: {
                        hours: '22',
                        minutes: '40',
                    },
                    normalt: {
                        hours: '40',
                        minutes: '0',
                    },
                },
            },
            {
                id: '2024-04-15/2024-04-21',
                isoDateRange: '2024-04-15/2024-04-21',
                periode: {
                    from: new Date('2024-04-15T00:00:00.000Z'),
                    to: new Date('2024-04-21T00:00:00.000Z'),
                },
                kanEndres: true,
                kanVelges: true,
                antallDagerMedArbeidstid: 5,
                dagerIkkeAnsatt: [],
                erKortUke: false,
                harFeriedager: false,
                harFjernetFeriedager: false,
                ferie: {
                    dagerMedFerie: [],
                    dagerMedFjernetFerie: [],
                },
                opprinnelig: {
                    faktisk: {
                        hours: '22',
                        minutes: '40',
                    },
                    normalt: {
                        hours: '40',
                        minutes: '0',
                    },
                },
            },
            {
                id: '2024-04-22/2024-04-28',
                isoDateRange: '2024-04-22/2024-04-28',
                periode: {
                    from: new Date('2024-04-22T00:00:00.000Z'),
                    to: new Date('2024-04-28T00:00:00.000Z'),
                },
                kanEndres: true,
                kanVelges: true,
                antallDagerMedArbeidstid: 5,
                dagerIkkeAnsatt: [],
                erKortUke: false,
                harFeriedager: false,
                harFjernetFeriedager: false,
                ferie: {
                    dagerMedFerie: [],
                    dagerMedFjernetFerie: [],
                },
                opprinnelig: {
                    faktisk: {
                        hours: '22',
                        minutes: '40',
                    },
                    normalt: {
                        hours: '40',
                        minutes: '0',
                    },
                },
            },
            {
                id: '2024-04-29/2024-05-05',
                isoDateRange: '2024-04-29/2024-05-05',
                periode: {
                    from: new Date('2024-04-29T00:00:00.000Z'),
                    to: new Date('2024-05-05T00:00:00.000Z'),
                },
                kanEndres: true,
                kanVelges: true,
                antallDagerMedArbeidstid: 5,
                dagerIkkeAnsatt: [],
                erKortUke: false,
                harFeriedager: false,
                harFjernetFeriedager: false,
                ferie: {
                    dagerMedFerie: [],
                    dagerMedFjernetFerie: [],
                },
                opprinnelig: {
                    faktisk: {
                        hours: '22',
                        minutes: '40',
                    },
                    normalt: {
                        hours: '40',
                        minutes: '0',
                    },
                },
            },
            {
                id: '2024-05-06/2024-05-12',
                isoDateRange: '2024-05-06/2024-05-12',
                periode: {
                    from: new Date('2024-05-06T00:00:00.000Z'),
                    to: new Date('2024-05-12T00:00:00.000Z'),
                },
                kanEndres: true,
                kanVelges: true,
                antallDagerMedArbeidstid: 5,
                dagerIkkeAnsatt: [],
                erKortUke: false,
                harFeriedager: false,
                harFjernetFeriedager: false,
                ferie: {
                    dagerMedFerie: [],
                    dagerMedFjernetFerie: [],
                },
                opprinnelig: {
                    faktisk: {
                        hours: '22',
                        minutes: '40',
                    },
                    normalt: {
                        hours: '40',
                        minutes: '0',
                    },
                },
            },
            {
                id: '2024-05-13/2024-05-19',
                isoDateRange: '2024-05-13/2024-05-19',
                periode: {
                    from: new Date('2024-05-13T00:00:00.000Z'),
                    to: new Date('2024-05-19T00:00:00.000Z'),
                },
                kanEndres: true,
                kanVelges: true,
                antallDagerMedArbeidstid: 5,
                dagerIkkeAnsatt: [],
                erKortUke: false,
                harFeriedager: false,
                harFjernetFeriedager: false,
                ferie: {
                    dagerMedFerie: [],
                    dagerMedFjernetFerie: [],
                },
                opprinnelig: {
                    faktisk: {
                        hours: '22',
                        minutes: '40',
                    },
                    normalt: {
                        hours: '40',
                        minutes: '0',
                    },
                },
            },
            {
                id: '2024-05-20/2024-05-26',
                isoDateRange: '2024-05-20/2024-05-26',
                periode: {
                    from: new Date('2024-05-20T00:00:00.000Z'),
                    to: new Date('2024-05-26T00:00:00.000Z'),
                },
                kanEndres: true,
                kanVelges: true,
                antallDagerMedArbeidstid: 5,
                dagerIkkeAnsatt: [],
                erKortUke: false,
                harFeriedager: false,
                harFjernetFeriedager: false,
                ferie: {
                    dagerMedFerie: [],
                    dagerMedFjernetFerie: [],
                },
                opprinnelig: {
                    faktisk: {
                        hours: '22',
                        minutes: '40',
                    },
                    normalt: {
                        hours: '40',
                        minutes: '0',
                    },
                },
            },
            {
                id: '2024-05-27/2024-05-31',
                isoDateRange: '2024-05-27/2024-05-31',
                periode: {
                    from: new Date('2024-05-27T00:00:00.000Z'),
                    to: new Date('2024-05-31T00:00:00.000Z'),
                },
                kanEndres: true,
                kanVelges: true,
                antallDagerMedArbeidstid: 5,
                dagerIkkeAnsatt: [],
                erKortUke: false,
                harFeriedager: false,
                harFjernetFeriedager: false,
                ferie: {
                    dagerMedFerie: [],
                    dagerMedFjernetFerie: [],
                },
                opprinnelig: {
                    faktisk: {
                        hours: '22',
                        minutes: '40',
                    },
                    normalt: {
                        hours: '40',
                        minutes: '0',
                    },
                },
            },
        ],
    },
};
