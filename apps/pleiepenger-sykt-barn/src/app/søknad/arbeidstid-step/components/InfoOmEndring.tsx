import React from 'react';
import { useAppIntl } from '@i18n/index';
import FormattedHtmlMessage from '@navikt/sif-common-core-ds/src/atoms/formatted-html-message/FormattedHtmlMessage';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { ArbeidsforholdType } from '../../../local-sif-common-pleiepenger';

interface Props {
    arbeidsforholdType: ArbeidsforholdType;
}

const InfoOmEndring: React.FunctionComponent<Props> = ({ arbeidsforholdType }) => {
    const { text } = useAppIntl();
    switch (arbeidsforholdType) {
        case ArbeidsforholdType.ANSATT:
        case ArbeidsforholdType.FRILANSER:
            return (
                <ExpandableInfo title={text('arbeidIPeriode.redusert.endring.tittel')}>
                    <FormattedHtmlMessage id="arbeidIPeriode.redusert.endring.arb_frilans.tekst" />
                </ExpandableInfo>
            );
        case ArbeidsforholdType.SELVSTENDIG:
            return (
                <ExpandableInfo title={text('arbeidIPeriode.redusert.endring.tittel')}>
                    <FormattedHtmlMessage id="arbeidIPeriode.redusert.endring.sn.tekst" />
                </ExpandableInfo>
            );
    }
};

export default InfoOmEndring;
