import { dateToISODate } from '@navikt/sif-common-utils';
import { SøknadApiData } from '../../../../api/types';
import { Søknadsdata } from '../../types/søknadsdata/Søknadsdata';

export const getApiDataFromSøknadsdata = (
    søkerNorskIdent: string,
    søknadsdata: Søknadsdata,
): SøknadApiData | undefined => {
    const { id } = søknadsdata;

    return {
        søkerNorskIdent,
        id,
        språk: 'nb',
        fraOgMed: dateToISODate(søknadsdata.deltakelse.programPeriode.from),
        harForståttRettigheterOgPlikter: søknadsdata.velkommen?.harForståttRettigheterOgPlikter === true,
        harBekreftetOpplysninger: søknadsdata.oppsummering?.harBekreftetOpplysninger === true,
    };
};
