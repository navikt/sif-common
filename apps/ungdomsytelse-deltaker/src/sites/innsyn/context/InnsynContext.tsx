import { createContext, FunctionComponent, ReactNode } from 'react';
import { Deltakelse, KontonummerInfo } from '../../../api/types';
import { Søker } from '@navikt/sif-common-api';

interface InnsynContextData {
    søker: Søker;
    deltakelse: Deltakelse;
    kontonummerInfo?: KontonummerInfo;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const InnsynContext = createContext<InnsynContextData>(null!);

interface Props {
    initialData: InnsynContextData;
    children: ReactNode;
}

export const InnsynContextProvider: FunctionComponent<Props> = ({ children, initialData }) => {
    return <InnsynContext.Provider value={initialData}>{children}</InnsynContext.Provider>;
};
