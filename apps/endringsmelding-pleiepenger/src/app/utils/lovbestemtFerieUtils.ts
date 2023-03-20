import {
    DateRange,
    dateRangesCollide,
    dateRangeUtils,
    dateToISODate,
    getDatesInDateRanges,
    ISODate,
    ISODateToDate,
    sortDates,
} from '@navikt/sif-common-utils/lib';
import { LovbestemtFerieEndringer } from '../types/LovbestemFerieEndringer';
import { LovbestemtFerieSøknadsdata } from '../types/søknadsdata/LovbestemtFerieSøknadsdata';

const isoDateIsNotInArray = (isoDate: ISODate, isoDateArray: ISODate[]) =>
    isoDateArray.some((dMelding) => isoDate === dMelding) === false;

const isoDateIsInArray = (isoDate: ISODate, isoDateArray: ISODate[]) =>
    isoDateArray.some((dMelding) => isoDate === dMelding) === true;

export const getLovbestemtFerieEndringer = (
    perioderIMelding: DateRange[],
    perioderISak: DateRange[]
): LovbestemtFerieEndringer => {
    const dagerIMelding: ISODate[] = getDatesInDateRanges(perioderIMelding).sort(sortDates).map(dateToISODate);
    const dagerISak: ISODate[] = getDatesInDateRanges(perioderISak).sort(sortDates).map(dateToISODate);

    const dagerFjernet = dagerISak.filter((d) => isoDateIsNotInArray(d, dagerIMelding)).map(ISODateToDate);
    const dagerLagtTil = dagerIMelding.filter((d) => isoDateIsNotInArray(d, dagerISak)).map(ISODateToDate);
    const dagerUendret = dagerISak.filter((d) => isoDateIsInArray(d, dagerIMelding)).map(ISODateToDate);

    const perioderLagtTil: DateRange[] = dateRangeUtils.getDateRangesFromDates(dagerLagtTil);
    const perioderFjernet: DateRange[] = dateRangeUtils.getDateRangesFromDates(dagerFjernet);
    const perioderUendret: DateRange[] = dateRangeUtils.getDateRangesFromDates(dagerUendret);

    return {
        erEndret: dagerFjernet.length > 0 || dagerLagtTil.length > 0,
        dagerFjernet,
        dagerLagtTil,
        dagerUendret,
        perioderFjernet,
        perioderLagtTil,
        perioderUendret,
    };
};

export const harFjernetLovbestemtFerie = (ferieSøknad: LovbestemtFerieSøknadsdata | undefined): boolean => {
    if (!ferieSøknad) {
        return false;
    }
    return ferieSøknad.perioderFjernet.length > 0;
};

export const getLovbestemtFerieForPeriode = (
    ferieSøknad: LovbestemtFerieSøknadsdata,
    periode: DateRange
): LovbestemtFerieSøknadsdata => {
    return {
        perioderMedFerie: ferieSøknad.perioderMedFerie.filter((feriePeriode) =>
            dateRangesCollide([feriePeriode, periode])
        ),
        perioderLagtTil: ferieSøknad.perioderLagtTil.filter((feriePeriode) =>
            dateRangesCollide([feriePeriode, periode])
        ),
        perioderFjernet: ferieSøknad.perioderFjernet.filter((feriePeriode) =>
            dateRangesCollide([feriePeriode, periode])
        ),
    };
};

export const getDagerMedFerieTekst = (dagerMedFerie: Date[]): string => {
    return `${dagerMedFerie.length} ferie${dagerMedFerie.length === 1 ? 'dag' : 'dager'} registrert`;
};

export const getDagerMedFerieFjernetTekst = (dagerMedFerie: Date[]): string => {
    return `${dagerMedFerie.length} ferie${dagerMedFerie.length === 1 ? 'dag' : 'dager'} fjernet`;
};
