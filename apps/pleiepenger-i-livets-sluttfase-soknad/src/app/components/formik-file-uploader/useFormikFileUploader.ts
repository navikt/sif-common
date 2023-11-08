import { FileRejection } from 'react-dropzone';
import { isForbidden, isUnauthorized } from '@navikt/sif-common-core-ds/lib/utils/apiUtils';
import {
    attachmentShouldBeProcessed,
    attachmentShouldBeUploaded,
    attachmentUploadHasFailed,
    getAttachmentFromFile,
    getPendingAttachmentFromFile,
    isFileObject,
    mapFileToPersistedFile,
} from '@navikt/sif-common-core-ds/lib/utils/attachmentUtils';
import { AxiosResponse } from 'axios';
import { ArrayHelpers } from 'formik';

export interface PersistedFile {
    isPersistedFile: boolean;
    name: string;
    lastModified: number;
    size: number;
    type: string;
}

export interface Attachment {
    file: File | PersistedFile;
    pending: boolean;
    uploaded: boolean;
    url?: string;
}

export type FieldArrayReplaceFn = (index: number, value: any) => void;
export type FieldArrayPushFn = (obj: any) => void;
export type FieldArrayRemoveFn = (index: number) => undefined;

export const useFormikFileUploader = ({
    value,
    uploadFile,
    onFilesUploaded,
    onErrorUploadingAttachments,
    onUnauthorizedOrForbiddenUpload,
    getAttachmentURLFrontend: modifyAttachmentUrl,
}: {
    value: Attachment[];
    uploadFile: (file: File) => Promise<AxiosResponse<any, any>>;
    onFilesUploaded?: (antall: number, antallFeilet: number) => void;
    onUnauthorizedOrForbiddenUpload: () => void;
    onErrorUploadingAttachments: (files: File[]) => void;
    getAttachmentURLFrontend: (url: string) => string;
}) => {
    async function uploadAttachment(attachment: Attachment) {
        const { file } = attachment;
        if (isFileObject(file)) {
            try {
                const response = await uploadFile(file);
                attachment = setAttachmentPendingToFalse(attachment);
                attachment.url = modifyAttachmentUrl(response.headers.location);
                attachment.uploaded = true;
            } catch (error) {
                if (isForbidden(error) || isUnauthorized(error)) {
                    onUnauthorizedOrForbiddenUpload();
                }
                setAttachmentPendingToFalse(attachment);
            }
        }
    }

    async function uploadAttachments(
        allAttachments: Attachment[],
        fileRejections: FileRejection[],
        replaceFn: FieldArrayReplaceFn,
    ) {
        const attachmentsToProcess = findAttachmentsToProcess(allAttachments);
        const attachmentsToUpload = findAttachmentsToUpload(attachmentsToProcess);

        const attachmentsNotToUpload = [
            ...attachmentsToProcess.filter((el) => !attachmentsToUpload.includes(el)),
            ...fileRejections.map((f) => getAttachmentFromFile(f.file)),
        ];

        for (const attachment of attachmentsToUpload) {
            await uploadAttachment(attachment);
            updateAttachmentListElement(allAttachments, attachment, replaceFn);
        }

        const failedAttachments = [...attachmentsNotToUpload, ...attachmentsToUpload.filter(attachmentUploadHasFailed)];
        updateFailedAttachments(allAttachments, failedAttachments, replaceFn);
        if (onFilesUploaded) {
            onFilesUploaded(attachmentsToUpload.length, failedAttachments.length);
        }
    }

    function updateFailedAttachments(
        allAttachments: Attachment[],
        failedAttachments: Attachment[],
        replaceFn: FieldArrayReplaceFn,
    ) {
        failedAttachments.forEach((attachment) => {
            attachment = setAttachmentPendingToFalse(attachment);
            updateAttachmentListElement(allAttachments, attachment, replaceFn);
        });
        const failedFiles: File[] = failedAttachments
            .map(({ file }) => file)
            .filter((f: File | PersistedFile) => isFileObject(f)) as File[];

        onErrorUploadingAttachments(failedFiles);
    }

    function findAttachmentsToProcess(attachments: Attachment[]): Attachment[] {
        return attachments.filter(attachmentShouldBeProcessed);
    }

    function findAttachmentsToUpload(attachments: Attachment[]): Attachment[] {
        return attachments.filter(attachmentShouldBeUploaded);
    }

    function updateAttachmentListElement(
        attachments: Attachment[],
        attachment: Attachment,
        replaceFn: FieldArrayReplaceFn,
    ) {
        replaceFn(attachments.indexOf(attachment), { ...attachment, file: mapFileToPersistedFile(attachment.file) });
    }

    function setAttachmentPendingToFalse(attachment: Attachment) {
        attachment.pending = false;
        return attachment;
    }

    function addPendingAttachmentToFieldArray(file: File, pushFn: FieldArrayPushFn) {
        const attachment = getPendingAttachmentFromFile(file);
        pushFn(attachment);
        return attachment;
    }

    const onFilesSelect = async (files: File[], rejectedFiles: FileRejection[], { push, replace }: ArrayHelpers) => {
        const attachments = files.map((file) => addPendingAttachmentToFieldArray(file, push));
        await uploadAttachments([...value, ...attachments], rejectedFiles, replace);
    };

    return {
        onFilesSelect,
    };
};
