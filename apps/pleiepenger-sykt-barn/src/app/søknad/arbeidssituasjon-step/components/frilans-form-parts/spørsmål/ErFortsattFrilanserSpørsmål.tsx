import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { FrilansFormField } from '../../../../../types/søknad-form-values/FrilansFormValues';
import { ArbFriFormComponents } from '../FrilanserFormPart';

interface Props {
    erFortsattFrilanserValue?: YesOrNo;
}

const ErFortsattFrilanserSpørsmål: React.FunctionComponent<Props> = ({ erFortsattFrilanserValue }) => {
    const intl = useIntl();
    return (
        <ArbFriFormComponents.RadioGroup
            name={FrilansFormField.erFortsattFrilanser}
            legend={intlHelper(intl, `frilanser.erFortsattFrilanser.spm`)}
            validate={(value) => {
                const error = getYesOrNoValidator()(value);
                return error
                    ? {
                          key: `${error}`,
                      }
                    : undefined;
            }}
            radios={[
                {
                    label: 'Ja',
                    value: YesOrNo.YES,
                },
                {
                    label: 'Nei',
                    value: YesOrNo.NO,
                },
            ]}
            value={erFortsattFrilanserValue}
        />
    );
};

export default ErFortsattFrilanserSpørsmål;
