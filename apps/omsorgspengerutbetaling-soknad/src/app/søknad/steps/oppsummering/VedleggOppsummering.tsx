import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import AttachmentList from '@navikt/sif-common-core-ds/lib/components/attachment-list/AttachmentList';
import ContentWithHeader from '@navikt/sif-common-core-ds/lib/components/content-with-header/ContentWithHeader';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { SummarySection } from '@navikt/sif-common-soknad-ds';
import { SøknadApiData } from '../../../types/søknadApiData/SøknadApiData';
import { LegeerklæringSøknadsdata } from '../../../types/søknadsdata/LegeerklæringSøknadsdata';
import { getAttachmentURLBackend } from '../../../utils/attachmentUtilsAuthToken';

interface Props {
    apiData: SøknadApiData;
    legeerklæringSøknadsdata?: LegeerklæringSøknadsdata;
}

const VedleggOppsummering: React.FC<Props> = ({ apiData, legeerklæringSøknadsdata }) => {
    const intl = useIntl();
    const legeerklæringer = legeerklæringSøknadsdata
        ? legeerklæringSøknadsdata.vedlegg.filter(
              (v) => v.url && apiData.vedlegg.includes(getAttachmentURLBackend(v.url))
          )
        : [];

    return (
        <SummarySection header={intlHelper(intl, 'steg.oppsummering.vedlegg.header')}>
            <Block>
                <ContentWithHeader header={intlHelper(intl, 'steg.oppsummering.legeerklæring.header')}>
                    {legeerklæringSøknadsdata?.vedlegg.length === 0 ? (
                        <FormattedMessage id="vedleggsliste.ingenLegeerklæringLastetOpp" />
                    ) : (
                        <div data-testid="legeerklæring-liste">
                            <AttachmentList attachments={legeerklæringer} />
                        </div>
                    )}
                </ContentWithHeader>
            </Block>
        </SummarySection>
    );
};

export default VedleggOppsummering;
