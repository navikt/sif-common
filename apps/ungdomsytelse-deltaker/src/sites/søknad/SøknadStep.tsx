import React from 'react';
import { useIntl } from 'react-intl';
import { soknadStepUtils, Step } from '@navikt/sif-common-soknad-ds';
import { useAppIntl } from '../../i18n';
import InvalidStepSøknadsdataInfo from './components/invalid-step-søknadsdata-info/InvalidStepSøknadsdataInfo';
import useAvbrytEllerFortsettSenere from './hooks/useAvbrytSøknad';
import { getSøknadStepConfig } from './søknadStepConfig';
import { StepId } from './types/StepId';
import { useSøknadContext } from './context/hooks/useSøknadContext';

interface Props {
    stepId: StepId;
    children: React.ReactNode;
}

const SøknadStep: React.FunctionComponent<Props> = ({ stepId, children }) => {
    const intl = useIntl();
    const { text } = useAppIntl();
    const {
        state: {
            søknadsdata: { deltakelse },
        },
    } = useSøknadContext();

    const stepConfig = getSøknadStepConfig(deltakelse);

    const { avbrytSøknad, fortsettSøknadSenere } = useAvbrytEllerFortsettSenere();

    const { index } = stepConfig[stepId];

    const steps = soknadStepUtils.getProgressStepsFromConfig(stepConfig, index, intl);

    return (
        <Step
            activeStepId={stepId}
            applicationTitle={text('application.title')}
            steps={steps}
            onCancel={avbrytSøknad}
            onContinueLater={fortsettSøknadSenere}>
            <InvalidStepSøknadsdataInfo stepId={stepId} stepConfig={stepConfig} />
            {children}
        </Step>
    );
};

export default SøknadStep;
