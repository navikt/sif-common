import { infoNormalarbeidstid } from '../components/info-normalarbeidstid/infoNormalarbeidstid.messages';
import { arbeidstidUkerMessages } from '../modules/arbeidstid-uker/arbeidstidUkerMessages';
import { endreArbeidstidMessages } from '../modules/endre-arbeidstid-form/endreArbeidstidMessages';
import { velkommenPageMessages } from '../pages/velkommen/velkommenPageMessages';
import { arbeidstidStepMessages } from '../søknad/steps/arbeidstid/arbeidstidStepMessages';
import { oppsummeringStepMessages } from '../søknad/steps/oppsummering/oppsummeringStepMessages';
import { ukjentArbeidsforholdFormMessages } from '../søknad/steps/ukjent-arbeidsforhold/ukjentArbeidsforholdFormMessages';
import { samtykkeFormOverrideMessages } from './samtykkeFormOverrideMessages';
import { sifCommonSoknadOverrideMessages } from './sifCommonSoknadOverrideMessages';

const nb = {
    ...arbeidstidStepMessages.nb,
    ...endreArbeidstidMessages.nb,
    ...infoNormalarbeidstid.nb,
    ...samtykkeFormOverrideMessages.nb,
    ...ukjentArbeidsforholdFormMessages.nb,
    ...velkommenPageMessages.nb,
    ...oppsummeringStepMessages.nb,
    ...sifCommonSoknadOverrideMessages.nb,
    ...arbeidstidUkerMessages.nb,

    'application.title': 'Endringsmelding for pleiepenger sykt barn',
    'step.ukjentArbeidsforhold.pageTitle': 'Nytt arbeidsforhold',
    'step.ukjentArbeidsforhold.stepTitle': 'Nytt arbeidsforhold',
    'step.aktivitet.stepTitle': 'Velg arbeidsforhold',
    'step.arbeidstid.stepTitle': 'Jobb i pleiepengeperioden',
    'step.lovbestemtFerie.stepTitle': 'Ferie i pleiepengeperioden',
    'step.oppsummering.stepTitle': 'Oppsummering',

    'arbeidsaktivitetBlockHeader.nyttArbeidsforhold': 'Nytt arbeidsforhold',
    'arbeidsaktivitetBlockHeader.arbeidsgiver.orgnummer': 'Organisasjonsnummer: {orgnr}',
    'arbeidsaktivitetBlockHeader.arbeidsgiver.ansettelsesperioder': 'Ansettelsesperioder',
    'arbeidsaktivitetBlockHeader.arbeidsgiver.ansattFom': 'Ansatt: {dato}.',
    'arbeidsaktivitetBlockHeader.arbeidsgiver.ansattTom': ': Sluttdato: {dato}.',

    'ikkeAnsattMelding.tekst':
        'Er du feilregistrert eller du har sluttet i dette arbeidsforholdet før perioden du søkte pleiepenger, må du be arbeidsgiveren om å sende en ny A-melding med sluttdato. Dette gjør de enten via eget lønns- og personalsystem, eller via Altinn.',

    'startPåNyttDialog.tekst.1': 'Du har trykket deg tilbake til startsiden.',
    'startPåNyttDialog.tekst.2': 'Vil du starte utfyllingen på nytt eller fortsette der du var?',

    'tags.kortUke': 'Kort uke',
    'tags.nytt': 'Nytt',
    'tags.endret': 'Endret',

    'aaRegisteret.kort': 'Aa-registeret',
    'aaRegisteret.lang': 'Arbeidsgiver- og arbeidstakerregisteret',

    'arbeidsaktiviteterMedUkjentArbeidsgiver.tittel': 'Avsluttet arbeidsforhold',
    'arbeidsaktiviteterMedUkjentArbeidsgiver.orgnummer': 'Org.nr. {orgnr}',
    'arbeidsaktiviteterMedUkjentArbeidsgiver.aaRegisteret':
        'Du har arbeidsforhold i din pleiepengeperiode som er registrert som avsluttet av arbeidsgiver i {AAregisteret}. Dette kan være hvis du har sluttet i en jobb, byttet avdeling eller lignende.',
    'arbeidsaktiviteterMedUkjentArbeidsgiver.kanIkkeEndreNoe':
        'Du kan ikke lenger endre arbeidstid for dette arbeidsforholdet.',
    'arbeidsaktiviteterMedUkjentArbeidsgiver.kanIkkeEndreAlle':
        'Du kan ikke lenger endre arbeidstid for {antallUkjente, plural, one {dette arbeidsforholdet} other {disse arbeidsforholdene}}, men du kan fortsatt melde inn endringer for andre arbeidsforhold under.',
    'arbeidsaktiviteterMedUkjentArbeidsgiver.feil.tittel': 'Dette er feil, hva kan jeg gjøre?',
    'arbeidsaktiviteterMedUkjentArbeidsgiver.feil.enUkjent':
        'Jobber du fremdeles i arbeidsforholdet og det er feil at arbeidsforholdet er avsluttet, må du be arbeidsgiveren din om å rette dette i {AAregisteret}. Dette gjør de enten via eget lønns- og personalsystem, eller via Altinn.',
    'arbeidsaktiviteterMedUkjentArbeidsgiver.feil.flereUkjent':
        'Jobber du fremdeles i noen av arbeidsforholdene og det er feil at arbeidsforholdene er avsluttet, må du be arbeidsgiverene dine om å rette dette i <AAregisteret />. Dette gjør de enten via eget lønns- og personalsystem, eller via Altinn.',

    'invalidStepSøknadsdataInfo.title': 'Oops, dette stemmer ikke helt',
    'invalidStepSøknadsdataInfo.info':
        'Vennligst gå tilbake til steget {Lenke}, og bruk knappene nederst i skjemaet for å gå videre. Ikke bruk frem og tilbake-funksjonaliteten i nettleseren.',

    'feriedagerISøknadsperiode.leggTilFerie': 'Legg til ferie',
    'feriedagerISøknadsperiode.modal.tittel': 'Ferie',

    'lovbestemtFerieListe.ingenFerieRegistrert': 'Ingen ferie registrert',
    'lovbestemtFerieListe.ferieLagtTil': 'Ferie lagt til',
    'lovbestemtFerieListe.ferieFjernet': 'Ferie fjernet',
    'lovbestemtFerieListe.angreFjern': 'Angre fjern',
    'lovbestemtFerieListe.endreFerie.label': 'Endre ferie',
    'lovbestemtFerieListe.endreFerie.ariaLabel': 'Endre ferie {periode}',
    'lovbestemtFerieListe.fjernFerie.label': 'Fjern ferie',
    'lovbestemtFerieListe.fjernFerie.ariaLabel': 'Fjern ferie {periode}',

    'ingenTilgangPage.pageTitle': 'Ingen tilgang - Endringsmelding for pleiepenger sykt barn',
    'ingenTilgangPage.tittel': 'Hei {navn}',
    'ingenTilgangPage.skrivTilOssGenerell':
        'I mellomtiden bruker du tjenesten {SkrivTilOssLink}, for å melde fra om endringer.',
    'ingenTilgangPage.harUgyldigK9FormatSak.1':
        'Vi ser at du har en sak om pleiepenger hos oss, men foreløpig kan du ikke bruke denne tjenesten. Vi jobber for å få det til, slik at du også snart kan melde fra om endring her.',
    'ingenTilgangPage.harIngenSak.1':
        'Vi finner ingen sak om pleiepenger for sykt barn registrert på deg, derfor kan du heller ikke bruke denne tjenesten. Hvis du akkurat har sendt inn en søknad, tar det noen minutter før saken din kommer opp her.',
    'ingenTilgangPage.harIngenSak.2':
        'Hvis du har søkt om pleiepenger for en periode frem i tid, eller for barn som ikke er folkeregistrert på deg, kan det ta tid før du kan bruke endringsmeldingen. Du kan foreløpig melde endringer i pleiepengesaken din via {SkrivTilOssLink}.',
    'ingenTilgangPage.harIngenSak.3':
        'Hvis du ønsker at en av våre veiledere skal undersøke hvorfor du ikke kan bruke endringsmeldingen, kan du kontakte oss på telefon 55 55 33 33.',
    'ingenTilgangPage.harArbeidsgiverUtenArbeidsaktivitet.1':
        'Du kan ikke bruke denne tjenesten. Dette er fordi vi har funnet et arbeidsforhold på deg, som ikke er registrert i pleiepengesaken din. Du må derfor sende en ny søknad, slik at saken og utbetalingene dine blir riktige.',
    'ingenTilgangPage.harArbeidsgiverUtenArbeidsaktivitet.2':
        'Hvis du mener at dette ikke stemmer, er det fint at du sender en melding til oss {SkrivTilOssLink}.',
    'ingenTilgangPage.harArbeidstidSomSelvstendigNæringsdrivende.1':
        'Du kan ikke bruke denne tjenesten per i dag. Dette er fordi tjenesten foreløpig ikke kan ta imot endringer fra selvstendig næringsdrivende. Vi jobber for å få det til, og selvstendig næringsdrivende blir også tilbudt denne tjenesten på et senere tidspunkt.',
    'ingenTilgangPage.harMerEnnEnSak.1':
        'Du kan ikke bruke denne tjenesten per i dag. Dette er fordi tjenesten foreløpig ikke kan ta imot endringer når du har pleiepenger for flere barn. Vi jobber for å få det til, og du blir også tilbudt denne tjenesten på et senere tidspunkt',
    'ingenTilgangPage.utenforEndringsperiode.1':
        'Du kan ikke bruke denne tjenesten fordi siste søknadsperiode gikk ut for mer enn enn {ANTALL_MÅNEDER_TILLATT_FOR_ENDRING} måneder siden. Du kan melde fra om endring i tjenesten {SkrivTilOssLink}, eller sende oss en ny søknad.',
    'ingenTilgangPage.utenforEndringsperiode.2':
        'Hvis du mener at dette ikke stemmer, er det fint at du sender en melding til oss {SkrivTilOssLink}.',

    'kvitteringPage.pageTitle': 'Endringsmelding er mottatt',
    'kvitteringPage.title': 'Melding om endring er lagt til saken din',
    'kvitteringPage.info.1':
        'Du kan se endringsmeldingen etter ca. 15 minutter på <Lenke>Dine Pleiepenger</Lenke>.  Der finner du svar på endringene, når meldingen er behandlet.',

    'lovbestemtFerieStep.guide.tittel': 'Slik endrer du ferie',
    'lovbestemtFerieStep.guide.tekst.1': 'Du kan endre, legge til, eller fjerne ferie i pleiepengeperioden din.',
    'lovbestemtFerieStep.guide.tekst.2': 'Du skal kun registrere ferie for ukedager (mandag til fredag).',

    'lovbestemtFerieStep.heading.perioder':
        '{antallPerioder, plural, one {Uker med pleiepenger} other {Dine perioder med pleiepenger}}',
    'lovbestemtFerieStep.heading.registrertFerie': 'Registrert ferie',
    'lovbestemtFerieStep.tags.ferieEndret': 'Ferie endret',
    'lovbestemtFerieStep.ferieFjernet.melding':
        'Du har fjernet dager med ferie. Hvis du skal du jobbe disse dagene må du se over at jobb i perioden er riktig. Dette gjør du på neste steg.',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const appMessages = {
    nb,
    nn,
};
