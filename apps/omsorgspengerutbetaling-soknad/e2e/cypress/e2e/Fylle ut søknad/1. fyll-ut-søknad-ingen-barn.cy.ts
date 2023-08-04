import { contextConfig } from '../contextConfig';
import { utfyllingUtils } from '../utils/utfyllingUtils';
import { cyApiMockData } from '../data/cyApiMockData';
import { fyllUtMedlemskapSteg } from '../utils/medlemskap';
import { fyllUtLegeerklæringSteg } from '../utils/legeerklæring';
import { kontrollerOppsummering } from '../utils/oppsummering';
const {
    startSøknad,
    fyllUtOmBarnMinstEttYngre13år,
    fyllUtFraværSteg,
    fyllerUtArbeidssituasjonSteg,
    fyllerUtFraværFraSteg,
    sendInnSøknad,
    kontrollerKvittering,
} = utfyllingUtils;

const startUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/omsorgspenger/soknad/velkommen';

describe('Fylle ut søknad med registrert barn som yngre 13 år', () => {
    const barn = cyApiMockData.barnMock.barn[4];
    contextConfig({ barn: [barn] });

    describe('Med registrerte barn', () => {
        before(() => {
            cy.visit(startUrl);
        });
        startSøknad();
        fyllUtOmBarnMinstEttYngre13år();
        fyllUtFraværSteg();
        fyllUtLegeerklæringSteg('komplett');
        fyllerUtArbeidssituasjonSteg();
        fyllerUtFraværFraSteg();
        fyllUtMedlemskapSteg('komplett');
        kontrollerOppsummering('komplett');
        sendInnSøknad();
        kontrollerKvittering();
    });
});
