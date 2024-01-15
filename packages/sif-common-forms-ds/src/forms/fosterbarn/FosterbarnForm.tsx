import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import {
    getFødselsnummerValidator,
    getStringValidator,
    ValidateFødselsnummerError,
    ValidateStringError,
} from '@navikt/sif-common-formik-ds/src/validation';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import { guid } from '@navikt/sif-common-utils';
import { Fosterbarn, isFosterbarn } from './types';

interface FosterbarnFormText {
    form_fødselsnummer_label: string;
    form_navn_label: string;
}

interface Props {
    fosterbarn?: Partial<Fosterbarn>;
    onSubmit: (values: Fosterbarn) => void;
    onCancel: () => void;
    disallowedFødselsnumre?: string[];
    text?: FosterbarnFormText;
}

enum FosterbarnFormField {
    fødselsnummer = 'fødselsnummer',
    navn = 'navn',
}

type FormValues = Partial<Fosterbarn>;

export const FosterbarnFormErrors = {
    [FosterbarnFormField.navn]: {
        [ValidateStringError.stringHasNoValue]: 'fosterbarnForm.navn.stringHasNoValue',
    },
    [FosterbarnFormField.fødselsnummer]: {
        [ValidateStringError.stringHasNoValue]: 'fosterbarnForm.fødselsnummer.fødselsnummerHasNoValue',
        [ValidateFødselsnummerError.fødselsnummerIsNotAllowed]:
            'fosterbarnForm.fødselsnummer.fødselsnummerIsNotAllowed',
        [ValidateFødselsnummerError.fødselsnummerIsNot11Chars]:
            'fosterbarnForm.fødselsnummer.fødselsnummerIsNot11Chars',
        [ValidateFødselsnummerError.fødselsnummerIsInvalid]: 'fosterbarnForm.fødselsnummer.fødselsnummerIsInvalid',
    },
};

const Form = getTypedFormComponents<FosterbarnFormField, FormValues, ValidationError>();

const FosterbarnForm = ({
    fosterbarn: initialValues = { navn: '', fødselsnummer: '' },
    disallowedFødselsnumre,
    text,
    onSubmit,
    onCancel,
}: Props) => {
    const intl = useIntl();
    const onFormikSubmit = (formValues: FormValues) => {
        if (isFosterbarn(formValues)) {
            onSubmit({ ...formValues, id: initialValues.id || guid() });
        } else {
            throw new Error('Fosterbarn skjema: Formvalues is not a valid Fosterbarn on submit.');
        }
    };

    const defaultText: FosterbarnFormText = {
        form_navn_label: intlHelper(intl, 'fosterbarn.form.navn_label'),
        form_fødselsnummer_label: intlHelper(intl, 'fosterbarn.form.fødselsnummer_label'),
    };

    const txt = { ...defaultText, ...text };

    return (
        <>
            <Form.FormikWrapper
                initialValues={initialValues}
                onSubmit={onFormikSubmit}
                renderForm={() => (
                    <Form.Form
                        onCancel={onCancel}
                        formErrorHandler={getFormErrorHandler(intl, 'fosterbarnForm')}
                        submitButtonLabel="Ok"
                        showButtonArrows={false}>
                        <Form.TextField
                            name={FosterbarnFormField.navn}
                            label={txt.form_navn_label}
                            validate={getStringValidator({ required: true })}
                        />

                        <FormBlock>
                            <Form.TextField
                                name={FosterbarnFormField.fødselsnummer}
                                label={txt.form_fødselsnummer_label}
                                validate={getFødselsnummerValidator({
                                    required: true,
                                    disallowedValues: disallowedFødselsnumre,
                                })}
                                inputMode="numeric"
                                maxLength={11}
                            />
                        </FormBlock>
                    </Form.Form>
                )}
            />
        </>
    );
};

export default FosterbarnForm;
