import 'cypress-axe';
import { ISODateToDate, dateFormatter } from '@navikt/sif-common-utils';
import {
    checkCheckbuttonByName,
    getInputByName,
    getTestElement,
    getTestElementByType,
    selectRadioYesOrNo,
    setInputByNameValue,
    submitSkjema,
} from '.';
import { cyApiMockData } from '../data/cyApiMockData';

const fileName = 'navlogopng.png';

interface BarnOgDeltBostedProps {
    deltBosted: boolean;
    harRegistrertBarn: boolean;
}

const startSøknad = () => {
    it('Starter søknad', () => {
        cy.wait(['@getSøker', '@getBarn']);
        cy.get('h1').contains('Hei PRESENTABEL', { timeout: 10000 }).should('be.visible');
        cy.injectAxe();
        cy.checkA11y();
        getTestElement('bekreft-label').click();
        getTestElement('typedFormikForm-submitButton').click();
        cy.wait('@putMellomlagring');
    });
};

const fyllUtOmBarn = (props: BarnOgDeltBostedProps) => {
    it('Fyller ut om barnet', () => {
        cy.injectAxe();
        getTestElement('barn-2811762539343').click();
        selectRadioYesOrNo('sammeAdresse', props.deltBosted);
        selectRadioYesOrNo('kroniskEllerFunksjonshemming', true);
        cy.checkA11y();
        submitSkjema();
    });
};

const fyllUtOmAnnetBarn = (props: BarnOgDeltBostedProps) => {
    it('Fyller ut om barnet - annet barn', () => {
        cy.injectAxe();
        if (props.harRegistrertBarn) {
            checkCheckbuttonByName('søknadenGjelderEtAnnetBarn');
        }
        setInputByNameValue('barnetsFødselsnummer', cyApiMockData.barnMock.barn[0].fødselsnummer);
        setInputByNameValue('barnetsNavn', cyApiMockData.barnMock.barn[0].fornavn);
        setInputByNameValue('barnetsFødselsdato', cyApiMockData.barnMock.barn[0].fødselsdato);
        getInputByName('søkersRelasjonTilBarnet').select('mor');
        selectRadioYesOrNo('sammeAdresse', props.deltBosted);
        selectRadioYesOrNo('kroniskEllerFunksjonshemming', true);
        cy.checkA11y();
        submitSkjema();
    });
};

const lastOppLegeerklæring = () => {
    it('laster opp legeerklæring', () => {
        cy.fixture(fileName, 'binary')
            .then(Cypress.Blob.binaryStringToBlob)
            .then((fileContent) =>
                (getTestElementByType('file') as any).attachFile({
                    fileContent,
                    fileName,
                    mimeType: 'image/png',
                    encoding: 'utf8',
                }),
            );
        cy.wait(200);
        getTestElement('legeerklæring-liste').find('.attachmentListElement').should('have.length', 1);
        submitSkjema();
    });
};
const lastOppSamværsavtale = () => {
    it('laster opp samværsavtale', () => {
        cy.fixture(fileName, 'binary')
            .then(Cypress.Blob.binaryStringToBlob)
            .then((fileContent) =>
                (getTestElementByType('file') as any).attachFile({
                    fileContent,
                    fileName,
                    mimeType: 'image/png',
                    encoding: 'utf8',
                }),
            );
        cy.wait(200);
        getTestElement('samværsavtale-liste').find('.attachmentListElement').should('have.length', 1);
        submitSkjema();
    });
};

const kontrollerOppsummering = (props: BarnOgDeltBostedProps) => {
    it('har riktig oppsummering - enkel', () => {
        cy.injectAxe();
        const oppsummering = getTestElement('oppsummering');
        oppsummering.should('contain', cyApiMockData.søkerMock.fornavn);
        oppsummering.should('contain', cyApiMockData.søkerMock.fødselsnummer);
        if (props.harRegistrertBarn === false) {
            oppsummering.should('contain', cyApiMockData.barnMock.barn[0].fødselsnummer);
            oppsummering.should('contain', cyApiMockData.barnMock.barn[0].fornavn);
        }
        oppsummering.should('contain', dateFormatter.full(ISODateToDate(cyApiMockData.barnMock.barn[0].fødselsdato)));
        getTestElement('legeerklæring-liste').find('.attachmentListElement').should('have.length', 1);
        if (props.deltBosted === false) {
            getTestElement('samværsavtale-liste').find('.attachmentListElement').should('have.length', 1);
        }
        cy.checkA11y();
    });
};
const sendInnSøknad = () => {
    it('Sender inn søknad', () => {
        cy.injectAxe();
        getTestElement('bekreft-label').click();
        cy.checkA11y();
        getTestElement('typedFormikForm-submitButton').click();
        cy.wait('@innsending');
    });
};
const kontrollerKvittering = () => {
    it('Inneholder søknad mottatt tekst', () => {
        cy.injectAxe();
        const el = getTestElement('kvittering-page');
        el.should('contain', 'Vi har mottatt søknad om ekstra omsorgsdager');
        cy.checkA11y();
    });
};

export const utfyllingUtils = {
    startSøknad,
    fyllUtOmBarn,
    fyllUtOmAnnetBarn,
    lastOppLegeerklæring,
    lastOppSamværsavtale,
    sendInnSøknad,
    kontrollerOppsummering,
    kontrollerKvittering,
};
