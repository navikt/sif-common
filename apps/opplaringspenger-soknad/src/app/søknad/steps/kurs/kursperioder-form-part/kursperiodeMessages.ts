import { useIntl } from 'react-intl';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';

const nb = {
    'kursperiode.form.periode.label': 'Periode {periodeNr}',
    'kursperiode.form.harTaptArbeidstid.label':
        'Må du være borte fra jobb på grunn av reise til eller fra opplæringstedet?',
    'kursperiode.form.avreise.label': 'Når reiser du til opplæringsstedet?',
    'kursperiode.form.hjemkomst.label': 'Når er du hjemme fra opplæringsstedet?',
    'kursperiode.form.beskrivelseReisetid.label': 'Beskrivelse av reisetid',
    'kursperiode.form.beskrivelseReisetid.description':
        'Du oppgir at du reiser på en annen dag enn når du har opplæring. Beskriv hvorfor du ikke kan reise samme dag som du har opplæring.',
    'kursperiode.form.beskrivelseReisetid.validation.stringHasNoValue': 'Du må du fylle ut beskrivelse av reisetid.',
    'kursperiode.form.beskrivelseReisetid.validation.stringIsTooShort':
        'For få tegn. Du må du fylle ut beskrivelse av reisetid med minst 5 tegn.',
    'kursperiode.form.beskrivelseReisetid.validation.stringIsTooLong':
        'For mange tegn. Du kan bruke maks {maxLength} tegn for å beskrive reisetid.',

    'kursperiode.form.fom.label': 'Fra og med',
    'kursperiode.form.fom.validation.dateHasNoValue':
        'Du må oppgi når perioden startet. Skriv inn eller velg dato fra datovelgeren{harFlerePerioder, select, true { (periode {periodeNr})} other{}}.',
    'kursperiode.form.fom.validation.dateIsAfterMax':
        'Datoen for når perioden startet kan ikke være etter {dato}. Skriv inn eller velg dato fra datovelgeren{harFlerePerioder, select, true { (periode {periodeNr})} other{}}.',
    'kursperiode.form.fom.validation.dateIsBeforeMin':
        'Datoen for når perioden startet kan ikke være før {dato}. Skriv inn eller velg sluttdato fra datovelgeren{harFlerePerioder, select, true { (periode {periodeNr})} other{}}.',
    'kursperiode.form.fom.validation.dateHasInvalidFormat':
        'Du må oppgi dato for når perioden startet i et gyldig format. Gyldig format er dd.mm.åååå{harFlerePerioder, select, true { (periode {periodeNr})} other{}}.',
    'kursperiode.form.fom.validation.fromDateIsAfterToDate':
        'Startdatoen for perioden må være før sluttdatoen, eller på samme dag som sluttdatoen. Skriv inn eller velg dato fra datovelgeren{harFlerePerioder, select, true { (periode {periodeNr})} other{}}.',

    'kursperiode.form.tom.label': 'Til og med',
    'kursperiode.form.tom.validation.dateHasNoValue':
        'Du må oppgi når perioden sluttet. Skriv inn eller velg dato fra datovelgeren{harFlerePerioder, select, true { (periode {periodeNr})} other{}}.',
    'kursperiode.form.tom.validation.dateIsAfterMax':
        'Datoen for når perioden sluttet kan ikke være etter {dato}. Skriv inn eller velg dato fra datovelgeren{harFlerePerioder, select, true { (periode {periodeNr})} other{}}.',
    'kursperiode.form.tom.validation.dateIsBeforeMin':
        'Datoen for når perioden sluttet kan ikke være før {dato}. Skriv inn eller velg dato fra datovelgeren{harFlerePerioder, select, true { (periode {periodeNr})} other{}}.',
    'kursperiode.form.tom.validation.dateHasInvalidFormat':
        'Du må oppgi dato for når perioden sluttet i et gyldig format. Gyldig format er dd.mm.åååå{harFlerePerioder, select, true { (periode {periodeNr})} other{}}.',
    'kursperiode.form.tom.validation.toDateIsBeforeFromDate':
        'Sluttdatoen for perioden kan ikke være før startdatoen. Skriv inn eller velg dato fra datovelgeren{harFlerePerioder, select, true { (periode {periodeNr})} other{}}.',

    'kursperiode.form.avreise.validation.dateHasNoValue':
        'Du må oppgi når avreise til kurset er. Skriv inn eller velg dato fra datovelgeren{harFlerePerioder, select, true { (periode {periodeNr})} other{}}.',
    'kursperiode.form.avreise.validation.dateIsAfterMax':
        'Datoen for avreise kan ikke være etter {dato}. Skriv inn eller velg dato fra datovelgeren{harFlerePerioder, select, true { (periode {periodeNr})} other{}}.',
    'kursperiode.form.avreise.validation.dateIsBeforeMin':
        'Datoen for avreise kan ikke være før {dato}. Skriv inn eller velg dato fra datovelgeren{harFlerePerioder, select, true { (periode {periodeNr})} other{}}.',
    'kursperiode.form.avreise.validation.dateHasInvalidFormat':
        'Du må oppgi dato for avreise i et gyldig format. Gyldig format er dd.mm.åååå{harFlerePerioder, select, true { (periode {periodeNr})} other{}}.',

    'kursperiode.form.hjemkomst.validation.dateHasNoValue':
        'Du må oppgi når du kommer hjem fra kurset. Skriv inn eller velg dato fra datovelgeren{harFlerePerioder, select, true { (periode {periodeNr})} other{}}.',
    'kursperiode.form.hjemkomst.validation.dateIsAfterMax':
        'Datoen for når du kommer hjem fra kurset kan ikke være etter {dato}. Skriv inn eller velg dato fra datovelgeren{harFlerePerioder, select, true { (periode {periodeNr})} other{}}.',
    'kursperiode.form.hjemkomst.validation.dateIsBeforeMin':
        'Datoen for når du kommer hjem fra kurset kan ikke være før {dato}. Skriv inn eller velg dato fra datovelgeren{harFlerePerioder, select, true { (periode {periodeNr})} other{}}.',
    'kursperiode.form.hjemkomst.validation.dateHasInvalidFormat':
        'Du må oppgi dato for når du kommer hjem fra kurset i et gyldig format. Gyldig format er dd.mm.åååå{harFlerePerioder, select, true { (periode {periodeNr})} other{}}.',

    'kursperiode.form.harTaptArbeidstid.validation.yesOrNoIsUnanswered':
        'Du må svare på om du har tapt arbeidstid på grunn av reise til eller fra opplæringsstedet{harFlerePerioder, select, true { (periode {periodeNr})} other{}}.',

    'kursperiode.form.beskrivelseReisetid.stringHasNoValue':
        'Du må oppgi en beskrivelse av årsaken til at reisetiden er over én dag etter sluttdato{harFlerePerioder, select, true { (periode {periodeNr})} other{}}.',
    'kursperiode.form.beskrivelseReisetid.stringIsTooLong':
        'Beskrivelsen av årsaken til reisetiden kan ikke være lengre enn 500 tegn{harFlerePerioder, select, true { (periode {periodeNr})} other{}}.',
    'kursperiode.form.beskrivelseReisetid.stringIsTooShort':
        'Beskrivelsen av årsaken til reisetiden må være minst 5 tegn{harFlerePerioder, select, true { (periode {periodeNr})} other{}}.',
    'kursperiode.form.beskrivelseReisetid.stringContainsUnicodeChacters':
        'Beskrivelsen årsaken til reisetiden kan ikke inneholde spesialtegn{harFlerePerioder, select, true { (periode {periodeNr})} other{}}.',

    'kursperiode.fjern.label': 'Fjern periode {harFlerePerioder, select, true { {periodeNr}} other{}}',
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
};

export type KursperiodeMessageKeys = keyof typeof nb;

export const kursperiodeMessages = {
    nb,
    nn,
};

export const useKursperiodeIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<KursperiodeMessageKeys>(intl);
};
