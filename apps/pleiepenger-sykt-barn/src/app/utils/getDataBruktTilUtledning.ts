import {
    ArbeidsforholdAvsluttetFørSøknadsperiode,
    DataBruktTilUtledningAnnetData,
} from '../types/søknad-api-data/SøknadApiData';
import { ArbeidssituasjonAnsattSøknadsdata } from '../types/søknadsdata/ArbeidssituasjonAnsattSøknadsdata';
import { Søknadsdata } from '../types/søknadsdata/Søknadsdata';

export const getArbeidsforhorholdAvsluttetFørSøknadsperiode = (
    ansattSøknadsdata?: ArbeidssituasjonAnsattSøknadsdata[]
): ArbeidsforholdAvsluttetFørSøknadsperiode[] | undefined => {
    if (!ansattSøknadsdata || ansattSøknadsdata.length === 0) {
        return undefined;
    }
    return ansattSøknadsdata
        .filter((ansatt) => {
            return ansatt.type === 'sluttetFørSøknadsperiode';
        })
        .map((ansatt) => {
            return {
                erAnsatt: false,
                sluttetFørSøknadsdato: true,
                navn: ansatt.arbeidsgiver.navn,
                orgnr: ansatt.arbeidsgiver.organisasjonsnummer,
            };
        });
};

export const getDataBruktTilUtledning = (søknadsdata: Søknadsdata): DataBruktTilUtledningAnnetData => {
    return {
        arbeidsforholdAvsluttetFørSøknadsperiode: getArbeidsforhorholdAvsluttetFørSøknadsperiode(
            søknadsdata.arbeidssituasjon?.arbeidsgivere
        ),
    };
};
