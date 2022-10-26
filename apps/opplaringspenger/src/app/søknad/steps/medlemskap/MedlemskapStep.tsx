import React from 'react';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import SøknadStep from '../../SøknadStep';
import { getMedlemskapStepInitialValues } from './medlemskapStepUtils';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { BostedUtland } from '@navikt/sif-common-forms-ds/lib';
import { getMedlemskapSøknadsdataFromFormValues } from './getMedlemskapSøknadsdata';

export enum MedlemskapFormFields {
    harBoddUtenforNorgeSiste12Mnd = 'harBoddUtenforNorgeSiste12Mnd',
    utenlandsoppholdSiste12Mnd = 'utenlandsoppholdSiste12Mnd',
    skalBoUtenforNorgeNeste12Mnd = 'skalBoUtenforNorgeNeste12Mnd',
    utenlandsoppholdNeste12Mnd = 'utenlandsoppholdNeste12Mnd',
}

export interface MedlemskapFormValues {
    [MedlemskapFormFields.harBoddUtenforNorgeSiste12Mnd]: YesOrNo;
    [MedlemskapFormFields.utenlandsoppholdSiste12Mnd]: BostedUtland[];
    [MedlemskapFormFields.skalBoUtenforNorgeNeste12Mnd]: YesOrNo;
    [MedlemskapFormFields.utenlandsoppholdNeste12Mnd]: BostedUtland[];
}

const MedlemskapFormComponents = getTypedFormComponents<MedlemskapFormFields, MedlemskapFormValues>();

const MedlemskapStep = () => {
    const {
        dispatch,
        state: { søknadsdata },
    } = useSøknadContext();

    const onValidSubmitHandler = (values: MedlemskapFormValues) => {
        const medlemskapSøknadsdata = getMedlemskapSøknadsdataFromFormValues(values);
        if (medlemskapSøknadsdata) {
            dispatch(actionsCreator.setSøknadMedlemskap(medlemskapSøknadsdata));
        }
        return [];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        StepId.MEDLEMSKAP,
        (state: SøknadContextState) => {
            return lagreSøknadState(state);
        }
    );

    return (
        <SøknadStep stepId={StepId.MEDLEMSKAP}>
            <MedlemskapFormComponents.FormikWrapper
                initialValues={getMedlemskapStepInitialValues(søknadsdata)}
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit}
                renderForm={() => <MedlemskapFormComponents.Form>Skjema ikke laget</MedlemskapFormComponents.Form>}
            />
        </SøknadStep>
    );
};

export default MedlemskapStep;
