import { mellomlagringService } from '../../../api/services/mellomlagringService';
import { SøknadContextState } from '../context/SøknadContextState';

export const lagreSøknadState = (state: SøknadContextState) => {
    return mellomlagringService.update(state);
};
