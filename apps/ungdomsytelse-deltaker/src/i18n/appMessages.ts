import { velkommenPageMessages } from '../sites/søknad/pages/velkommen/velkommenPageMessages';
import { oppsummeringMessages } from '../sites/søknad/steps/oppsummering-step/oppsummeringMessages';
import { validateApiDataMessages } from '../sites/søknad/utils/søknadsdataToApiData/validateApiData';
import { søknadMessages } from '../sites/søknad/i18n';
import { kvitteringMessages } from '../sites/søknad/pages/kvittering/kvitteringMesssages';

const nb = {
    ...velkommenPageMessages.nb,
    ...oppsummeringMessages.nb,
    ...validateApiDataMessages.nb,
    ...søknadMessages.nb,
    ...kvitteringMessages.nb,
    'application.title': 'Søknad om deltakelse i ungdomsprogrammet',
    'søknad.harBekreftetOpplysninger.noValue': 'Du må bekrefte at du vil være med i ungdomsprogrammet for perioden.',
};

export const appMessages = {
    nb,
    nn: nb,
};
