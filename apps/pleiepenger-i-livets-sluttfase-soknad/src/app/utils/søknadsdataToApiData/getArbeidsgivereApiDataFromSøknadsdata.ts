import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import { ArbeidsgiverApiData } from '../../types/søknadApiData/SøknadApiData';
import { ArbeidstidArbeidsgivereSøknadsdata } from '../../types/søknadsdata/ArbeidstidArbeidsgivereSøknadsdata';
import { ArbeidsgivereSøknadsdata } from '../../types/søknadsdata/ArbeidsgivereSøknadsdata';
import { dateToISODate } from '@navikt/sif-common-utils/lib';
import { getArbeidIPeriodeApiDataFromSøknadsdata } from './getArbeidIPeriodeApiDataFromSøknadsdata';

export const getArbeidsgivereApiDataFromSøknadsdata = (
    søknadsperiode: DateRange,
    arbeidsgivere?: ArbeidsgivereSøknadsdata,
    arbeidstidArbeidsgivere?: ArbeidstidArbeidsgivereSøknadsdata,
): ArbeidsgiverApiData[] | undefined => {
    if (!arbeidsgivere) {
        // Api sjekker at feltet kan ikke være null
        return [];
    }
    const arbeidsgiverApiData: ArbeidsgiverApiData[] = [];

    Object.entries(arbeidsgivere).map(([key, value]) => {
        const arbeidsgiverInfo: Omit<ArbeidsgiverApiData, 'erAnsatt' | 'sluttetFørSøknadsperiode' | 'arbeidsforhold'> =
            {
                type: value.arbeidsgiver.type,
                navn: value.arbeidsgiver.navn,
                organisasjonsnummer: value.arbeidsgiver.organisasjonsnummer,
                offentligIdent: value.arbeidsgiver.offentligIdent,
                ansattFom: value.arbeidsgiver.ansattFom ? dateToISODate(value.arbeidsgiver.ansattFom) : undefined,
                ansattTom: value.arbeidsgiver.ansattTom ? dateToISODate(value.arbeidsgiver.ansattTom) : undefined,
            };
        const arbeidIPeriodeSøknadsdata =
            arbeidstidArbeidsgivere && arbeidstidArbeidsgivere.hasOwnProperty(key)
                ? arbeidstidArbeidsgivere[key].arbeidIPeriode
                : undefined;

        if (arbeidIPeriodeSøknadsdata && (value.type === 'pågående' || value.type === 'sluttetISøknadsperiode')) {
            const arbeidIPeriode = getArbeidIPeriodeApiDataFromSøknadsdata(arbeidIPeriodeSøknadsdata, søknadsperiode);
            arbeidsgiverApiData.push({
                ...arbeidsgiverInfo,
                erAnsatt: value.type === 'pågående',
                sluttetFørSøknadsperiode: false,
                arbeidsforhold: { jobberNormaltTimer: value.jobberNormaltTimer, arbeidIPeriode },
            });
        }

        if (value.type === 'sluttetFørSøknadsperiode') {
            arbeidsgiverApiData.push({
                ...arbeidsgiverInfo,
                erAnsatt: false,
                sluttetFørSøknadsperiode: true,
            });
        }
    });

    return arbeidsgiverApiData;
};
