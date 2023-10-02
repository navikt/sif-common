import React, { useRef } from 'react';
import { FastField, Field, FieldProps } from 'formik';
import { InputTime, TestProps, TypedFormInputValidationProps, UseFastFieldProps } from '../../types';
import { getErrorPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import TimeInput, { TimeInputLabels, TimeInputLayoutProps, TimeInputRefProps } from './TimeInput';
import { focusFirstElement } from '../../utils/focusUtils';
import bemUtils from '../../utils/bemUtils';
import { TextFieldProps } from '@navikt/ds-react';
import SkjemagruppeQuestion from '../helpers/skjemagruppe-question/SkjemagruppeQuestion';

interface OwnProps<FieldName> extends Omit<TextFieldProps, 'name' | 'onChange'> {
    name: FieldName;
    maxHours?: number;
    maxMinutes?: number;
    timeInputLayout?: TimeInputLayoutProps;
    timeInputLabels?: TimeInputLabels;
    hideErrorMessage?: boolean;
}

export type FormikTimeInputProps<FieldName, ErrorType> = OwnProps<FieldName> &
    TypedFormInputValidationProps<FieldName, ErrorType> &
    UseFastFieldProps &
    TimeInputRefProps &
    TestProps;

const bem = bemUtils('formikTimeInput');

export const Div = (props: any) => <div {...props} />;

function FormikTimeInput<FieldName, ErrorType>({
    label,
    name,
    validate,
    error,
    timeInputLayout,
    useFastField,
    description,
    timeInputLabels,
    hideErrorMessage,
    ...restProps
}: FormikTimeInputProps<FieldName, ErrorType>) {
    const context = React.useContext(TypedFormikFormContext);
    const ref = useRef<any>();
    const FieldComponent = useFastField ? FastField : Field;

    const skjemagruppeClassName = bem.classNames(
        bem.block,
        bem.modifierConditional(timeInputLayout?.direction, timeInputLayout?.direction !== undefined),
    );

    if (restProps.disabled) {
        return (
            <SkjemagruppeQuestion className={skjemagruppeClassName} ref={ref} legend={label} description={description}>
                <TimeInput
                    {...restProps}
                    {...timeInputLayout}
                    justifyContent="left"
                    onChange={() => null}
                    labels={timeInputLabels}
                />
            </SkjemagruppeQuestion>
        );
    }

    return (
        <FieldComponent validate={validate ? (value: any) => validate(value, name) : undefined} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <SkjemagruppeQuestion
                        className={skjemagruppeClassName}
                        ref={ref}
                        error={
                            hideErrorMessage ? undefined : getErrorPropForFormikInput({ field, form, context, error })
                        }
                        id={name as any}
                        onFocus={(evt) => {
                            if (evt.target.id === ref.current.props?.id) {
                                focusFirstElement(evt.target);
                            }
                        }}
                        legend={label}
                        description={description}>
                        <TimeInput
                            {...restProps}
                            {...field}
                            {...timeInputLayout}
                            justifyContent="left"
                            time={field.value || undefined}
                            onChange={(time: Partial<InputTime> | undefined) => {
                                form.setFieldValue(field.name, time);
                                if (context) {
                                    context.onAfterFieldValueSet();
                                }
                            }}
                            labels={timeInputLabels}
                        />
                    </SkjemagruppeQuestion>
                );
            }}
        </FieldComponent>
    );
}

export default FormikTimeInput;
