import { ISODateRangeToDateRange } from '@navikt/sif-common-utils';
import { ArbeidstidApiData, LovbestemtFerieApiData, LovbestemtFeriePeriode, SøknadApiData, Søknadsdata } from '@types';
import { oppsummeringStepUtils } from '../søknad/steps/oppsummering/oppsummeringStepUtils';
import { getValgteEndringer } from './endringTypeUtils';

interface UkjentArbeidsforholdMetadata {
    antallUkjentArbeidsforhold: number;
    erAnsatt?: boolean;
}
interface ArbeidstidMetadata {
    endretArbeidstid?: boolean;
}

interface LovbestemtFerieMetadata {
    endretFerie?: boolean;
    lagtTilFerie?: boolean;
    fjernetFerie?: boolean;
}

export type SøknadApiDataMetadata = LovbestemtFerieMetadata &
    ArbeidstidMetadata &
    UkjentArbeidsforholdMetadata & {
        valgtEndreArbeidstid: boolean;
        valgtEndreFerie: boolean;
    };

const getArbeidstidMetadata = (arbeidstid?: ArbeidstidApiData): ArbeidstidMetadata | undefined => {
    return arbeidstid
        ? {
              endretArbeidstid: oppsummeringStepUtils.harEndringerIArbeidstid(arbeidstid),
          }
        : {
              endretArbeidstid: false,
          };
};

const getUkjentArbeidsforholdMetadata = (søknadsdata: Søknadsdata): UkjentArbeidsforholdMetadata => {
    const ukjentArbeidsforhold = søknadsdata.ukjentArbeidsforhold?.arbeidsforhold || [];
    return {
        antallUkjentArbeidsforhold: ukjentArbeidsforhold.length,
        erAnsatt: ukjentArbeidsforhold.some((a) => a.erAnsatt),
    };
};
const getFerieMetadata = (lovbestemtFerie?: LovbestemtFerieApiData): LovbestemtFerieMetadata | undefined => {
    if (!lovbestemtFerie) {
        return {
            endretFerie: false,
            lagtTilFerie: false,
            fjernetFerie: false,
        };
    }
    const { perioderFjernet, perioderLagtTil } = getLovbestemtFerieOppsummeringInfo(lovbestemtFerie);
    return {
        endretFerie: oppsummeringStepUtils.harEndringerILovbestemtFerieApiData(lovbestemtFerie),
        lagtTilFerie: perioderLagtTil.length > 0,
        fjernetFerie: perioderFjernet.length > 0,
    };
};

export const getSøknadApiDataMetadata = (apiData: SøknadApiData, søknadsdata: Søknadsdata): SøknadApiDataMetadata => {
    const { arbeidstid, lovbestemtFerie, dataBruktTilUtledning } = apiData.ytelse;
    const endringer = getValgteEndringer(dataBruktTilUtledning.valgteEndringer);
    return {
        valgtEndreArbeidstid: endringer.arbeidstidSkalEndres,
        valgtEndreFerie: endringer.lovbestemtFerieSkalEndres,
        ...getUkjentArbeidsforholdMetadata(søknadsdata),
        ...getFerieMetadata(lovbestemtFerie),
        ...getArbeidstidMetadata(arbeidstid),
    };
};

export const getLovbestemtFerieOppsummeringInfo = (lovbestemtFerie: LovbestemtFerieApiData) => {
    const perioder: LovbestemtFeriePeriode[] = Object.keys(lovbestemtFerie.perioder).map(
        (isoDateRange): LovbestemtFeriePeriode => {
            return {
                ...ISODateRangeToDateRange(isoDateRange),
                skalHaFerie: lovbestemtFerie.perioder[isoDateRange].skalHaFerie,
            };
        }
    );
    const perioderLagtTil = perioder.filter((p) => p.skalHaFerie === true);
    const perioderFjernet = perioder.filter((p) => p.skalHaFerie === false);
    return {
        perioderLagtTil,
        perioderFjernet,
    };
};
