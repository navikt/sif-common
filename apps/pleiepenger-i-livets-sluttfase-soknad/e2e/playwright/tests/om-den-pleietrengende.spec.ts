import { Page, expect, test } from '@playwright/test';
import { SøknadRoutes } from '../../../src/app/types/SøknadRoutes';
import { routeUtils } from '../utils/routeUtils';
import { setNow as setNow } from '../utils/setNow';
import {
    fyllUtPleietrengendeMedFnr,
    fyllUtPleietrengendeUtenFnr,
    kontrollerPleietrengendeMedFnr,
    kontrollerPleietrengendeUtenFnr,
} from '../utfylling-utils/pleietrengendeUtfyllingUtils';

const gåTilOppsummering = async (page: Page) => {
    await page.getByRole('button', { name: 'Neste', exact: true }).click();
    await page.getByRole('button', { name: 'Neste', exact: true }).click();
    await page.getByRole('button', { name: 'Neste', exact: true }).click();
    await page.getByRole('button', { name: 'Neste', exact: true }).click();
    await page.getByRole('button', { name: 'Neste', exact: true }).click();
    await expect(page.getByRole('heading', { level: 1, name: 'Oppsummering' })).toBeVisible();
};

test.beforeEach(async ({ page }) => {
    await setNow(page);
    await routeUtils.resumeFromRoute(page, SøknadRoutes.OPPLYSNINGER_OM_PLEIETRENGENDE);
});

test('Viser riktig informasjon fra mellomlagring', async ({ page }) => {
    await expect(page).toHaveTitle('Om personen du pleier - Søknad om pleiepenger i livets sluttfase');
    await expect(page.getByRole('textbox', { name: 'Navn på den du skal pleie' })).toHaveValue('Test Testesen');
    await expect(page.getByRole('textbox', { name: 'Fødselsnummer/D-nummer' })).toHaveValue('27857798800');
    const radioNei = await page
        .getByRole('group', { name: 'Er dere flere som skal dele på pleiepengene?' })
        .getByRole('radio', { name: 'Nei' });

    await expect(radioNei).toBeChecked();
});

test('Fyll ut og kontroller person uten fødselsnummer', async ({ page }) => {
    await fyllUtPleietrengendeUtenFnr(page);
    await gåTilOppsummering(page);
    await kontrollerPleietrengendeUtenFnr(page);
});

test('Fyll ut og kontroller person med fødselsnummer', async ({ page }) => {
    await fyllUtPleietrengendeMedFnr(page);
    await gåTilOppsummering(page);
    await kontrollerPleietrengendeMedFnr(page);
});

test('Valider manglende navn', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Navn på den du skal pleie' }).fill('');
    await page.getByRole('button', { name: 'Neste' }).click();
    const errorMessages = await page.getByLabel('Feil i skjema');
    expect(await errorMessages.isVisible()).toBeTruthy();
    expect(await errorMessages.getByText('Du må skrive inn navnet til den du pleier.').isVisible()).toBeTruthy();
});
