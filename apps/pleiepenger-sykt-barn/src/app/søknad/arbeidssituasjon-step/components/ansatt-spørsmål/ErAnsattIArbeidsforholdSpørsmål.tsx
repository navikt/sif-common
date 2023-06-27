import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { getTypedFormComponents, ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { ArbeidsforholdFormField, ArbeidsforholdFormValues } from '../../../../types/ArbeidsforholdFormValues';

const AnsattFormComponents = getTypedFormComponents<
    ArbeidsforholdFormField,
    ArbeidsforholdFormValues,
    ValidationError
>();

interface Props {
    arbeidsforhold: ArbeidsforholdFormValues;
    fieldName: ArbeidsforholdFormField;
}

const ErAnsattIArbeidsforholdSpørsmål: React.FunctionComponent<Props> = ({ arbeidsforhold, fieldName }) => {
    const intl = useIntl();
    return (
        <AnsattFormComponents.RadioGroup
            legend={intlHelper(intl, 'arbeidsforhold.erAnsatt.spm', {
                navn: arbeidsforhold.arbeidsgiver.navn,
            })}
            data-testid="er-ansatt"
            name={fieldName}
            radios={[
                {
                    label: 'Ja',
                    value: YesOrNo.YES,
                    'data-testid': 'er-ansatt_yes',
                },
                {
                    label: 'Nei',
                    value: YesOrNo.NO,
                    'data-testid': 'er-ansatt_no',
                },
            ]}
            value={arbeidsforhold.erAnsatt}
            validate={(value) => {
                return getYesOrNoValidator()(value)
                    ? {
                          key: 'validation.arbeidsforhold.erAnsatt.yesOrNoIsUnanswered',
                          values: { navn: arbeidsforhold.arbeidsgiver.navn },
                          keepKeyUnaltered: true,
                      }
                    : undefined;
            }}
        />
    );
};

export default ErAnsattIArbeidsforholdSpørsmål;
