import { FormSummary } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Deltakelse } from '../../../../../api/types';
import { AppText } from '../../../../../i18n';

interface Props {
    deltakelse: Deltakelse;
}

const DeltakelseOppsummering = ({ deltakelse }: Props) => {
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText id="step.oppsummering.deltakelse.header" />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="step.oppsummering.deltakelse.startdato" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        {dateFormatter.dateShortMonthYear(deltakelse.programPeriode.from)}
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
        </FormSummary>
    );
};

export default DeltakelseOppsummering;
