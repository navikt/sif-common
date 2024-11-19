import { TextFieldProps } from '@navikt/ds-react';
import React from 'react';
import { Field, FieldProps } from 'formik';
import { TestProps, TypedFormInputValidationProps } from '../../types';
import { getErrorPropForFormikInput } from '../../utils/typedFormErrorUtils';
import FormikTextField from '../formik-text-field/FormikTextField';
import { TextFieldWidths } from '../formik-text-field/FormikTextFieldUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import { parseNumberString } from '../../utils/parseNumberString';

interface OwnProps<FieldName> extends Omit<TextFieldProps, 'name' | 'children' | 'width'> {
    name: FieldName;
    integerValue?: boolean;
    width?: TextFieldWidths;
    formatter?: (value?: string) => string;
}

export type FormikNumberInputProps<FieldName, ErrorType> = OwnProps<FieldName> &
    TypedFormInputValidationProps<FieldName, ErrorType> &
    TestProps;

function FormikNumberInput<FieldName, ErrorType>({
    name,
    error,
    validate,
    autoComplete,
    width = 's',
    integerValue = false,
    ...restProps
}: FormikNumberInputProps<FieldName, ErrorType>) {
    const context = React.useContext(TypedFormikFormContext);
    return (
        <Field validate={validate ? (value: any) => validate(value, name) : undefined} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <FormikTextField
                        {...restProps}
                        {...field}
                        type="text"
                        width={width}
                        autoComplete={autoComplete || 'off'}
                        inputMode={integerValue ? 'numeric' : 'text'}
                        pattern={integerValue ? '[0-9]*' : undefined}
                        error={getErrorPropForFormikInput({ field, form, context, error })}
                        valueCleaner={(value: string) => {
                            try {
                                const number = parseNumberString(value);
                                return number.toString();
                            } catch {}
                            return value;
                        }}
                    />
                );
            }}
        </Field>
    );
}

export default FormikNumberInput;
