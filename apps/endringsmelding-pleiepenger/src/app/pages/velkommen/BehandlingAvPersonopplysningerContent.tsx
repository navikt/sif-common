import { Heading, Link, List } from '@navikt/ds-react';
import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { AppText } from '../../i18n';
import { getLenker } from '../../lenker';

const BehandlingAvPersonopplysningerContent: React.FunctionComponent = () => {
    return (
        <Block margin="l" style={{ paddingTop: '.5rem' }}>
            <Heading level="3" size="small">
                <AppText id="personopplysninger.1" />
            </Heading>
            <p>
                <AppText id="personopplysninger.2" />
            </p>
            <Block margin="l">
                <Heading size="small" level="3">
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
                    <List.Item>
                        <AppText id="personopplysninger.4.5" />
                    </List.Item>
                    <List.Item>
                        <AppText id="personopplysninger.4.6" />
                    </List.Item>
                </List>
            </Block>

            <Block>
                <AppText
                    id="personopplysninger.5"
                    values={{
                        Link: (children) => (
                            <Link href={getLenker().personvern} key="lenke" target="_blank">
                                {children}
                            </Link>
                        ),
                    }}
                />
            </Block>
        </Block>
    );
};

export default BehandlingAvPersonopplysningerContent;
