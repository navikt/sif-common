import { contextConfig } from '../integration-utils/contextConfig';
import { testArbeidssituasjonAnsatt } from '../integration-utils/steps/arbeidssituasjon/ansatt';
import { testArbeidssituasjonFrilanser } from '../integration-utils/steps/arbeidssituasjon/frilanser';
import { mellomlagring } from '../integration-utils/mocks/mellomlagring';
import { testArbeidssituasjonSN } from '../integration-utils/steps/arbeidssituasjon/selvstendigNæringsdrivende';
import { testArbeidssituasjonUtenlandskNæring } from '../integration-utils/steps/arbeidssituasjon/utenlandskNæring';
import { testArbeidssituasjonOpptjeningUtland } from '../integration-utils/steps/arbeidssituasjon/opptjeningUtland';

describe('Arbeidssituasjoner', () => {
    contextConfig({ mellomlagring, step: 'arbeidssituasjon' });
    context('Starter med mellomlagring og fyller ut arbeidssituasjon', () => {
        it('henter mellomlagring og annen info', () => {
            cy.wait(['@getMellomlagring', '@getSøker', '@getBarn']);
        });
        testArbeidssituasjonAnsatt();
        testArbeidssituasjonFrilanser();
        testArbeidssituasjonSN();
        testArbeidssituasjonUtenlandskNæring();
        testArbeidssituasjonOpptjeningUtland();
    });
});
