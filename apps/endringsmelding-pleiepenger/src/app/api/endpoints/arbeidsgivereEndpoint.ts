import { DateRange, dateToISODate, ISODate } from '@navikt/sif-common-utils';
import { ArbeidsgiverForEndring } from '@types';
import { getArbeidsgivereFromArbeidsgiverOrganisasjoner } from '../../utils/initialDataUtils';
import api from '../api';
import { ApiEndpointPsb } from './';

export type AAregArbeidsgiver = {
    organisasjoner?: AARegArbeidsgiverOrganisasjon[];
};

export type AARegArbeidsgiverOrganisasjon = {
    organisasjonsnummer: string;
    navn: string;
    ansattFom?: ISODate;
    ansattTom?: ISODate;
};

export const arbeidsgivereEndpoint = {
    fetch: async (periode: DateRange): Promise<ArbeidsgiverForEndring[]> => {
        try {
            const { from, to } = periode;
            const { data } = await api.psb.get<AAregArbeidsgiver>(
                ApiEndpointPsb.arbeidsgiver,
                `ytelse=endringsmelding-pleiepenger&fra_og_med=${dateToISODate(from)}&til_og_med=${dateToISODate(to)}&inkluder_ansettelsesperioder=true`,
            );
            return Promise.resolve(getArbeidsgivereFromArbeidsgiverOrganisasjoner(data.organisasjoner || []));
        } catch (error) {
            return Promise.reject(error);
        }
    },
};
