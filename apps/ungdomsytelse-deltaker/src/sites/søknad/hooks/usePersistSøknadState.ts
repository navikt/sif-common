import { useEffect, useState } from 'react';
import { useSøknadContext } from '../context/hooks/useSøknadContext';
import { lagreSøknadState } from '../utils/lagreSøknadState';
import actionsCreator from '../context/action/actionCreator';

export const usePersistSøknadState = () => {
    const { dispatch, state } = useSøknadContext();
    const [pending, setPending] = useState(false);

    useEffect(() => {
        if (state.børMellomlagres) {
            setPending(true);
            lagreSøknadState(state).then(() => {
                dispatch(actionsCreator.setSøknadLagret());
                setPending(false);
            });
        }
    }, [state, dispatch]);

    return { pending };
};
