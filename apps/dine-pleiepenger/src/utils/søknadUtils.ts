import { Søknad, Søknadstype } from '../types/Søknad';

export const getSøknadMottattDato = (søknad: Søknad): Date | string => {
    switch (søknad.søknadstype) {
        case Søknadstype.PP_SYKT_BARN:
        case Søknadstype.PP_ETTERSENDING:
            return søknad.søknad.mottatt;
        case Søknadstype.PP_SYKT_BARN_ENDRINGSMELDING:
            return søknad.opprettet;
    }
};
