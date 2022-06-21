/* eslint-disable no-console */
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import MessagesPreview from '@navikt/sif-common-core/lib/dev-utils/intl/messages-preview/MessagesPreview';
import { date1YearAgo, date1YearFromNow } from '@navikt/sif-common-core/lib/utils/dateUtils';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds/lib';
import { getListValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib/validation/types';
import flat from 'flat';
import FerieuttakForm, { FerieuttakFormErrors } from '../../../src/forms/ferieuttak/FerieuttakForm';
import FerieuttakListAndDialog from '../../../src/forms/ferieuttak/FerieuttakListAndDialog';
import ferieuttakMessages from '../../../src/forms/ferieuttak/ferieuttakMessages';
import { Ferieuttak } from '../../../src/forms/ferieuttak/types';
import SubmitPreview from '../../components/submit-preview/SubmitPreview';
import FormValidationErrorMessages from '../../components/validation-error-messages/ValidationErrorMessages';
import { Heading, Panel } from '@navikt/ds-react';

enum FormField {
    'ferie' = 'ferie',
}

interface FormValues {
    [FormField.ferie]: Ferieuttak[];
}
const initialValues: FormValues = { ferie: [] };

const FormikExample = () => {
    const [singleFormValues, setSingleFormValues] = useState<Partial<Ferieuttak> | undefined>(undefined);
    const [listFormValues, setListFormValues] = useState<Partial<FormValues> | undefined>(undefined);
    const intl = useIntl();
    return (
        <>
            <Box padBottom="l">
                <Heading level="2" size="small">
                    Liste og dialog
                </Heading>
            </Box>
            <Panel border={true}>
                <TypedFormikWrapper<FormValues>
                    initialValues={initialValues}
                    onSubmit={setListFormValues}
                    renderForm={() => {
                        return (
                            <TypedFormikForm<FormValues, ValidationError>
                                includeButtons={true}
                                submitButtonLabel="Valider skjema"
                                formErrorHandler={getFormErrorHandler(intl)}>
                                <FerieuttakListAndDialog<FormField>
                                    name={FormField.ferie}
                                    minDate={date1YearAgo}
                                    maxDate={date1YearFromNow}
                                    validate={getListValidator({ required: true })}
                                    labels={{
                                        addLabel: 'Legg til ferie',
                                        listTitle: 'Registrerte ferier',
                                        modalTitle: 'Ferie',
                                        emptyListText: 'Ingen ferier er lagt til',
                                    }}
                                />
                            </TypedFormikForm>
                        );
                    }}
                />
                <SubmitPreview values={listFormValues} />
            </Panel>

            <Box margin="xxl" padBottom="l">
                <FormValidationErrorMessages
                    validationErrorIntlKeys={flat(FerieuttakFormErrors)}
                    intlMessages={ferieuttakMessages}
                />
            </Box>

            <Box margin="xxl" padBottom="l">
                <Heading level="2" size="small">
                    Kun dialog
                </Heading>
            </Box>

            <Panel border={true}>
                <FerieuttakForm
                    minDate={date1YearAgo}
                    maxDate={date1YearFromNow}
                    ferieuttak={{}}
                    onSubmit={setSingleFormValues}
                    onCancel={() => console.log('cancel me')}
                />
            </Panel>
            <SubmitPreview values={singleFormValues} />

            <MessagesPreview messages={ferieuttakMessages} showExplanation={false} />
        </>
    );
};

export default FormikExample;
