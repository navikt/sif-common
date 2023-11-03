import { Page } from '@playwright/test';
import { SøknadRoutes } from '../../../src/app/types/SøknadRoutes';
import { mellomlagring } from '../mock-data/mellomlagring';
import { setupMockRoutes } from './setupMockRoutes';

const rootUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/pleiepenger-i-livets-sluttfase/';

const getRouteUrl = (route: SøknadRoutes): string => {
    return `${rootUrl}${route}`;
};

const startOnRoute = async (page: Page, route: SøknadRoutes, søknadsdata?: any) => {
    const mellomlagringToUse = {
        ...mellomlagring,
        søknadRoute: route,
        søknadsdata: {
            ...mellomlagring.søknadsdata,
            ...søknadsdata,
        },
    };

    await setupMockRoutes(page, {
        mellomlagring: mellomlagringToUse,
    });

    await page.goto(getRouteUrl(SøknadRoutes.VELKOMMEN));
    await page.waitForURL(`**${route}`);
};

export const routeUtils = {
    startOnRoute,
    getRouteUrl,
};
