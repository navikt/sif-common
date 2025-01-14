import { VStack } from '@navikt/ds-react';
import { setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { EnvKey } from '@navikt/sif-common-env';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import InntektsrapporteringForm from '../../../components/inntektsrapportering/InnteksrapporteringForm';
import VelkommenPageHeader from '../../../components/velkommen-page-header/VelkommenPageHeader';
import { useDeltakerContext } from '../../../context/DeltakerContext';
import { appEnv } from '../../../utils/appEnv';
import ManglendeKontonummer from '../components/ManglendeKontonummer';
import DeltakelseInfo from '../components/DeltakelseInfo';

const InnsynForside = () => {
    const {
        data: { søker, deltakelserSøktFor, kontonummerInfo },
    } = useDeltakerContext();

    const deltakelse = deltakelserSøktFor[0];
    // const { programPeriode } = deltakelse;

    useEffectOnce(() => {
        setBreadcrumbs([
            { title: 'Min side', url: '/dittnav/' },
            { title: 'Ungdomsprogrammet', url: appEnv[EnvKey.PUBLIC_PATH] },
        ]);
    });

    return (
        <Page title="Ungdomsprogrammet">
            <VStack gap="8">
                <VelkommenPageHeader title="Ungdomsprogrammet" />
                {/* <Box className="bg-deepblue-50 p-8 rounded-md">
                    <Heading level="1" size="medium" spacing={true}>
                        Hei {søker.fornavn}
                    </Heading>
                    <BodyLong>
                        Du er meldt på av din veileder til å være med i ungdomsprogrammet fra og med{' '}
                        <strong>{dateFormatter.dateShortMonthYear(programPeriode.from)}</strong>.
                    </BodyLong>
                </Box> */}
                {kontonummerInfo && kontonummerInfo.kontoregisterStatus === 'FAILURE' ? (
                    <ManglendeKontonummer kontonummerInfo={kontonummerInfo} />
                ) : null}

                <DeltakelseInfo deltakelse={deltakelse} søker={søker} kontonummerInfo={kontonummerInfo} />
                <InntektsrapporteringForm deltakelse={deltakelse} />
            </VStack>
        </Page>
    );
};

export default InnsynForside;
