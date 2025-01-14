import { applicationIntlMessages } from '@i18n/index';
import { isProd } from '@navikt/sif-common-env';
import { ensureBaseNameForReactRouter, SoknadApplication } from '@navikt/sif-common-soknad-ds/src';
import { appEnv } from '@utils/appEnv';
import InitialDataLoader from './sites/InitialDataLoader';
import './app.css';

const {
    PUBLIC_PATH,
    SIF_PUBLIC_APPSTATUS_PROJECT_ID,
    SIF_PUBLIC_APPSTATUS_DATASET,
    APP_VERSION,
    SIF_PUBLIC_USE_AMPLITUDE,
    SIF_PUBLIC_AMPLITUDE_API_KEY,
} = appEnv;

ensureBaseNameForReactRouter(PUBLIC_PATH);

const App = () => {
    return (
        <SoknadApplication
            appVersion={APP_VERSION}
            appKey="ungdomsytelse"
            appName="Ungdomsytelse"
            appTitle="Ungdomsytelse MVP"
            publicPath={PUBLIC_PATH}
            intlMessages={applicationIntlMessages}
            appStatus={{
                sanityConfig: {
                    projectId: SIF_PUBLIC_APPSTATUS_PROJECT_ID,
                    dataset: SIF_PUBLIC_APPSTATUS_DATASET,
                },
            }}
            useAmplitude={SIF_PUBLIC_USE_AMPLITUDE ? SIF_PUBLIC_USE_AMPLITUDE === 'true' : isProd()}
            amplitudeApiKey={SIF_PUBLIC_AMPLITUDE_API_KEY}>
            <InitialDataLoader />
        </SoknadApplication>
    );
};

export default App;
