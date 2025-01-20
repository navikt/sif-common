import { dateToISODate } from '@navikt/sif-common-utils';
import { ArbeidsgiverForEndring, Sak, SøknadApiData, Søknadsdata, ValgteEndringer } from '@types';
import { getArbeidstidApiDataFromSøknadsdata } from './getArbeidstidApiDataFromSøknadsdata';
import { getDataBruktTilUtledningAnnetDataApiData, getDataBruktTilUtledningApiData } from './getDataBruktTilUtledning';
import { getLovbestemtFerieApiDataFromSøknadsdata } from './getLovbestemtFerieApiDataFraSøknadsdata';
import { getEndringsdato, getTillattEndringsperiode } from '../endringsperiode';

export const getApiDataFromSøknadsdata = (
    søkerNorskIdent: string,
    søknadsdata: Søknadsdata,
    sak: Sak,
    valgteEndringer: ValgteEndringer,
    arbeidsgivere: ArbeidsgiverForEndring[],
): SøknadApiData | undefined => {
    const { id, arbeidstid, lovbestemtFerie, ukjentArbeidsforhold } = søknadsdata;

    if (!arbeidstid && !lovbestemtFerie) {
        return undefined;
    }
    return {
        søkerNorskIdent,
        id,
        språk: '',
        harForståttRettigheterOgPlikter: søknadsdata.velkommen?.harForståttRettigheterOgPlikter === true ? true : false,
        harBekreftetOpplysninger: søknadsdata.oppsummering?.harBekreftetOpplysninger === true ? true : false,
        ytelse: {
            type: 'PLEIEPENGER_SYKT_BARN',
            barn: {
                fødselsdato: sak.barn.fødselsdato ? dateToISODate(sak.barn.fødselsdato) : undefined,
                norskIdentitetsnummer: sak.barn.identitetsnummer,
            },
            lovbestemtFerie: lovbestemtFerie ? getLovbestemtFerieApiDataFromSøknadsdata(lovbestemtFerie) : undefined,
            arbeidstid: arbeidstid
                ? getArbeidstidApiDataFromSøknadsdata(
                      getTillattEndringsperiode(getEndringsdato()),
                      sak.søknadsperioder,
                      arbeidstid.arbeidsaktivitet,
                      sak.arbeidsaktiviteter,
                      sak.arbeidsgivereIkkeISak,
                      ukjentArbeidsforhold,
                  )
                : undefined,
            dataBruktTilUtledning: getDataBruktTilUtledningApiData(
                søknadsdata.ukjentArbeidsforhold,
                søknadsdata.arbeidstid,
                arbeidsgivere,
            ),
            annetDataBruktTilUtledning: {
                annetData: JSON.stringify(getDataBruktTilUtledningAnnetDataApiData(valgteEndringer)),
            },
        },
    };
};
