import { getCommonEnv, getRequiredEnv } from '@navikt/sif-common-env';

export const getAppEnv = () => ({
    ...getCommonEnv(),
    INNSYN_PP: getRequiredEnv('INNSYN_PP'),
    PLEIEPENGER_SYKT_BARN_URL: getRequiredEnv('PLEIEPENGER_SYKT_BARN_URL'),
    ENDRINGSMELDING_PP: getRequiredEnv('ENDRINGSMELDING_PP'),
});

export const appEnv = getAppEnv();
