import { useState } from 'react';
import { OmsorgsdagerAleneomsorgApp } from '@navikt/sif-app-register';
import { useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import { AxiosError } from 'axios';
import { sendSøknadService } from '../../../api/services/sendSøknadService';
import { SøknadApiData } from '../../../api/types';
import { useAppIntl } from '../../../i18n';
import { mellomlagringService } from '../../../api/services/mellomlagringService';
import { relocateToKvittering } from '../utils/navigationUtils';

export const useSendSøknad = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sendSøknadError, setSendSøknadError] = useState<AxiosError | undefined>();
    const { locale } = useAppIntl();

    const { logSoknadSent } = useAmplitudeInstance();

    const sendSøknad = (apiData: SøknadApiData) => {
        setIsSubmitting(true);
        sendSøknadService
            .sendSøknad(apiData)
            .then(onSøknadSendSuccess)
            .catch((error) => {
                setSendSøknadError(error);
                setIsSubmitting(false);
            });
    };

    const onSøknadSendSuccess = async () => {
        await logSoknadSent(OmsorgsdagerAleneomsorgApp.key, locale);
        await mellomlagringService.purge();
        setIsSubmitting(false);
        relocateToKvittering();
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
