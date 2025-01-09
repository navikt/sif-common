import { BodyShort } from '@navikt/ds-react';
import React from 'react';
import { dateFormatter, DateRange } from '@navikt/sif-common-utils';
import { Arbeidsaktivitet } from '@types';
import { AppText } from '../../../../../i18n';
import { SkrivTilOssLink } from '../../../../../lenker';

interface Props {
    arbeidsaktivitet: Arbeidsaktivitet;
    tillattEndringsperiode: DateRange;
}

const ArbeidsaktivitetUtenforPeriodeInfo: React.FunctionComponent<Props> = ({
    arbeidsaktivitet: { harPerioderEtterTillattEndringsperiode, harPerioderFørTillattEndringsperiode },
    tillattEndringsperiode,
}) => {
    if (!harPerioderFørTillattEndringsperiode && !harPerioderEtterTillattEndringsperiode) {
        return null;
    }
    const intlValues = {
        førDato: dateFormatter.full(tillattEndringsperiode.from),
        etterDato: dateFormatter.full(tillattEndringsperiode.to),
        skrivTilOssLink: <SkrivTilOssLink key="lenke" />,
    };
    return (
        <BodyShort style={{ paddingBottom: '1rem' }}>
            {harPerioderFørTillattEndringsperiode && !harPerioderEtterTillattEndringsperiode && (
                <AppText id="arbeidsaktivitetContent.utenforPeriode.før" values={intlValues} />
            )}
            {!harPerioderFørTillattEndringsperiode && harPerioderEtterTillattEndringsperiode && (
                <AppText id="arbeidsaktivitetContent.utenforPeriode.før" values={intlValues} />
            )}
            {harPerioderFørTillattEndringsperiode && harPerioderEtterTillattEndringsperiode && (
                <AppText id="arbeidsaktivitetContent.utenforPeriode.før" values={intlValues} />
            )}
        </BodyShort>
    );
};

export default ArbeidsaktivitetUtenforPeriodeInfo;
