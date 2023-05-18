import React from 'react';
import FormikValuesObserver from '@navikt/sif-common-formik-ds/lib/components/helpers/formik-values-observer/FormikValuesObserver';
import { StepId } from '../../søknad/config/StepId';
import { useStepFormValuesContext } from '../../søknad/context/StepFormValuesContext';

interface Props {
    stepId: StepId;
    onChange?: () => void;
}

/**
 * Oppdaterer StepFormValuesContext når formik values endrer seg
 */
const PersistStepFormValues: React.FunctionComponent<Props> = ({ stepId, onChange }) => {
    const { setStepFormValues } = useStepFormValuesContext();
    return (
        <FormikValuesObserver
            onChange={(formValues) => {
                setStepFormValues(stepId, { [stepId]: formValues });
                if (onChange) {
                    onChange();
                }
            }}
        />
    );
};

export default PersistStepFormValues;
