import { SoknadApplicationType, SoknadStepsConfig } from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepTypes';
import soknadStepUtils from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepUtils';
import { EndringType } from '../../types/EndringType';
import { Sak } from '../../types/Sak';
import { getAktiviteterSomKanEndres } from '../../utils/arbeidAktivitetUtils';
import { getValgteEndringer } from '../../utils/endringTypeUtils';
import { StepId } from './StepId';

export const getSøknadSteps = (sak: Sak, hvaSkalEndres: EndringType[]): StepId[] => {
    const aktiviteter = getAktiviteterSomKanEndres(sak.arbeidAktiviteter);
    const steps: StepId[] = [];

    const {
        arbeidstidSkalEndres,
        lovbestemtFerieSkalEndres: ferieSkalEndres,
        utenlandsoppholdSkalEndres,
    } = getValgteEndringer(hvaSkalEndres);

    if (arbeidstidSkalEndres) {
        if (aktiviteter.length > 1) {
            steps.push(StepId.AKTIVITET);
        }
        steps.push(StepId.ARBEIDSTID);
    }
    if (ferieSkalEndres) {
        steps.push(StepId.LOVBESTEMT_FERIE);
    }
    if (utenlandsoppholdSkalEndres) {
        steps.push(StepId.UTENLANDSOPPHOLD);
    }
    steps.push(StepId.OPPSUMMERING);
    return steps;
};

export const getSøknadStepConfig = (sak: Sak, hvaSkalEndres: EndringType[]): SoknadStepsConfig<StepId> =>
    soknadStepUtils.getStepsConfig(getSøknadSteps(sak, hvaSkalEndres), SoknadApplicationType.MELDING);
