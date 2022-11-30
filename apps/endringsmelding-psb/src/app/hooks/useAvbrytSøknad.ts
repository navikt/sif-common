import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import actionsCreator from '../søknad/context/action/actionCreator';
import { useMellomlagring } from './useMellomlagring';

const useAvbrytEllerFortsettSenere = () => {
    const navigate = useNavigate();
    const { dispatch } = useSøknadContext();
    const { slettMellomlagring } = useMellomlagring();

    const avbrytSøknad = useCallback(() => {
        dispatch(actionsCreator.avbrytSøknad());
        slettMellomlagring();
        setTimeout(() => {
            navigate('/');
        });
    }, [navigate, slettMellomlagring, dispatch]);

    const fortsettSøknadSenere = useCallback(() => {
        dispatch(actionsCreator.fortsettSøknadSenere());
        navigate('/');
    }, [navigate, dispatch]);

    return { avbrytSøknad, fortsettSøknadSenere };
};

export default useAvbrytEllerFortsettSenere;
