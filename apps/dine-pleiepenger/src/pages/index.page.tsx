import { Box, VStack } from '@navikt/ds-react';
import { ReactElement } from 'react';
import Head from 'next/head';
import { withAuthenticatedPage } from '../auth/withAuthentication';
import DineMellomlagringer from '../components/dine-mellomlagringer/DineMellomlagringer';
import DineSøknader from '../components/dine-søknader/DineSøknader';
import DefaultPage from '../components/layout/default-page/DefaultPage';
import Snarveier from '../components/snarveier/Snarveier';
import Svarfrist from '../components/svarfrist/Svar-Frist';

function DinePleiepengerPage(): ReactElement {
    return (
        <DefaultPage>
            <Head>
                <title>Dine pleiepenger</title>
            </Head>
            <VStack gap="10">
                <DineMellomlagringer />
                <Snarveier />
                <Box className="md:flex md:gap-4">
                    <div className="md:grow mb-10 md:mb-0">
                        <DineSøknader />
                    </div>
                    <div className="md:mb-none shrink-0 md:w-72">
                        <Svarfrist />
                    </div>
                </Box>
            </VStack>
        </DefaultPage>
    );
}

export const getServerSideProps = withAuthenticatedPage();

export default DinePleiepengerPage;
