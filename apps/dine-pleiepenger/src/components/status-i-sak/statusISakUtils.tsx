import { ProcessStepData } from '../process/ProcessStep';
import { Innsendelsestype } from '../../server/api-models/Innsendelsestype';
import { Sakshendelse, SakshendelseForventetSvar, Sakshendelser } from '../../types/Sakshendelse';
import { Innsendelse } from '../../server/api-models/InnsendelseSchema';
import SøknadStatusContent from './parts/SøknadStatusContent';
import EndringsmeldingStatusContent from './parts/EndringsmeldingStatusContent';
import FerdigBehandletStatusContent from './parts/FerdigBehandletStatusContent';
import { Msg, TextFn as TextFn } from '../../i18n';
import { Box } from '@navikt/ds-react';
import EttersendelseStatusContent from './parts/EttersendelseStatusContent';
import { Ettersendelsestype } from '../../types/EttersendelseType';

export const getProcessStepFromInnsendelse = (
    text: TextFn,
    innsendelse: Innsendelse,
    current: boolean,
): ProcessStepData | undefined => {
    switch (innsendelse.innsendelsestype) {
        case Innsendelsestype.SØKNAD:
            return {
                title: text('statusISak.mottattSøknad.tittel'),
                timestamp: innsendelse.k9FormatInnsendelse.mottattDato,
                content: <SøknadStatusContent søknad={innsendelse} />,
                completed: true,
                current,
                isLastStep: false,
            };
        case Innsendelsestype.ENDRINGSMELDING:
            return {
                title: text('statusISak.mottattEndringsmelding.tittel'),
                timestamp: innsendelse.k9FormatInnsendelse.mottattDato,
                content: <EndringsmeldingStatusContent søknad={innsendelse} />,
                completed: true,
                current,
                isLastStep: false,
            };
        case Innsendelsestype.ETTERSENDELSE:
            return {
                title: text(
                    innsendelse.k9FormatInnsendelse.type === Ettersendelsestype.legeerklæring
                        ? 'statusISak.mottattEttersendelse.legeerklæring.tittel'
                        : 'statusISak.mottattEttersendelse.annet.tittel',
                ),
                timestamp: innsendelse.k9FormatInnsendelse.mottattDato,
                content: <EttersendelseStatusContent ettersendelse={innsendelse} />,
                completed: true,
                current,
                isLastStep: false,
            };
    }
};

export const getProcessStepsFraSakshendelser = (text: TextFn, hendelser: Sakshendelse[]): ProcessStepData[] => {
    /** Aksjonspunkt skal ikke vises enda */
    const hendelserSomSkalVises = hendelser.filter((h) => h.type !== Sakshendelser.AKSJONSPUNKT);

    if (hendelserSomSkalVises.length === 0) {
        return [];
    }

    const antall = hendelserSomSkalVises.length;
    const erFerdigBehandlet = hendelserSomSkalVises[antall - 1].type === Sakshendelser.FERDIG_BEHANDLET;

    return hendelserSomSkalVises
        .map((hendelse, index): ProcessStepData | undefined => {
            /** Gjeldende hendelse er per må alltid siste hendelse før ferdig behandlet, eller ferdig behandlet */
            const erGjeldendeHendelse = erFerdigBehandlet ? index === antall - 1 : index === antall - 2;

            switch (hendelse.type) {
                case Sakshendelser.MOTTATT_SØKNAD:
                case Sakshendelser.ETTERSENDELSE:
                    return getProcessStepFromInnsendelse(text, hendelse.innsendelse, erGjeldendeHendelse);

                case Sakshendelser.AKSJONSPUNKT:
                    return {
                        title: hendelse.venteårsak,
                        completed: false,
                        current: true,
                        content: '',
                        timestamp: hendelse.dato,
                    };

                case Sakshendelser.FERDIG_BEHANDLET:
                    return {
                        title: text('statusISak.ferdigBehandlet.tittel'),
                        content: <FerdigBehandletStatusContent />,
                        completed: true,
                        isLastStep: true,
                        current: erGjeldendeHendelse,
                        timestamp: hendelse.dato,
                    };

                case Sakshendelser.FORVENTET_SVAR:
                    return {
                        ...getForventetSvarTitleContent(hendelse, text),
                        completed: false,
                        isLastStep: true,
                    };
            }
        })
        .filter((h) => h !== undefined) as ProcessStepData[];
};

const getForventetSvarTitleContent = (
    hendelse: SakshendelseForventetSvar,
    text: TextFn,
): Pick<ProcessStepData, 'title' | 'content'> => {
    const inneholderSøknad = hendelse.søknadstyperIBehandling.includes(Innsendelsestype.SØKNAD);
    const inneholderEndring = hendelse.søknadstyperIBehandling.includes(Innsendelsestype.ENDRINGSMELDING);

    if (!inneholderSøknad && inneholderEndring) {
        return {
            title: text('statusISak.forventetSvar.endring.tittel'),
            content: (
                <Box className="mt-2">
                    <Msg id="statusISak.forventetSvar.endring.info" />
                </Box>
            ),
        };
    }
    return {
        title: text('statusISak.forventetSvar.søknad.tittel'),
        content: (
            <Box className="mt-2">
                <Msg id="statusISak.forventetSvar.søknad.info" />
            </Box>
        ),
    };
};
