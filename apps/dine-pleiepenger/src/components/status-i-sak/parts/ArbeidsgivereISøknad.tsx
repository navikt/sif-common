import React from 'react';
import { getArbeidsgivermeldingApiUrlBySoknadIdOgOrgnummer } from '../../../utils/dokumentUtils';
import { FormattedMessage, useIntl } from 'react-intl';
import { Box, Heading, List } from '@navikt/ds-react';
import PdfLenke from '../../pdf-lenke/PdfLenke';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { Organisasjon } from '../../../types/Organisasjon';
import { getOrganisasjonsnavnEllerOrgNummer } from '../../../utils/sakUtils';

interface Props {
    arbeidsgivere: Organisasjon[];
    søknadId: string;
}

const ArbeidsgivereISøknad: React.FunctionComponent<Props> = ({ søknadId, arbeidsgivere }) => {
    const intl = useIntl();
    return (
        <Box className="mt-4">
            <Heading size="xsmall" level="4" spacing={true}>
                <FormattedMessage id="bekreftelseTilArbeidsgiver.title" />
            </Heading>
            <p>
                <FormattedMessage id="bekreftelseTilArbeidsgiver.info" />
            </p>

            <p className="mt-4">
                <FormattedMessage id="bekreftelseTilArbeidsgiver.info.1" />
            </p>

            <List className="mt-4">
                {arbeidsgivere.map((organisasjon) => (
                    <li key={organisasjon.organisasjonsnummer}>
                        <PdfLenke
                            href={getArbeidsgivermeldingApiUrlBySoknadIdOgOrgnummer(
                                søknadId,
                                organisasjon.organisasjonsnummer,
                            )}
                            tittel={intlHelper(intl, 'dokumenterSomKanLastesNed.bekreftelse', {
                                organisasjonsnavn: getOrganisasjonsnavnEllerOrgNummer(organisasjon),
                            })}
                        />
                    </li>
                ))}
            </List>
        </Box>
    );
};

export default ArbeidsgivereISøknad;
