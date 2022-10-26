import React from 'react';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { getFødselsnummerValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import SøknadStep from '../../SøknadStep';
import { StepId } from '../../../types/StepId';
import {
    getPleietrengendeStepInitialValues,
    getPleietrengendeSøknadsdataFromFormValues,
} from './pleietrengendeStepUtils';

export enum PleietrengendeFormFields {
    'fødselsnummer' = 'fødselsnummer',
}

export interface PleietrengendeFormValues {
    [PleietrengendeFormFields.fødselsnummer]: string;
}

const { FormikWrapper, Form, TextField } = getTypedFormComponents<PleietrengendeFormFields, PleietrengendeFormValues>();

const PleietrengendeStep = () => {
    const { state } = useSøknadContext();

    const onValidSubmitHandler = (values: PleietrengendeFormValues) => {
        const pleietrengendeSøknadsdata = getPleietrengendeSøknadsdataFromFormValues(values);
        if (pleietrengendeSøknadsdata) {
            return [actionsCreator.setSøknadPleietrengende(pleietrengendeSøknadsdata)];
        }
        return [];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        StepId.PLEIETRENGENDE,
        (state: SøknadContextState) => {
            return lagreSøknadState(state);
        }
    );

    return (
        <SøknadStep stepId={StepId.PLEIETRENGENDE}>
            <FormikWrapper
                initialValues={getPleietrengendeStepInitialValues(state.søknadsdata)}
                onSubmit={handleSubmit}
                renderForm={() => (
                    <Form includeValidationSummary={true} submitButtonLabel="Gå videre" submitPending={isSubmitting}>
                        <TextField
                            label="Fødselsnummer"
                            name={PleietrengendeFormFields.fødselsnummer}
                            validate={getFødselsnummerValidator({
                                required: true,
                                disallowedValues: [state.søker.fødselsnummer],
                            })}
                            type="tel"
                            maxLength={11}
                            width="s"
                        />
                    </Form>
                )}
            />
        </SøknadStep>
    );
};

export default PleietrengendeStep;
