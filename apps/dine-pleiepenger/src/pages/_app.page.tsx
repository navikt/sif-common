import { ReactElement } from 'react';
import { IntlProvider } from 'react-intl';
import { AxiosError } from 'axios';
import { AppProps } from 'next/app';
import useSWR from 'swr';
import { ServerSidePropsResult } from '../auth/withAuthentication';
import ComponentLoader from '../components/component-loader/ComponentLoader';
import ErrorBoundary from '../components/error-boundary/ErrorBoundary';
import HentInnsynsdataFeilet from '../components/hent-innsynsdata-feilet/HentInnsynsdataFeilet';
import EmptyPage from '../components/layout/empty-page/EmptyPage';
import { InnsynsdataContextProvider } from '../context/InnsynsdataContextProvider';
import { Innsynsdata } from '../types/InnsynData';
import { messages } from '../utils/message';
import { innsynsdataFetcher } from './api/innsynsdata.api';
import 'react-loading-skeleton/dist/skeleton.css';
import '../components/process/process.css';
import '../style/global.css';

function MyApp({ Component, pageProps }: AppProps<ServerSidePropsResult>): ReactElement {
    const { data, error, isLoading } = useSWR<Innsynsdata, AxiosError>(
        '/dine-pleiepenger/api/innsynsdata',
        innsynsdataFetcher,
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false,
            errorRetryCount: 0,
        },
    );

    if (isLoading) {
        return (
            <EmptyPage>
                <ComponentLoader />
            </EmptyPage>
        );
    }
    if (error) {
        return (
            <EmptyPage>
                <HentInnsynsdataFeilet error={error} />
            </EmptyPage>
        );
    }

    return (
        <ErrorBoundary>
            <main>
                <IntlProvider locale="nb" messages={messages.nb}>
                    {data ? (
                        <InnsynsdataContextProvider innsynsdata={data}>
                            <Component {...pageProps} />
                        </InnsynsdataContextProvider>
                    ) : null}
                </IntlProvider>
            </main>
        </ErrorBoundary>
    );
}

export default MyApp;
