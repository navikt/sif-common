import { DatePickerDefaultProps } from '@navikt/ds-react/esm/date/datepicker/DatePicker';
/* eslint-disable no-console */
import React from 'react';
import { useFormikContext } from 'formik';
import { TypedFormInputValidationProps, UseFastFieldProps } from '../../types';
import { InputDateStringToISODateString } from '../formik-datepicker/dateFormatUtils';
import { ISOStringToDate } from '../formik-datepicker/datepickerUtils';
import FormikDatepicker, { DatePickerBaseProps, DatepickerLimitations } from '../formik-datepicker/FormikDatepicker';
import FormikInputGroup from '../formik-input-group/FormikInputGroup';
import { getDateRangePickerLimitations } from './dateRangePickerUtils';
import './dateRangePicker.scss';

interface OwnProps<FieldName, ErrorType> {
    legend: string;
    description?: React.ReactNode;
    locale?: string;
    allowRangesToStartAndStopOnSameDate?: boolean;
    fromInputProps: DatePickerBaseProps<FieldName, ErrorType>;
    toInputProps: DatePickerBaseProps<FieldName, ErrorType>;
}

export type FormikDateRangePickerProps<FieldName, ErrorType> = OwnProps<FieldName, ErrorType> &
    TypedFormInputValidationProps<FieldName, ErrorType> &
    DatepickerLimitations &
    UseFastFieldProps &
    Pick<DatePickerDefaultProps, 'dropdownCaption'>;

function FormikDateRangePicker<FieldName, ErrorType>({
    legend,
    fromInputProps,
    toInputProps,
    description,
    minDate,
    maxDate,
    disableWeekends,
    disabledDateRanges,
    allowRangesToStartAndStopOnSameDate,
    useFastField,
    dropdownCaption,
    validate,
    locale,
}: FormikDateRangePickerProps<FieldName, ErrorType>) {
    const { values } = useFormikContext<any>();

    const fromDate = ISOStringToDate(InputDateStringToISODateString(values[fromInputProps.name]));
    const toDate = ISOStringToDate(InputDateStringToISODateString(values[toInputProps.name]));

    const { fromDateLimitations, toDateLimitations } = getDateRangePickerLimitations({
        fromDate,
        toDate,
        minDate,
        maxDate,
        dateRanges: disabledDateRanges,
        disableWeekends,
        allowRangesToStartAndStopOnSameDate,
    });

    const name = `${fromInputProps.name}_${toInputProps.name}` as any;

    return (
        <FormikInputGroup
            name={name}
            legend={legend}
            description={description}
            className="dateRangePicker"
            validate={validate ? (value: any) => validate(value, name) : undefined}>
            <div className="dateRangePicker__flexContainer">
                <div className="dateRangePicker__from">
                    <FormikDatepicker<FieldName, ErrorType>
                        {...fromInputProps}
                        {...fromDateLimitations}
                        dropdownCaption={dropdownCaption}
                        locale={locale as any}
                        useFastField={useFastField}
                    />
                </div>
                <div className="dateRangePicker__to">
                    <FormikDatepicker<FieldName, ErrorType>
                        {...toInputProps}
                        {...toDateLimitations}
                        dropdownCaption={dropdownCaption}
                        locale={locale as any}
                        useFastField={useFastField}
                    />
                </div>
            </div>
        </FormikInputGroup>
    );
}

export default FormikDateRangePicker;
