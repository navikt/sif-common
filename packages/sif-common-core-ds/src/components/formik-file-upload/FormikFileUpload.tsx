import { Box, FileUpload, Heading, VStack } from '@navikt/ds-react';
import { useCallback, useContext } from 'react';
import {
    getErrorPropForFormikInput,
    TypedFormikFormContext,
    TypedFormInputValidationProps,
    ValidationError,
} from '@navikt/sif-common-formik-ds';
import { Field, FieldProps, useFormikContext } from 'formik';
import { CoreText, useCoreIntl } from '../../i18n/common.messages';
import { Vedlegg } from '../../types/Vedlegg';
import { getTotalSizeOfVedlegg } from '../../utils/vedleggUtils';
import FileUploadSizeProgress from './FileUploadSizeProgress';
import { getRejectedFileError } from './fileUploadUtils';
import { MAX_TOTAL_VEDLEGG_SIZE_BYTES } from './getVedleggValidator';
import { useFileUploader } from './useFileUploader';
import VedleggTotalSizeAlert from './VedleggTotalSizeAlert';
import PictureScanningGuide from '../picture-scanning-guide/PictureScanningGuide';

interface Props extends TypedFormInputValidationProps<string, ValidationError> {
    fieldName: string;
    label?: string;
    description?: string;
    useDefaultDescription?: boolean;
    headingLevel?: '2' | '3' | '4';
    initialFiles: Vedlegg[];
    otherFiles?: Vedlegg[];
    limits?: {
        MAX_FILES: number;
        MAX_SIZE_MB: number;
    };
    showSizeProgress?: boolean;
    showPictureScanningGuide?: boolean;
    uploadLaterURL?: string;
    retryEnabled?: boolean;
}

const FormikFileUpload = ({
    label,
    description,
    useDefaultDescription,
    fieldName,
    headingLevel = '2',
    limits = {
        MAX_FILES: 100,
        MAX_SIZE_MB: 10,
    },
    retryEnabled,
    initialFiles = [],
    otherFiles = [],
    uploadLaterURL,
    showSizeProgress,
    showPictureScanningGuide,
    validate,
}: Props) => {
    const { setFieldValue } = useFormikContext<any>();
    const intl = useCoreIntl();
    const typedFormikContext = useContext(TypedFormikFormContext);

    const totalSize = getTotalSizeOfVedlegg([...initialFiles, ...otherFiles]);

    const totalSizeExceedsLimit = totalSize > MAX_TOTAL_VEDLEGG_SIZE_BYTES;

    if (!typedFormikContext) {
        throw new Error('TypedFormikFormContext is required');
    }

    const onFilesChanged = useCallback(
        (files: Vedlegg[]) => {
            const newFiles = files.filter((file) => (file.uploaded || file.pending) && !file.error);
            setFieldValue(fieldName, newFiles, true);
        },
        [setFieldValue, fieldName],
    );

    const { onSelect, onRemove, onRetryUpload, acceptedFiles, rejectedFiles } = useFileUploader({
        initialFiles,
        onFilesChanged,
    });

    return (
        <VStack gap="4">
            <Field validate={validate ? (value: any) => validate(value, fieldName) : undefined} name={fieldName}>
                {({ field, form }: FieldProps) => {
                    const error = getErrorPropForFormikInput({
                        field,
                        form,
                        context: typedFormikContext,
                        error: undefined,
                    });
                    return (
                        <FileUpload.Dropzone
                            // ID trengs for at komponenten får fokus når feilmeldingen klikkes på i ErrorSummary
                            id={error ? fieldName : undefined}
                            label={label || intl.text('@core.formikFileUpload.label', limits)}
                            description={
                                useDefaultDescription
                                    ? intl.text('@core.formikFileUpload.description', limits)
                                    : description
                            }
                            maxSizeInBytes={limits.MAX_SIZE_MB * 1024 * 1024}
                            accept=".pdf, .png, .jpg, .jpeg"
                            fileLimit={{ max: limits.MAX_FILES, current: acceptedFiles.length }}
                            onSelect={onSelect}
                            error={error}
                        />
                    );
                }}
            </Field>

            {totalSizeExceedsLimit ? <VedleggTotalSizeAlert uploadLaterURL={uploadLaterURL} /> : null}

            {acceptedFiles.length > 0 && (
                <VStack gap="2">
                    <Heading level={headingLevel} size="xsmall">
                        <CoreText
                            id="@core.formikFileUpload.dokumenterLastetOpp.tittel"
                            values={{ antall: acceptedFiles.filter((a) => a.uploaded).length }}
                        />
                    </Heading>
                    {showSizeProgress && (
                        <Box marginBlock="0 4">
                            <FileUploadSizeProgress maxSize={MAX_TOTAL_VEDLEGG_SIZE_BYTES} usedSize={totalSize} />
                        </Box>
                    )}
                    <VStack as="ul" gap="3">
                        {acceptedFiles.map((file, index) => (
                            <FileUpload.Item
                                as="li"
                                key={index}
                                file={file.file}
                                onFileClick={file.info ? () => window.open(file.info?.url, '_blank') : undefined}
                                status={file.pending ? 'uploading' : undefined}
                                button={{
                                    action: 'delete',
                                    onClick: () => onRemove(file),
                                }}
                                translations={{
                                    uploading: intl.text('@core.formikFileUpload.dokumenterLastetOpp.lasterOpp'),
                                }}
                            />
                        ))}
                    </VStack>
                </VStack>
            )}

            {rejectedFiles.length > 0 && (
                <VStack gap="2">
                    <Heading level={headingLevel} size="xsmall">
                        <CoreText id="@core.formikFileUpload.dokumenterAvvist.tittel" />
                    </Heading>
                    <VStack as="ul" gap="3">
                        {rejectedFiles.map((rejected, index) => (
                            <FileUpload.Item
                                as="li"
                                key={index}
                                file={rejected.file}
                                error={getRejectedFileError(
                                    intl,
                                    rejected.reasons.length > 0 ? rejected.reasons[0] : undefined,
                                    limits,
                                )}
                                button={
                                    retryEnabled && rejected.canRetry
                                        ? {
                                              action: 'retry',
                                              onClick: () => onRetryUpload(rejected),
                                          }
                                        : {
                                              action: 'delete',
                                              onClick: () => onRemove(rejected),
                                          }
                                }
                            />
                        ))}
                    </VStack>
                </VStack>
            )}
            {showPictureScanningGuide ? <PictureScanningGuide headingLevel={headingLevel} /> : null}
        </VStack>
    );
};

export default FormikFileUpload;
