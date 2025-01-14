import { Heading, Link, List, VStack } from '@navikt/ds-react';
import { AppText } from '@i18n/index';
import getLenker from '../../../lenker';

const BehandlingAvPersonopplysningerContent = () => {
    return (
        <VStack gap="2" paddingBlock="2 0">
            <div>
                <Heading level="3" size="xsmall" spacing={true}>
                    <AppText id="personopplysninger.1" />
                </Heading>
                <p>
                    <AppText id="personopplysninger.2" />
                </p>
            </div>
            <div>
                <Heading level="3" size="xsmall" spacing={true}>
                    <AppText id="personopplysninger.3" />
                </Heading>
                <p>
                    <AppText id="personopplysninger.4" />
                </p>
                <List>
                    <List.Item>
                        <AppText id="personopplysninger.4.1" />
                    </List.Item>
                    <List.Item>
                        <AppText id="personopplysninger.4.2" />
                    </List.Item>
                    <List.Item>
                        <AppText id="personopplysninger.4.3" />
                    </List.Item>
                    <List.Item>
                        <AppText id="personopplysninger.4.4" />
                    </List.Item>
                </List>
            </div>
            <div>
                <p style={{ margin: '0' }}>
                    <AppText
                        id="personopplysninger.5"
                        values={{
                            Lenke: (children: React.ReactNode) => (
                                <Link href={getLenker().personvern} target="_blank" key="link">
                                    {children}
                                </Link>
                            ),
                        }}
                    />
                </p>
            </div>
        </VStack>
    );
};

export default BehandlingAvPersonopplysningerContent;
