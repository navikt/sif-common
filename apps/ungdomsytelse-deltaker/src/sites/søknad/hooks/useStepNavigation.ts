import { useNavigate } from 'react-router-dom';
import { StepConfig } from '@navikt/sif-common-soknad-ds';
import { StepId } from '../types/StepId';
import { getSøknadStepRoute } from '../utils/søknadRoutesUtils';
import { useSøknadContext } from '../context/hooks/useSøknadContext';
import actionsCreator from '../context/action/actionCreator';

/** Bør nok brukes med måte, i og med en denne ikke vil submitte skjema og oppdatere søknadsdata */

export const useStepNavigation = (step?: StepConfig<StepId>) => {
    const { dispatch } = useSøknadContext();
    const navigate = useNavigate();

    const gotoStep = (stepId: StepId) => {
        const route = getSøknadStepRoute(stepId);
        dispatch(actionsCreator.setSøknadRoute(route));
        dispatch(actionsCreator.requestLagreSøknad());
        setTimeout(() => {
            navigate(route);
        });
    };

    const goToPreviousStep = () => {
        if (step?.previousStep) {
            gotoStep(step?.previousStep);
        }
    };

    const goToNextStep = () => {
        if (step?.nextStep) {
            if (step?.previousStep) {
                gotoStep(step?.nextStep);
            }
        }
    };

    return {
        goBack: step?.previousStep ? goToPreviousStep : undefined,
        goNext: step?.nextStep ? goToNextStep : undefined,
    };
};
