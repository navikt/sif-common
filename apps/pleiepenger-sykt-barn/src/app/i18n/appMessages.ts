/* eslint-disable max-len */
import { sifCommonPleiepengerMessages } from '../local-sif-common-pleiepenger/i18n';
import { velkommenPageMessages } from '../pages/velkommen-page/velkommenPageMessages';
import { arbeidIPeriodeMessages } from '../søknad/arbeidstid-step/i18n/arbeidIPeriodeMessages';

const nb = {
    ...sifCommonPleiepengerMessages.nb,
    ...arbeidIPeriodeMessages.nb,
    ...velkommenPageMessages.nb,

    'application.title': 'Søknad om pleiepenger for sykt barn',
    HvaBetyrDette: 'Hva betyr dette?',

    uke: 'uke',
    Uke: 'Uke',
    måned: 'måned',
    Måned: 'Måned',

    mandag: 'mandag',
    tirsdag: 'tirsdag',
    onsdag: 'onsdag',
    torsdag: 'torsdag',
    fredag: 'fredag',

    monday: 'mandag',
    tuesday: 'tirsdag',
    wednesday: 'onsdag',
    thursday: 'torsdag',
    friday: 'fredag',

    'mandag.caps': 'Mandag',
    'tirsdag.caps': 'Tirsdag',
    'onsdag.caps': 'Onsdag',
    'torsdag.caps': 'Torsdag',
    'fredag.caps': 'Fredag',

    Mandag: 'Mandag',
    Tirsdag: 'Tirsdag',
    Onsdag: 'Onsdag',
    Torsdag: 'Torsdag',
    Fredag: 'Fredag',

    Mandager: 'Mandager',
    Tirsdager: 'Tirsdager',
    Onsdager: 'Onsdager',
    Torsdager: 'Torsdager',
    Fredager: 'Fredager',

    'dagerMedTid.uke': 'Uke {uke}',
    'dagerMedTid.ingenDagerRegistrert': 'Ingen dager registrert',

    'timer.ikkeTall': '{timer} timer',

    'arbeidsperiode.avsluttet': 'Periode: {fra} - {til}',
    'arbeidsperiode.pågående': 'Periode: {fra} - pågående',

    'apiValidationError.tittel': 'Her har det skjedd en feil',

    'barnRelasjon.MOR': 'Mor',
    'barnRelasjon.MEDMOR': 'Medmor',
    'barnRelasjon.FOSTERFORELDER': 'Fosterforelder',
    'barnRelasjon.FAR': 'Far',
    'barnRelasjon.ANNET': 'Annet',

    'arbeidsgiver.tittel': '{navn} (organisasjonsnummer {organisasjonsnummer})',
    'frilans.tittel': 'Frilans og oppdrag som regnes som frilansoppdrag',
    'selvstendigNæringsdrivende.tittel': 'Selvstendig næringsdrivende',

    'step.tidsrom.søkerKunHelgedager.alert':
        'Du kan kun få utbetalt pleiepenger for hverdager. Det utbetales ikke pleiepenger for lørdag eller søndag selv om du har hatt fravær fra jobb for å pleie barn. Du kan derfor ikke søke pleiepenger kun for lørdag og/eller søndag.',
    'steg.tidsrom.veileder.utenlandsopphold':
        'Når du oppholder deg i et land utenfor EØS, kan du beholde pleiepengene i en begrenset periode på opptil 8 uker av en 12 måneder lang periode.',

    'step.opplysninger-om-barnet.pageTitle': 'Pleiepengesøknad - opplysninger om barnet',
    'step.opplysninger-om-barnet.stepTitle': 'Barn',
    'step.opplysninger-om-barnet.stepIndicatorLabel': 'Om barnet',

    'step.tidsrom.pageTitle': 'Pleiepengesøknad - periode',
    'step.tidsrom.stepTitle': 'Perioden med pleiepenger',
    'step.tidsrom.stepIndicatorLabel': 'Periode',

    'steg.tidsrom.iUtlandetIPerioden.spm': 'Skal du reise til utlandet i perioden du søker for?',
    'steg.tidsrom.iUtlandetIPerioden.listTitle': 'Utenlandsopphold i perioden',
    'steg.tidsrom.iUtlandetIPerioden.modalTitle': 'Utenlandsopphold',
    'steg.tidsrom.iUtlandetIPerioden.addLabel': 'Legg til utenlandsopphold',

    'steg.tidsrom.ferieuttakIPerioden.spm': 'Skal du ha ferie i perioden du søker for?',
    'steg.tidsrom.ferieuttakIPerioden.listTitle': 'Ferie i perioden',
    'steg.tidsrom.ferieuttakIPerioden.modalTitle': 'Ferie',
    'steg.tidsrom.ferieuttakIPerioden.addLabel': 'Legg til ferie',

    'step.arbeidssituasjon.pageTitle': 'Pleiepengesøknad - opplysninger om din arbeidssituasjon',
    'step.arbeidssituasjon.stepTitle': 'Arbeidssituasjonen din',
    'step.arbeidssituasjon.stepIndicatorLabel': 'Om din arbeidssituasjon',

    'step.arbeidstid.pageTitle': 'Pleiepengesøknad - opplysninger om arbeidstid',
    'step.arbeidstid.stepTitle': 'Jobb i søknadsperioden',
    'step.arbeidstid.stepIndicatorLabel': 'Jobb i søknadsperioden',

    'step.omsorgstilbud.pageTitle': 'Pleiepengesøknad - omsorgstilbud',
    'step.omsorgstilbud.stepTitle': 'Omsorgstilbud i søknadsperioden',
    'step.omsorgstilbud.stepIndicatorLabel': 'Omsorgstilbud i søknadsperioden',

    'step.nattevåkOgBeredskap.pageTitle': 'Pleiepengesøknad - nattevåk og beredskap',
    'step.nattevåkOgBeredskap.stepTitle': 'Nattevåk og beredskap',
    'step.nattevåkOgBeredskap.stepIndicatorLabel': 'Nattevåk og beredskap',

    'step.medlemskap.pageTitle': 'Pleiepengesøknad - medlemskap',
    'step.medlemskap.stepTitle': 'Medlemskap',
    'step.medlemskap.veileder':
        'Medlemskap i folketrygden er nøkkelen til rettigheter fra Nav. Hvis du bor eller jobber i Norge er du vanligvis medlem. Du kan lese mer om medlemskap på',
    'step.medlemskap.stepIndicatorLabel': 'Om medlemskap i folketrygden',
    'step.medlemskap.leggTilKnapp': 'Legg til nytt utenlandsopphold',
    'step.medlemskap.utenlandsoppholdSiste12': 'Utenlandsopphold siste 12 måneder',
    'step.medlemskap.utenlandsoppholdNeste12': 'Utenlandsopphold neste 12 måneder',

    'medlemskap.summary.header': 'Medlemskap i folketrygden',

    'step.legeerklaering.pageTitle': 'Pleiepengesøknad - legeerklæring',
    'step.legeerklaering.stepTitle': 'Last opp legeerklæring',
    'step.legeerklaering.stepIndicatorLabel': 'Last opp din legeerklæring',

    'step.oppsummering.pageTitle': 'Pleiepengesøknad - oppsummering',
    'step.oppsummering.stepTitle': 'Oppsummering',
    'step.oppsummering.stepIndicatorLabel': 'Oppsummering',
    'step.oppsummering.nextButtonLabel': 'Send inn søknaden',

    'page.unavailable.1':
        'Den digitale pleiepengesøknaden er dessverre ikke tilgjengelig akkurat nå. Vi jobber med saken, slik at du kan søke digitalt. Frem til vi får fikset dette, kan du fylle ut vårt',
    'page.unavailable.2': 'papirskjema for pleiepenger sykt barn',
    'page.unavailable.3': 'Vi beklager.',

    'page.velkommen.tittel': 'Søknad om pleiepenger for sykt barn',
    'page.velkommen.startSøknad': 'Start søknad',

    'steg.omBarnet.hvilketBarn.spm': 'Velg hvilket barn søknaden gjelder',
    'steg.omBarnet.hvilketBarn.description.tittel': 'Hva gjør jeg når jeg pleier flere barn samtidig?',
    'steg.omBarnet.hvilketBarn.description.info.1':
        'Når du pleier flere barn samtidig, skal du sende én søknad som gjelder samlet for barna du pleier. Vi registrerer og behandler søknaden din basert kun på ett av barna, selv om du pleier flere. Derfor kan du kun krysse av for ett av barna her.',
    'steg.omBarnet.hvilketBarn.description.info.2':
        'Hvis barna har forskjellig pleiebehov krysser du av for det barnet som har lengst pleiebehov. Hvis barna har samme pleiebehov, eller du ikke vet, krysser du bare av for ett av barna.',
    'steg.omBarnet.hvilketBarn.description.info.3':
        'Hvis du senere skal søke om forlengelse, eller det er andre som skal søke pleiepenger i samme sak, er det viktig at det krysses av for det samme barnet som i denne søknaden.',
    'steg.omBarnet.hvilketBarn.født': 'Født {dato}',
    'steg.omBarnet.gjelderAnnetBarn': 'Søknaden gjelder et annet barn',
    'steg.omBarnet.annetBarn.tittel': 'Annet barn',
    'steg.omBarnet.fnr.spm': 'Barnets fødselsnummer/D-nummer',
    'steg.omBarnet.fnr.barnHarIkkeFnr': 'Barnet har ikke fødselsnummer/D-nummer',
    'steg.omBarnet.årsakManglerIdentitetsnummer.spm': 'Hvorfor har ikke barnet fødselsnummer eller D-nummer?',
    'steg.omBarnet.årsakManglerIdentitetsnummer.NYFØDT': 'Barnet er nyfødt, og har ikke fått fødselsnummer enda',
    'steg.omBarnet.årsakManglerIdentitetsnummer.BARNET_BOR_I_UTLANDET': 'Barnet bor i utlandet',
    'steg.omBarnet.årsakManglerIdentitetsnummer.ANNET': 'Annet',
    'steg.omBarnet.fødselsattest.tittel': 'Fødselsattest',
    'steg.omBarnet.fødselsattest.info':
        'Når barnet bor i utlandet og ikke har fødselsnummer eller D-nummer, må du legge ved en kopi av fødselsattest for barnet.',
    'steg.omBarnet.fødselsattest.vedlegg': 'Last opp fødselsattest',
    'steg.omBarnet.fødselsattest.vedlegg.legend': 'Dokumenter',
    'steg.omBarnet.fødselsdato': 'Barnets fødselsdato',
    'steg.omBarnet.navn': 'Barnets navn',
    'steg.omBarnet.relasjon.spm': 'Hvilken relasjon har du til barnet?',
    'steg.omBarnet.relasjonAnnet.spm':
        'Beskriv hvem du er i forhold til barnet, og hvilken tilsynsrolle du har i perioden du søker for',
    'steg.omBarnet.relasjonAnnet.info.tittel': 'Hva betyr dette?',
    'steg.omBarnet.relasjonAnnet.info.hjelpetekst.1':
        'I noen tilfeller kan ikke den eller de som har den daglige omsorgen for barnet ha tilsyn med barn som trenger tilsyn og pleie hele tiden. Da kan andre personer hjelpe til med dette. Andre personer kan for eksempel være en besteforelder, venn, nabo, tante eller onkel.',
    'steg.omBarnet.relasjonAnnet.info.hjelpetekst.2':
        'Eksempel 1: Mor/far kan ikke selv følge barnet til sykehuset for utredning eller behandling. Da kan andre personer følge barnet til sykehuset, og ha tilsyn med barnet så lenge oppholdet på sykehuset varer.',
    'steg.omBarnet.relasjonAnnet.info.hjelpetekst.3':
        'Eksempel 2: Hverken mor eller far har mulighet til å pleie barnet hjemme, da kan andre personer gjøre dette og ha tilsyn med barnet i perioden det gjelder. ',

    'steg.tidsrom.hvilketTidsrom.spm': 'Hvilken periode søker du for?',
    'steg.tidsrom.hvilketTidsrom.fom': 'Fra og med',
    'steg.tidsrom.hvilketTidsrom.tom': 'Til og med',
    'steg.tidsrom.hvilketTidsrom.info.tittel': 'Søker du forlengelse?',
    'steg.tidsrom.hvilketTidsrom.info.1':
        'Når du søker forlengelse av pleiepengeperioden uten noe opphold, må du velge «fra og med»-datoen til dagen etter du fikk innvilget pleiepenger sist.',
    'steg.tidsrom.hvilketTidsrom.info.2': 'Eksempel:',
    'steg.tidsrom.hvilketTidsrom.info.3':
        'Du har innvilget pleiepenger fra 1.-15. januar. Du skal søke om forlengelse, og velger 16. januar som fra og med-dato.',

    'steg.arbeidssituasjon.tittel': 'Arbeidsgivere',
    'steg.arbeidssituasjon.veileder.1':
        'Nå trenger vi å vite litt om arbeidssituasjonen din, og hvor mye du normalt jobber. Med «normalt» mener vi hvor mye du jobber når du ikke har fravær på grunn av pleiepenger eller annet.',
    'steg.arbeidssituasjon.veileder.2':
        'Det er normalarbeidstiden din <strong>før</strong> du starter med pleiepenger som vi er ute etter her, uavhengig av om du søker for første gang, eller om du søker forlengelse.',
    'steg.arbeidssituasjon.veileder.3':
        'Hvis du mottar ytelse fra Nav (for eksempel foreldrepenger eller sykepenger) opplyser du om det som var din normale arbeidstid før du startet å motta ytelsen.',
    'steg.arbeidssituasjon.veileder.medArbeidsgiver':
        'Nedenfor ser du {antall, plural, one {arbeidsgiveren} other {arbeidsgivere}} du er registrert ansatt hos i AA-registeret i perioden du søker om pleiepenger. For at vi skal være sikre på at opplysningene er riktige må du bekrefte om du er, eller har vært, ansatt der.',
    'steg.arbeidssituasjon.veileder.ingenArbeidsgiverFunnet':
        'Vi har ikke funnet noen arbeidsgivere registrert på deg i AA-registeret.',
    'steg.arbeidssituasjon.veileder.manglerDetArbeidsgiver.tittel': 'Har du arbeidsforhold som ikke vises?',
    'steg.arbeidssituasjon.veileder.manglerDetArbeidsgiver':
        'Hvis du i perioden du søker for er, eller var, ansatt hos en arbeidsgiver som ikke vises her, må du be arbeidsgiveren om å sende en ny A-melding. Det gjør de enten via eget lønns- og personalsystem, eller via Altinn.',

    'steg.arbeidssituasjon.stønadGodtgjørelse.mottarStønadGodtgjørelse.spm':
        'Mottar du fosterhjemsgodtgjørelse eller omsorgsstønad fra kommunen?',
    'steg.arbeidssituasjon.stønadGodtgjørelse.mottarStønadGodtgjørelse.spm.description.tittel': 'Hva betyr dette?',
    'steg.arbeidssituasjon.stønadGodtgjørelse.mottarStønadGodtgjørelse.spm.description':
        'Fosterhjemsgodtgjørelse og omsorgsstønad regnes som et frilansinntekt, og kan påvirke hvor mye du får i pleiepenger. ',
    'steg.arbeidssituasjon.stønadGodtgjørelse.mottarStønadGodtgjørelseIHelePerioden.spm':
        'Mottar du denne stønaden eller godtgjørelsen gjennom hele perioden du søker om?',
    'steg.arbeidssituasjon.stønadGodtgjørelse.starterUndeveis.spm':
        'Starter stønaden eller godtgjørelsen underveis i pleiepengeperioden din?',
    'steg.arbeidssituasjon.stønadGodtgjørelse.starterUndeveis.startdato': 'Startdato:',
    'steg.arbeidssituasjon.stønadGodtgjørelse.slutterUndeveis.spm':
        'Stopper stønaden eller godtgjørelsen underveis i pleiepengeperioden din?',
    'steg.arbeidssituasjon.stønadGodtgjørelse.starterUndeveis.sluttdato': 'Sluttdato:',

    'steg.arbeidssituasjon.frilanser.tittel': 'Frilans og oppdrag som regnes som frilansoppdrag',
    'steg.arbeidssituasjon.sn.tittel': 'Selvstendig næringsdrivende',

    'steg.arbeidssituasjon.opptjeningUtland.tittel': 'Jobbet i et annet EØS-land',
    'steg.arbeidssituasjon.opptjeningUtland.spm':
        'Har du jobbet som arbeidstaker eller frilanser i et annet EØS-land i løpet av de 3 siste månedene før perioden du søker om?',
    'steg.arbeidssituasjon.opptjeningUtland.listAndDialog.addLabel': 'Legg til jobb i et annet EØS-land',
    'steg.arbeidssituasjon.opptjeningUtland.listAndDialog.listTitle': 'Registrert jobb i et annet EØS-land',
    'steg.arbeidssituasjon.opptjeningUtland.listAndDialog.modalTitle': 'Jobbet i et annet EØS-land',

    'steg.arbeidssituasjon.utenlandskNæring.spm':
        'Har du jobbet som selvstendig næringsdrivende i et annet EØS-land i løpet av de 3 siste årene før perioden du søker om?',

    'steg.arbeidssituasjon.verneplikt.tittel': 'Verneplikt',
    'steg.arbeidssituasjon.verneplikt.spm': 'Utøvde du verneplikt på tidspunktet du søker pleiepenger fra?',
    'steg.arbeidssituasjon.verneplikt.info.tittel': 'Hva betyr dette?',
    'steg.arbeidssituasjon.verneplikt.info.tekst':
        'Du skal svare ja på dette spørsmålet om du har utøvd verneplikt i minst 28 dager på starttidspunktet for perioden du søker for, eller om perioden med verneplikt var ment å vare i minst 28 dager.',

    'steg.omsorgstilbud.veileder.1':
        'Her skal du svare på om barnet oppholder seg fast og regelmessig i et omsorgstilbud, som',
    'steg.omsorgstilbud.veileder.1.1': 'barnehage',
    'steg.omsorgstilbud.veileder.1.2': 'skole',
    'steg.omsorgstilbud.veileder.1.3': 'skolefritidsordning',
    'steg.omsorgstilbud.veileder.1.4': 'omsorgsbolig',
    'steg.omsorgstilbud.veileder.1.5': 'BPA (brukerstyrt personlig assistent)',
    'steg.omsorgstilbud.veileder.1.6': 'andre organiserte omsorgstilbud ',
    'steg.omsorgstilbud.veileder.2': 'Å være innlagt eller til behandling på sykehus regnes ikke som et omsorgstilbud.',
    'steg.omsorgstilbud.veileder.3': 'Pleiepenger graderes ved fast og regelmessig  omsorgstilbud',
    'steg.omsorgstilbud.veileder.3.1':
        'Når tiden barnet oppholder seg i et omsorgstilbud er fast og regelmessig, skal pleiepengene graderes tilsvarende den tiden barnet er i omsorgstilbudet. Det er bare når bruken av omsorgstilbudet er',
    'steg.omsorgstilbud.veileder.3.2': 'fast og regelmessig',
    'steg.omsorgstilbud.veileder.3.3': 'at du skal oppgi hvor mye barnet oppholder seg der.',
    'steg.omsorgstilbud.veileder.3.4':
        'Hvis bruken av omsorgstilbudet er uforutsigbar og uregelmessig graderes ikke pleiepengene, og du skal heller ikke oppgi noe av tiden barnet oppholder seg der.',

    'steg.omsorgstilbud.veileder.4': 'Hvordan svare på omsorgstilbud når du pleier flere barn samtidig',
    'steg.omsorgstilbud.veileder.4.1':
        'Du skal svare ja på at barna er i et fast og regelmessig omsorgstilbud bare hvis de skal være der samtidig. Du skal svare nei hvis barna skal være i omsorgstilbudet på ulike tider, eller hvis minst ett barn ikke skal være i et omsorgstilbud i det hele tatt.',

    'steg.omsorgstilbud.veileder.5': 'Slik svarer du hvis barnet er i flere omsorgstilbud',
    'steg.omsorgstilbud.veileder.5.1':
        'Når barnet er fast og regelmessig i flere omsorgstilbud, skal du oppgi den samlede tiden.',
    'steg.omsorgstilbud.veileder.5.2':
        'Hvis barnet er fast og regelmessig i bare ett av omsorgstilbudene, skal du kun oppgi tiden i omsorgstilbudet som er fast.',
    'steg.omsorgstilbud.veileder.5.3':
        '<strong>Eksempel:</strong> Anne er på skolen 3 timer hver onsdag. I tillegg er hun på SFO 1 time etter skoletid samme dag. Utenom dette er Anne hjemme fra skolen og SFO. Da skal du oppgi at Anne til sammen er 4 timer i omsorgstilbud på onsdager.',
    'steg.omsorgstilbud.veileder.5.4':
        'Hvis Anne er på skolen 3 timer hver onsdag, men bare av og til på SFO, skal du bare oppgi den tiden som hun er på skolen.',

    'step.omsorgstilbud.søkerKunHelgedager.alert.avsnitt.1':
        'Du kan kun få utbetalt pleiepenger for hverdager. Det utbetales ikke pleiepenger for lørdag eller søndag selv om du har hatt fravær fra jobb for å pleie barn.',
    'step.omsorgstilbud.søkerKunHelgedager.alert.avsnitt.2':
        'Du kan derfor ikke registrere omsørgstilbud kun for lørdag og/eller søndag.',
    'step.omsorgstilbud.søkerKunHelgedager.alert.avsnitt.3':
        'Vennligst gå tilbake  til steg "Perioden med pleiepenger" og sjekk informasjonen du har fylt ut. Når du har gjort det, trykker du på "Fortsett"-knappen for å gå videre.',

    'steg.omsorgstilbud.erIOmsorgstilbudFortid': 'Frem til nå',
    'steg.omsorgstilbud.erIOmsorgstilbudFortid.spm':
        'Har barnet vært fast og regelmessig i skole/barnehage, eller andre omsorgstilbud, fra datoen du søker om og frem til nå?',
    'steg.omsorgstilbud.erIOmsorgstilbudKunFortid.spm':
        'Har barnet vært fast og regelmessig på skolen, i barnehagen eller i andre omsorgstilbud?',
    'steg.omsorgstilbud.erIOmsorgstilbudFremtid': 'Fremover i tid',
    'steg.omsorgstilbud.erIOmsorgstilbudFremtid.spm':
        'Skal barnet være fast og regelmessig på skolen, i barnehagen eller i andre omsorgstilbud fremover i tid?',
    'steg.omsorgstilbud.erIOmsorgstilbudKunFremtid.spm':
        'Skal barnet være fast og regelmessig på skolen, i barnehagen eller i andre omsorgstilbud?',
    'steg.omsorgstilbud.erIOmsorgstilbudFremtid.usikker':
        'Når barnet har vært i et omsorgstilbud frem til nå, men du er usikker på om det blir fast og regelmessig fremover, oppgir du kun det som har vært til nå. Du gir oss beskjed hvis det senere viser seg at tiden fremover blir fast og regelmessig.',
    'steg.omsorgstilbud.erIOmsorgstilbudFremtid.neiUsikker':
        'Du må gi oss beskjed hvis barnet begynner å være fast og regelmessig i omsorgstilbud.',
    'steg.omsorgstilbud.eksempel.tittel': 'Eksempler på å oppholde seg fast og regelmessig  i et omsorgstilbud',
    'steg.omsorgstilbud.eksempel.1':
        'I perioden med pleiepenger klarer Anna å være i barnehagen mellom 5 og 15 timer per uke. Det er det laveste antallet timer Anna er i barnehagen som anses som fast og regelmessig. I dette eksempelet skal det derfor oppgis 5 timer per uke.',
    'steg.omsorgstilbud.eksempel.2':
        'Peder er på skolen bare av og til, når han er i form til det. Noen uker klarer han å være der noen timer, andre uker er han ikke på skolen i det hele tatt. I dette eksempelet skal det svares nei på om barnet er fast og regelmessig i omsorgstilbudet, ettersom tiden Peder er på skolen er uforutsigbar og uregelmessig.',
    'steg.omsorgstilbud.erLiktHverUke.spm.tittel': 'Tid i omsorgstilbud',
    'steg.omsorgstilbud.erLiktHverUke.spm.fortidFremtid': 'Er tiden barnet er i omsorgstilbudet lik hver uke?',
    'steg.omsorgstilbud.erLiktHverUke.spm.fortid': 'Har tiden i omsorgstilbudet vært lik hver uke?',
    'steg.omsorgstilbud.erLiktHverUke.spm.fortidFremtidUsiker':
        'Har tiden barnet har vært i omsorgstilbudet vært lik hver uke frem til nå?',
    'steg.omsorgstilbud.erLiktHverUke.spm.kunFremtid': 'Skal tiden i omsorgstilbudet være lik hver uke?',
    'steg.omsorgstilbud.erLiktHverUke.spm.fremtid': 'Skal tiden i omsorgstilbudet være lik hver uke fremover?',

    'steg.omsorgstilbud.erLiktHverUke.yes.fortidFremtid': 'Hver uke er lik',
    'steg.omsorgstilbud.erLiktHverUke.no.fortidFremtid': 'Det varierer fra uke til uke',

    'steg.omsorgstilbud.erLiktHverUke.yes.fortid': 'Hver uke var lik',
    'steg.omsorgstilbud.erLiktHverUke.no.fortid': 'Det varierte fra uke til uke',

    'steg.omsorgstilbud.erLiktHverUke.yes.fortidFremtidUsiker': 'Hver uke var lik',
    'steg.omsorgstilbud.erLiktHverUke.no.fortidFremtidUsiker': 'Det varierte fra uke til uke',

    'steg.omsorgstilbud.erLiktHverUke.yes.kunFremtid': 'Hver uke kommer til å være lik',
    'steg.omsorgstilbud.erLiktHverUke.no.kunFremtid': 'Det kommer til å varierere fra uke til uke',

    'steg.omsorgstilbud.erLiktHverUke.yes.fremtid': 'Hver uke kommer til å være lik',
    'steg.omsorgstilbud.erLiktHverUke.no.fremtid': 'Det kommer til å varierere fra uke til uke',

    'steg.omsorgstilbud.erLiktHverUke.info.tittel': 'Hva betyr dette?',
    'steg.omsorgstilbud.erLiktHverUke.info.1': 'Eksempel:',
    'steg.omsorgstilbud.erLiktHverUke.info.2':
        'Anna går fast hver uke i barnehagen 2 timer på mandag og 3 timer på torsdag. Hun bytter ikke på dager eller antall timer hun er i barnehagen i løpet av en uke.',
    'steg.omsorgstilbud.hvorMyeTidIOmsorgstilbud': 'Oppgi den tiden barnet er fast og regelmessig i omsorgstilbudet.',
    'steg.omsorgstilbud.hvorMyeTidIOmsorgstilbud.kunFremtid':
        'Oppgi den tiden barnet skal være fast og regelmessig i omsorgstilbudet',
    'steg.omsorgstilbud.hvorMyeTidIOmsorgstilbud.description.tittel':
        'Hvordan fyller jeg ut om omsorgstilbud når jeg pleier flere barn samtidig?',
    'steg.omsorgstilbud.hvorMyeTidIOmsorgstilbud.description.info.1':
        'Du skal svare ja på at barna er i et fast og regelmessig omsorgstilbud bare hvis de skal være der samtidig. Du skal svare nei hvis barna skal være i omsorgstilbudet på ulike tider, eller hvis minst ett barn ikke skal være i et omsorgstilbud i det hele tatt.',
    'steg.omsorgstilbud.hvorMyeTidIOmsorgstilbud.description.info.2':
        'Du kan oppgi opptil 7 timer og 30 minutter per dag:',
    'steg.omsorgstilbud.hvormyetittel': 'Hvor mye er barnet i omsorgstilbudet?',
    'steg.omsorgstilbud.hvormyetittel.kunFremtid': 'Hvor mye skal barnet være i omsorgstilbudet?',

    'steg.nattevåkOgBeredskap.veileder':
        'Nå trenger vi å vite om du på grunn av barnets sykdom må være våken om natten, eller være i beredskap for barnet i pleiepengeperioden. Hvis noen av disse situasjonene gjør at du ikke kan gå på jobb, skal pleiepengene som hovedregel ikke graderes, selv om barnet er i et omsorgstilbud på dagtid.',
    'steg.nattevåkOgBeredskap.nattevåk.veileder':
        'I noen tilfeller gjør barnets sykdom at du må være våken om natten for å pleie eller ha tilsyn med barnet. Hvis pleie- eller tilsynsbehovet på natten er betydelig større enn det som er vanlig for friske barn, kan det gå ut over muligheten til å jobbe fordi du må sove på dagtid.',
    'steg.nattevåkOgBeredskap.nattevåk.spm':
        'Gjør barnets sykdom at du må være våken om nettene, slik at du ikke kan kan gå på jobb?',
    'steg.nattevåkOgBeredskap.nattevåk.spm.description.flereBarn.tittel':
        'Hvordan svarer jeg når jeg pleier flere barn samtidig?',
    'steg.nattevåkOgBeredskap.nattevåk.spm.description.flereBarn':
        'Du skal svare «ja» hvis minst ett av barnas sykdom gjør at du må være våken om natten eller i beredskap, og derfor ikke kan gå på jobb.»',
    'steg.nattevåkOgBeredskap.nattevåk.tilleggsinfo.spm':
        'Nå trenger vi en beskrivelse av hvordan barnets sykdom gir et pleie- eller tilsynsbehov om nettene.',
    'steg.nattevåkOgBeredskap.nattevåk.tilleggsinfo.liste.tittel': 'Vi trenger detaljert informasjon om:',
    'steg.nattevåkOgBeredskap.nattevåk.tilleggsinfo.liste.1':
        'Hvilke pleie- eller tilsynsoppgaver må du gjøre på natten på grunn av barnets sykdom?',
    'steg.nattevåkOgBeredskap.nattevåk.tilleggsinfo.liste.2': 'Hvor ofte/lenge må du være våken om nettene?',
    'steg.nattevåkOgBeredskap.nattevåk.tilleggsinfo.liste.3':
        'Må du være våken de fleste nettene i perioden du søker om pleiepenger, eller er det kun i deler av perioden?',

    'steg.nattevåkOgBeredskap.beredskap.veileder':
        'I noen tilfeller kan barnets sykdom gjøre at du må være i beredskap eller være tilgjengelig, selv om barnet er i et omsorgstilbud. Det kan for eksempel være hvis barnet trenger at du er til stede i omsorgstilbudet, eller at du må være tilgjengelig til å dra dit på kort varsel, slik at du ikke kan jobbe.',
    'steg.nattevåkOgBeredskap.beredskap.spm':
        'Gjør barnets sykdom at du må være i beredskap, slik at du må være borte fra jobb?',
    'steg.nattevåkOgBeredskap.beredskap.tilleggsinfo.spm':
        'Nå trenger vi en beskrivelse av hvordan barnets sykdom gjør at du må være i beredskap.',
    'steg.nattevåkOgBeredskap.beredskap.tilleggsinfo.liste.tittel': 'Vi trenger detaljert informasjon om:',
    'steg.nattevåkOgBeredskap.beredskap.tilleggsinfo.liste.1':
        'Hvilke situasjoner gir behov for at du må være sammen med barnet eller i beredskap?',
    'steg.nattevåkOgBeredskap.beredskap.tilleggsinfo.liste.2':
        'Hvis du må være tilgjengelig på kort varsel: Hvor ofte må du dra dit barnet er?',
    'steg.nattevåkOgBeredskap.beredskap.tilleggsinfo.liste.3':
        'Må du være i beredskap i hele perioden du søker om pleiepenger, eller er det kun i deler av perioden?',

    'steg.medlemsskap.annetLandSiste12.spm': 'Har du bodd i utlandet i hele eller deler av de siste 12 månedene?',
    'steg.medlemsskap.annetLandNeste12.spm':
        'Planlegger du å bo i utlandet i hele eller deler av de neste 12 månedene?',
    'steg.medlemsskap.annetLandSiste12.hjelp':
        'Du svarer ja bare hvis du har oppholdt deg fast i et annet land enn Norge. Korte utlandsturer i forbindelse med for eksempel ferie regnes ikke med.',
    'steg.medlemsskap.annetLandSiste12.listeTittel': 'Utenlandsopphold siste 12 måneder',
    'steg.medlemsskap.annetLandNeste12.hjelp':
        'Du svarer ja bare hvis du planlegger å oppholde deg fast i et annet land enn Norge. Korte utlandsturer i forbindelse med for eksempel ferie regnes ikke med.',
    'steg.medlemsskap.annetLandNeste12.listeTittel': 'Utenlandsopphold neste 12 måneder',

    'steg.lege.vedlegg.legend': 'Dokumenter',
    'steg.lege.vedlegg': 'Last opp dokumentasjonen',
    'steg.legeerklaering.counsellorpanel.1':
        'Her skal du laste opp legeerklæringen. Det gjør du enten ved å ta bilde av leggerklæringen, eller ved å skanne den. Vennligst sjekk at bildet du laster opp er av god kvalitet slik at all tekst er leselig.',
    'steg.legeerklaering.counsellorpanel.2':
        'Vi kan ikke behandle søknaden din før vi mottar legeerklæringen. Hvis du ikke har legeerklæringen tilgjengelig nå, anbefaler vi at du venter med å søke til du har den tilgjengelig. Hvis du ikke kan vente med å sende søknaden, kan du fortsette uten legeerklæring, men da må du ettersende den så snart som mulig.',

    'steg.oppsummering.info':
        'Les gjennom oppsummeringen før du sender inn søknaden. Du kan gå tilbake hvis du vil gjøre endringer.',
    'steg.oppsummering.søker.header': 'Om deg',
    'steg.oppsummering.søker.navn': 'Navn',
    'steg.oppsummering.søker.fnr': 'Fødselsnummer',
    'steg.oppsummering.tidsrom.header': 'Perioden du søker pleiepenger for',
    'steg.oppsummering.søknadsperiode.header': 'Periode',
    'steg.oppsummering.tidsrom.fomtom': '{fom} - {tom}',

    'steg.oppsummering.barnet.header': 'Om barnet',
    'steg.oppsummering.barnet.navn': 'Navn',
    'steg.oppsummering.barnet.fødselsdato': 'Fødselsdato',
    'steg.oppsummering.barnet.fnr': 'Fødselsnummer',
    'steg.oppsummering.barnet.barnetHarIkkeFnr': 'Uten fødselsnummer/D-nummer',
    'steg.oppsummering.barnet.årsakManglerIdentitetsnummer.NYFØDT':
        'Barnet er nyfødt, og har ikke fått fødselsnummer enda',
    'steg.oppsummering.barnet.årsakManglerIdentitetsnummer.BARNET_BOR_I_UTLANDET': 'Barnet bor i utlandet',
    'steg.oppsummering.barnet.årsakManglerIdentitetsnummer.ANNET': 'Annet',
    'steg.oppsummering.omBarn.fødselsattest.tittel': 'Fødselsattest',
    'step.oppsummering.omBarn.ingenFødselsattest': 'Ingen fødselsattest er lastet opp',
    'steg.oppsummering.relasjonTilBarnet.header': 'Relasjon til barnet',
    'steg.oppsummering.relasjonTilBarnetBeskrivelse': 'Din beskrivelse av relasjon og tilsynsrolle for barnet:',
    'steg.oppsummering.barnRelasjon.MOR': 'Du er mor til barnet',
    'steg.oppsummering.barnRelasjon.MEDMOR': 'Du er medmor til barnet',
    'steg.oppsummering.barnRelasjon.FOSTERFORELDER': 'Du er fosterforelder til barnet',
    'steg.oppsummering.barnRelasjon.FAR': 'Du er far til barnet',
    'steg.oppsummering.barnRelasjon.ANNET': 'Annet',
    'steg.oppsummering.utenlandsoppholdIPerioden.header': 'Skal du være i utlandet i perioden?',
    'steg.oppsummering.utenlandsoppholdIPerioden.listTitle': 'Utlandsopphold i perioden',
    'steg.oppsummering.ferieuttakIPerioden.header': 'Skal du ta ut ferie i perioden?',
    'steg.oppsummering.ferieuttakIPerioden.listTitle': 'Ferie i perioden',

    'steg.oppsummering.omsorgstilbud.header': 'Omsorgstilbud i søknadsperioden',
    'steg.oppsummering.omsorgstilbud.fortid.spm':
        'Har barnet vært fast og regelmessig på skolen, i barnehagen eller i andre omsorgstilbud?',
    'steg.oppsummering.omsorgstilbud.fortid.svar.JA': 'Ja, i hele eller deler av perioden',
    'steg.oppsummering.omsorgstilbud.fortid.svar.NEI': 'Nei',
    'steg.oppsummering.omsorgstilbud.fortid.svar.USIKKER': 'Usikker',
    'steg.oppsummering.omsorgstilbud.fremtid.spm':
        'Skal barnet være fast og regelmessig på skolen, i barnehagen eller i andre omsorgstilbud fremover i tid?',
    'steg.oppsummering.omsorgstilbud.fremtid.spm.kunFremtid':
        'Skal barnet være fast og regelmessig på skolen, i barnehagen eller i andre omsorgstilbud?',
    'steg.oppsummering.omsorgstilbud.fremtid.svar.JA': 'Ja, i hele eller deler av perioden',
    'steg.oppsummering.omsorgstilbud.fremtid.svar.NEI': 'Nei',
    'steg.oppsummering.omsorgstilbud.fremtid.svar.USIKKER': 'Usikker',
    'steg.oppsummering.nattevåkBeredskap.header': 'Nattevåk og beredskap',
    'steg.oppsummering.nattevåkBeredskap.nattevåk.beskrivelse':
        'Beskrivelse av hvordan barnets sykdom gir et pleie- eller tilsynsbehov om nettene',
    'steg.oppsummering.nattevåkBeredskap.beredskap.beskrivelse':
        'Beskrivelse av hvordan barnets sykdom gjør at du må være i beredskap',
    'steg.oppsummering.omsorgstilbud.fast.header': 'Omsorgstilbud er likt hver uke i perioden:',
    'steg.oppsummering.omsorgstilbud.fast.header.fortid': 'Tiden har vært lik hver uke i perioden:',

    'steg.oppsummering.omsorgstilbud.enkeltdager.header': 'Fast og regelmessig tid i omsorgstilbud:',

    'steg.oppsummering.utlandetSiste12.header': 'Har bodd i utlandet i de siste 12 månedene',
    'steg.oppsummering.utlandetNeste12.header': 'Skal bo i utlandet i de neste 12 månedene',
    'steg.oppsummering.utlandetSiste12.liste.header': 'Utenlandsopphold siste 12 måneder',
    'steg.oppsummering.utlandetNeste12.liste.header': 'Utenlandsopphold neste 12 måneder',

    'steg.oppsummering.bekrefterOpplysninger':
        'Jeg bekrefter at opplysningene jeg har gitt er riktige, og at jeg ikke har holdt tilbake opplysninger som har betydning for min rett til pleiepenger.',

    'steg.oppsummering.arbeidssituasjon.header': 'Arbeidssituasjonen din',
    'steg.oppsummering.arbeidssituasjon.omsfost.title': 'Omsorgsstønad eller fosterhjemsgodtgjørelse',
    'steg.oppsummering.arbeidssituasjon.omsfost.mottarIkke':
        'Mottar ikke fosterhjemgodtgjørelse, eller omsorgsstønad fra kommunen',
    'steg.oppsummering.vedlegg.header': 'Legeerklæring',
    'steg.oppsummering.vedlegg.listTitle': 'Dokumenter lastet opp',

    'steg.oppsummering.validering.navigasjonTilStegInfo':
        'Vennligst gå tilbake og sjekk informasjonen du har fylt ut. Når du har gjort det, trykker du på "Fortsett"-knappen for å gå videre.',
    'steg.oppsummering.validering.navigasjonTilStegGåTil': 'Gå til',
    'steg.oppsummering.validering.tidsromKunHelg':
        'Oops, noe gikk galt med perioden du søker for. Du kan kun få utbetalt pleiepenger for hverdager. Det utbetales ikke pleiepenger for lørdag eller søndag selv om du har hatt fravær fra jobb for å pleie barn. Du kan derfor ikke søke pleiepenger kun for lørdag og/eller søndag.',
    'steg.oppsummering.validering.manglerVedlegg':
        'Oops, noe gikk galt med legeerklæringen. Vennligst gå tilbake og kontroller at den er lastet opp riktig.',
    'steg.oppsummering.validering.fødselsattest':
        'Oops, noe gikk galt med fødselsattest. Vennligst gå tilbake og kontroller at den er lastet opp riktig.',
    'steg.oppsummering.validering.omsorgstilbud.ugyldig': 'Oops, noe gikk galt med omsorgstilbudet som er registrert.',
    'steg.oppsummering.validering.omsorgstilbud.nattevåkBeskrivelseForLang':
        'Oops, nå ser vi at teksten du har skrevet om nattevåk er for lang.',
    'steg.oppsummering.validering.omsorgstilbud.beredskapBeskrivelseForLang':
        'Oops, nå ser vi at teksten du har skrevet om beredskap er for lang.',
    'steg.oppsummering.validering.arbeidssituasjon.sn.forHøyInntekt':
        'Oops, nå ser vi at inntekten du har oppgitt for virksomheten din er for høy.',

    'page.confirmation.sidetittel': 'Vi har mottatt søknaden din',
    'page.confirmation.tittel.1': 'Vi har mottatt søknaden din om pleiepenger for sykt barn',

    'page.confirmation.tittel.advarsel.list.tittel':
        'Vi kontakter arbeidsgivere du har fravær hos, for å informere om at de må sende inntektsmelding. Dette er aktuelt hvis:',
    'page.confirmation.tittel.advarsel.list.item.1': 'du søker for første gang, eller',
    'page.confirmation.tittel.advarsel.list.item.2': 'det er mer enn 4 uker siden du hadde pleiepenger sist',

    'page.confirmation.dinePP.info.tittel': 'Dine pleiepenger:',
    'page.confirmation.dinePP.info.1':
        'Det tar inntil 15 minutter før søknaden din vises på Dine Pleiepenger. Der kan du: ',
    'page.confirmation.dinePP.list.item.1':
        'Laste ned bekreftelse på at du har søkt pleiepenger som du kan gi til arbeidsgiver',
    'page.confirmation.dinePP.list.item.2': 'Ettersende dokumentasjon',
    'page.confirmation.dinePP.list.item.3': 'Melde fra om endring',
    'page.confirmation.dinePP.list.item.4': 'Følge status i sak',
    'page.confirmation.dinePP.lenke': 'Gå til Dine pleiepenger',

    'page.generalErrorPage.sidetittel': 'Feil',
    'page.generalErrorPage.tittel': 'Noe gikk galt...',
    'page.generalErrorPage.tekst': 'Beklager, her har det dessverre skjedd en feil.',

    'page.invalidStepPage.sidetittel': 'Oops, nå skjedde det en feil...',
    'page.invalidStepPage.tittel': 'Oops, nå skjedde det en feil...',
    'page.invalidStepPage.tekst':
        'Du er kommet til en side du ikke trenger å fylle ut. Dette kan skje hvis du går frem og tilbake i søknaden gjennom pilene i nettleseren (pilene helt øverst til venstre på siden). Du unngår dette problemet hvis du heller bruker knapper og lenker som ligger inne i selve søknaden for å gå frem eller tilbake.',
    'page.invalidStepPage.tilbakeLenke': 'Gå tilbake til forrige side',

    'page.ikkeTilgang.tekst':
        'Du har ikke tilgang til denne siden. Dersom du er under 18 år, må en av foreldrene dine eller en foresatt skrive under på søknaden sammen med deg. Du må derfor fylle ut søknaden på papir og sende den i posten.',
    'page.ikkeTilgang.lastNed': 'Her kan du laste ned papirsøknaden',

    'vedleggsliste.ingenLegeerklæringLastetOpp': 'Ingen legeerklæring er lastet opp',

    'arbeidsforhold.ikkeAnsatt.info':
        'Når du ikke er ansatt her lenger, må du be denne arbeidsgiveren om å sende en ny A-melding med sluttdato. Dette gjør de enten via eget lønns- og personalsystem, eller via Altinn.',

    'arbeidsforhold.erAnsatt.spm': 'Stemmer det at du er ansatt hos {navn} i perioden du søker for?',
    'arbeidsforhold.sluttetFørSøknadsperiode.spm': 'Sluttet du hos {navn} før {fraDato}?',
    'arbeidsforhold.arbeiderNormaltTimerPerUke.snitt.spm':
        'Hvor mange timer {jobber} du vanligvis {hvor}? Oppgi tiden i et snitt per uke:',
    'arbeidsforhold.arbeiderNormaltTimerPerUke.snitt.infoStønadGodtgjørelse':
        'Du skal ikke inkludere timer for omsorgsstønad/fosterhjemgodtgjørelse.',

    'arbeidsforhold.ansatt.normalTimer.info.tittel': 'Hva om jeg jobber turnus eller varierende?',
    'arbeidsforhold.selvstendig.normalTimer.info.tittel': 'Hva om jeg jobber turnus eller varierende?',
    'arbeidsforhold.frilanser.normalTimer.frilans.omsorgsstønad':
        'Du skal ikke inkludere timer for fosterhjemsgodtgjørelse og omsorgsstønad.',
    'arbeidsforhold.frilanser.normalTimer.frilans.info.tittel': 'Hvordan regner jeg et snitt?',
    'arbeidsforhold.frilanser.normalTimer.frilans.FRILANS.info.1':
        'Du regner ut et snitt ved å legge sammen alle timene du har jobbet som frilanser de siste 12 ukene, og deler dette på 12. Da får du et snitt per uke.',
    'arbeidsforhold.frilanser.normalTimer.frilans.FRILANS.info.2':
        'Hvis de siste 12 uker ikke er representativ for hvor mye du jobber som frilanser må du ta utgangspunkt i en så lang periode som er representativ for deg.',
    'arbeidsforhold.frilanser.normalTimer.frilans.HONORAR.info.1':
        'Du regner ut et snitt ved å legge sammen alle timene du har brukt på oppdraget du mottar honorar for de siste 12 ukene, og deler dette på 12. Da får du et snitt per uke.',
    'arbeidsforhold.frilanser.normalTimer.frilans.HONORAR.info.2':
        'Hvis de siste 12 ukene ikke er representative i din situasjon, må du ta utgangspunkt i en så lang periode som er representativ for deg.',
    'arbeidsforhold.frilanser.normalTimer.frilans.FRILANS_HONORAR.info.1':
        'Du regner ut et snitt ved å legge sammen antall timer du jobber som frilanser med antall timer du bruker på det du mottar honorar for. Legg sammen timene for de siste 12 ukene, og så deler du dette på 12. Da får du et snitt per uke.',
    'arbeidsforhold.frilanser.normalTimer.frilans.FRILANS_HONORAR.info.2':
        'Hvis de siste 12 ukene ikke er representative i din situasjon, må du ta utgangspunkt i en så lang periode som er representativ for deg.',
    'arbeidsforhold.frilanser.normalTimer.frilans.FRILANS_HONORAR.info.3': 'Eksempel på hvordan du regner ut:',
    'arbeidsforhold.frilanser.normalTimer.frilans.FRILANS_HONORAR.info.4':
        'Du har de siste 12 ukene jobbet 40 timer som frilanser, og du har brukt 20 timer på det du mottar honorar for. Da får du til sammen 60 timer, som du deler på 12 = 5. Du oppgir altså at du jobber 5 timer i snitt per uke.',

    'arbeidsforhold.normalTimer.info.turnus':
        'Når du jobber turnus, eller har annen varierende arbeidstid, oppgir du et snitt per uke.',
    'arbeidsforhold.normalTimer.info.turnus.tittel': 'Slik regner du ut et snitt når du jobber turnus',
    'arbeidsforhold.normalTimer.info.turnus.avsnitt.1':
        'Du regner ut snittet ved å legge sammen antall timer du jobber totalt i hele turnusperioden din, og deler det med antall uker som turnusperioden din består av.',
    'arbeidsforhold.normalTimer.info.turnus.avsnitt.2': 'Eksempel:',
    'arbeidsforhold.normalTimer.info.turnus.avsnitt.3':
        'Du har en turnus som går over 3 uker. Den første uka jobber du 20 timer, den andre 40 timer og den tredje uka jobber du 15 timer. Da legger du sammen antall timer du har jobbet og deler med antall uker i turnusperioden din.',
    'arbeidsforhold.normalTimer.info.turnus.avsnitt.4': 'Da blir regnestykket slik i dette eksempelet:',
    'arbeidsforhold.normalTimer.info.turnus.avsnitt.4a': '20 timer + 40 timer + 15 timer = 75 timer',
    'arbeidsforhold.normalTimer.info.turnus.avsnitt.4b':
        'Så deler du antall timer med antall uker i turnusperioden din: 75 / 3 = 25',
    'arbeidsforhold.normalTimer.info.turnus.avsnitt.5':
        'Du jobber altså i snitt 25 timer per uke, og det er dette tallet du oppgir.',

    'arbeidsforhold.normalTimer.info.varierende.tittel': 'Slik regner du ut et snitt ved varierende arbeidstid',
    'arbeidsforhold.normalTimer.info.varierende.avsnitt.1':
        'Du regner ut et snitt ved å legge sammen antall timer du totalt har jobbet de siste 12 ukene og deler det med 12. Hvis du ikke har jobbet i 12 uker, regner du ut snittet på samme måte ved å bruke de ukene du har jobbet.',
    'arbeidsforhold.normalTimer.info.varierende.avsnitt.2': 'Eksempel når du har jobbet de siste 12 ukene:',
    'arbeidsforhold.normalTimer.info.varierende.avsnitt.3':
        'De siste 12 ukene har du jobbet 250 timer. Da deler du antall timer du har jobbet med 12: 250 timer / 12 uker = 20,8',
    'arbeidsforhold.normalTimer.info.varierende.avsnitt.4':
        'Du jobber altså i snitt 20,8 timer per uke, og det er dette tallet du oppgir.',

    'arbeidsforhold.normalTimer.info.varierende.avsnitt.5':
        'Slik regner du ut et snitt når du har jobbet mindre enn 12 uker:',
    'arbeidsforhold.normalTimer.info.varierende.avsnitt.6':
        'Da deler du antall timer med antall uker du har jobbet. Hvis du for eksempel har jobbet i 7 uker, så deler du antall timer du har jobbet med 7.',

    'arbeidsforhold.arbeidsforholdIntlValues.jobber': 'jobber',
    'arbeidsforhold.arbeidsforholdIntlValues.somAnsatt': 'hos {arbeidsgiverNavn}',
    'arbeidsforhold.arbeidsforholdIntlValues.somFrilanser': 'som frilanser',
    'arbeidsforhold.arbeidsforholdIntlValues.somSN': 'som selvstendig næringsdrivende',

    'arbeidIPeriode.StepInfo.1':
        'Her skal du svare på om du jobber noe i perioden du søker om. Altså om du kombinerer pleiepenger med delvis jobb.',
    'arbeidIPeriode.StepInfo.2':
        'Pleiepengene graderes mot den tiden du jobber. Det vil si at hvis du for eksempel i søknadsperioden jobber 30 prosent, kan du ha rett til opptil 70 prosent pleiepenger.',

    'arbeidIPeriode.redusert.info.tekst':
        'Hvis du er usikker på hvor mye du skal jobbe fremover i tid, legger du inn slik du tror du skal jobbe. Hvis det senere viser seg at du jobber mer eller mindre av hva du tror nå, melder du fra om endring i slutten av den aktuelle måneden.',

    'arbeidIPeriode.redusert.endring.tittel': 'Hvordan melder jeg fra om endring?',
    'arbeidIPeriode.redusert.endring.arb_frilans.tekst':
        'Du sender endringsmelding for pleiepenger som du finner under «Skjema og søknad» på nav.no, eller på «Dine pleiepenger» på innlogget side. I endringsmeldingen kan du enkelt registrere hvor mye du har jobbet.',
    'arbeidIPeriode.redusert.endring.sn.tekst':
        'Du sender en melding med hvor mye du har jobbet via «Skriv til oss»-tjenesten på innlogget side.',

    'oppsummering.arbeidssituasjon.arbeidsgiver.ansatt': 'Er ansatt',
    'oppsummering.arbeidssituasjon.avsluttet.arbeidsgiver.ansatt': 'Er ikke lenger ansatt',
    'oppsummering.arbeidssituasjon.tid': 'Jobber normalt {timer, plural, one {# time} other {# timer}} per uke',
    'oppsummering.arbeidssituasjon.avsluttet.tid':
        'Jobbet normalt {timer, plural, one {# time} other {# timer}} per uke',
    'oppsummering.arbeidssituasjon.avsluttet.sluttetFørSøknadsperiode': 'Sluttet før {periodeFra}',
    'oppsummering.arbeidssituasjon.avsluttet.sluttetISøknadsperiode': 'Sluttet etter {periodeFra}',

    'oppsummering.arbeidssituasjon.arbeidsgivere.ingenIPeriode.header': 'Arbeidsgivere',
    'oppsummering.arbeidssituasjon.arbeidsgivere.ingenIPeriode.tekst': 'Er ikke ansatt i søknadsperioden',

    'oppsummering.arbeidssituasjon.frilanser.header': 'Frilans og oppdrag som regnes som frilansoppdrag',
    'oppsummering.arbeidssituasjon.frilans.erIkkeFrilanser': 'Er ikke frilanser og får ikke honorar i søknadsperioden',
    'oppsummering.arbeidssituasjon.frilans.startetFørSisteTreHeleMåneder':
        'Startet som frilanser før {opptjeningStartdato}',
    'oppsummering.arbeidssituasjon.frilans.startet': 'Startet som frilanser {dato}',
    'oppsummering.arbeidssituasjon.frilans.FRILANS': 'Jobber som frilanser',
    'oppsummering.arbeidssituasjon.frilans.FRILANS_HONORAR': 'Jobber som frilanser og mottar honorar',
    'oppsummering.arbeidssituasjon.frilans.HONORAR': 'Mottar honorar',
    'oppsummering.arbeidssituasjon.frilans.HONORAR.misterIkkeHonorar': 'Mister ikke honorar i søknadsperioden',
    'oppsummering.arbeidssituasjon.frilans.HONORAR.misterHonorar': 'Mister honorar i søknadsperioden',
    'oppsummering.arbeidssituasjon.frilans.sluttet': 'Sluttet {dato}',
    'oppsummering.arbeidssituasjon.frilans.frilansoppdrag': 'Frilansoppdrag registrert i søknadsperioden:',

    'oppsummering.arbeidssituasjon.selvstendig.header': 'Selvstendig næringsdrivende',
    'oppsummering.arbeidssituasjon.selvstendig.erIkkeSN': 'Er ikke selvstendig næringsdrivende i søknadsperioden',

    'oppsummering.arbeidssituasjon.selvstendig.erSn': 'Er selvstendig næringsdrivende',
    'oppsummering.arbeidssituasjon.selvstendig.flereVirksomheter': 'Har flere virksomheter',
    'oppsummering.arbeidssituasjon.selvstendig.enVirksomhet': 'Har 1 virksomhet',

    'oppsummering.arbeidssituasjon.optjeningIUtlandet.listetittel': 'Jobbet i annet EØS-land',
    // 'oppsummering.arbeidssituasjon.optjeningIUtlandet.nei': 'Nei',
    'oppsummering.arbeidssituasjon.optjeningIUtlandet.tittel': 'Arbeidstaker eller frilanser i et annet EØS-land',
    'oppsummering.arbeidssituasjon.optjeningIUtlandet.ja':
        'Har  jobbet som arbeidstaker eller frilanser i et annet EØS-land i løpet av de 3 siste månedene før perioden en søker om',
    'oppsummering.arbeidssituasjon.optjeningIUtlandet.nei':
        'Har ikke jobbet som arbeidstaker eller frilanser i et annet EØS-land i løpet av de 3 siste månedene før perioden en søker om',
    'oppsummering.arbeidssituasjon.optjeningIUtlandet.periode': 'Periode med jobb i annet EØS-land',
    'oppsummering.arbeidssituasjon.optjeningIUtlandet.perioder': 'Perioder med jobb i annet EØS-land',

    'oppsummering.arbeidssituasjon.utenlandskNæring.tittel': 'Selvstendig næringsdrivende i et annet EØS-land',
    'oppsummering.arbeidssituasjon.utenlandskNæring.nei':
        'Har ikke jobbet som selvstendig næringsdrivende i et annet EØS-land i løpet av de 3 siste årene før perioden en søker om',
    'oppsummering.arbeidssituasjon.utenlandskNæring.ja':
        'Har jobbet som selvstendig næringsdrivende i et annet EØS-land i løpet av de 3 siste årene før perioden en søker om',
    'oppsummering.arbeidssituasjon.utenlandskNæring.næringer': 'Næringsvirksomheter i andre EØS-land',
    'oppsummering.arbeidssituasjon.utenlandskNæring.næring': 'Næringsvirksomhet i annet EØS-land',

    'opptjeningIUtlandetSummaryItem.periode': 'Periode: {periode}',
    'opptjeningIUtlandetSummaryItem.info': 'Jobbet i {landnavn} som {hva} hos {hvor}',

    'oppsummering.arbeidssituasjon.utenlandskNæring.listetittel':
        'Jobbet som selvstendig næringsdrivende i et annet EØS-land',
    // 'oppsummering.arbeidssituasjon.utenlandskNæring.nei': 'Nei',

    'oppsummering.arbeidIPeriode.jobbIPerioden.header': 'Jobb i søknadsperioden',
    'oppsummering.arbeidIPeriode.jobbIPerioden': 'Jobb i søknadsperioden',
    'oppsummering.arbeidIPeriode.arbeiderIPerioden.nei': 'Jobber ikke i søknadsperioden',
    'oppsummering.arbeidIPeriode.arbeiderIPerioden.nei.honorar': 'Mister alt av honorar',
    'oppsummering.arbeidIPeriode.arbeiderIPerioden.somVanlig':
        'Jobber som normalt, har ikke fravær på grunn av pleiepenger i søknadsperioden',
    'oppsummering.arbeidIPeriode.arbeiderIPerioden.somVanlig.honorar': 'Mister ikke honorar på grunn av pleiepenger ',
    'oppsummering.arbeidIPeriode.arbeiderIPerioden.redusert':
        'Kombinerer delvis jobb med pleiepenger i søknadsperioden',

    'oppsummering.arbeidIPeriode.arbeiderIPerioden.frilanser.REDUSERT':
        'Frilanser: Kombinerer delvis jobb med pleiepenger',
    'oppsummering.arbeidIPeriode.arbeiderIPerioden.frilanser.HELT_FRAVÆR': 'Frilanser: Jobber ikke i søknadsperioden',
    'oppsummering.arbeidIPeriode.arbeiderIPerioden.frilanser.SOM_VANLIG':
        'Frilanser: Jobber som normalt, har ikke fravær på grunn av pleiepenger',

    'oppsummering.arbeidIPeriode.arbeiderIPerioden.prosent': 'Jobber {prosent} prosent av normalt',
    'oppsummering.arbeidIPeriode.arbeiderIPerioden.timerPerUke': 'Jobber {timer} per uke',
    'oppsummering.arbeidIPeriode.arbeiderIPerioden.ulikeUker.timer.tittel':
        'Jobber ulikt antall timer i ukene i søknadsperioden:',
    'oppsummering.arbeidIPeriode.arbeiderIPerioden.ulikeUker.enkeltuke.timer.tittel': 'Jobber:',
    'oppsummering.arbeidIPeriode.arbeiderIPerioden.ulikeUker.timer.uke': 'Uke {ukenummer}: {timer}',

    timerPerUke: '{timer, plural, one {# time} other {# timer}} per uke',

    'summary.virksomhet.virksomhetInfo.tittel': 'Næringsvirksomhet som du har lagt inn:',

    'selvstendig.harDuHattInntekt.spm': 'Er du selvstendig næringsdrivende i perioden du søker for?',
    'selvstendig.harDuHattInntekt.hjelpetekst.tittel': 'Hva betyr det å være selvstendig næringsdrivende?',
    'selvstendig.harDuHattInntekt.hjelpetekst':
        'Du er selvstendig næringsdrivende når du enten har et enkeltpersonforetak (ENK), et ansvarlig selskap (ANS), eller et ansvarlig selskap med delt ansvar (DA).',
    'selvstendig.harDuHattInntekt.hjelpetekst.snSkatteetatenLenke':
        'I tillegg kan du lese på skatteetatens side om andre situasjoner hvor du kan regnes som selvstendig næringsdrivende.',
    'selvstendig.harFlereVirksomheter.spm': 'Har du flere enn én næringsvirksomhet som er aktiv?',
    'selvstendig.veileder.flereAktiveVirksomheter':
        'Når du har flere aktive næringsvirksomheter skal du kun legge inn den virksomheten som er eldst av dem. Har du for eksempel en virksomhet du startet i 2012 og en annen som du startet i 2020, skal du kun legge inn virksomheten du startet i 2012.',

    'frilanser.harDuHattInntekt.spm': 'Jobber du som frilanser eller mottar du honorar?',
    'frilanser.harDuHattInntekt.omsorgsstønad':
        'Hvis du kun mottar fosterhjemsgodtgjørelse eller omsorgsstønad skal du svare nei på dette spørsmålet.',
    'frilanser.harDuHattInntekt.hvaBetyr.spm': 'Hva betyr dette?',
    'frilanser.harDuHattInntekt.hvaBetyr.info.1':
        'Du skal svare ja på dette spørsmålet hvis du jobber som frilanser og/eller mottar honorar for utført oppdrag. Du kan få kompensert et eventuelt tap av denne inntekten.',
    'frilanser.harDuHattInntekt.hvaBetyr.info.2':
        'Et honorar kan for eksempel være en utbetaling i forbindelse med et styreverv, eller som trener for et idrettslag. Honorar blir også ofte brukt av frie yrker som forfattere, fotografer og kunstnere.',

    'frilanser.startetFørSisteTreHeleMåneder.spm': 'Startet du som frilanser før {dato}?',
    'frilanser.startdato.spm': 'Når startet du å jobbe som frilanser?',

    'frilanser.erFortsattFrilanser.spm': 'Jobber du fortsatt som frilanser?',
    'frilanser.ingenFrilans.info':
        'Hvis det ikke stemmer at du skal være registrert med frilansoppdrag i AA-registeret må du be de som har gjort registreringen om å oppdatere informasjonen. Du kan likevel fortsette å fylle ut og sende inn søknaden.',

    'frilanser.sluttdato.spm': 'Når sluttet du å jobbe som frilanser?',
    'frilanser.misterHonorar.tittle': 'Mister du honorar fordi du må pleie barnet?',
    'frilanser.misterHonorar.description.tittel': 'Hva betyr dette?',
    'frilanser.misterHonorar.description':
        'Du kan ha rett til å få kompensert tap av honorar hvis du skal pleie et sykt barn.',

    'frilanser.hjelpetekst.spm': 'Hva betyr det å være frilanser?',
    'frilanser.hjelpetekst.1':
        'Du er frilanser når du mottar lønn for enkeltstående oppdrag uten å være fast eller midlertidig ansatt hos den du utfører oppdraget for. Hvis du er usikker på om du er frilanser må du sjekke om oppdragene dine er registrert som frilansoppdrag på skatteetaten sine nettsider.',

    'verneplikt.summary.header': 'Verneplikt',
    'verneplikt.summary.harVærtVernepliktig': 'Utøvde verneplikt på tidspunktet det søkes pleiepenger fra',
    'verneplikt.summary.harIkkeVærtVernepliktig': 'Utøvde ikke verneplikt på tidspunktet det søkes pleiepenger fra',

    'selvstendig.infoDialog.infoTittel': 'Næringsvirksomhet som du har lagt inn:',
    'selvstendig.infoDialog.registrerKnapp': 'Registrer virksomhet',
    'selvstendig.infoDialog.endreKnapp': 'Endre opplysninger',
    'selvstendig.infoDialog.fjernKnapp': 'Fjern virksomhet',
    'selvstendig.infoDialog.tittel.en': 'Opplysninger om virksomheten din',
    'selvstendig.infoDialog.tittel.flere': 'Opplysninger om den eldste virksomheten din',

    'validation.harForståttRettigheterOgPlikter.notChecked': 'Du må bekrefte at du har lest og forstått dine plikter.',
    'validation.barnetSøknadenGjelder.noValue': 'Du må velge hvilket barn søknaden gjelder.',
    'validation.barnetsNavn.stringHasNoValue': 'Du må skrive inn navnet på barnet.',
    'validation.barnetsNavn.stringIsTooLong': 'Navnet på barnet kan ikke inneholde flere enn {maks} tegn.',
    'validation.barnetsNavn.stringIsTooShort': 'Navnet på barnet må inneholde minst {min} tegn.',

    'validation.barnetsFødselsdato.dateHasInvalidFormat':
        'Du må oppgi barnets fødselsdato i et gyldig format. Gyldig format er dd.mm.ååå.',
    'validation.barnetsFødselsdato.dateHasNoValue':
        'Du må oppgi barnets fødselsdato. Skriv inn eller velg dato fra datovelgeren.',
    'validation.barnetsFødselsdato.dateIsBeforeMin': 'Du kan ikke legge til et barn over 18 år.',
    'validation.barnetsFødselsdato.dateIsAfterMax': 'Barnets fødselsdato kan ikke være etter dagens dato.',

    'validation.årsakManglerIdentitetsnummer.noValue':
        'Du må svare på spørsmålet om hvorfor barnet ikke har fødselsnummer eller D-nummer.',
    'validation.relasjonTilBarnet.noValue': 'Du må svare på spørsmålet om hvilken relasjon du har til barnet.',
    'validation.barnetsFødselsnummer.fødselsnummerHasNoValue': 'Du må oppgi barnets fødselsnummer/D-nummer.',
    'validation.barnetsFødselsnummer.fødselsnummerNot11Chars': 'Fødselsnummeret/D-nummeret må bestå av 11 siffer.',
    'validation.barnetsFødselsnummer.fødselsnummerIsNot11Chars':
        'Fødselsnummeret/D-nummeret du har tastet inn er ikke et gyldig norsk fødselsnummer. Kontroller at du har tastet inn riktig.',
    'validation.barnetsFødselsnummer.fødselsnummerIsInvalid':
        'Fødselsnummeret/D-nummeret du har tastet inn er ikke et gyldig norsk fødselsnummer. Kontroller at du har tastet inn riktig.',
    'validation.barnetsFødselsnummer.fødselsnummerIsNotAllowed':
        'Fødselsnummeret kan ikke være ditt eget. Legg inn barnets fødselsnummer.',
    'validation.barnetsFødselsnummer.fødselsnummerAsHnrIsNotAllowed':
        'Fødselsnummeret/D-nummeret du har tastet inn er ikke et gyldig norsk fødselsnummer. Kontroller at du har tastet inn riktig.',

    'validation.relasjonTilBarnetBeskrivelse.stringHasNoValue':
        'Du må beskrive hvem du er i forhold til barnet, og hvilken tilsynsrolle du har i perioden du søker om.',
    'validation.relasjonTilBarnetBeskrivelse.stringIsTooLong':
        'Du har brukt for mange tegn i beskrivelsen din. Teksten kan ikke inneholde flere enn {maks} tegn.',

    'validation.periodeFra.dateHasNoValue': 'Du må fylle ut periodens fra-dato.',
    'validation.periodeFra.dateHasInvalidFormat':
        'Du må oppgi periodens fra-dato i et gyldig datoformat. Gyldig format er dd.mm.åååå.',
    'validation.periodeFra.fromDateIsAfterToDate':
        'Fra-datoen kan ikke være etter til-datoen. Skriv inn eller velg dato fra kalenderen.',
    'validation.periodeFra.dateIsBeforeMin':
        'Du kan ikke søke om pleiepenger for en periode som er lenger enn 3 år tilbake i tid.',
    'validation.periodeFra.dateIsBeforeMin.fødselsdato': 'Pleiepengeperioden kan ikke starte før barnet er født.',
    'validation.periodeFra.dateIsNotWeekday':
        'Periodens fra-dato må være en ukedag, det kan ikke være en lørdag eller søndag. Skriv inn eller velg dato fra kalenderen.',
    'validation.periodeTil.dateHasNoValue': 'Du må fylle ut periodens til-dato.',
    'validation.periodeTil.dateHasInvalidFormat':
        'Du må oppgi periodens til-dato i et gyldig datoformat. Gyldig format er dd.mm.åååå.',
    'validation.periodeTil.dateIsBeforeMin':
        'Du kan ikke søke om pleiepenger for en periode som er lenger enn 3 år tilbake i tid.',
    'validation.periodeTil.dateIsNotWeekday':
        'Periodens til-dato må være en ukedag, det kan ikke være en lørdag eller søndag. Skriv inn eller velg dato fra kalenderen.',
    'validation.periodeTil.dateIsAfterMax':
        'Du kan kun søke pleiepenger for opptil ett år av gangen, og ett år frem i tid.',
    'validation.periodeTil.toDateIsBeforeFromDate':
        'Til-datoen kan ikke være før fra-datoen. Skriv inn eller velg dato fra kalenderen.',
    'validation.skalOppholdeSegIUtlandetIPerioden.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du skal reise til utlandet i perioden du søker for.',
    'validation.utenlandsoppholdIPerioden.utenlandsopphold_ikke_registrert':
        'Du har svart ja til at du skal til utlandet i perioden med pleiepenger. Legg til minst ett utenlandsopphold.',
    'validation.utenlandsoppholdIPerioden.utenlandsopphold_overlapper':
        'Du har lagt inn utenlandsopphold med datoer som overlapper hverandre.',
    'validation.utenlandsoppholdIPerioden.utenlandsopphold_utenfor_periode':
        'Du har lagt inn utenlandsopphold som er utenfor søknadsperioden.',
    'validation.utenlandsoppholdIPerioden.utenlandsopphold_overlapper_samme_start_slutt':
        'Et utenlandsopphold kan ikke starte samme dag som et annet avsluttes.',
    'validation.ferieuttakIPerioden.ferieuttak_ikke_registrert':
        'Du har svart ja til at du skal ha ferie i perioden med pleiepenger. Legg til minst ett ferieuttak.',
    'validation.ferieuttakIPerioden.ferieuttak_utenfor_periode':
        'Du har lagt inn ferie som er utenfor søknadsperioden.',
    'validation.ferieuttakIPerioden.ferieuttak_overlapper': 'Du har lagt inn ferier som overlapper hverandre.',
    'validation.skalTaUtFerieIPerioden.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du skal ha ferie i perioden du søker for.',

    'validation.stønadGodtgjørelse.mottarStønadGodtgjørelse.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du mottar omsorgsstønad eller fosterhjemsgodtgjørelse.',

    'validation.arbeidsforhold.erAnsatt.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du er ansatt hos {navn} i perioden du søker pleiepenger.',
    'validation.arbeidsforhold.sluttetFørSøknadsperiode.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du sluttet hos {navn} før {fraDato}.',
    'validation.arbeidsforhold.arbeiderNormaltTimerPerUke.numberHasNoValue':
        'Du må oppgi hvor mange timer du {jobber} per uke {hvor} i perioden når du ikke har fravær på grunn av pleiepenger.',
    'validation.arbeidsforhold.arbeiderNormaltTimerPerUke.numberHasInvalidFormat':
        'Antall timer du normalt {jobber} per uke {hvor} har ikke gyldig format. Et gyldig tall inneholder kun siffer og komma som desimaltegn.',
    'validation.arbeidsforhold.arbeiderNormaltTimerPerUke.numberIsTooSmall':
        'Antall timer du normalt {jobber} per uke {hvor} kan ikke være mindre enn {min}.',
    'validation.arbeidsforhold.arbeiderNormaltTimerPerUke.numberIsTooLarge':
        'Antall timer du normalt {jobber} per uke {hvor} kan ikke være mer enn {max}.',

    'validation.frilans.harHattInntektSomFrilanser.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du jobber som frilanser, eller om du mottar honorar.',
    'validation.frilans.frilanstype.notChecked': 'Du må velge hva som er din situasjon som frilanser.',
    'validation.frilans.misterHonorar.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du mister honorar i perioden du søker for.',

    'validation.frilans.startdato.dateHasNoValue':
        'Du må oppgi hvilken dato du startet å jobbe som frilanser. Skriv inn eller velg dato fra kalenderen.',
    'validation.frilans.startdato.dateHasInvalidFormat':
        'Du må oppgi datoen for når du startet å jobbe som frilanser i et gyldig format. Gyldig format er dd.mm.åååå.',
    'validation.frilans.startdato.dateIsAfterMax':
        'Datoen for når du startet å jobbe som frilanser kan ikke være etter dagens dato.',
    'validation.frilans.startdato.dateIsBeforeMin':
        'Datoen for når du startet å jobbe som frilanser kan ikke være før {minDato}. Dersom du startet før dette, må du svare ja på at du startet før denne datoen.',
    'validation.frilans.startdato.startetEtterSøknadsperiode':
        'Du har oppgitt at du startet startet å jobbe som frilanser etter perioden du søker for. Dersom dette stemmer, kan du svare "Nei" på spørsmålet om du var frilanser i perioden du søker for.',

    'validation.frilans.sluttdato.sluttetFørSøknadsperiode':
        'Du har oppgitt at du sluttet å jobbe som frilanser før perioden du søker for. Dersom dette stemmer, kan du svare "Nei" på spørsmålet om du var frilanser i perioden du søker for.',
    'validation.frilans.sluttdato.dateHasNoValue':
        'Du må oppgi hvilken dato du sluttet å jobbe som frilanser. Skriv inn eller velg dato fra kalenderen.',
    'validation.frilans.sluttdato.dateHasInvalidFormat':
        'Du må oppgi datoen for når du sluttet å jobbe som frilanser i et gyldig format. Gyldig format er dd.mm.åååå.',
    'validation.frilans.sluttdato.dateIsAfterMax':
        'Datoen for når du sluttet å jobbe som frilanser kan ikke være etter dagens dato.',
    'validation.frilans.sluttdato.dateIsBeforeMin':
        'Datoen for når du sluttet å jobbe som frilanser kan ikke være før datoen du startet.',

    'validation.frilans.startetFørSisteTreHeleMåneder.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du startet som frilanser før {dato}.',

    'validation.frilans.erFortsattFrilanser.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du fortsatt jobber som frilanser.',

    'validation.selvstendig.harHattInntektSomSN.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du er selvstendig næringsdrivende i perioden du søker for.',
    'validation.selvstendig.harFlereVirksomheter.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du har flere enn én virksomhet som er aktiv.',
    'validation.selvstendig.virksomhet.noValue':
        'Du må oppgi informasjon om virksomheten din som selvstendig næringsdrivende.',
    'validation.harVærtEllerErVernepliktig.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du utøvde verneplikt på tidspunktet du søker pleiepenger fra.',
    'validation.selvstendig.virksomhet.startetEtterSøknadsperiode':
        'Du har oppgitt at du startet som selvstendig næringsdrivende etter perioden du søker for. Dersom dette stemmer, kan du svare "Nei" på spørsmålet om du var selvstendig næringsdrivende i perioden du søker for.',
    'validation.selvstendig.virksomhet.sluttetFørSøknadsperiode':
        'Du har oppgitt at du sluttet som selvstendig næringsdrivende før perioden du søker for. Dersom dette stemmer, kan du svare "Nei" på spørsmålet om du var selvstendig næringsdrivende i perioden du søker for.',

    'validation.harOpptjeningUtland.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du har jobbet som arbeidstaker eller frilanser i et annet EØS-land i løpet av de 3 siste månedene før første dag med pleiepenger.',
    'validation.opptjeningUtland.listIsEmpty': 'Du må legge til jobb i et annet EØS-land.',
    'validation.harUtenlandskNæring.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du har jobbet som selvstendig næringsdrivende i et annet EØS-land i løpet av de 3 siste årene før perioden du søker om.',
    'validation.utenlandskNæring.listIsEmpty':
        'Du må legge til jobb som selvstendig næringsdrivende i et annet EØS-land.',

    'validation.omsorgstilbud.fastdag.tid.timeHasNoValue': 'Du må fylle ut timer og minutter for {dag}.',
    'validation.omsorgstilbud.fastdag.tid.hoursAreInvalid': 'Antall timer på {dag}  er ikke et gyldig tall.',
    'validation.omsorgstilbud.fastdag.tid.minutesAreInvalid': 'Antall minutter på {dag}  er ikke et gyldig tall.',
    'validation.omsorgstilbud.fastdag.tid.tooManyHours': 'Antall timer på {dag} kan ikke overstige 7 timer.',
    'validation.omsorgstilbud.fastdag.tid.tooManyMinutes': 'Antall minutter på {dag}  kan ikke overstige 59 minutter.',
    'validation.omsorgstilbud.fastdag.tid.durationIsTooLong':
        'Antall timer og minutter registrert {dag}  er for høyt. Tiden kan ikke overstige 7 timer og 30 minutter hver ukedag.',
    'validation.omsorgstilbud.fastdag.tid.durationIsTooShort':
        'Antall timer og minutter {dag} kan ikke være mindre enn 0 timer og 0 minutter.',
    'validation.omsorgstilbud.fastdag.tid.hoursAreNegative':
        'Antall timer og minutter {dag} kan ikke være mindre enn 0 timer og 0 minutter.',
    'validation.omsorgstilbud.fastdag.tid.minutesAreNegative':
        'Antall timer og minutter {dag} kan ikke være mindre enn 0 timer og 0 minutter.',
    'validation.omsorgstilbud_gruppe.ingenInfo':
        'Du må fylle ut den tiden i omsorgstilbudet som er fast og regelmessig.',
    'validation.omsorgstilbud_gruppe.forMangeTimerTotalt': 'Du kan registrere maks 37 timer og 30 minuter totalt.',
    'validation.omsorgstilbud.erIOmsorgstilbudFortid.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om barnet har vært fast og regelmessig i et omsorgstilbud.',
    'validation.omsorgstilbud.erIOmsorgstilbudFremtid.yesOrNoIsUnanswered':
        'Du må svare ja, nei eller usikker på om barnet skal være fast og regelmessig i et omsorgstilbud.',
    'validation.omsorgstilbud.enkeltdager.ingenTidRegistrert':
        'Du har ikke oppgitt noe tid for hvor mye barnet er i et omsorgstilbud i perioden.',
    'validation.omsorgstilbud.erLiktHverUke.yesOrNoIsUnanswered':
        'Du må svare på om tiden barnet er i omsorgstilbudet er lik for hver uke i perioden.',

    'validation.harNattevåk.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om barnets sykdom gjør at du må være våken om natten.',
    'validation.harNattevåk_ekstrainfo.stringHasNoValue': 'Du må beskrive hva som gjør at du må være våken om natten.',
    'validation.harNattevåk_ekstrainfo.stringIsTooLong': 'Beskrivelsen kan være på maks 1000 tegn.',
    'validation.harBeredskap.yesOrNoIsUnanswered': 'Du må svare ja eller nei på om du må være i beredskap.',
    'validation.harBeredskap_ekstrainfo.stringHasNoValue':
        'Du må gi en beskrivelse av hva som gjør at du må være i beredskap.',
    'validation.harBeredskap_ekstrainfo.stringIsTooLong':
        'Du har brukt for mange tegn i beskrivelsen din. Teksten kan ikke inneholde flere enn 1000 tegn.',
    'validation.harBoddUtenforNorgeSiste12Mnd.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du har bodd i utlandet i hele eller deler av de siste 12 månedene.',
    'validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_ikke_registrert':
        'Du har oppgitt at du har vært i utlandet de siste 12 månedene. Du må registrere dette utenlandsoppholdet.',
    'validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_overlapper':
        'Ett eller flere av utenlandsoppholdene du har lagt inn for de siste 12 månedene, har datoer som overlapper hverandre.',
    'validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_utenfor_periode':
        'Ett eller flere av utenlandsoppholdene du har lagt inn for de siste 12 månedene, har datoer som ikke er innenfor siste 12 måneder.',
    'validation.skalBoUtenforNorgeNeste12Mnd.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du planlegger å bo i utlandet i hele eller deler av de neste 12 månedene.',
    'validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_ikke_registrert':
        'Du har oppgitt at du skal oppholde deg i utlandet de neste 12 månedene. Du må registrere dette utenlandsoppholdet.',
    'validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_overlapper':
        'Ett eller flere av utenlandsoppholdene du har lagt inn for de neste 12 månedene, har datoer som overlapper hverandre.',
    'validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_utenfor_periode':
        'Ett eller flere av utenlandsoppholdene du har lagt inn for de neste 12 månedene, har datoer som ikke er innenfor neste 12 måneder.',
    'validation.harBekreftetOpplysninger.notChecked': 'Du må bekrefte at opplysningene du har gitt er riktige.',

    'validation.stønadGodtgjørelse.mottarStønadGodtgjørelseIHelePerioden.noValue':
        'Du må svare ja eller nei på om du mottar stønad/godtgjørelse i hele perioden du søker for.',

    'validation.stønadGodtgjørelse.starterUndeveis.noValue':
        'Du må svare Ja eller Nei på om du starter å motta stønad/godtgjørelse underveis i perioden du søker for.',
    'validation.stønadGodtgjørelse.starterUndeveis.starter_slutter_undeveis_nei':
        'Du kan ikke svare Nei samtidig på om du starter og slutter  å motta stønad/godtgjørelse underveis.',

    'validation.stønadGodtgjørelse.slutterUnderveis.noValue':
        'Du må svare Ja eller Nei på om du slutter å motta stønad/godtgjørelse underveis i perioden du søker for.',
    'validation.stønadGodtgjørelse.slutterUnderveis.starter_slutter_undeveis_nei':
        'Du kan ikke svare Nei både på at du starter og at du slutter å få stønad/godtgjørelse underveis.',

    'validation.stønadGodtgjørelse.startdato.dateHasNoValue':
        'Du må fylle ut dato når du startet å motta omsorgsstønad eller fosterhjemsgodtgjørelse.',
    'validation.stønadGodtgjørelse.startdato.dateIsAfterMax':
        'Start datoen kan ikke være etter søknadsperioden. Skriv inn eller velg dato fra kalenderen.',
    'validation.stønadGodtgjørelse.startdato.dateIsBeforeMin':
        'Start datoen kan ikke være før søknadsperioden. Skriv inn eller velg dato fra kalenderen.',
    'validation.stønadGodtgjørelse.startdato.dateHasInvalidFormat':
        'Du må oppgi start datoen i et gyldig datoformat. Gyldig format er dd.mm.åååå.',
    'validation.stønadGodtgjørelse.startdato.startetEtterSluttDato':
        'Start-datoen kan ikke være etter slutt-datoen. Skriv inn eller velg dato fra kalenderen.',

    'validation.stønadGodtgjørelse.sluttdato.dateHasNoValue':
        'Du må fylle ut dato når du sluttet å motta omsorgsstønad eller fosterhjemsgodtgjørelse.',
    'validation.stønadGodtgjørelse.sluttdato.dateIsAfterMax':
        'Slutt datoen kan ikke være etter søknadsperioden. Skriv inn eller velg dato fra kalenderen.',
    'validation.stønadGodtgjørelse.sluttdato.dateIsBeforeMin':
        'Slutt datoen kan ikke være før søknadsperioden. Skriv inn eller velg dato fra kalenderen.',
    'validation.stønadGodtgjørelse.sluttdato.dateHasInvalidFormat':
        'Du må oppgi slutt datoen i et gyldig datoformat. Gyldig format er dd.mm.åååå.',
    'validation.stønadGodtgjørelse.sluttdato.sluttetFørStartDato':
        'Slutt-datoen kan ikke være før start-datoen. Skriv inn eller velg dato fra kalenderen.',

    'infoForFarVedNyttBarn.tittel': 'Er du registrert som far i folkeregisteret?',
    'infoForFarVedNyttBarn.info.1':
        'Hvis du og moren til barnet er gift blir du automatisk registrert som far til barnet. Hvis dere ikke er gift må du erklære farskap for at du skal bli registrert som far til barnet i folkeregisteret. <Lenke>Her kan du erklære farskap digitalt</Lenke>.',

    'infoForFarVedNyttBarn.info.2':
        'Uavhengig av hva som er situasjonen din, kan du fortsette å fylle ut søknaden og sende den inn.',

    'psb.timer': '{timer, plural, one {# time} other {# timer}}',
    'psb.minutter': '{minutter, plural, one {# minutt} other {# minutter}}',
    'psb.timerOgMinutter':
        '{timer, plural, one {# time} other {# timer}} og {minutter, plural, one {# minutt} other {# minutter}}',

    'omsorgstilbudPeriode.leggTilTidIOmsorgstilbudLabel': 'Oppgi periode med omsorgstilbud',
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
};

export const appMessages = { nb, nn };
