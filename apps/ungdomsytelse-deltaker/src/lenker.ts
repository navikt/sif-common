interface Lenker {
    navno: string;
    personvern: string;
    rettOgPlikt: string;
    saksbehandlingstider: string;
    skrivTilOss: string;
}

const LenkerBokmål: Lenker = {
    navno: 'https://www.nav.no/',
    personvern:
        'https://www.nav.no/no/NAV+og+samfunn/Om+NAV/personvern-i-arbeids-og-velferdsetaten/personvernerkl%C3%A6ring-for-arbeids-og-velferdsetaten',
    rettOgPlikt: 'https://nav.no/rettOgPlikt',
    saksbehandlingstider: 'https://www.nav.no/saksbehandlingstider',
    skrivTilOss: 'https://www.nav.no/person/kontakt-oss/nb/skriv-til-oss',
};

const getLenker = (locale?: string): Lenker => {
    switch (locale) {
        case 'nn':
            return {
                ...LenkerBokmål,
            };
        default:
            return LenkerBokmål;
    }
};

export default getLenker;
