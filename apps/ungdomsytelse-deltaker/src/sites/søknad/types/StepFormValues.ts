import { SamtykkeFormValues } from '@navikt/sif-common-soknad-ds';
import { ArbeidstidFormValues } from '../steps/arbeidstid-step/ArbeidstidStep';
import { BarnFormValues } from '../steps/barn-step/BarnStep';
import { OppsummeringFormValues } from '../steps/oppsummering-step/OppsummeringStep';
import { StepId } from './StepId';

export interface StepFormValues {
    [StepId.VELKOMMEN]?: SamtykkeFormValues;
    [StepId.BARN]?: BarnFormValues;
    [StepId.ARBEIDSTID]?: ArbeidstidFormValues;
    [StepId.OPPSUMMERING]?: OppsummeringFormValues;
    [StepId.KVITTERING]?: undefined;
}
