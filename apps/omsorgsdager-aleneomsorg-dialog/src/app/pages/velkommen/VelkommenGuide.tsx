import { BodyLong, GuidePanel, Heading, Link, List } from '@navikt/ds-react';
import { ListItem } from '@navikt/ds-react/List';
import React from 'react';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/src/utils/envUtils';
import { AppText } from '../../i18n';

interface Props {
    navn: string;
}

const VelkommenGuide: React.FunctionComponent<Props> = ({ navn }) => (
    <GuidePanel>
        <Heading level="1" size="large" spacing={true}>
            <AppText id="page.velkommen.guide.tittel" values={{ navn }} />
        </Heading>

        <BodyLong as="div">
            <BodyLong size="large">
                <AppText id="page.velkommen.guide.ingress" />
            </BodyLong>

            <p>
                <AppText
                    id="page.velkommen.guide.tekst.1.1"
                    values={{
                        Lenke: (children: React.ReactNode) => (
                            <Link href={getEnvironmentVariable('OMS_IKKE_TILSYN_URL')} inlineText={true}>
                                {children}
                            </Link>
                        ),
                    }}
                />
            </p>
            <List>
                <ListItem>
                    <AppText id="page.velkommen.guide.tekst.1.1.a" />
                </ListItem>
                <ListItem>
                    <AppText id="page.velkommen.guide.tekst.1.1.b" />
                </ListItem>
                <ListItem>
                    <AppText id="page.velkommen.guide.tekst.1.1.c" />
                </ListItem>
            </List>
            <p>
                <AppText id="page.velkommen.guide.tekst.3" />
            </p>
            <Heading level="3" size="small">
                Når skal du ikke bruke denne søknaden?
            </Heading>
            <p>
                <AppText
                    id="page.velkommen.guide.tekst.1.2"
                    values={{
                        Lenke: (children: React.ReactNode) => (
                            <Link href={getEnvironmentVariable('OMS_IKKE_TILSYN_URL')} inlineText={true}>
                                {children}
                            </Link>
                        ),
                    }}
                />
            </p>
            <p>
                <AppText id="page.velkommen.guide.tekst.2" />
            </p>
        </BodyLong>
    </GuidePanel>
);

export default VelkommenGuide;
