import { Aksjonspunkt } from '../../server/api-models/AksjonspunktSchema';
import { Venteårsak } from '../../types/Venteårsak';
import { ProcessStepData } from '../process/ProcessStep';
import { Søknadstype } from '../../server/api-models/Søknadstype';
import { Søknadshendelse, SøknadshendelseType } from '../../types/Søknadshendelse';
import { Søknad } from '../../server/api-models/SøknadSchema';
import { formatSøknadshendelseTidspunkt } from '../../utils/sakUtils';

export const getSøknadstypeStatusmelding = (søknadstype: Søknadstype): string => {
    switch (søknadstype) {
        case Søknadstype.SØKNAD:
            return 'Vi mottok søknad om pleiepenger for sykt barn';
        case Søknadstype.ENDRINGSMELDING:
            return 'Vi mottok søknad om endring av pleiepenger for sykt barn';
    }
};

export const getAksjonspunkterTekst = (aksjonspunkter: Aksjonspunkt[]): string => {
    const årsaker = aksjonspunkter.map((a) => a.venteårsak).flat();
    if (årsaker.includes(Venteårsak.MEDISINSK_DOKUMENTASJON)) {
        return 'Saken er satt på vent fordi vi mangler legeerklæring';
    }
    if (årsaker.includes(Venteårsak.INNTEKTSMELDING)) {
        return 'Saken er satt på vent fordi vi mangler inntektsmelding';
    }
    return `Saken er satt på vent fordi vi mangler informajson`;
};

export const getProcessStepFromMottattSøknad = (søknad: Søknad, current: boolean): ProcessStepData => {
    switch (søknad.søknadstype) {
        case Søknadstype.SØKNAD:
            return {
                title: 'Vi mottok søknad om pleiepenger for sykt barn',
                content: <p>{formatSøknadshendelseTidspunkt(søknad.k9FormatSøknad.mottattDato)}</p>,
                completed: true,
                current,
            };
        case Søknadstype.ENDRINGSMELDING:
            return {
                title: 'Vi mottok søknad om endring av pleiepenger for sykt barn',
                content: <p>{formatSøknadshendelseTidspunkt(søknad.k9FormatSøknad.mottattDato)}</p>,
                completed: true,
                current,
            };
    }
};

export const getProcessStepsFraSøknadshendelser = (hendelser: Søknadshendelse[]): ProcessStepData[] => {
    /** Aksjonspunkt skal ikke vises enda */
    const hendelserSomSkalVises = hendelser.filter((h) => h.type !== SøknadshendelseType.AKSJONSPUNKT);

    const antall = hendelserSomSkalVises.length;
    const erFerdigBehandlet = hendelserSomSkalVises[antall - 1].type === SøknadshendelseType.FERDIG_BEHANDLET;

    return hendelserSomSkalVises.map((hendelse, index): ProcessStepData => {
        /** Gjeldende hendelse er per må alltid siste hendelse før ferdig behandlet, eller ferdig behandlet */
        const erSisteHendelseFørFerdigBehandlet = erFerdigBehandlet ? index === antall - 1 : index === antall - 2;

        switch (hendelse.type) {
            case SøknadshendelseType.MOTTATT_SØKNAD:
                return getProcessStepFromMottattSøknad(hendelse.søknad, erSisteHendelseFørFerdigBehandlet);

            case SøknadshendelseType.AKSJONSPUNKT:
                return {
                    title: hendelse.venteårsak,
                    completed: false,
                    current: true,
                    content: '',
                    timestamp: hendelse.dato,
                };

            case SøknadshendelseType.FERDIG_BEHANDLET:
                return {
                    title: 'Søknad er ferdig behandlet',
                    content: <p>{formatSøknadshendelseTidspunkt(hendelse.dato)}</p>,
                    completed: true,
                    timestamp: hendelse.dato,
                };

            case SøknadshendelseType.FORVENTET_SVAR:
                return {
                    title: 'Søknaden er ferdig behandlet',
                    content: (
                        <>
                            Inntektsmelding fra arbeidsgiver og legeerklæring må være sendt inn for at vi kan behandle
                            saken.
                        </>
                    ),
                    completed: false,
                    timestamp: hendelse.dato,
                };
        }
    });
};
