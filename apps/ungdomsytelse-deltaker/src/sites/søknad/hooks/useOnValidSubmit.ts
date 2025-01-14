import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import actionsCreator, { SøknadContextAction } from '../context/action/actionCreator';
import { SøknadContextState } from '../context/SøknadContextState';
import { useSøknadContext } from '../context/hooks/useSøknadContext';
import { getSøknadStepConfig } from '../søknadStepConfig';
import { getSøknadStepRoute } from '../utils/søknadRoutesUtils';
import { relocateToLoginPage } from '../utils/navigationUtils';
import { StepId } from '../types/StepId';

export const useOnValidSubmit = <T>(
    submitHandler: (values: T) => SøknadContextAction[],
    stepId: StepId,
    postSubmit?: (state: SøknadContextState) => Promise<any>,
) => {
    const { dispatch, state } = useSøknadContext();
    const navigate = useNavigate();
    const [hasSubmitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(undefined);

    const { nextStep } = getSøknadStepConfig(state.søknadsdata.deltakelse)[stepId];

    useEffect(() => {
        if (hasSubmitted && postSubmit) {
            postSubmit(state)
                .then(() => {
                    if (nextStep) {
                        navigate(getSøknadStepRoute(nextStep));
                    }
                })
                .catch((error) => {
                    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                        relocateToLoginPage();
                    } else {
                        setSubmitError(error);
                    }
                });
        }
    }, [hasSubmitted, navigate, nextStep, state, postSubmit]);

    useEffect(() => {
        if (submitError) {
            throw new Error(submitError);
        }
    }, [submitError]);

    const dispatchAction = (action: SøknadContextAction | undefined): void => {
        if (action) {
            dispatch(action);
        }
    };

    const handleSubmit = (values: T) => {
        setIsSubmitting(true);
        const actions = [
            nextStep === undefined || nextStep === StepId.KVITTERING
                ? undefined
                : dispatch(actionsCreator.setSøknadRoute(getSøknadStepRoute(nextStep))),
            ...submitHandler(values),
        ];
        Promise.all([...actions.map(dispatchAction)]).then(() => setSubmitted(true));
    };

    return { handleSubmit, isSubmitting };
};
