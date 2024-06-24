import { ISODateToDate } from '@navikt/sif-common-utils';
import { Behandling } from '../../server/api-models/BehandlingSchema';
import { Behandlingsstatus } from '../../server/api-models/Behandlingsstatus';
import { sortBehandlingerNyesteFørst, sortSakshendelse } from '../sakUtils';
import { Sakshendelse, Sakshendelser } from '../../types/Sakshendelse';
import { Innsendelsestype } from '../../server/api-models/Innsendelsestype';

const behandling1: Behandling = {
    status: Behandlingsstatus.UNDER_BEHANDLING,
    innsendelser: [] as any,
    opprettetTidspunkt: ISODateToDate('2020-01-01'),
    aksjonspunkter: [],
    avsluttetTidspunkt: null,
};
const behandling2: Behandling = {
    status: Behandlingsstatus.UNDER_BEHANDLING,
    innsendelser: [] as any,
    opprettetTidspunkt: ISODateToDate('2020-01-03'),
    aksjonspunkter: [],
    avsluttetTidspunkt: null,
};
const behandling3: Behandling = {
    status: Behandlingsstatus.UNDER_BEHANDLING,
    innsendelser: [] as any,
    opprettetTidspunkt: ISODateToDate('2020-01-02'),
    aksjonspunkter: [],
    avsluttetTidspunkt: null,
};

describe('sakUtils', () => {
    describe('sortBehandlinger', () => {
        it('sorterer behandlinger på sak riktig', () => {
            const sorterteBehandlinger = sortBehandlingerNyesteFørst([behandling1, behandling2, behandling3]);
            expect(sorterteBehandlinger).toEqual([behandling2, behandling3, behandling1]);
        });
    });

    describe('sortSakshendelser', () => {
        const hendelse1: Sakshendelse = {
            dato: ISODateToDate('2020-01-01'),
            type: Sakshendelser.FERDIG_BEHANDLET,
        };
        const hendelse2: Sakshendelse = {
            dato: ISODateToDate('2020-01-03'),
            type: Sakshendelser.MOTTATT_SØKNAD,
            innsendelse: {} as any,
        };
        const hendelse3: Sakshendelse = {
            dato: ISODateToDate('2020-01-03'),
            type: Sakshendelser.FERDIG_BEHANDLET,
        };

        const hendelseForventetSvar: Sakshendelse = {
            dato: ISODateToDate('2020-01-02'),
            type: Sakshendelser.FORVENTET_SVAR,
            søknadstyperIBehandling: [Innsendelsestype.SØKNAD],
        };

        it('sorterer riktig på hendelser som ikke er FORVENTET_SVAR', () => {
            const result = [hendelse1, hendelse2, hendelse3].sort(sortSakshendelse);
            expect(result).toEqual([hendelse1, hendelse3, hendelse2]);
        });
        it('sorterer alltid FORVENTET_SVAR sist', () => {
            const result = [hendelseForventetSvar, hendelse1, hendelse2, hendelse3].sort(sortSakshendelse);
            expect(result).toEqual([hendelse1, hendelse3, hendelse2, hendelseForventetSvar]);
        });
    });
});
