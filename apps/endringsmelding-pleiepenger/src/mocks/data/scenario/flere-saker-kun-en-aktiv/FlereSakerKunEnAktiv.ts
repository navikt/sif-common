import { ScenarioData } from '../../../msw/handlers';

import arbeidsgiver from './arbeidsgiver-mock.json';
import sak from './sak-mock.json';
import søker from './søker-mock.json';

export const FlereSakerKunEnAktiv: ScenarioData = {
    sak,
    arbeidsgiver,
    søker,
};
