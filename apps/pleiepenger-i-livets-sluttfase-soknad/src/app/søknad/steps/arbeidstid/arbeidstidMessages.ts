const nb = {
    'arbeidIPeriode.StepInfo.1':
        'Du har fortalt oss at du skal jobbe noe de dagene du skal gi pleie. Så, nå må du legge inn i kalenderen hvor mye du skal jobbe.',
    'arbeidIPeriode.arbeidstaker.kontaktArbeidsgiver.info':
        'Vi kontakter arbeidsgiveren din hvis vi trenger inntektsmelding for å behandle søknaden.',
    'arbeidIPeriode.FrilansLabel': 'Frilans',
    'arbeidIPeriode.SNLabel': 'Selvstendig næringsdrivende',
    'arbeidIPeriode.jobberIPerioden.spm': 'I dagene du søker for, hvilken situasjon gjelder for deg {hvor}?',
    'arbeidIPeriode.enkeltdager_gruppe.legend': 'Oppgi hvor mye du jobber {hvor} i de dagene du søker pleiepenger for.',
    'arbeidIPeriode.jobberIPerioden.jobberIkke': 'Jeg jobber ikke noe de dagene jeg pleier',
    'arbeidIPeriode.jobberIPerioden.jobberVanlig': 'Jeg jobber som normalt, og har ikke fravær',
    'arbeidIPeriode.jobberIPerioden.jobberRedusert': 'Jeg kombinerer delvis jobb med pleiepenger',
    'arbeidIPeriode.iDag.utledet': 'timer i uka',
    'arbeidIPeriode.prosent.utledet.medTimer': 'prosent av {timerNormalt} ({timerRedusert} per dag)',
    'arbeidIPeriode.arbeidstidSted.frilansoppdrag': 'Frilansoppdrag',
    'arbeidIPeriode.arbeidstidSted.sn': 'Selvstendig næringsdrivende',

    'arbeidIPeriode.validation.timerDag.timeHasNoValue': 'Du må fylle ut timer og minutter for {dato} {hvor}.',
    'arbeidIPeriode.validation.timerDag.hoursAreInvalid': 'Antall timer på {dato} er ikke et gyldig tall.',
    'arbeidIPeriode.validation.timerDag.minutesAreInvalid': 'Antall minutter på {dato} er ikke et gyldig tall.',
    'arbeidIPeriode.validation.timerDag.tooManyHours': 'Antall timer på {dato} kan ikke overstige 24 timer.',
    'arbeidIPeriode.validation.timerDag.tooManyMinutes': 'Antall minutter på {dato}  kan ikke overstige 59 minutter.',
    'arbeidIPeriode.validation.timerDag.durationIsTooLong':
        'Antall timer og minutter registrert {dato} er for høyt. Tiden kan ikke overstige 24 timer hver ukedag.',
    'arbeidIPeriode.validation.timerDag.durationIsTooShort':
        'Antall timer og minutter {dato}  kan ikke være mindre enn 0 timer og 0 minutter.',
    'arbeidIPeriode.validation.timerDag.minutesAreNegative':
        'Antall timer og minutter {dato}  kan ikke være mindre enn 0 timer og 0 minutter.',
    'arbeidIPeriode.validation.timerDag.hoursAreNegative':
        'Antall timer og minutter {dato}  kan ikke være mindre enn 0 timer og 0 minutter.',
    'arbeidIPeriode.validation.ingenTidRegistrert':
        'Du har ikke oppgitt noe tid med jobb {hvor} på dagene du har søkt om. Hvis dette stemmer, skal du velge "Jeg jobber ikke " på spørsmålet ovenfor.',
};

const nn: Record<keyof typeof nb, string> = {
    'arbeidIPeriode.StepInfo.1':
        'Du har fortalt oss at du skal jobbe noko dei dagane du skal gi pleie. No må du leggje inn i kalenderen kor mykje du skal jobbe.',
    'arbeidIPeriode.arbeidstaker.kontaktArbeidsgiver.info':
        'Vi kontaktar arbeidsgivaren din viss vi treng inntektsmelding for å handsame søknaden.',
    'arbeidIPeriode.FrilansLabel': 'Frilans',
    'arbeidIPeriode.SNLabel': 'Sjølvstendig næringsdrivande',
    'arbeidIPeriode.jobberIPerioden.spm': 'I dagane du søkjer for, kva situasjon gjeld for deg {hvor}?',
    'arbeidIPeriode.enkeltdager_gruppe.legend':
        'Oppgi kor mykje du jobbar {hvor} i dei dagane du søkjer pleiepengar for.',
    'arbeidIPeriode.jobberIPerioden.jobberIkke': 'Eg jobbar ikkje noko dei dagane eg pleier',
    'arbeidIPeriode.jobberIPerioden.jobberVanlig': 'Eg jobbar som normalt, og har ikkje fråvær',
    'arbeidIPeriode.jobberIPerioden.jobberRedusert': 'Eg kombinerer delvis jobb med pleiepengar',
    'arbeidIPeriode.iDag.utledet': 'timar i veka',
    'arbeidIPeriode.prosent.utledet.medTimer': 'prosent av {timerNormalt} ({timerRedusert} per dag)',
    'arbeidIPeriode.arbeidstidSted.frilansoppdrag': 'Frilansoppdrag',
    'arbeidIPeriode.arbeidstidSted.sn': 'Sjølvstendig næringsdrivande',

    'arbeidIPeriode.validation.timerDag.timeHasNoValue': 'Du må fylle ut timar og minutt for {dato} {hvor}.',
    'arbeidIPeriode.validation.timerDag.hoursAreInvalid': 'Tal på timar for {dato} er ikkje eit gyldig tal.',
    'arbeidIPeriode.validation.timerDag.minutesAreInvalid': 'Tal på minutt for {dato} er ikkje eit gyldig tal.',
    'arbeidIPeriode.validation.timerDag.tooManyHours': 'Tal på timar for {dato} kan ikkje overstige 24 timar.',
    'arbeidIPeriode.validation.timerDag.tooManyMinutes': 'Tal på minutt for {dato} kan ikkje overstige 59 minutt.',
    'arbeidIPeriode.validation.timerDag.durationIsTooLong':
        'Tal på timar og minutt registrert for {dato} er for høgt. Tida kan ikkje overstige 24 timar kvar vekedag.',
    'arbeidIPeriode.validation.timerDag.durationIsTooShort':
        'Tal på timar og minutt for {dato} kan ikkje vere mindre enn 0 timar og 0 minutt.',
    'arbeidIPeriode.validation.timerDag.minutesAreNegative':
        'Tal på timar og minutt for {dato} kan ikkje vere mindre enn 0 timar og 0 minutt.',
    'arbeidIPeriode.validation.timerDag.hoursAreNegative':
        'Tal på timar og minutt for {dato} kan ikkje vere mindre enn 0 timar og 0 minutt.',
    'arbeidIPeriode.validation.ingenTidRegistrert':
        "Du har ikkje oppgitt noko tid med jobb {hvor} på dagane du har søkt om. Dersom dette stemmer, skal du velje 'Eg jobbar ikkje' på spørsmålet ovanfor.",
};

export const arbeidstidMessages = { nb, nn };
