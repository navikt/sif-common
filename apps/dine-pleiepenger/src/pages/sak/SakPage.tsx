import { Box, VStack } from '@navikt/ds-react';
import React from 'react';
import { onBreadcrumbClick, setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import Head from 'next/head';
import { useRouter } from 'next/router';
import DevBranchInfo from '../../components/dev-branch-info/DevBranchInfo';
import DefaultPageLayout from '../../components/page-layout/default-page-layout/DefaultPageLayout';
import SakPageHeader from '../../components/page-layout/sak-page-header/SakPageHeader';
import SnarveierSak from '../../components/snarveier-sak/SnarveierSak';
import Snarveier from '../../components/snarveier/Snarveier';
import StatusISak from '../../components/status-i-sak/StatusISak';
import StatusTag from '../../components/status-tag/StatusTag';
import Saksbehandlingstid from '../../components/saksbehandlingstid/Saksbehandlingstid';
import VenteårsakMelding from '../../components/venteårsak-melding/VenteårsakMelding';
import { Behandlingsstatus } from '../../server/api-models/Behandlingsstatus';
import { Pleietrengende } from '../../server/api-models/PleietrengendeSchema';
import { Sak } from '../../server/api-models/SakSchema';
import { getAllBreadcrumbs } from '../../utils/decoratorBreadcrumbs';
import { browserEnv } from '../../utils/env';
import { personaliaUtils } from '../../utils/personaliaUtils';
import { getBehandlingsstatusISak } from '../../utils/sakUtils';

interface Props {
    pleietrengende: Pleietrengende;
    sak: Sak;
    saksbehandlingstidUker?: number;
    harFlereSaker: boolean;
}

const SakPage: React.FunctionComponent<Props> = ({ sak, pleietrengende, saksbehandlingstidUker, harFlereSaker }) => {
    const navn = personaliaUtils.navn(pleietrengende);
    const router = useRouter();

    setBreadcrumbs(
        getAllBreadcrumbs([{ url: browserEnv.NEXT_PUBLIC_BASE_PATH, title: 'Din pleiepengesak' }], harFlereSaker),
    );

    onBreadcrumbClick((breadcrumb) => {
        router.push(breadcrumb.url);
    });

    const statusISak = getBehandlingsstatusISak(sak);

    return (
        <DefaultPageLayout
            pageHeader={
                <SakPageHeader
                    navn={navn}
                    saksnr={sak.saksnummer}
                    titleTag={statusISak ? <StatusTag {...statusISak} /> : null}
                />
            }>
            <Head>
                <title>Din pleiepengesak - {navn}</title>
            </Head>
            <VStack gap="12">
                {statusISak?.venteårsak && statusISak.status !== Behandlingsstatus.AVSLUTTET ? (
                    <VenteårsakMelding venteårsak={statusISak.venteårsak} />
                ) : null}
                <Box className="md:flex md:gap-6">
                    <div className="md:grow mb-10 md:mb-0">{<StatusISak sak={sak} tittel="Dette skjer i saken" />}</div>
                    <div className="md:mb-none shrink-0 md:w-72">
                        {statusISak === undefined || statusISak.status === Behandlingsstatus.AVSLUTTET ? null : (
                            <VStack gap="5">
                                <Saksbehandlingstid
                                    frist={sak.saksbehandlingsFrist}
                                    saksbehandlingstidUker={saksbehandlingstidUker}
                                    venteårsak={statusISak.venteårsak}
                                />
                            </VStack>
                        )}
                    </div>
                </Box>
                <Box>
                    <Snarveier title="Trenger du å oppdatere saken din?" />
                </Box>
                <Box className="mb-10">
                    <SnarveierSak />
                </Box>
            </VStack>
            <DevBranchInfo />
        </DefaultPageLayout>
    );
};

export default SakPage;