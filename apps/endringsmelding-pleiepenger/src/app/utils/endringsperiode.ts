import { DateRange } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';

dayjs.extend(minMax);

export const getEndringsdato = (): Date => new Date();

/** 3 måneder bakover og 12 måneder fremover */
export const getMaksEndringsperiode = (endringsdato: Date): DateRange => ({
    from: dayjs(endringsdato).startOf('month').subtract(3, 'months').startOf('day').toDate(),
    to: dayjs(endringsdato).endOf('month').add(12, 'months').startOf('day').toDate(),
});
