import { DeltakerContextProvider } from '../../app/søknad/context/DeltakerContext';
import { DeltakerContextState } from '../../app/types/DeltakerContextState';
import { RegistrerteBarnMock, SøkerMock } from '../mock-data';

export const mockInitialDeltakerContextState: DeltakerContextState = {
    versjon: '1.0.0',
    søker: SøkerMock,
    registrerteBarn: RegistrerteBarnMock,
    søknadsdata: {},
    søknadRoute: undefined,
    søknadSendt: false,
    børMellomlagres: false,
};

export const withDeltakerContextProvider = (Story: any, state: Partial<DeltakerContextState> = {}) => (
    <DeltakerContextProvider initialData={{ ...mockInitialDeltakerContextState, ...state }}>
        <Story />
    </DeltakerContextProvider>
);
