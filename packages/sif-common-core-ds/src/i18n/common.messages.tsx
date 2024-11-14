import { FormattedMessage, useIntl } from 'react-intl';
import { pictureScanningGuideMessages } from '../components/picture-scanning-guide/i18n/pictureScanningGuideMessages';
import { typedIntlHelper } from '../utils/intlUtils';

const nb = {
    Ja: 'Ja',
    Nei: 'Nei',
    '@core.common.fileUploadError': 'Det har dessverre skjedd en feil under opplasting av følgende vedlegg:',
    '@core.formikAttachmentsList.delete': 'Fjern',
    '@core.AttachmentList.fjern': 'Fjern {filnavn}',
    '@core.AttachmentList.fjernAriaLabel': 'Fjern {filnavn}',
    '@core.AttachmentList.ingenVedlegg': 'Ingen dokumenter er lastet opp',
    '@core.formikAttachmentsList.noFilesUploaded': 'Ingen dokumenter er lastet opp',
    '@core.formik-attachment-form.alert.totalSize':
        'Du har totalt lastet opp mer enn grensen på 24 MB. Det betyr at du må fjerne noe av det du har lastet opp. Hvis det betyr at du ikke får plass til alt du ønsker å sende nå, kan du <Lenke>ettersende flere dokumenter</Lenke>.',
    '@core.formik-attachment-form.alert.totalSize.noLink':
        'Du har totalt lastet opp mer enn grensen på 24 MB. Det betyr at du må fjerne noe av det du har lastet opp.',
    '@core.formikAttachmentsList.validation.noAttachmentsUploaded': 'Ingen dokumenter er lastet opp',
    '@core.formikAttachmentsList.validation.tooManyAttachments': 'For mange dokumenter er lastet opp',
    '@core.formikAttachmentsList.validation.maxTotalSizeExceeded':
        'Total samlet størrelse for dokumentene du har lastet opp overstiger grensen på 24 MB.',
    '@core.formikAttachmentsList.listHeading': 'Dokumenter lastet opp ({antallDokumenter})',
    '@core.formikFileUpload.label': 'Last opp dokumenter',
    '@core.formikFileUpload.description':
        'Du kan laste opp filtypene JPG, JPEG, PNG og PDF. Maks størrelse per fil er {MAX_SIZE_MB} MB.',
    '@core.formikFileUpload.dokumenterLastetOpp.tittel': 'Dokumenter lastet opp ({antall})',
    '@core.formikFileUpload.dokumenterLastetOpp.lasterOpp': 'Laster opp ...',
    '@core.formikFileUpload.dokumenterAvvist.tittel': 'Dokumenter med feil',
    '@core.formikFileUpload.file-upload.error.fileType':
        'Filformatet støttes ikke. Tillatte filformater er JPG, JPEG, PNG og PDF.',
    '@core.formikFileUpload.file-upload.error.fileSize': 'Filen er større enn {MAX_SIZE_MB} MB.',
    '@core.formikFileUpload.file-upload.error.retry': 'Det oppstod en feil under opplastingen.',
    '@core.formikFileUpload.file-upload.error.unknown': 'Det oppstod en feil under opplastingen ({reason})',
    '@core.formikVedleggList.validation.noVedleggUploaded': 'Ingen dokumenter er lastet opp',
    '@core.formikVedleggList.validation.tooManyVedlegg': 'For mange dokumenter er lastet opp',
    '@core.formikVedleggList.validation.maxTotalSizeExceeded':
        'Total samlet størrelse for dokumentene du har lastet opp overstiger grensen på 24 MB.',

    ...pictureScanningGuideMessages.nb,
};

type MessageKeys = keyof typeof nb;

const nn: Record<MessageKeys, string> = {
    Ja: 'Ja',
    Nei: 'Nei',
    '@core.common.fileUploadError': 'Det har dessverre skjedd ein feil under opplasting av følgjande vedlegg:',
    '@core.formikAttachmentsList.delete': 'Fjern',
    '@core.AttachmentList.fjern': 'Fjern {filnavn}',
    '@core.AttachmentList.fjernAriaLabel': 'Fjern {filnavn}',
    '@core.AttachmentList.ingenVedlegg': 'Ingen dokument er lasta opp.',
    '@core.formikAttachmentsList.noFilesUploaded': 'Ingen dokument er lasta opp.',
    '@core.formik-attachment-form.alert.totalSize':
        'Du har lastet opp meir enn grensa på 24 MB. Det betyr at du må fjerne noko av det du har lastet opp. Om det betyr at du ikkje får plass til alt du vil sende no, kan du <Lenke>ettersende fleire dokument</Lenke>.',
    '@core.formik-attachment-form.alert.totalSize.noLink':
        'Du har totalt lastet opp meir enn grensa på 24 MB. Det betyr at du må fjerne noko av det du har lastet opp.',
    '@core.formikAttachmentsList.validation.noAttachmentsUploaded': 'Ingen dokument er lastet opp',
    '@core.formikAttachmentsList.validation.tooManyAttachments': 'For mange dokument er lastet opp',
    '@core.formikAttachmentsList.validation.maxTotalSizeExceeded':
        'Total samla størrelse for dokumenta du har lastet opp overstig grensa på 24 MB.',
    '@core.formikAttachmentsList.listHeading': 'Dokumenter lastet opp ({antallDokumenter})',
    '@core.formikFileUpload.label': 'Last opp dokument',
    '@core.formikFileUpload.description':
        'Du kan laste opp filtypene JPG, JPEG, PNG og PDF. Maks størrelse per fil er {MAX_SIZE_MB} MB.',
    '@core.formikFileUpload.dokumenterLastetOpp.tittel': 'Dokument lasta opp ({antall})',
    '@core.formikFileUpload.dokumenterLastetOpp.lasterOpp': 'Laster opp ...',
    '@core.formikFileUpload.dokumenterAvvist.tittel': 'Dokument med feil',
    '@core.formikFileUpload.file-upload.error.fileType':
        'Filformatet er ikkje støtta. Filformater du kan laste opp er JPG, JPEG, PNG og PDF.',
    '@core.formikFileUpload.file-upload.error.fileSize': 'Fila er større enn ${MAX_SIZE_MB} MB.',
    '@core.formikFileUpload.file-upload.error.retry': 'Det oppstod ein feil under opplastinga..',
    '@core.formikFileUpload.file-upload.error.unknown': 'Det oppstod en feil under opplastingen ({reason})',
    '@core.formikVedleggList.validation.noVedleggUploaded': 'Ingen dokument er lasta opp',
    '@core.formikVedleggList.validation.tooManyVedlegg': 'For mange dokument er lasta opp',
    '@core.formikVedleggList.validation.maxTotalSizeExceeded':
        'Total samla storleik for dokumenta du har lasta opp overstig grensa på 24 MB.',

    ...pictureScanningGuideMessages.nn,
};

export const useCoreIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<MessageKeys>(intl);
};

export type CoreIntlShape = ReturnType<typeof useCoreIntl>;

interface CoreTextProps {
    id: MessageKeys;
    values?: any;
}

export const CoreText = (props: CoreTextProps) => {
    return <FormattedMessage {...props} />;
};

export const commonMessages = {
    nb,
    nn,
};
