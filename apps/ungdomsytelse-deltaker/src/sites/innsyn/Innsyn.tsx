import { setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import { EnvKey } from '@navikt/sif-common-env';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { useDeltakerContext } from '../../context/DeltakerContext';
import { appEnv } from '../../utils/appEnv';
import { InnsynContextProvider } from './context/InnsynContext';
import InnsynForside from './pages/InnsynForside';

const Innsyn = () => {
    const {
        data: { søker, deltakelserSøktFor, kontonummerInfo },
    } = useDeltakerContext();

    const deltakelse = deltakelserSøktFor[0];

    useEffectOnce(() => {
        setBreadcrumbs([
            { title: 'Min side', url: '/dittnav/' },
            { title: 'Ungdomsprogrammet', url: appEnv[EnvKey.PUBLIC_PATH] },
        ]);
    });

    return (
        <InnsynContextProvider initialData={{ deltakelse, kontonummerInfo, søker }}>
            <InnsynForside />
        </InnsynContextProvider>
    );
};

export default Innsyn;
