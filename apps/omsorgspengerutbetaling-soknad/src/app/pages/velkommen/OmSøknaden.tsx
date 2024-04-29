import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { BodyLong, Heading } from '@navikt/ds-react';
import BehandlingAvPersonopplysningerContent from './BehandlingAvPersonopplysningerContent';
import { FormattedMessage, useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';

const OmSøknaden = () => {
    const intl = useIntl();
    return (
        <Block margin="xl">
            <Heading level="2" size="medium">
                <FormattedMessage id="page.velkommen.omSøknaden.tittel" />
            </Heading>
            <BodyLong as="div">
                <FormattedMessage id="page.velkommen.omSøknaden.1" tagName="p" />
                <FormattedMessage id="page.velkommen.omSøknaden.2" tagName="p" />
                <FormattedMessage id="page.velkommen.omSøknaden.3" tagName="p" />
                <ExpandableInfo title={intlHelper(intl, 'page.velkommen.omSøknaden.4')}>
                    <BehandlingAvPersonopplysningerContent />
                </ExpandableInfo>
            </BodyLong>
        </Block>
    );
};

export default OmSøknaden;
