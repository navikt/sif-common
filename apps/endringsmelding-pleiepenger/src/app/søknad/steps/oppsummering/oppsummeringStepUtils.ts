import {
    getDatesInDateRange,
    ISODateRange,
    ISODateRangeToDateRange,
    ISODurationToDecimalDuration,
    ISODurationToDuration,
} from '@navikt/sif-common-utils';
import {
    ArbeidstidApiData,
    ArbeidstidPeriodeApiData,
    ArbeidstidPeriodeApiDataMap,
    LovbestemtFerieApiData,
    Søknadsdata,
} from '@types';
import { erKortArbeidsuke, getTimerPerUkeFraTimerPerDag } from '@utils';
import { ArbeidstidUkerItem } from '../../../modules/arbeidstid-uker/types/ArbeidstidUkerItem';
import { OppsummeringFormValues } from './OppsummeringStep';

export const getOppsummeringStepInitialValues = (søknadsdata: Søknadsdata): OppsummeringFormValues => {
    return {
        harBekreftetOpplysninger: søknadsdata.oppsummering?.harBekreftetOpplysninger || false,
    };
};

const harEndringerIArbeidstid = (arbeidstid?: ArbeidstidApiData): boolean => {
    if (!arbeidstid) {
        return false;
    }
    const { arbeidstakerList, frilanserArbeidstidInfo, selvstendigNæringsdrivendeArbeidstidInfo } = arbeidstid;
    return (
        (arbeidstakerList !== undefined && arbeidstakerList.length > 0) ||
        frilanserArbeidstidInfo !== undefined ||
        selvstendigNæringsdrivendeArbeidstidInfo !== undefined
    );
};

const harEndringerILovbestemtFerieApiData = (lovbestemtFerie?: LovbestemtFerieApiData): boolean => {
    if (!lovbestemtFerie) {
        return false;
    }
    return Object.keys(lovbestemtFerie.perioder).length > 0;
};

const getArbeidsukeListItemFromArbeidstidPeriodeApiData = (
    {
        faktiskArbeidTimerPerDag,
        _opprinneligFaktiskPerDag,
        _opprinneligNormaltPerDag,
        _endretProsent,
    }: ArbeidstidPeriodeApiData,
    isoDateRange: ISODateRange,
): ArbeidstidUkerItem => {
    const periode = ISODateRangeToDateRange(isoDateRange);
    const antallDagerMedArbeidstid = getDatesInDateRange(periode).length;

    const arbeidsuke: ArbeidstidUkerItem = {
        id: isoDateRange,
        kanEndres: false,
        kanVelges: false,
        isoDateRange,
        periode,
        antallDagerMedArbeidstid,
        erKortUke: erKortArbeidsuke(periode),
        dagerIkkeAnsatt: [], //TODO
        opprinnelig: {
            normalt: getTimerPerUkeFraTimerPerDag(
                ISODurationToDuration(_opprinneligNormaltPerDag),
                antallDagerMedArbeidstid,
            ),
            faktisk: _opprinneligFaktiskPerDag
                ? getTimerPerUkeFraTimerPerDag(
                      ISODurationToDuration(_opprinneligFaktiskPerDag),
                      antallDagerMedArbeidstid,
                  )
                : undefined,
        },
        endret: {
            faktisk: getTimerPerUkeFraTimerPerDag(
                ISODurationToDuration(faktiskArbeidTimerPerDag),
                antallDagerMedArbeidstid,
            ),
            endretProsent: _endretProsent,
        },
    };
    return arbeidsuke;
};

const getArbeidstidUkerItems = (perioder: ArbeidstidPeriodeApiDataMap): ArbeidstidUkerItem[] => {
    const arbeidsuker: ArbeidstidUkerItem[] = [];
    Object.keys(perioder)
        .sort()
        .forEach((isoDateRange) => {
            arbeidsuker.push(getArbeidsukeListItemFromArbeidstidPeriodeApiData(perioder[isoDateRange], isoDateRange));
        });
    return arbeidsuker;
};

const erArbeidstidInfoGyldig = (perioderMap: ArbeidstidPeriodeApiDataMap): boolean => {
    return Object.keys(perioderMap)
        .map((key) => perioderMap[key])
        .some((value) => {
            const duration = ISODurationToDecimalDuration(value.faktiskArbeidTimerPerDag);
            return duration !== undefined && duration <= 24;
        });
};

const erArbeidstidEndringerGyldig = (arbeidstid?: ArbeidstidApiData): boolean => {
    if (arbeidstid === undefined) {
        return true;
    }
    const { arbeidstakerList, frilanserArbeidstidInfo, selvstendigNæringsdrivendeArbeidstidInfo } = arbeidstid;
    const ugyldigArbeidstid: any[] = [];
    arbeidstakerList.forEach((a) => {
        if (!erArbeidstidInfoGyldig(a.arbeidstidInfo.perioder)) {
            ugyldigArbeidstid.push(a);
        }
    });
    if (frilanserArbeidstidInfo && !erArbeidstidInfoGyldig(frilanserArbeidstidInfo.perioder)) {
        ugyldigArbeidstid.push(frilanserArbeidstidInfo);
    }
    if (
        selvstendigNæringsdrivendeArbeidstidInfo &&
        !erArbeidstidInfoGyldig(selvstendigNæringsdrivendeArbeidstidInfo.perioder)
    ) {
        ugyldigArbeidstid.push(selvstendigNæringsdrivendeArbeidstidInfo);
    }
    return ugyldigArbeidstid.length === 0;
};

export const oppsummeringStepUtils = {
    getArbeidstidUkerItems,
    harEndringerILovbestemtFerieApiData,
    harEndringerIArbeidstid,
    erArbeidstidEndringerGyldig,
    getOppsummeringStepInitialValues,
};
