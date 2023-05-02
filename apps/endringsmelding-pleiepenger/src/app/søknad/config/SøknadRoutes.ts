import { StepId } from './StepId';

export const getSøknadStepRoute = (stepId: StepId): SøknadRoutes => {
    switch (stepId) {
        case StepId.VELKOMMEN:
            return SøknadRoutes.VELKOMMEN;
        case StepId.ARBEIDSSITUASJON:
            return SøknadRoutes.ARBEIDSSITUASJON;
        case StepId.ARBEIDSTID:
            return SøknadRoutes.ARBEIDSTID;
        case StepId.LOVBESTEMT_FERIE:
            return SøknadRoutes.LOVBESTEMT_FERIE;
        case StepId.OPPSUMMERING:
            return SøknadRoutes.OPPSUMMERING;
        case StepId.MELDING_SENDT:
            return SøknadRoutes.SØKNAD_SENDT;
    }
};

export const SøknadStepRoute = {
    [StepId.VELKOMMEN]: 'velkommen',
    [StepId.ARBEIDSSITUASJON]: 'arbeidssituasjon',
    [StepId.ARBEIDSTID]: 'arbeidstid',
    [StepId.LOVBESTEMT_FERIE]: 'lovbestemt-ferie',
    [StepId.OPPSUMMERING]: 'oppsummering',
    [StepId.MELDING_SENDT]: 'melding_sendt',
};

export enum SøknadRoutes {
    APP_ROOT = '/',
    INNLOGGET_ROOT = '/melding/*',
    VELKOMMEN = '/melding/velkommen',
    ARBEIDSSITUASJON = '/melding/arbeidssituasjon',
    ARBEIDSTID = '/melding/arbeidstid',
    LOVBESTEMT_FERIE = '/melding/lovbestemt-ferie',
    OPPSUMMERING = '/melding/oppsummering',
    SØKNAD_SENDT = '/melding/melding_sendt',
    UKJENT_STEG = '/melding/ukjent-steg',
    IKKE_TILGANG = '/melding/ikke-tilgang',
}
