import { guid } from '@navikt/sif-common-utils';
import { SøknadRoutes } from '../../types/SøknadRoutes';
import { Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { SøknadContextAction, SøknadContextActionKeys } from '../action/actionCreator';
import { SøknadContextState } from '../SøknadContextState';

export const initialSøknadsdata: Søknadsdata = {
    id: undefined,
} as any;

export const søknadReducer = (state: SøknadContextState, action: SøknadContextAction): SøknadContextState => {
    switch (action.type) {
        case SøknadContextActionKeys.START_SØKNAD:
            return {
                ...state,
                søknadsdata: {
                    id: guid(),
                    deltakelse: state.søknadsdata.deltakelse,
                    velkommen: {
                        harForståttRettigheterOgPlikter: true,
                    },
                },
                søknadRoute: SøknadRoutes.BARN,
                børMellomlagres: true,
            };
        case SøknadContextActionKeys.AVBRYT_SØKNAD:
            return {
                ...state,
                søknadsdata: initialSøknadsdata,
                søknadRoute: SøknadRoutes.VELKOMMEN,
            };
    }

    if (state.søknadsdata) {
        switch (action.type) {
            case SøknadContextActionKeys.SET_SØKNAD_ROUTE:
                return {
                    ...state,
                    søknadRoute: action.payload,
                };
            case SøknadContextActionKeys.REQUEST_LAGRE_SØKNAD:
                return {
                    ...state,
                    børMellomlagres: true,
                };
            case SøknadContextActionKeys.SET_SØKNAD_LAGRET:
                return {
                    ...state,
                    børMellomlagres: false,
                };
            case SøknadContextActionKeys.SET_SØKNAD_BARN: {
                const søknadsdata: Søknadsdata = {
                    ...state.søknadsdata,
                    barn: {
                        ...action.payload,
                    },
                };

                return {
                    ...state,
                    søknadsdata,
                };
            }

            case SøknadContextActionKeys.SET_SØKNAD_ARBEIDSTID:
                return {
                    ...state,
                    søknadsdata: {
                        ...state.søknadsdata,
                        arbeidstid: {
                            ...action.payload,
                        },
                    },
                };

            case SøknadContextActionKeys.SET_SØKNAD_HAR_BEKREFTET_OPPLYSNINGER:
                return {
                    ...state,
                    søknadsdata: {
                        ...state.søknadsdata,
                        oppsummering: {
                            harBekreftetOpplysninger: action.payload.harBekreftetOpplysninger,
                        },
                    },
                };
            case SøknadContextActionKeys.SET_SØKNAD_SENDT:
                return {
                    ...state,
                    børMellomlagres: false,
                    søknadsdata: initialSøknadsdata,
                    søknadRoute: SøknadRoutes.SØKNAD_SENDT,
                    søknadSendt: true,
                };
            case SøknadContextActionKeys.RESET_SØKNAD:
                return {
                    ...state,
                    børMellomlagres: false,
                    søknadsdata: initialSøknadsdata,
                    søknadSendt: false,
                    søknadRoute: SøknadRoutes.VELKOMMEN,
                };
            case SøknadContextActionKeys.FORTSETT_SØKNAD_SENERE:
                return {
                    ...state,
                    børMellomlagres: true,
                };
            case SøknadContextActionKeys.SET_IS_RELOADING_APP:
                return {
                    ...state,
                    isReloadingApp: true,
                };
        }
    }
    return state;
};
