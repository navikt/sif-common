import { FormattedMessage, useIntl } from 'react-intl';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';

const IntroVeileder = () => {
    const inneværendeÅr = new Date().getFullYear();
    const forrigeÅr = inneværendeÅr - 1;
    return (
        <SifGuidePanel>
            <p>
                <FormattedMessage id="step.fravaer.info.1" />
            </p>
            <p>
                <FormattedMessage id="step.fravaer.info.2" values={{ forrigeÅr, inneværendeÅr }} />
            </p>
        </SifGuidePanel>
    );
};

const Tidsbegrensning = () => {
    const intl = useIntl();
    return (
        <ExpandableInfo title={intlHelper(intl, 'step.fravaer.info.ikkeHelg.tittel')}>
            <FormattedMessage id="step.fravaer.info.ikkeHelg.tekst" />
        </ExpandableInfo>
    );
};

const FraværStepInfo = {
    IntroVeileder,
    Tidsbegrensning,
};

export default FraværStepInfo;
