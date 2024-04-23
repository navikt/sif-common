import { Heading, Link } from '@navikt/ds-react';
import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import InfoList from '@navikt/sif-common-core-ds/src/components/lists/info-list/InfoList';
import { AppText } from '../../../i18n';
import getLenker from '../../../lenker';

const BehandlingAvPersonopplysningerContent: React.FunctionComponent = () => {
    return (
        <Block margin="l" style={{ paddingTop: '.5rem' }}>
            <Heading level="3" size="small">
                <AppText id="page.velkommen.personopplysninger.1" />
            </Heading>
            <p>
                <AppText id="page.velkommen.personopplysninger.2" />
            </p>
            <Block margin="l">
                <Heading size="small" level="3">
                    <AppText id="page.velkommen.personopplysninger.3" />
                </Heading>
                <p>
                    <AppText id="page.velkommen.personopplysninger.4" />
                </p>
                <InfoList>
                    <li>
                        <AppText id="page.velkommen.personopplysninger.4.1" />
                    </li>
                    <li>
                        <AppText id="page.velkommen.personopplysninger.4.2" />
                    </li>
                    <li>
                        <AppText id="page.velkommen.personopplysninger.4.3" />
                    </li>
                    <li>
                        <AppText id="page.velkommen.personopplysninger.4.4" />
                    </li>
                    <li>
                        <AppText id="page.velkommen.personopplysninger.4.5" />
                    </li>
                    <li>
                        <AppText id="page.velkommen.personopplysninger.4.6" />
                    </li>
                </InfoList>
            </Block>

            <Block>
                <AppText
                    id="page.velkommen.personopplysninger.5"
                    values={{
                        lenke: (
                            <Link href={getLenker().personvern} target="_blank">
                                <AppText id="page.velkommen.personopplysninger.5.lenketekst" />
                            </Link>
                        ),
                    }}
                />
            </Block>
        </Block>
    );
};

export default BehandlingAvPersonopplysningerContent;
