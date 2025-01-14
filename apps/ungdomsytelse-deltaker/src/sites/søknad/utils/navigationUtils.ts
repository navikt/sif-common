import { appEnv } from '../../../utils/appEnv';
import { SøknadRoutes } from '../types/SøknadRoutes';

const { PUBLIC_PATH, SIF_PUBLIC_LOGIN_URL, SIF_PUBLIC_MINSIDE_URL } = appEnv;

const relocateTo = (url: string): void => {
    /** Hard redirect enforcing page reload */
    window.location.assign(url);
};

const getSøknadRouteURL = (route: SøknadRoutes) => {
    return `${PUBLIC_PATH}${route}`;
};

export const relocateToWelcomePage = () => {
    relocateTo(getSøknadRouteURL(SøknadRoutes.VELKOMMEN));
};
export const relocateToKvittering = () => {
    relocateTo(getSøknadRouteURL(SøknadRoutes.SØKNAD_SENDT));
};
export const relocateToNoAccessPage = (): void => relocateTo(getSøknadRouteURL(SøknadRoutes.IKKE_TILGANG));
export const relocateToLoginPage = () => relocateTo(SIF_PUBLIC_LOGIN_URL);
export const relocateToMinSide = () => relocateTo(SIF_PUBLIC_MINSIDE_URL);
export const relocateToRootPage = () => relocateTo(PUBLIC_PATH);
