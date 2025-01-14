import React, { createContext, FunctionComponent, useContext, useState } from 'react';
import { StepFormValues } from '../types/StepFormValues';
import { StepId } from '../types/StepId';

interface StepFormValuesContextInterface {
    stepFormValues: StepFormValues;
    clearAllSteps: () => void;
    clearStepFormValues: (stepId: StepId) => void;
    setStepFormValues: (stepId: StepId, formValues: StepFormValues) => void;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const StepFormValuesContext = createContext<StepFormValuesContextInterface>(null!);

export const useStepFormValuesContext = () => useContext(StepFormValuesContext);

interface Props {
    children: React.ReactNode;
    initialValues?: StepFormValues;
}

export const StepFormValuesContextProvider: FunctionComponent<Props> = ({ children, initialValues }) => {
    const [values, setValues] = useState<StepFormValues>(initialValues || {});
    return (
        <StepFormValuesContext.Provider
            value={{
                stepFormValues: values,
                clearStepFormValues: (stepId: StepId) => {
                    setValues({ ...values, [stepId]: undefined });
                },
                clearAllSteps: () => {
                    setValues({});
                },
                setStepFormValues: (stepId: StepId, formValues: StepFormValues) => {
                    setValues({ ...values, [stepId]: formValues[stepId] });
                },
            }}>
            {children}
        </StepFormValuesContext.Provider>
    );
};
