import { SoknadApplicationType, SoknadStepsConfig, soknadStepUtils, StepConfig } from '@navikt/sif-common-soknad-ds';
import { Deltakelse } from '../../api/types';
import { StepId } from './types/StepId';
import { Søknadsdata } from './types/søknadsdata/Søknadsdata';
import { getSøknadStepRoute } from './utils/søknadRoutesUtils';
import { søkerMåRapportereArbeidstidISøknaden } from './utils/søknadUtils';

const getSøknadSteps = (deltakelse: Deltakelse): StepId[] => {
    if (søkerMåRapportereArbeidstidISøknaden(deltakelse)) {
        return [StepId.BARN, StepId.ARBEIDSTID, StepId.OPPSUMMERING];
    }
    return [StepId.BARN, StepId.OPPSUMMERING];
};

export const getSøknadStepConfig = (deltakelse: Deltakelse): SoknadStepsConfig<StepId> =>
    soknadStepUtils.getStepsConfig(getSøknadSteps(deltakelse), SoknadApplicationType.SOKNAD, (step) => {
        return getSøknadStepRoute(step);
    });

export const getSøknadStepConfigForStep = (_søknadsdata: Søknadsdata, stepId: StepId): StepConfig<StepId> => {
    const config = getSøknadStepConfig(_søknadsdata.deltakelse)[stepId];
    if (!config) {
        throw `Missing step config ${stepId}`;
    }
    return config;
};
