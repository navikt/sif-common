import { Page, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright'; // 1

const startUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/ettersending';

const velgYtelsePleiepenger = async (page: Page) => {
    await page.goto(startUrl);
    await page.getByText('Pleiepenger for sykt barn').click();
    await page.getByTestId('typedFormikForm-submitButton').click();
};

const startSøknad = async (page: Page) => {
    // const intro = page.locator('.navds-guide-panel__content');
    // await expect(intro).toContainText('Hei');
    await page.getByTestId('bekreft-label').click();
    await page.getByTestId('typedFormikForm-submitButton').click();
};

const fyllUtBeskrivelseSteg = async (page: Page) => {
    await page.getByRole('heading', { name: 'Ettersendelse av dokumentasjon' });
    await page.getByTestId('beskrivelse').fill('Her er en kommentar');
    await page.getByTestId('typedFormikForm-submitButton').click();
};

const fyllUtDokumenterSteg = async (page: Page) => {
    await page.getByRole('heading', { name: 'Nå skal du laste opp dokumentene dine' });

    const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        await page.locator('#dokumenter-input').dispatchEvent('click'),
    ]);
    await fileChooser.setFiles('./e2e/playwright/files/navlogopng.png');
    const listItems = await page.locator('.attachmentListElement');
    expect(listItems).toHaveCount(1);
    await page.getByTestId('typedFormikForm-submitButton').click();
};

const kontrollerOppsummering = async (page: Page) => {
    const heading = await page.getByRole('heading', { name: 'Oppsummering' });
    expect(heading).toHaveCount(1);
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
};
const sendInnDokumenter = async (page: Page) => {
    await page.getByTestId('bekreft-label').click();
    await page.getByTestId('typedFormikForm-submitButton').click();
};

const kontrollerKvittering = async (page: Page) => {
    const page1Promise = page.waitForEvent('popup');
    const heading = await page.getByRole('heading', { name: 'Vi har mottatt ettersendingen av dokumenter' });
    expect(heading).toHaveCount(1);
    await page.getByRole('link', { name: 'Dine pleiepenger' }).click();
    await page1Promise;
};

export const utfyllingUtils = {
    velgYtelsePleiepenger,
    startSøknad,
    fyllUtBeskrivelseSteg,
    fyllUtDokumenterSteg,
    kontrollerOppsummering,
    sendInnDokumenter,
    kontrollerKvittering,
};
