import {
    dateRangeUtils,
    dateToISODate,
    decimalDurationToDuration,
    Duration,
    durationToDecimalDuration,
    getDatesInDateRange,
    ISODateRange,
    ISODateRangeToDateRange,
} from '@navikt/sif-common-utils';
import { ArbeidstidEnkeltdagMap, Arbeidsuke } from '@types';

const getMockArbeidsuke = (
    isoDateRange: ISODateRange,
    normaltPerDag: Duration = { hours: '7', minutes: '30' },
    faktiskPerDag: Duration = { hours: '2', minutes: '0' },
): Arbeidsuke => {
    const antallDagerMedArbeidstid = dateRangeUtils.getNumberOfDaysInDateRange(
        ISODateRangeToDateRange(isoDateRange),
        true,
    );
    const periode = ISODateRangeToDateRange(isoDateRange);
    const dagerSøktFor = getDatesInDateRange(periode, true).map((d) => dateToISODate(d)); // Alle dager i perioden
    const arbeidstidEnkeltdager: ArbeidstidEnkeltdagMap = {};
    dagerSøktFor.forEach((isoDate) => {
        arbeidstidEnkeltdager[isoDate] = {
            normalt: normaltPerDag,
            faktisk: faktiskPerDag,
        };
    });

    return {
        isoDateRange,
        periode,
        arbeidstidEnkeltdager,
        dagerIkkeAnsatt: [],
        normalt: {
            uke: decimalDurationToDuration(durationToDecimalDuration(normaltPerDag) * antallDagerMedArbeidstid),
            dag: normaltPerDag,
        },
        faktisk: {
            uke: decimalDurationToDuration(durationToDecimalDuration(faktiskPerDag) * antallDagerMedArbeidstid),
            dag: faktiskPerDag,
        },
        antallDagerMedArbeidstid,
    };
};

const ukerEttÅr: ISODateRange[] = [
    '2022-11-03/2022-11-06',
    '2022-11-07/2022-11-13',
    '2022-11-14/2022-11-20',
    '2022-11-21/2022-11-27',
    '2022-11-28/2022-11-30',
];
const ukerFlereÅr: ISODateRange[] = [...ukerEttÅr, '2023-01-02/2023-01-04'];

const arbeidsukerEttÅr: Arbeidsuke[] = ukerEttÅr.map((uke) => getMockArbeidsuke(uke));
const arbeidsukerFlereÅr: Arbeidsuke[] = ukerFlereÅr.map((uke) => getMockArbeidsuke(uke));

export const arbeidsukerMockData = {
    arbeidsuke: arbeidsukerEttÅr[0],
    arbeidsukerEttÅr,
    arbeidsukerFlereÅr,
    getMockArbeidsuke,
};
