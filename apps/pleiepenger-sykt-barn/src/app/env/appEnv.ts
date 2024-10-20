import { commonEnv, getRequiredEnv, getSifInnsynBrowserEnv } from '@navikt/sif-common-env';
import { AppEnv } from '../../../env.schema';

const getAppEnv = (): AppEnv => ({
    ...commonEnv,
    ...getSifInnsynBrowserEnv(),
    SIF_PUBLIC_INNSYN_URL: getRequiredEnv('SIF_PUBLIC_INNSYN_URL'),
});

export const appEnv = getAppEnv();
