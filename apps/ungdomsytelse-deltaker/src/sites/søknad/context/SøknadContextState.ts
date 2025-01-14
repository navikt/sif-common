import { RegistrertBarn, Søker } from '@navikt/sif-common-api';
import { Søknadsdata } from '../types/søknadsdata/Søknadsdata';
import { SøknadRoutes } from '../types/SøknadRoutes';

export interface SøknadContextState {
    versjon: string;
    søker: Søker;
    registrerteBarn: RegistrertBarn[];
    søknadsdata: Søknadsdata;
    søknadRoute?: SøknadRoutes;
    søknadSendt?: boolean;
    børMellomlagres?: boolean;
    isReloadingApp?: boolean;
}
