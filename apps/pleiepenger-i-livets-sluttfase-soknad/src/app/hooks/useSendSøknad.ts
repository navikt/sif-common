import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAmplitudeInstance } from '@navikt/sif-common-amplitude/lib';
import { AxiosError } from 'axios';
import { SKJEMANAVN } from '../App';
import { useMellomlagring } from '../hooks/useMellomlagring';
import actionsCreator from '../søknad/context/action/actionCreator';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { SøknadRoutes } from '../types/SøknadRoutes';
import { SøknadApiData } from '../types/søknadApiData/SøknadApiData';
import søknadEndpoint from '../api/endpoints/søknadEndpoint';

export const useSendSøknad = () => {
    const { dispatch } = useSøknadContext();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sendSøknadError, setSendSøknadError] = useState<AxiosError | undefined>();
    const { slettMellomlagring } = useMellomlagring();
    const navigateTo = useNavigate();

    const { logSoknadSent } = useAmplitudeInstance();

    const sendSøknad = (apiData: SøknadApiData) => {
        setIsSubmitting(true);
        søknadEndpoint
            .send(apiData)
            .then(onSøknadSendSuccess)
            .catch((error) => {
                setSendSøknadError(error);
                setIsSubmitting(false);
            });
    };

    const onSøknadSendSuccess = async () => {
        await logSoknadSent(SKJEMANAVN);
        slettMellomlagring();
        setIsSubmitting(false);
        dispatch(actionsCreator.setSøknadSendt());
        navigateTo(SøknadRoutes.SØKNAD_SENDT);
    };

    const resetSendSøknad = () => {
        setIsSubmitting(false);
        setSendSøknadError(undefined);
    };

    return {
        resetSendSøknad,
        sendSøknad,
        isSubmitting,
        sendSøknadError,
    };
};
