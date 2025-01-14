import { useState } from 'react';
import isEqual from 'react-fast-compare';
import { RegistrertBarn } from '@navikt/sif-common-api';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { SoknadStepsConfig } from '@navikt/sif-common-soknad-ds';
import { useSøknadContext } from '../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../context/StepFormValuesContext';
import { ArbeidstidFormValues } from '../steps/arbeidstid-step/ArbeidstidStep';
import { getArbeidstidSøknadsdataFromFormValues } from '../steps/arbeidstid-step/arbeidstidStepUtils';
import { getBarnSøknadsdataFromFormValues } from '../steps/barn-step/barnStepUtils';
import { StepFormValues } from '../types/StepFormValues';
import { StepId } from '../types/StepId';
import { Søknadsdata } from '../types/søknadsdata/Søknadsdata';

const getPrecedingSteps = (currentStepIndex: number, stepConfig: SoknadStepsConfig<StepId>): StepId[] => {
    return Object.keys(stepConfig).filter((_key, idx) => idx < currentStepIndex) as StepId[];
};

const getStepSøknadsdataFromStepFormValues = (
    step: StepId,
    stepFormValues: StepFormValues,
    registrertBarn: RegistrertBarn[],
) => {
    const formValues = stepFormValues[step];
    if (!formValues) {
        return undefined;
    }
    switch (step) {
        case StepId.BARN:
            return getBarnSøknadsdataFromFormValues(registrertBarn);
        case StepId.ARBEIDSTID:
            return getArbeidstidSøknadsdataFromFormValues(formValues as ArbeidstidFormValues);
    }
    return undefined;
};

export const isStepFormValuesAndStepSøknadsdataValid = (
    step: StepId,
    stepFormValues: StepFormValues,
    søknadsdata: Søknadsdata,
    registrertBarn: RegistrertBarn[],
): boolean => {
    if (stepFormValues[step]) {
        const stepSøknadsdata = søknadsdata[step];
        const tempSøknadsdata = getStepSøknadsdataFromStepFormValues(step, stepFormValues, registrertBarn);
        if (!stepSøknadsdata || !isEqual(tempSøknadsdata, stepSøknadsdata)) {
            return false;
        }
    }
    return true;
};

export const useSøknadsdataStatus = (stepId: StepId, stepConfig: SoknadStepsConfig<StepId>) => {
    const [invalidSteps, setInvalidSteps] = useState<StepId[]>([]);

    const {
        state: { søknadsdata, registrerteBarn: registrertBarn },
    } = useSøknadContext();

    const { stepFormValues } = useStepFormValuesContext();

    useEffectOnce(() => {
        const currentStep = stepConfig[stepId];
        const ip = <StepId[]>[];
        const precedingSteps = getPrecedingSteps(currentStep.index, stepConfig);

        precedingSteps.forEach((step) => {
            if (isStepFormValuesAndStepSøknadsdataValid(step, stepFormValues, søknadsdata, registrertBarn) === false) {
                ip.push(step);
            }
        });

        setInvalidSteps(ip);
    });

    return { invalidSteps, hasInvalidSteps: invalidSteps.length > 0 };
};
