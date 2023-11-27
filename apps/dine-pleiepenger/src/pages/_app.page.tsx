import { ReactElement } from 'react';
import { IntlProvider } from 'react-intl';
import { AxiosError } from 'axios';
import { AppProps } from 'next/app';
import useSWR from 'swr';
import { ServerSidePropsResult } from '../auth/withAuthentication';
import ComponentLoader from '../components/component-loader/ComponentLoader';
import ErrorBoundary from '../components/error-boundary/ErrorBoundary';
import HentBrukerFeilet from '../components/hent-bruker-feilet/HentBrukerFeilet';
import EmptyPage from '../components/layout/empty-page/EmptyPage';
import { Søker } from '../server/api-models/Søker';
import { messages } from '../utils/message';
import { søkerFetcher } from './api/soker.api';
import 'react-loading-skeleton/dist/skeleton.css';
import '../components/process/process.css';
import '../style/global.css';

function MyApp({ Component, pageProps }: AppProps<ServerSidePropsResult>): ReactElement {
    const { error, isLoading } = useSWR<Søker, AxiosError>('/dine-pleiepenger/api/soker', søkerFetcher, {
        errorRetryCount: 0,
    });

    if (isLoading) {
        return (
            <EmptyPage>
                <ComponentLoader />
            </EmptyPage>
        );
    }
    // if (error) {
    //     return <HentBrukerFeilet error={error} />;
    // }
    return (
        <ErrorBoundary>
            <main id="maincontent" role="main" tabIndex={-1}>
                <IntlProvider locale="nb" messages={messages.nb}>
                    {error ? <HentBrukerFeilet error={error} /> : null}
                    <Component {...pageProps} />
                </IntlProvider>
            </main>
        </ErrorBoundary>
    );
}

export default MyApp;
