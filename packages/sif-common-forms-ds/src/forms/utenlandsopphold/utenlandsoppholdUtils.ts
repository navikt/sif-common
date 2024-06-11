import { countryIsMemberOfEøsOrEfta, dateToISOString, ISOStringToDate, YesOrNo } from '@navikt/sif-common-formik-ds';
import { guid } from '@navikt/sif-common-utils';
import { Utenlandsopphold, UtenlandsoppholdEnkel, UtenlandsoppholdFormValues, UtenlandsoppholdVariant } from './types';
import { hasValue } from '@navikt/sif-common-formik-ds/src/validation/validationUtils';
import { getYesOrNoFromBoolean } from '@navikt/sif-common-core-ds/src/utils/yesOrNoUtils';

export const mapFormValuesToUtenlandsopphold = (
    formValues: UtenlandsoppholdFormValues,
    variant: UtenlandsoppholdVariant,
    oppholdId: string | undefined,
): Utenlandsopphold | UtenlandsoppholdEnkel => {
    const id = oppholdId || guid();
    const fom = ISOStringToDate(formValues.fom);
    const tom = ISOStringToDate(formValues.tom);
    const { landkode } = formValues;

    if (!fom || !tom || !landkode) {
        throw 'Invalid utenlandsopphold';
    }

    if (variant === UtenlandsoppholdVariant.ENKEL) {
        return {
            id,
            fom,
            tom,
            landkode,
        };
    }

    const isEøsOrEftaLand: boolean = countryIsMemberOfEøsOrEfta(landkode);
    const { barnInnlagtPerioder, erSammenMedBarnet, årsak } = formValues;

    const utvidetUtenlandsopphold: Utenlandsopphold = {
        id,
        fom,
        tom,
        landkode,
    };

    if (isEøsOrEftaLand === true) {
        utvidetUtenlandsopphold.erSammenMedBarnet = erSammenMedBarnet === YesOrNo.YES;
    } else {
        const erBarnetInnlagt = formValues.erBarnetInnlagt === YesOrNo.YES ? true : false;
        if (erBarnetInnlagt) {
            utvidetUtenlandsopphold.erBarnetInnlagt = true;
            utvidetUtenlandsopphold.barnInnlagtPerioder = barnInnlagtPerioder;
            utvidetUtenlandsopphold.årsak = årsak;
        } else {
            utvidetUtenlandsopphold.erBarnetInnlagt = false;
            utvidetUtenlandsopphold.erSammenMedBarnet = erSammenMedBarnet === YesOrNo.YES;
        }
    }

    return utvidetUtenlandsopphold;
};

export const mapUtenlandsoppholdToFormValues = (
    { fom, tom, erBarnetInnlagt, barnInnlagtPerioder, landkode, årsak, erSammenMedBarnet }: Partial<Utenlandsopphold>,
    variant: UtenlandsoppholdVariant,
): UtenlandsoppholdFormValues => {
    if (variant === UtenlandsoppholdVariant.ENKEL) {
        return {
            fom: dateToISOString(fom),
            tom: dateToISOString(tom),
            landkode,
        };
    }
    return {
        fom: dateToISOString(fom),
        tom: dateToISOString(tom),
        landkode,
        erBarnetInnlagt: getYesOrNoFromBoolean(erBarnetInnlagt),
        årsak,
        barnInnlagtPerioder,
        erSammenMedBarnet: getYesOrNoFromBoolean(erSammenMedBarnet),
    };
};

export const getUtenlandsoppholdQuestionVisibility = (
    formValues: UtenlandsoppholdFormValues,
    variant: UtenlandsoppholdVariant,
): {
    showInnlagtPerioderQuestion: boolean;
    showSammenMedBarnQuestion: boolean;
    showInnlagtQuestion: boolean;
    showÅrsakQuestion: boolean;
} => {
    const { erBarnetInnlagt, landkode, fom, tom } = formValues;

    if (variant === UtenlandsoppholdVariant.ENKEL) {
        return {
            showInnlagtPerioderQuestion: false,
            showSammenMedBarnQuestion: false,
            showInnlagtQuestion: false,
            showÅrsakQuestion: false,
        };
    }
    const hasFomTomValues = hasValue(fom) && hasValue(tom);

    const showSammenMedBarnQuestion =
        hasFomTomValues &&
        landkode !== undefined &&
        (erBarnetInnlagt === YesOrNo.NO || countryIsMemberOfEøsOrEfta(landkode));

    const showInnlagtQuestion: boolean =
        landkode !== undefined && hasValue(landkode) && !countryIsMemberOfEøsOrEfta(landkode);

    const showInnlagtPerioderQuestion =
        hasFomTomValues &&
        landkode !== undefined &&
        erBarnetInnlagt === YesOrNo.YES &&
        countryIsMemberOfEøsOrEfta(landkode) === false;

    const showÅrsakQuestion = showInnlagtPerioderQuestion;

    return {
        showInnlagtPerioderQuestion,
        showSammenMedBarnQuestion,
        showInnlagtQuestion,
        showÅrsakQuestion,
    };
};
