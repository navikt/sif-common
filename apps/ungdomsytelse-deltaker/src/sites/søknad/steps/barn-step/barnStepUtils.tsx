import { RegistrertBarn } from '@navikt/sif-common-api';
import { dateFormatter } from '@navikt/sif-common-utils';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { Box, HGrid } from '@navikt/ds-react';

export const getBarnSøknadsdataFromFormValues = (registrertBarn: RegistrertBarn[]) => {
    return registrertBarn;
};

export const barnItemLabelRenderer = (registrertBarn: RegistrertBarn): React.ReactNode => {
    return (
        <HGrid gap="2" columns={'10rem auto'}>
            <Box>Født: {dateFormatter.compact(registrertBarn.fødselsdato)}</Box>
            <Box>{formatName(registrertBarn.fornavn, registrertBarn.etternavn, registrertBarn.mellomnavn)}</Box>
        </HGrid>
    );
};
