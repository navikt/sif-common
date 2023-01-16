import { getArbeidsukerPerÅr, getUkerSomEndresTekst } from '../endreArbeidstidFormUtils';
import { arbeidsukerMockData } from '../../../../../mocks/data/app/arbeidsukerMockData';

const { arbeidsukerEttÅr, arbeidsukerFlereÅr } = arbeidsukerMockData;

describe('getArbeidsukerPerÅr', () => {
    it('fordeler sorterte uker på riktig år', () => {
        const ukerOgÅr = getArbeidsukerPerÅr(arbeidsukerFlereÅr);
        expect(Object.keys(ukerOgÅr).length).toEqual(2);
        expect(ukerOgÅr[2022].length).toEqual(5);
        expect(ukerOgÅr[2023].length).toEqual(1);
        expect(ukerOgÅr[2022][0].isoDateRange).toEqual('2022-11-03/2022-11-04');
        expect(ukerOgÅr[2022][1].isoDateRange).toEqual('2022-11-07/2022-11-11');
        expect(ukerOgÅr[2022][2].isoDateRange).toEqual('2022-11-14/2022-11-18');
        expect(ukerOgÅr[2022][3].isoDateRange).toEqual('2022-11-21/2022-11-25');
        expect(ukerOgÅr[2022][4].isoDateRange).toEqual('2022-11-28/2022-11-30');
    });
});

describe('getUkerSomEndresTekst', () => {
    it('returnerer riktig når det er kun ett år', () => {
        const tekst = getUkerSomEndresTekst(arbeidsukerEttÅr);
        expect(tekst).toEqual('ett år');
    });
    it('returnerer riktig når det er flere år', () => {
        const tekst = getUkerSomEndresTekst(arbeidsukerFlereÅr);
        expect(tekst).toEqual('flere år');
    });
});
