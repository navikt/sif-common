import { Alert, Panel } from '@navikt/ds-react';
import { useIntl } from 'react-intl';
import { isFailure, isPending } from '@devexperts/remote-data-ts';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { TextareaSvar } from '@navikt/sif-common-ui';
import { prettifyDate } from '@navikt/sif-common-utils';
import { useFormikContext } from 'formik';
import UploadedDocumentsList from '../../components/uploaded-documents-list/UploadedDocumentsList';
import { AppText, useAppIntl } from '../../i18n';
import { DokumentType } from '../../types/DokumentType';
import { Person } from '../../types/Person';
import { SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';
import { Søknadstype } from '../../types/Søknadstype';
import { mapFormDataToApiData } from '../../utils/mapFormDataToApiData';
import { useSoknadContext } from '../SoknadContext';
import SoknadFormComponents from '../SoknadFormComponents';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';
import SummaryBlock from './SummaryBlock';
import './oppsummeringStep.css';

interface Props {
    soknadId: string;
    søknadstype: Søknadstype;
    søker: Person;
}

const OppsummeringStep = ({ soknadId, søknadstype, søker }: Props) => {
    const intl = useIntl();
    const { text } = useAppIntl();
    const { sendSoknadStatus, sendSoknad, resetSendSøknadStatus } = useSoknadContext();
    const { values } = useFormikContext<SoknadFormData>();
    const { fornavn, mellomnavn, etternavn, fødselsnummer } = søker;
    const apiValues = mapFormDataToApiData(soknadId, values, intl);

    useEffectOnce(() => {
        resetSendSøknadStatus();
    });

    return (
        <SoknadFormStep
            id={StepID.OPPSUMMERING}
            søknadstype={søknadstype}
            includeValidationSummary={false}
            showButtonSpinner={isPending(sendSoknadStatus.status)}
            submitButtonLabel={text('step.sendButtonLabel')}
            buttonDisabled={isPending(sendSoknadStatus.status) || apiValues === undefined}
            onSendSoknad={apiValues ? () => sendSoknad(apiValues) : undefined}>
            <SifGuidePanel>
                <AppText id="steg.oppsummering.info" />
            </SifGuidePanel>
            <Block margin="xl">
                <div data-testid="oppsummering">
                    <Panel border={true}>
                        <SummaryBlock header={text('steg.oppsummering.søker.header')}>
                            <p>{formatName(fornavn, etternavn, mellomnavn)}</p>
                            <div>
                                {text('steg.oppsummering.fødselsnummer')}: {fødselsnummer}
                            </div>
                        </SummaryBlock>

                        {apiValues.ettersendelsesType === DokumentType.legeerklæring && (
                            <SummaryBlock header={text('steg.oppsummering.barn.header')}>
                                {values.valgteRegistrertBarn && (
                                    <div>
                                        {text('steg.oppsummering.barn.registretBarnInfo', {
                                            navn: values.valgteRegistrertBarn?.barnetsNavn,
                                            fødselsdato: prettifyDate(values.valgteRegistrertBarn?.barnetsFødselsdato),
                                        })}
                                    </div>
                                )}
                                {apiValues.pleietrengende?.norskIdentitetsnummer && (
                                    <div>
                                        {text('steg.oppsummering.barn.fnr', {
                                            fnr: apiValues.pleietrengende?.norskIdentitetsnummer,
                                        })}
                                    </div>
                                )}
                                {!apiValues.pleietrengende?.norskIdentitetsnummer &&
                                    !apiValues.pleietrengende?.aktørId && (
                                        <div>{text('steg.oppsummering.barn.harIkkefnr')}</div>
                                    )}
                            </SummaryBlock>
                        )}

                        <SummaryBlock header={text('steg.oppsummering.typeSøknad.tittel')}>
                            {apiValues.ytelseTittel}
                        </SummaryBlock>

                        {apiValues.ettersendelsesType === DokumentType.legeerklæring && (
                            <SummaryBlock header={text('steg.oppsummering.dokumentType.header')}>
                                {text('steg.oppsummering.dokumentType.legeerklæring')}
                            </SummaryBlock>
                        )}

                        {apiValues.beskrivelse && (
                            <SummaryBlock header={text('steg.oppsummering.hvaGjelder.header')}>
                                <TextareaSvar text={apiValues.beskrivelse} />
                            </SummaryBlock>
                        )}
                        <SummaryBlock header={text('steg.oppsummering.dokumenter.header')}>
                            <div data-testid="vedlegg-liste">
                                <UploadedDocumentsList includeDeletionFunctionality={false} />
                            </div>
                        </SummaryBlock>
                    </Panel>
                </div>
            </Block>

            <Block margin="l">
                <SoknadFormComponents.ConfirmationCheckbox
                    label={<span data-testid="bekreft-label">{text('steg.oppsummering.bekrefterOpplysninger')}</span>}
                    name={SoknadFormField.harBekreftetOpplysninger}
                    validate={getCheckedValidator()}
                />
            </Block>

            {isFailure(sendSoknadStatus.status) && (
                <FormBlock>
                    {sendSoknadStatus.failures === 1 && (
                        <Alert variant="error">
                            <AppText id="steg.oppsummering.sendMelding.feilmelding.førsteGang" />
                        </Alert>
                    )}
                    {sendSoknadStatus.failures === 2 && (
                        <Alert variant="error">
                            <AppText id="steg.oppsummering.sendMelding.feilmelding.andreGang" />
                        </Alert>
                    )}
                </FormBlock>
            )}
        </SoknadFormStep>
    );
};

export default OppsummeringStep;
