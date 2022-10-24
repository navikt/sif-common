import { ArbeidFormValues } from '../../steg/arbeid/ArbeidSteg';
import { BarnFormValues } from '../../steg/barn/BarnSteg';
import { OpplæringFormValues } from '../../steg/opplæring/OpplæringSteg';
import { SøknadRoutes } from '../../../types/SøknadRoutes';

export enum SøknadContextActionKeys {
    START_SØKNAD = 'startSøknad',
    AVBRYT_SØKNAD = 'avbrytSøknad',
    FORTSETT_SØKNAD_SENERE = 'fortsettSøknadSenere',
    SET_SØKNAD_ROUTE = 'setSøknadRoute',
    SET_SØKNAD_BARN = 'setSøknadBarn',
    SET_SØKNAD_ARBEID = 'setSøknadArbeid',
    SET_SØKNAD_OPPLÆRING = 'setSøknadOpplæring',
    REQUEST_LAGRE_SØKNAD = 'requestLargeSøknad',
    SET_SØKNAD_LAGRET = 'setSøknadLagret',
}

interface StartSøknad {
    type: SøknadContextActionKeys.START_SØKNAD;
}
interface AvbrytSøknad {
    type: SøknadContextActionKeys.AVBRYT_SØKNAD;
}
interface FortsettSøknadSenere {
    type: SøknadContextActionKeys.FORTSETT_SØKNAD_SENERE;
}
interface RequestLagreSøknad {
    type: SøknadContextActionKeys.REQUEST_LAGRE_SØKNAD;
}
interface SetSøknadLagret {
    type: SøknadContextActionKeys.SET_SØKNAD_LAGRET;
}
interface SetSøknadRoute {
    type: SøknadContextActionKeys.SET_SØKNAD_ROUTE;
    payload: SøknadRoutes;
}
interface SetSøknadBarn {
    type: SøknadContextActionKeys.SET_SØKNAD_BARN;
    payload: BarnFormValues;
}
interface SetSøknadArbeid {
    type: SøknadContextActionKeys.SET_SØKNAD_ARBEID;
    payload: ArbeidFormValues;
}
interface SetSøknadOpplæring {
    type: SøknadContextActionKeys.SET_SØKNAD_OPPLÆRING;
    payload: OpplæringFormValues;
}

const startSøknad = (): StartSøknad => ({
    type: SøknadContextActionKeys.START_SØKNAD,
});

const avbrytSøknad = (): AvbrytSøknad => ({
    type: SøknadContextActionKeys.AVBRYT_SØKNAD,
});

const fortsettSøknadSenere = (): FortsettSøknadSenere => ({
    type: SøknadContextActionKeys.FORTSETT_SØKNAD_SENERE,
});

const requestLagreSøknad = (): RequestLagreSøknad => ({
    type: SøknadContextActionKeys.REQUEST_LAGRE_SØKNAD,
});

const setSøknadLagret = (): SetSøknadLagret => ({
    type: SøknadContextActionKeys.SET_SØKNAD_LAGRET,
});

const setSøknadBarn = (payload: BarnFormValues): SetSøknadBarn => ({
    type: SøknadContextActionKeys.SET_SØKNAD_BARN,
    payload,
});
const setSøknadArbeid = (payload: ArbeidFormValues): SetSøknadArbeid => ({
    type: SøknadContextActionKeys.SET_SØKNAD_ARBEID,
    payload,
});
const setSøknadOpplæring = (payload: OpplæringFormValues): SetSøknadOpplæring => ({
    type: SøknadContextActionKeys.SET_SØKNAD_OPPLÆRING,
    payload,
});
const setSøknadRoute = (payload: SøknadRoutes): SetSøknadRoute => ({
    type: SøknadContextActionKeys.SET_SØKNAD_ROUTE,
    payload,
});

export type SøknadContextAction =
    | StartSøknad
    | AvbrytSøknad
    | FortsettSøknadSenere
    | RequestLagreSøknad
    | SetSøknadLagret
    | SetSøknadBarn
    | SetSøknadOpplæring
    | SetSøknadRoute
    | SetSøknadArbeid;

const actionsCreator = {
    startSøknad,
    avbrytSøknad,
    fortsettSøknadSenere,
    requestLagreSøknad,
    setSøknadRoute,
    setSøknadBarn,
    setSøknadArbeid,
    setSøknadOpplæring,
    setSøknadLagret,
};

export default actionsCreator;
