import { Alert, BodyLong, Heading, Link, VStack } from '@navikt/ds-react';
import React from 'react';
import { Infolist } from '@navikt/sif-common-core-ds';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import actionsCreator from '../../context/action/actionCreator';
import { AppText, useAppIntl } from '../../../../i18n';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { appEnv } from '../../../../utils/appEnv';
import { EnvKey } from '@navikt/sif-common-env';

const KvitteringPage = () => {
    const { text } = useAppIntl();
    const { dispatch } = useSøknadContext();

    useEffectOnce(() => {
        dispatch(actionsCreator.setSøknadSendt());
    });
    return (
        <Page title={text('application.title')}>
            <VStack gap="10">
                <VStack gap="4">
                    <Heading level="1" size="large">
                        Kvittering
                    </Heading>
                    <Alert variant="success">
                        <Heading level="1" size="small">
                            Vi har mottatt din søknad
                        </Heading>
                        <BodyLong>
                            Vivero eos et accusamus et iusto odio dignis simos ducimus qui blanditiis praesentium
                            voluptatum.
                        </BodyLong>
                    </Alert>
                </VStack>

                <Infolist heading={text('kvittering.info.tittel')}>
                    <li>
                        <AppText id="kvittering.info.1" />
                    </li>
                    <li>
                        <AppText id="kvittering.info.2" />
                    </li>
                    <li>
                        <AppText
                            id="kvittering.info.3"
                            values={{
                                Lenke: (children: React.ReactNode) => (
                                    <Link href={`${appEnv[EnvKey.PUBLIC_PATH]}/innsyn`} key="link">
                                        {children}
                                    </Link>
                                ),
                            }}
                        />
                    </li>
                </Infolist>
            </VStack>
        </Page>
    );
};

export default KvitteringPage;
