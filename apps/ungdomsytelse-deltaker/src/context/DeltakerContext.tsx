import { createContext, ReactNode, useContext, useState } from 'react';
import { RegistrertBarn, Søker } from '@navikt/sif-common-api';
import { Deltakelse, KontonummerInfo } from '@api/types';
import { deltakelseErÅpenForRapportering } from '@utils/deltakelserUtils';

interface DeltakerContextType {
    data: DeltakerContextData;
    updateDeltakelse: (deltakelser: Deltakelse[]) => void;
}

export interface DeltakerContextData {
    søker: Søker;
    barn: RegistrertBarn[];
    kontonummerInfo?: KontonummerInfo;
    alleDeltakelser: Deltakelse[];
    deltakelserSøktFor: Deltakelse[];
    deltakelserIkkeSøktFor: Deltakelse[];
    deltakelserÅpenForRapportering: Deltakelse[];
    site: 'soknad' | 'innsyn';
}

export const DeltakerContext = createContext<DeltakerContextType>(null!);

export const useDeltakerContext = (): DeltakerContextType => {
    const context = useContext(DeltakerContext);
    if (!context) {
        throw new Error('useDeltakerContext must be used within a DeltakerContextProvider');
    }
    return context;
};
interface Props {
    children: ReactNode;
    initialData: DeltakerContextData;
}

export const DeltakerContextProvider = ({ children, initialData }: Props) => {
    const [data, setData] = useState<DeltakerContextData>(initialData);

    const updateDeltakelse = (deltakelser: Deltakelse[]) => {
        setData({
            ...data,
            alleDeltakelser: deltakelser,
            deltakelserSøktFor: deltakelser.filter((d) => d.harSøkt),
            deltakelserIkkeSøktFor: deltakelser.filter((d) => !d.harSøkt),
            deltakelserÅpenForRapportering: deltakelser.filter(deltakelseErÅpenForRapportering),
        });
    };

    return <DeltakerContext.Provider value={{ data, updateDeltakelse }}>{children}</DeltakerContext.Provider>;
};
