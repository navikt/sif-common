import { Deltakelse } from '../../../../api/types';
import { StepId } from '../StepId';

export type Søknadsdata = {
    id: string;
    deltakelse: Deltakelse;
    [StepId.VELKOMMEN]?: {
        harForståttRettigheterOgPlikter?: boolean;
    };
    [StepId.BARN]?: {};
    [StepId.ARBEIDSTID]?: {};
    [StepId.OPPSUMMERING]?: {
        harBekreftetOpplysninger?: boolean;
    };
};
