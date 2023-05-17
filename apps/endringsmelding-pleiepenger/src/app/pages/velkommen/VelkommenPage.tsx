import { Heading, Ingress } from '@navikt/ds-react';
import { useIntl } from 'react-intl';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude/lib';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds/lib';
import { getListValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { SamtykkeFormPart } from '@navikt/sif-common-soknad-ds/lib/modules/samtykke-form/SamtykkeForm';
import { EndringType } from '@types';
import { useSakUtledet as useSakInfo } from '../../hooks/useSakInfo';
import { useStartSøknad } from '../../hooks/useStartSøknad';
import OmSøknaden from './OmSøknaden';

export enum VelkommenFormFields {
    harForståttRettigheterOgPlikter = 'harForståttRettigheterOgPlikter',
    hvaSkalEndres = 'hvaSkalEndres',
}

export interface VelkommenFormValues {
    [VelkommenFormFields.harForståttRettigheterOgPlikter]: boolean;
    [VelkommenFormFields.hvaSkalEndres]: EndringType[];
}

const { FormikWrapper, Form, CheckboxGroup } = getTypedFormComponents<
    VelkommenFormFields,
    VelkommenFormValues,
    ValidationError
>();

const VelkommenPage = () => {
    const intl = useIntl();
    const { startSøknad } = useStartSøknad();
    const { søkersFornavn, barnetsNavn, samletSøknadsperiodeTekst } = useSakInfo();

    useLogSidevisning(SIFCommonPageKey.velkommen);

    return (
        <Page title="Velkommen">
            <FormikWrapper
                initialValues={{ harForståttRettigheterOgPlikter: false, hvaSkalEndres: [] }}
                onSubmit={(values) => startSøknad(values.hvaSkalEndres)}
                renderForm={() => (
                    <Form
                        includeValidationSummary={true}
                        includeButtons={true}
                        submitButtonLabel={intlHelper(intl, 'velkommenForm.submitButtonLabel')}
                        formErrorHandler={getIntlFormErrorHandler(intl, 'velkommenForm')}>
                        <SifGuidePanel poster={true}>
                            <Heading level="1" size="large" data-testid="velkommen-header" spacing={true}>
                                Hei {søkersFornavn}
                            </Heading>
                            <Ingress as="div">
                                <p>
                                    Du kan melde fra om endringer i pleiepenger for <strong>{barnetsNavn}</strong> i
                                    tidsrommet {samletSøknadsperiodeTekst}.
                                </p>
                                <Block margin="xl">
                                    <CheckboxGroup
                                        name={VelkommenFormFields.hvaSkalEndres}
                                        legend={
                                            <Heading level={'2'} size="small">
                                                Hva ønsker du å endre?
                                            </Heading>
                                        }
                                        validate={getListValidator({ minItems: 1 })}
                                        checkboxes={[
                                            {
                                                'data-testid': 'endreLovbestemtFerie',
                                                label: 'Ferie',
                                                value: EndringType.lovbestemtFerie,
                                            },
                                            {
                                                'data-testid': 'endreArbeidstid',
                                                label: 'Jobb',
                                                value: EndringType.arbeidstid,
                                            },
                                        ]}
                                    />
                                </Block>
                            </Ingress>
                            <OmSøknaden />
                        </SifGuidePanel>
                        <FormBlock>
                            <SamtykkeFormPart />
                        </FormBlock>
                    </Form>
                )}
            />
        </Page>
    );
};

export default VelkommenPage;
