import { getCheckedValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { FrilansFormField, Frilanstype } from '../../../../../types/søknad-form-values/FrilansFormValues';
import { ArbFriFormComponents } from '../FrilanserFormPart';

const FrilansertypeSpørsmål = () => {
    return (
        <ArbFriFormComponents.RadioGroup
            legend={'Hva er din situasjon?'}
            name={FrilansFormField.frilanstype}
            validate={getCheckedValidator()}
            radios={[
                {
                    label: 'Jeg jobber som frilanser',
                    value: Frilanstype.FRILANS,
                },

                {
                    label: 'Jeg jobber som frilanser og får honorar for verv',
                    value: Frilanstype.FRILANS_HONORAR,
                },
                {
                    label: 'Jeg får honorar for verv',
                    value: Frilanstype.HONORAR,
                },
            ]}
        />
    );
};

export default FrilansertypeSpørsmål;
