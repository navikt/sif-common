interface AppInfo {
    /** Ikke synlig beskrivende navn - brukes i amplitude */
    navn: string;
    /** Applikasjonsnøkkel som brukes i amplitude og sentry */
    key: string;
    /** Tittel brukt i applikasjon, og dersom en skal lenke til applikasjon */
    tittel: {
        nb: string;
    };
    /** Lenker til applikasjon i Q og PROD */
    lenker: {
        q: string;
        prod: string;
    };
}

export const PleiepengerSyktBarnApp: AppInfo = {
    key: 'pleiepengesoknad',
    navn: 'Pleiepenger for sykt barn',
    tittel: {
        nb: 'Søknad om pleiepenger for sykt barn',
    },
    lenker: {
        q: 'https://pleiepengesoknad.intern.dev.nav.no',
        prod: 'https://www.nav.no/familie/sykdom-i-familien/soknad/pleiepenger',
    },
};

export const EndringsmeldingPsbApp: AppInfo = {
    key: 'endringsmelding-pleiepenger',
    navn: 'Endringsmelding pleiepenger sykt barn',
    tittel: {
        nb: 'Endringsmelding for pleiepenger sykt barn',
    },
    lenker: {
        q: 'https://endringsmelding-pleiepenger.intern.dev.nav.no',
        prod: 'https://www.nav.no/familie/sykdom-i-familien/soknad/endringsmelding-pleiepenger',
    },
};

export const PleiepengerLivetsSluttApp: AppInfo = {
    key: 'pleiepenger-i-livets-sluttfase-soknad',
    navn: 'Pleiepenger i livets sluttfase',
    tittel: {
        nb: 'Søknad om pleiepenger i livets sluttfase',
    },
    lenker: {
        q: 'https://pleiepenger-i-livets-sluttfase.intern.dev.nav.no',
        prod: 'https://nav.no/familie/sykdom-i-familien/soknad/pleiepenger-i-livets-sluttfase',
    },
};

export const OmsorgsdagerKroniskApp: AppInfo = {
    key: 'omsorgspengersoknad',
    navn: 'Ekstra omsorgsdager for barn som har kronisk/langvarig sykdom eller funksjonshemning',
    tittel: {
        nb: 'Søknad om ekstra omsorgsdager for barn som har kronisk/langvarig sykdom eller funksjonshemning',
    },
    lenker: {
        q: 'https://omsorgspengesoknad.intern.dev.nav.no',
        prod: 'https://www.nav.no/familie/sykdom-i-familien/soknad/omsorgspenger',
    },
};

export const OmsorgsdagerAleneomsorgApp: AppInfo = {
    key: 'omsorgsdager-aleneomsorg-dialog',
    navn: 'Ekstra omsorgsdager ved aleneomsorg',
    tittel: {
        nb: 'Søknad om ekstra omsorgsdager ved aleneomsorg',
    },
    lenker: {
        q: 'https://omsorgsdager-aleneomsorg-dialog.intern.dev.nav.no',
        prod: 'https://www.nav.no/familie/sykdom-i-familien/soknad/omsorgsdager-aleneomsorg',
    },
};

export const OmsorgsdagerAnnenForelderIkkeTilsynApp: AppInfo = {
    key: 'ekstra-omsorgsdager-andre-forelder-ikke-tilsyn',
    navn: 'Ekstra omsorgsdager når den andre forelderen ikke kan ha tilsyn med barn',
    tittel: {
        nb: 'Søknad om ekstra omsorgsdager når den andre forelderen ikke kan ha tilsyn med barn',
    },
    lenker: {
        q: 'https://ekstra-omsorgsdager-andre-forelder-ikke-tilsyn.intern.dev.nav.no',
        prod: 'https://www.nav.no/familie/sykdom-i-familien/soknad/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn',
    },
};

export const OmsorgspengerutbetalingArbeidstakerApp: AppInfo = {
    key: 'omsorgspengerutbetaling-arbeidstaker',
    navn: 'Utbetaling av omsorgspenger for arbeidstaker',
    tittel: {
        nb: 'Søknad om utbetaling av omsorgspenger når arbeidsgiver ikke utbetaler',
    },
    lenker: {
        q: 'https://omsorgspengerutbetaling-arbeidstaker-soknad.intern.dev.nav.no',
        prod: 'https://www.nav.no/familie/sykdom-i-familien/soknad/omsorgspengerutbetaling-arbeidstaker',
    },
};

export const OmsorgspengerutbetalingSNFriApp: AppInfo = {
    key: 'omsorgspengerutbetaling-soknad',
    navn: 'Utbetaling av omsorgspenger for selvstendig næringsdrivende og frilansere',
    tittel: {
        nb: 'Søknad om utbetaling av omsorgspenger til selvstendig næringsdrivende eller frilansere',
    },
    lenker: {
        q: 'https://omsorgspengerutbetaling-soknad.intern.dev.nav.no',
        prod: 'https://www.nav.no/familie/sykdom-i-familien/soknad/omsorgspengerutbetaling',
    },
};

export const EttersendelseApp: AppInfo = {
    key: 'ettersending',
    navn: 'Ettersending av dokumenter innenfor sykdom i familien',
    tittel: {
        nb: 'Ettersendelse',
    },
    lenker: {
        q: 'https://k9-ettersending-soknad.intern.dev.nav.no',
        prod: 'https://www.nav.no/familie/sykdom-i-familien/soknad/ettersending',
    },
};

export const EttersendelsePsbApp: AppInfo = {
    key: 'ettersending',
    navn: 'Ettersendelse - Pleiepenger for sykt barn',
    tittel: {
        nb: 'Ettersendelse - Pleiepenger for sykt barn',
    },
    lenker: {
        q: 'https://k9-ettersending-soknad.intern.dev.nav.no/familie/sykdom-i-familien/soknad/ettersending/pleiepenger/melding/velkommen',
        prod: 'https://www.nav.no/familie/sykdom-i-familien/soknad/ettersending/pleiepenger/melding/velkommen',
    },
};

export const EttersendelseLivetsSluttApp: AppInfo = {
    key: 'ettersending',
    navn: 'Ettersendelse - Pleiepenger i livets sluttfase',
    tittel: {
        nb: 'Ettersendelse - Pleiepenger for sykt barn',
    },
    lenker: {
        q: 'https://k9-ettersending-soknad.intern.dev.nav.no/familie/sykdom-i-familien/soknad/ettersending/pleiepenger-livets-sluttfase/melding/velkommen',
        prod: 'https://www.nav.no/familie/sykdom-i-familien/soknad/ettersending/pleiepenger-livets-sluttfase/melding/velkommen',
    },
};
export const EttersendelseOmsorgspengerApp: AppInfo = {
    key: 'ettersending',
    navn: 'Ettersendelse - Omsorgspenger',
    tittel: {
        nb: 'Ettersendelse - Omsorgspenger',
    },
    lenker: {
        q: 'https://k9-ettersending-soknad.intern.dev.nav.no/familie/sykdom-i-familien/soknad/ettersending/omsorgspenger/melding/velkommen',
        prod: 'https://www.nav.no/familie/sykdom-i-familien/soknad/ettersending/omsorgspenger/melding/velkommen',
    },
};
export const InnsynPsbApp: AppInfo = {
    key: 'sif-innsyn',
    navn: 'Dine pleiepenger - sykt barn',
    tittel: {
        nb: 'Dine pleiepenger',
    },
    lenker: {
        q: 'https://sif-innsyn.intern.dev.nav.no',
        prod: 'https://www.nav.no/familie/sykdom-i-familien/soknad/innsyn',
    },
};

export const OmsorgsdagerKalkulator: AppInfo = {
    key: 'omsorgsdagerkalkulator',
    navn: 'Omsorgsdagerkalkulator',
    tittel: {
        nb: 'Kalkulator for omsorgsdager',
    },
    lenker: {
        q: 'https://omsorgsdager-kalkulator.intern.dev.nav.no',
        prod: 'https://www.nav.no/omsorgspenger/kalkulator-antall-omsorgsdager',
    },
};

export const OpplæringspengerApp: AppInfo = {
    key: 'opplaringspenger-soknad',
    navn: 'Søknad om opplæringspenger',
    tittel: {
        nb: 'Søknad om opplæringspenger',
    },
    lenker: {
        q: 'https://opplaringspenger-soknad.intern.dev.nav.no',
        prod: 'https://www.nav.no/familie/sykdom-i-familien/soknad/opplaringspenger',
    },
};

export const UngdomsytelseDeltakerApp: AppInfo = {
    key: 'ungdomsytelse-deltaker',
    navn: 'Søknad om deltakelse i ungdomprogrammer',
    tittel: {
        nb: 'Søknad om deltakelse i ungdomprogrammer',
    },
    lenker: {
        q: 'https://ungdomsytelse-deltaker.intern.dev.nav.no',
        prod: 'https://www.nav.no/familie/sykdom-i-familien/ungdomsytelse-deltaker',
    },
};
