import { SoknadApplicationType, SoknadStepsConfig, soknadStepUtils, StepConfig } from '@navikt/sif-common-soknad-ds';
import { ApplicationType } from '../types/ApplicationType';
import { getApplicationPageRoute } from '../utils/routeUtils';

export enum StepID {
    'BESKRIVELSE' = 'beskrivelse',
    'DOKUMENTER' = 'dokumenter',
    'OPPSUMMERING' = 'oppsummering',
    'OMS_TYPE' = 'omsorgspenger_type',
}

interface ConfigStepHelperType {
    stepID: StepID;
    included: boolean;
}

export const getFirstStep = (applicationType: ApplicationType): StepID => {
    switch (applicationType) {
        case ApplicationType.pleiepengerBarn:
        case ApplicationType.pleiepengerLivetsSluttfase:
            return StepID.BESKRIVELSE;
        case ApplicationType.omsorgspenger:
            return StepID.OMS_TYPE;
        default:
            return StepID.DOKUMENTER;
    }
};

const getSoknadSteps = (søknadstype: ApplicationType): StepID[] => {
    const visBeskrivelseStep =
        søknadstype === ApplicationType.pleiepengerBarn || søknadstype === ApplicationType.pleiepengerLivetsSluttfase;
    const visOmsTypeStep = søknadstype === ApplicationType.omsorgspenger;

    const allSteps: ConfigStepHelperType[] = [
        { stepID: StepID.BESKRIVELSE, included: visBeskrivelseStep },
        { stepID: StepID.OMS_TYPE, included: visOmsTypeStep },
        { stepID: StepID.DOKUMENTER, included: true },
        { stepID: StepID.OPPSUMMERING, included: true },
    ];

    const steps: StepID[] = allSteps.filter((step) => step.included === true).map((step) => step.stepID);

    return steps;
};

export const getSoknadStepsConfig = (søknadstype: ApplicationType): SoknadStepsConfig<StepID> => {
    const søknadStepConfig = soknadStepUtils.getStepsConfig(getSoknadSteps(søknadstype), SoknadApplicationType.MELDING);
    const updatedConfig: SoknadStepsConfig<StepID> = {};

    /** Oppdatere routes med søknadstype */
    Object.keys(søknadStepConfig).forEach((key: StepID) => {
        const config = søknadStepConfig[key] as StepConfig<StepID>;
        updatedConfig[config.id] = {
            ...config,
            route: getApplicationPageRoute(søknadstype, config.id),
            previousStepRoute: config.previousStep
                ? getApplicationPageRoute(søknadstype, config.previousStep)
                : undefined,
            nextStepRoute: config.nextStep ? getApplicationPageRoute(søknadstype, config.nextStep) : undefined,
        };
    });

    return updatedConfig;
};
