import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import actionsCreator from '../context/action/actionCreator';
import { useSøknadContext } from '../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../context/StepFormValuesContext';
import { SøknadRoutes } from '../types/SøknadRoutes';
import { relocateToRootPage } from '../utils/navigationUtils';
import { mellomlagringService } from '../../../api/services/mellomlagringService';

const useAvbrytEllerFortsettSenere = () => {
    const navigate = useNavigate();
    const { dispatch } = useSøknadContext();
    const { clearAllSteps } = useStepFormValuesContext();

    const avbrytSøknad = useCallback(async () => {
        await mellomlagringService.purge();
        clearAllSteps();
        dispatch(actionsCreator.avbrytSøknad());
        navigate(SøknadRoutes.VELKOMMEN);
    }, [navigate, clearAllSteps, dispatch]);

    const fortsettSøknadSenere = useCallback(() => {
        clearAllSteps();
        dispatch(actionsCreator.fortsettSøknadSenere());
        relocateToRootPage();
    }, [clearAllSteps, dispatch]);

    return { avbrytSøknad, fortsettSøknadSenere };
};

export default useAvbrytEllerFortsettSenere;
