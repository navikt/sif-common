const nb = {
    'page.kvittering.sidetittel': 'Vi har mottatt søknaden din',
    'page.kvittering.tittel': 'Vi har mottatt søknad om pleiepenger i livets sluttfase',
    'page.kvittering.info.tittel': 'Hva skjer videre nå?',
    'page.kvittering.list.item.1':
        'Vi kontakter {antall, plural, one {arbeidsgiver} other {arbeidsgiverne}} hvis vi trenger inntektsmelding for å behandle søknaden.',
    'page.kvittering.list.item.2':
        'Vi starter behandlingen av søknaden din når vi har mottatt all nødvendig dokumentasjon. Vi kontakter deg hvis vi trenger flere opplysninger.',
    'page.kvittering.list.item.3':
        'Når søknaden er ferdig behandlet får du et svar fra oss på «Min side». <Lenke>Du kan sjekke saksbehandlingstiden her</Lenke>.',
};

const nn: Record<keyof typeof nb, string> = {
    'page.kvittering.sidetittel': 'Vi har motteke søknaden din',
    'page.kvittering.tittel': 'Vi har motteke søknad om pleiepengar i livets sluttfase',
    'page.kvittering.info.tittel': 'Kva skjer vidare no?',
    'page.kvittering.list.item.1':
        'Du må be {antall, plural, one {arbeidsgivar} other {arbeidsgivarane}} om å sende inntektsmelding så snart som mogleg dersom du søker for første gong eller det er meir enn 4 veker sidan sist du hadde pleiepengar.',
    'page.kvittering.list.item.2':
        'Vi startar behandlinga av søknaden din når vi har motteke all nødvendig dokumentasjon. Vi kontaktar deg dersom vi treng fleire opplysningar.',
    'page.kvittering.list.item.3':
        'Når søknaden er ferdig behandla, får du eit svar frå oss på «Mi side». <Lenke>Du kan sjekke saksbehandlingstida her</Lenke>.',
};

export const kvitteringMessages = { nb, nn };
