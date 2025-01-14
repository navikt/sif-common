import { useEffect, useState } from 'react';
import actionsCreator from '../context/action/actionCreator';
import { useSøknadContext } from '../context/hooks/useSøknadContext';
import { relocateToWelcomePage } from '../utils/navigationUtils';

/**
 * Nullstiller søknad etter at søker har sendt inn melding
 * og navigerer bort fra kvitteringssiden.
 */

export const useResetSøknad = () => {
    const [shouldResetSøknad, setShouldResetSøknad] = useState(false);
    const { dispatch } = useSøknadContext();

    useEffect(() => {
        if (shouldResetSøknad) {
            dispatch(actionsCreator.resetSøknad());
            dispatch(actionsCreator.setIsReloadingApp());
            setTimeout(() => {
                relocateToWelcomePage();
            });
        }
    }, [shouldResetSøknad, dispatch]);

    return { setShouldResetSøknad, shouldResetSøknad };
};
