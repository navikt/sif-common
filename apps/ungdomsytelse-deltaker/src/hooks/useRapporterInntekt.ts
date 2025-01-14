import { DateRange } from '@navikt/sif-common-formik-ds';
import { useState } from 'react';
import { deltakerService } from '@api/services/deltakerService';
import { dateToISODate } from '@navikt/sif-common-utils';
import { isAxiosError } from 'axios';

export const useRapporterInntekt = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [inntektLagret, setInntektLagret] = useState(false);
    const [error, setError] = useState<string>();

    const rapporterInntekt = async (periode: DateRange, inntekt: number) => {
        setError(undefined);
        setIsSubmitting(true);
        setInntektLagret(false);
        return await deltakerService
            .rapporterInntekt({
                fraOgMed: dateToISODate(periode.from),
                tilOgMed: dateToISODate(periode.to),
                inntekt: inntekt,
            })
            .then(() => {
                setInntektLagret(true);
                return Promise.resolve();
            })
            .catch((e) => {
                if (isAxiosError(e)) {
                    setError(e.message);
                }
                setError('Det skjedde en feil ved lagring av inntekt');
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };
    return {
        isSubmitting,
        inntektLagret,
        error,
        rapporterInntekt,
        resetInntektLagret: () => setInntektLagret(false),
        resetError: () => setError(undefined),
    };
};
