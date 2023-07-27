import { ArbeidsgiverApiData } from '../../types/søknad-api-data/SøknadApiData';
import { ArbeidssituasjonAnsattSøknadsdata } from '../../types/søknadsdata/ArbeidssituasjonAnsattSøknadsdata';
import { ArbeidstidSøknadsdata } from '../../types/søknadsdata/ArbeidstidSøknadsdata';
import { getArbeidsgiverApiDataFromSøknadsdata } from './getArbeidsgiverApiDataFromSøknadsdata';

export const getArbeidsgivereApiDataFromSøknadsdata = (
    arbeidssituasjoner: ArbeidssituasjonAnsattSøknadsdata[] = [],
    arbeidstid: ArbeidstidSøknadsdata | undefined
): ArbeidsgiverApiData[] => {
    if (arbeidssituasjoner.length === 0) {
        return [];
    }
    const arbeidsgivereApiData: ArbeidsgiverApiData[] = [];
    arbeidssituasjoner.forEach((arbeidssituasjon) => {
        const arbeidIPeriode = arbeidstid?.arbeidsgivere.get(arbeidssituasjon.arbeidsgiver.id);
        arbeidsgivereApiData.push(getArbeidsgiverApiDataFromSøknadsdata(arbeidssituasjon, arbeidIPeriode));
    });
    return arbeidsgivereApiData;
};
