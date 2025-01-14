import { Alert, BodyShort, Box, Heading, VStack } from '@navikt/ds-react';
import { dateFormatter, dateRangeFormatter } from '@navikt/sif-common-utils';
import { Deltakelse } from '@api/types';
import { useAppIntl } from '../../i18n';
import { getMånederForInnteksrapportering } from '../../utils/deltakelserUtils';
import InntektsrapporteringForm from './InnteksrapporteringForm';

interface Props {
    deltakelse: Deltakelse;
}

const Inntektsrapportering = ({ deltakelse }: Props) => {
    const { from, to } = deltakelse.programPeriode;
    const { locale } = useAppIntl();
    const månederEnKanRapportereFor = getMånederForInnteksrapportering(deltakelse);
    return (
        <Box>
            <Heading level="2" size="medium">
                Inntektsrapportering
            </Heading>
            <VStack gap="6">
                <BodyShort>
                    {to ? (
                        <>Periode {dateRangeFormatter.getDateRangeText({ from, to }, locale)}</>
                    ) : (
                        <>Fra {dateFormatter.compact(from)}</>
                    )}
                </BodyShort>
                {månederEnKanRapportereFor.length > 0 ? (
                    <InntektsrapporteringForm deltakelse={deltakelse} />
                ) : (
                    <Alert variant="info">Ingen måneder tilgjengelig for inntektsrapportering</Alert>
                )}
            </VStack>
        </Box>
    );
};

export default Inntektsrapportering;
