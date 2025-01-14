import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import IntroPage from './pages/intro/IntroPage';
import VelkommenPage from './pages/velkommen/VelkommenPage';
import BarnStep from './steps/barn-step/BarnStep';
import ArbeidstidStep from './steps/arbeidstid-step/ArbeidstidStep';
import OppsummeringStep from './steps/oppsummering-step/OppsummeringStep';
import { SøknadRoutes } from './types/SøknadRoutes';
import KvitteringPage from './pages/kvittering/KvitteringPage';
import { useSøknadContext } from './context/hooks/useSøknadContext';
import { useEffect, useState } from 'react';
import { usePersistSøknadState } from './hooks/usePersistSøknadState';
import { relocateToRootPage, relocateToWelcomePage } from './utils/navigationUtils';

const SøknadRouter = () => {
    const {
        state: { søknadRoute, søknadsdata, søknadSendt },
    } = useSøknadContext();

    const [isFirstTimeLoadingApp, setIsFirstTimeLoadingApp] = useState(true);
    const { pathname } = useLocation();
    const navigateTo = useNavigate();
    usePersistSøknadState();

    useEffect(() => {
        if (søknadRoute && isFirstTimeLoadingApp) {
            setIsFirstTimeLoadingApp(false);
            navigateTo(søknadRoute);
        }
        if (pathname === SøknadRoutes.VELKOMMEN && søknadRoute === SøknadRoutes.SØKNAD_SENDT && søknadSendt) {
            relocateToWelcomePage();
        }
        if (
            pathname === SøknadRoutes.VELKOMMEN &&
            søknadRoute &&
            søknadRoute !== SøknadRoutes.SØKNAD_SENDT &&
            !søknadSendt
        ) {
            navigateTo(søknadRoute); // Send til sider dersom bruker kommer til velkommen via annen navigasjon
        }
    }, [navigateTo, pathname, søknadRoute, isFirstTimeLoadingApp]);

    if (søknadSendt && søknadRoute && søknadRoute !== SøknadRoutes.SØKNAD_SENDT) {
        relocateToRootPage();
    }

    if (søknadsdata.velkommen?.harForståttRettigheterOgPlikter !== true) {
        return (
            <Routes>
                <Route index element={<IntroPage />} />
                <Route path="soknad/velkommen" element={<VelkommenPage />} />
                <Route path={SøknadRoutes.SØKNAD_SENDT} element={<KvitteringPage />} />
                <Route path="*" element={<Navigate to={SøknadRoutes.VELKOMMEN} />} />
            </Routes>
        );
    }

    return (
        <Routes>
            <Route index element={<IntroPage />} />
            <Route path="soknad" element={<Navigate to={SøknadRoutes.VELKOMMEN} />} />
            <Route path="soknad/velkommen" element={<VelkommenPage />} />
            <Route path={SøknadRoutes.BARN} element={<BarnStep />} />
            <Route path={SøknadRoutes.ARBEIDSTID} element={<ArbeidstidStep />} />
            <Route path={SøknadRoutes.OPPSUMMERING} element={<OppsummeringStep />} />
            <Route path={SøknadRoutes.SØKNAD_SENDT} element={<KvitteringPage />} />
        </Routes>
    );
};

export default SøknadRouter;
