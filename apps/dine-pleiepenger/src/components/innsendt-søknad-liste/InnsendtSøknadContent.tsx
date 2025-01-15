import { Box, Heading, Link, List } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import { File } from '@navikt/ds-icons';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { AppText } from '../../i18n';
import { InnsendtSøknadArbeidsgiver } from '../../server/api-models/ArbeidsgivereSchema';
import { InnsendtSøknadDokument } from '../../types/InnsendtSøknadDocument';
import { Organisasjon } from '../../types/Organisasjon';
import { InnsendtSøknad, InnsendtSøknadstype } from '../../types/InnsendtSøknad';
import { getDokumentFrontendUrl, getSøknadDokumentFilnavn } from '../../utils/dokumentUtils';
import { browserEnv } from '../../utils/env';
import { getOrganisasjonsnavnEllerOrgNummer } from '../../utils/sakUtils';

interface Props {
    søknad: InnsendtSøknad;
}

const getArbeidsgivermeldingApiUrlBySoknadIdOgOrgnummer = (soknadID: string, organisasjonsnummer: string): string => {
    return `${browserEnv.NEXT_PUBLIC_BASE_PATH}/api/soknad/${soknadID}/arbeidsgivermelding?organisasjonsnummer=${organisasjonsnummer}`;
};

const InnsendtSøknadContent: React.FunctionComponent<Props> = ({ søknad }) => {
    const intl = useIntl();

    const harArbeidsgiver = () => {
        if (søknad.søknadstype === InnsendtSøknadstype.PP_SYKT_BARN) {
            const { arbeidsgivere } = søknad.søknad;
            if (!Array.isArray(arbeidsgivere)) {
                return arbeidsgivere.organisasjoner && arbeidsgivere.organisasjoner.length > 0;
            } else {
                return (
                    arbeidsgivere.length > 0 &&
                    arbeidsgivere.some((arbeidsgiver) => !arbeidsgiver.sluttetFørSøknadsperiode)
                );
            }
        }
        return false;
    };

    const mapOrganisasjoner = (organisasjon: Organisasjon | InnsendtSøknadArbeidsgiver) => {
        return (
            <li key={organisasjon.organisasjonsnummer}>
                <Link
                    target="_blank"
                    href={getArbeidsgivermeldingApiUrlBySoknadIdOgOrgnummer(
                        søknad.søknadId,
                        organisasjon.organisasjonsnummer,
                    )}>
                    <File title="Dokumentikon" />
                    <AppText
                        id="dokumenterSomKanLastesNed.bekreftelse"
                        values={{
                            organisasjonsnavn: getOrganisasjonsnavnEllerOrgNummer(organisasjon),
                        }}
                    />
                </Link>
            </li>
        );
    };

    const mapDokumenter = (dokument: InnsendtSøknadDokument) => {
        return (
            <li key={dokument.dokumentInfoId}>
                <Link
                    target="_blank"
                    href={`${getDokumentFrontendUrl(dokument.url)}?dokumentTittel=${getSøknadDokumentFilnavn(
                        dokument,
                    )}`}>
                    <File title="Dokumentikon" />
                    <span>{`${dokument.tittel} (PDF)`}</span>
                </Link>
            </li>
        );
    };

    return (
        <>
            <Box>
                <Heading size="xsmall" level="4" spacing={true}>
                    <AppText id={`dokumenterTittel.${søknad.søknadstype}`} />
                </Heading>
                {søknad.dokumenter && søknad.dokumenter.length > 0 && (
                    <List>{søknad.dokumenter.map((dokument) => mapDokumenter(dokument))}</List>
                )}
                {(søknad.dokumenter === undefined || søknad.dokumenter.length === 0) && (
                    <p>{intlHelper(intl, 'dokumenter.ingenDokumenter')}</p>
                )}
            </Box>

            {søknad.søknadstype === InnsendtSøknadstype.PP_SYKT_BARN && harArbeidsgiver() && (
                <Box className="mt-8">
                    <Heading size="xsmall" level="4" spacing={true}>
                        <AppText id="bekreftelseTilArbeidsgiver.title" />
                    </Heading>
                    <p>
                        <AppText id="bekreftelseTilArbeidsgiver.info" />
                    </p>

                    <p className="mt-4">
                        <AppText id="bekreftelseTilArbeidsgiver.info.1" />
                    </p>
                    {'arbeidsgivere' in søknad.søknad &&
                        'organisasjoner' in søknad.søknad.arbeidsgivere &&
                        søknad.søknad.arbeidsgivere.organisasjoner.length > 0 && (
                            <List className="mt-4">
                                {søknad.søknad.arbeidsgivere.organisasjoner.map((organisasjon) =>
                                    mapOrganisasjoner(organisasjon),
                                )}
                            </List>
                        )}
                    {'arbeidsgivere' in søknad.søknad &&
                        Array.isArray(søknad.søknad.arbeidsgivere) &&
                        søknad.søknad.arbeidsgivere.length > 0 && (
                            <List className="mt-4">
                                {søknad.søknad.arbeidsgivere.map(
                                    (organisasjon) =>
                                        !organisasjon.sluttetFørSøknadsperiode && mapOrganisasjoner(organisasjon),
                                )}
                            </List>
                        )}
                </Box>
            )}
        </>
    );
};

export default InnsendtSøknadContent;
