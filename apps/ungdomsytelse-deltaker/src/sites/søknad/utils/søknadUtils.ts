import dayjs from 'dayjs';
import { Deltakelse } from '../../../api/types';
import { getDateToday } from '@navikt/sif-common-utils';

export const SOKNAD_VERSJON = '0.0.1';

/** Dato bruker vil måtte svare på om en har jobbet i perioden før en søker */
export const getDatoForArbeidstidRegistrering = (): Date => {
    return dayjs().startOf('month').subtract(1, 'month').toDate();
};

export const søkerMåRapportereArbeidstidISøknaden = (deltakelse?: Deltakelse): boolean => {
    return dayjs(getDateToday()).isBefore(dayjs(deltakelse?.programPeriode.from));
};
