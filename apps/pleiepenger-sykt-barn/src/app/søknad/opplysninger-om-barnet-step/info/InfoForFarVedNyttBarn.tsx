import { Link } from '@navikt/ds-react';
import { useAppIntl } from '@i18n/index';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { AppText } from '../../../i18n';

const InfoForFarVedNyttBarn = () => {
    const { text } = useAppIntl();
    return (
        <ExpandableInfo title={text('infoForFarVedNyttBarn.tittel')}>
            <p>
                <AppText id="infoForFarVedNyttBarn.info.1.1" />{' '}
                <Link href="https://farskapsportal.nav.no/nb/" target="_blank">
                    <AppText id="infoForFarVedNyttBarn.info.1.2" />
                </Link>
                <AppText id="infoForFarVedNyttBarn.info.1.3" />
            </p>
            <p>
                <AppText id="infoForFarVedNyttBarn.info.2" />
            </p>
        </ExpandableInfo>
    );
};
export default InfoForFarVedNyttBarn;
