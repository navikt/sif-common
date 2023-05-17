import React from 'react';
import { useIntl } from 'react-intl';
import { ErrorColored } from '@navikt/ds-icons';
import AriaText from '@navikt/sif-common-core-ds/lib/atoms/aria-text/AriaText';
import DurationText from '@navikt/sif-common-core-ds/lib/components/duration-text/DurationText';
import BemUtils from '@navikt/sif-common-core-ds/lib/utils/bemUtils';
import IconText from '../../../components/icon-text/IconText';
import { erTimerGyldigInnenforAntallDager } from '../../../utils/beregnUtils';
import { ArbeidstidUkeTabellItem } from '../ArbeidstidUkeTabell';
import { erArbeidstidUkeTabellItemEndret } from '../arbeidstidUkeTabellUtils';

interface Props {
    uke: ArbeidstidUkeTabellItem;
    visEndringSomOpprinnelig?: boolean;
}

const bem = BemUtils('endretArbeidstid');

const ArbeidstidUkeInfoListe: React.FunctionComponent<Props> = ({ uke, visEndringSomOpprinnelig }) => {
    const intl = useIntl();

    if (uke.endret === undefined || visEndringSomOpprinnelig) {
        return (
            <div className="arbeidstidInfoListe">
                <p>
                    <span className="arbeidstidInfoListe__label">Normal arbeidstid:</span>
                    <span className="arbeidstidInfoListe__value">
                        <DurationText duration={uke.opprinnelig.normalt} />
                    </span>
                </p>
                <p>
                    <span className="arbeidstidInfoListe__label">Arbeid i perioden:</span>
                    <span className="arbeidstidInfoListe__value">
                        {uke.opprinnelig.faktisk && <DurationText duration={uke.opprinnelig.faktisk} />}
                    </span>
                </p>
            </div>
        );
    }

    const erEndret = erArbeidstidUkeTabellItemEndret(uke);

    const erEndringGyldig = erTimerGyldigInnenforAntallDager(uke.endret.faktisk, uke.antallDagerMedArbeidstid);
    return (
        <div className="arbeidstidInfoListe">
            <p>
                <span className="arbeidstidInfoListe__label">Normal arbeidstid:</span>
                <span className="arbeidstidInfoListe__value">
                    <DurationText duration={uke.opprinnelig.normalt} />
                </span>
            </p>
            <p>
                <span className="arbeidstidInfoListe__label">Arbeid i perioden:</span>
                <span className="arbeidstidInfoListe__value" data-testid="timer-faktisk">
                    <>
                        <strong>
                            <DurationText duration={uke.endret.faktisk} />
                        </strong>
                        {erEndret && uke.endret.endretProsent !== undefined && (
                            <span className={bem.element('prosent')}>
                                {' '}
                                ({intl.formatNumber(uke.endret.endretProsent)} %)
                            </span>
                        )}
                    </>
                    {erEndret && (
                        <>
                            <br />
                            <span className={bem.element('opprinnelig')}>
                                <AriaText>Endret fra </AriaText>
                                <span className={bem.element('timer')} data-testid="timer-opprinnelig">
                                    {uke.opprinnelig.faktisk && <DurationText duration={uke.opprinnelig.faktisk} />}
                                </span>
                            </span>
                        </>
                    )}
                </span>
            </p>
            {erEndringGyldig === false && (
                <div style={{ marginTop: '0.25rem' }}>
                    <IconText icon={<ErrorColored role="presentation" aria-hidden="true" />}>For mange timer</IconText>
                </div>
            )}
        </div>
    );
};

export default ArbeidstidUkeInfoListe;
