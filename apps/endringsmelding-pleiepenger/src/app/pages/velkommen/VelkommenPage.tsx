import { BodyLong, Heading } from '@navikt/ds-react';
import { useSakUtledet as useSakInfo, useStartSøknad } from '@hooks';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { getListValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { SamtykkeFormPart } from '@navikt/sif-common-soknad-ds';
import { EndringType } from '@types';
import OmSøknaden from './OmSøknaden';
import { AppText, useAppIntl } from '../../i18n';

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
    const { text, intl } = useAppIntl();
    const { startSøknad } = useStartSøknad();
    const { søkersFornavn, barnetsNavn, samletSøknadsperiodeTekst } = useSakInfo();

    return (
        <Page title={text('application.title')}>
            <FormikWrapper
                initialValues={{ harForståttRettigheterOgPlikter: false, hvaSkalEndres: [] }}
                onSubmit={(values) => startSøknad(values.hvaSkalEndres)}
                renderForm={() => (
                    <Form
                        includeValidationSummary={true}
                        includeButtons={true}
                        submitButtonLabel={text('velkommenForm.submitButtonLabel')}
                        formErrorHandler={getIntlFormErrorHandler(intl, 'velkommenForm')}>
                        <SifGuidePanel poster={true}>
                            <Heading level="1" size="large" data-testid="velkommen-header" spacing={true}>
                                <AppText id="velkommenPage.guide.tittel" values={{ navn: søkersFornavn }} />
                            </Heading>
                            <BodyLong size="large">
                                <AppText
                                    id="velkommenPage.guide.tekst"
                                    values={{
                                        barnetsNavn: <strong key="barnetsNavn">{barnetsNavn}</strong>,
                                        samletSøknadsperiodeTekst,
                                    }}
                                />
                            </BodyLong>
                            <Block margin="xl">
                                <CheckboxGroup
                                    name={VelkommenFormFields.hvaSkalEndres}
                                    legend={
                                        <Heading level={'2'} size="small">
                                            <AppText id="velkommenPage.endre.spm" />
                                        </Heading>
                                    }
                                    validate={getListValidator({ minItems: 1 })}
                                    checkboxes={[
                                        {
                                            'data-testid': 'endreLovbestemtFerie',
                                            label: text('velkommenPage.endre.ferie'),
                                            value: EndringType.lovbestemtFerie,
                                        },
                                        {
                                            'data-testid': 'endreArbeidstid',
                                            label: text('velkommenPage.endre.jobb'),
                                            value: EndringType.arbeidstid,
                                        },
                                    ]}
                                />
                            </Block>
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
