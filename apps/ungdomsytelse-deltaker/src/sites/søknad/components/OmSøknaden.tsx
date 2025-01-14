import { AppText, useAppIntl } from '@i18n/index';
import { Accordion, Box, Heading, List, VStack } from '@navikt/ds-react';
import BehandlingAvPersonopplysningerContent from './BehandlingAvPersonopplysningerContent';

const OmSøknaden = () => {
    const { text } = useAppIntl();
    return (
        <>
            <VStack gap="4">
                <Box>
                    <Heading level="2" size="medium" spacing={true}>
                        <AppText id="omSøknaden.tittel" />
                    </Heading>
                    <List>
                        <List.Item>
                            <AppText id="omSøknaden.1" />
                        </List.Item>
                        <List.Item>
                            <AppText id="omSøknaden.2" />
                        </List.Item>
                        <List.Item>
                            <AppText id="omSøknaden.3" />
                        </List.Item>
                    </List>
                </Box>
                <Accordion>
                    <Accordion.Item>
                        <Accordion.Header>{text('omSøknaden.4')}</Accordion.Header>
                        <Accordion.Content>
                            <BehandlingAvPersonopplysningerContent />
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion>
            </VStack>
        </>
    );
};

export default OmSøknaden;
