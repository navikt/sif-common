import { Deltakelse } from '@api/types';
import { DateRange, dateToISOString, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';

import { capsFirstCharacter, dateFormatter } from '@navikt/sif-common-utils';
import { Alert, Box, Button, Heading, HStack } from '@navikt/ds-react';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { useAppIntl } from '../../i18n';
import { getNumberValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { useRapporterInntekt } from '@hooks/useRapporterInntekt';
import TimedContent from '../timed-content/TimedContent';

interface Props {
    deltakelse: Deltakelse;
    måned: DateRange;
}

enum InntektFormFields {
    'inntekt' = 'inntekt',
}

type InntektFormValues = {
    inntekt: string;
};

const { TextField, Form, FormikWrapper } = getTypedFormComponents<
    InntektFormFields,
    InntektFormValues,
    ValidationError
>();

const InntektEnMånedForm = ({ måned }: Props) => {
    const { rapporterInntekt, resetInntektLagret, inntektLagret, error, resetError, isSubmitting } =
        useRapporterInntekt();

    const onSubmit = (data: InntektFormValues) => {
        rapporterInntekt(måned, parseInt(data.inntekt, 10));
    };
    const { intl } = useAppIntl();
    const månedNavn = `${dateFormatter.monthFullYear(måned.from)}`;
    const headingId = `heading_${dateToISOString(måned.from)}`;
    return (
        <FormikWrapper
            initialValues={{
                inntekt: '',
            }}
            onSubmit={onSubmit}
            renderForm={() => {
                return (
                    <Form
                        formErrorHandler={getIntlFormErrorHandler(intl)}
                        includeButtons={false}
                        isFinalSubmit={true}
                        submitPending={isSubmitting}>
                        <Heading level="3" size="xsmall" id={headingId} spacing={true}>
                            {capsFirstCharacter(dateFormatter.monthFullYear(måned.from))}
                        </Heading>
                        <HStack gap="3" align="start">
                            <TextField
                                hideLabel={true}
                                aria-labelledby={headingId}
                                name={InntektFormFields.inntekt}
                                label={capsFirstCharacter(dateFormatter.monthFullYear(måned.from))}
                                type="text"
                                validate={getNumberValidator({
                                    required: true,
                                })}
                                required
                                min={0}
                                onFocus={() => {
                                    resetInntektLagret();
                                    resetError();
                                }}
                            />
                            <Box>
                                <HStack gap="2" align={'center'}>
                                    <Button loading={isSubmitting} type="submit" aria-label={`Send for ${månedNavn}`}>
                                        Send
                                    </Button>
                                    {inntektLagret ? (
                                        <TimedContent>
                                            <Box>
                                                <Alert variant="success" inline={true}>
                                                    Inntekt lagret for {månedNavn}
                                                </Alert>
                                            </Box>
                                        </TimedContent>
                                    ) : null}
                                    {error ? (
                                        <Box>
                                            <Alert variant="error" inline={true}>
                                                {error}
                                            </Alert>
                                        </Box>
                                    ) : null}
                                </HStack>
                            </Box>
                        </HStack>
                    </Form>
                );
            }}></FormikWrapper>
    );
};

export default InntektEnMånedForm;
