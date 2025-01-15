const nb = {
    'page.velkommen.guide.tittel': 'Hei {navn}',
    'page.velkommen.guide.ingress': 'Velkommen til søknad om pleiepenger for sykt barn.',
    'page.velkommen.guide.tekst.1':
        'Denne søknaden er for deg som må være borte fra jobb for å ta vare på et barn, eller en person over 18 år, som på grunn av sykdom trenger pleie og omsorg hele tiden.',
    'page.velkommen.guide.tekst.2':
        'Når søknaden gjelder et barn, må barnet ha vært til behandling/utredning i sykehus, eller en annen spesialisthelsetjeneste. Gjelder søknaden en person over 18 år, må personen være utviklingshemmet og svært alvorlig syk.',

    'page.velkommen.omSøknaden.tittel': 'Om søknaden',
    'page.velkommen.omSøknaden.1': 'Du får veiledning underveis i søknaden om hva du skal fylle ut, og hvordan.',
    'page.velkommen.omSøknaden.fremoverITid':
        'Hvis du søker frem i tid, har vi forståelse for at du kan bli usikker på hva du skal svare på noen spørsmål som handler om tiden fremover. Da svarer du så godt du kan ut fra hva situasjonen er nå, og så kan du melde fra om eventuelle endringer senere.',
    'page.velkommen.omSøknaden.2':
        'Vi tar vare på svarene dine i 72 timer. Så, hvis du innenfor den tiden for eksempel vil ta en pause eller blir automatisk logget ut, fortsetter du der du var når du kommer tilbake.',
    'page.velkommen.omSøknaden.3':
        'Du må svare på alle spørsmålene for å kunne gå videre. Hvis du mangler etterspurt dokumentasjon, kan du ettersende det så snart du kan.',
    'page.velkommen.omSøknaden.4': 'Om hvordan vi innhenter opplysninger om deg',
    'page.velkommen.form.bekreftLabel': 'Jeg bekrefter at jeg har forstått mitt ansvar som søker',
    'page.velkommen.form.ansvar.tittel': 'Ditt ansvar som søker',
    'page.velkommen.form.ansvar.list.1':
        'Jeg forstår at hvis jeg gir uriktige opplysninger, kan det få konsekvenser for retten min til det jeg søker om',
    'page.velkommen.form.ansvar.list.2': 'Jeg har lest og forstått det som står på <Lenke>nav.no/rett og plikt</Lenke>',
    'page.velkommen.harForståttRettigheterOgPlikter.notChecked': 'Du må velge at du har forstått ditt ansvar som søker',
    'personopplysninger.dialogtittel': 'Om behandling av personopplysninger',

    'page.velkommen.omSøknaden.endringer.tittel': 'Om hvordan melde fra om endringer',
    'page.velkommen.omSøknaden.endringer.tekst.1.a':
        'Hvis du ønsker å melde fra om endringer i en periode som du allerede har søkt om pleiepenger trenger du ikke sende ny søknad. Du kan sende',
    'page.velkommen.omSøknaden.endringer.tekst.1.b': 'endringsmelding',
    'page.velkommen.omSøknaden.endringer.tekst.1.c':
        ' for å melde fra om du skal jobbe mer eller mindre, om du skal ha ferie, eller endre på allerede registrert ferie.',
    'page.velkommen.omSøknaden.endringer.tekst.2.a':
        'Hvis du skal gjøre andre endringer sender du en melding til oss via',
    'page.velkommen.omSøknaden.endringer.tekst.2.b': 'Skriv til oss',
    'page.velkommen.omSøknaden.endringer.tekst.2.c':
        '. Det samme gjelder hvis du er selvstendig næringsdrivende, eller har pleiepenger for flere barn.',

    'personopplysninger.1': 'Slik behandler Nav personopplysningene dine',
    'personopplysninger.2':
        'Vi innhenter og mottar opplysninger om deg for å behandle saken din. Det er nødvendig for at du skal få riktig tjeneste. Deler av saken din behandles automatisk.',
    'personopplysninger.3': 'Hvilke opplysninger innhenter vi?',
    'personopplysninger.4':
        'Opplysningene vi innhenter kommer enten fra deg, arbeidsgiver eller fra offentlige registre:',
    'personopplysninger.4.1': 'hvilke barn du er registrert som forelder til',
    'personopplysninger.4.2': 'opplysninger om barnets helse',
    'personopplysninger.4.3': 'arbeidsforholdene dine og inntekten din',
    'personopplysninger.4.4': 'ytelser du mottar fra Nav',
    'personopplysninger.4.5': 'tilknytningen din til Norge',
    'personopplysninger.4.6':
        'trygdeordninger du kan ha rett til i andre land. Vi kan også sende opplysninger om deg til trygdemyndigheter i andre land.',
    'personopplysninger.4b':
        'Vi lagrer opplysningene vi får inn om barnet du søker pleiepenger for. Dette gjør vi for å kunne gjenbruke opplysningene hvis andre omsorgspersoner søker pleiepenger for samme barn.',
    'personopplysninger.5':
        'Du har rett til innsyn i saken din. Vil du vite mer om hvordan Nav behandler personopplysninger? Se <Lenke>nav.no/personvern</Lenke>.',
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
};

export const velkommenPageMessages = {
    nb,
    nn,
};
