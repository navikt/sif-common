import { Alert, BodyShort, Heading, Link, VStack } from '@navikt/ds-react';
import { KontonummerInfo } from '../../../api/types';

interface Props {
    kontonummerInfo: KontonummerInfo;
}

const ManglendeKontonummer = ({ kontonummerInfo }: Props) => {
    if (kontonummerInfo.kontoregisterStatus === 'FAILURE') {
        return (
            <Alert variant="warning">
                <VStack gap="2">
                    {kontonummerInfo.kontonr ? (
                        <>
                            <Heading level="2" size="small">
                                Du må oppdatere kontonummeret ditt
                            </Heading>
                            <BodyShort>Kontonummeret vi har registrert på deg er ikke gyldig.</BodyShort>
                            <BodyShort>
                                Du kan oppdatere ditt kontonummer på{' '}
                                <Link href="https://www.nav.no/kontonummer">denne siden</Link>.
                            </BodyShort>
                        </>
                    ) : (
                        <>
                            <Heading level="2" size="small">
                                Vi mangler kontonummeret ditt
                            </Heading>
                            <BodyShort>
                                For at du skal være med i ungdomsprogrammet trenger vi kontonummer ditt.
                            </BodyShort>
                            <BodyShort>
                                Du kan registrere ditt kontonummer på{' '}
                                <Link href="https://www.nav.no/kontonummer">denne siden</Link>.
                            </BodyShort>
                        </>
                    )}
                </VStack>
            </Alert>
        );
    }
    return null;
};

export default ManglendeKontonummer;
