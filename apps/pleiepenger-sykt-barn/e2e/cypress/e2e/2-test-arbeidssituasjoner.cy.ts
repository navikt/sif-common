import { contextConfig } from '../integration-utils/contextConfig';
import { mellomlagring } from '../integration-utils/mocks/mellomlagring';
import { testArbeidssituasjonAnsatt } from '../integration-utils/steps/arbeidssituasjon/ansatt';
import { testArbeidssituasjonFrilanser } from '../integration-utils/steps/arbeidssituasjon/frilanser';
import { testArbeidssituasjonOpptjeningUtland } from '../integration-utils/steps/arbeidssituasjon/opptjeningUtland';
import { testArbeidssituasjonSN } from '../integration-utils/steps/arbeidssituasjon/selvstendigNæringsdrivende';
import { testArbeidssituasjonUtenlandskNæring } from '../integration-utils/steps/arbeidssituasjon/utenlandskNæring';

describe('Arbeidssituasjoner', () => {
    contextConfig({ mellomlagring, step: 'arbeidssituasjon' });

    testArbeidssituasjonAnsatt();
    testArbeidssituasjonFrilanser();
    testArbeidssituasjonSN();
    testArbeidssituasjonUtenlandskNæring();
    testArbeidssituasjonOpptjeningUtland();
});
