import { BodyLong, Heading } from '@navikt/ds-react';
import { useSøknadContext } from '@hooks';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { useStepConfig } from '../../../hooks/useStepConfig';
import { StepId } from '../../config/StepId';
import SøknadStep from '../../SøknadStep';
import UkjentArbeidsforholdForm from './UkjentArbeidsforholdForm';

const UkjentArbeidsforholdStep = () => {
    const stepId = StepId.UKJENT_ARBEIDSFOHOLD;

    const {
        state: { søknadsdata, sak, arbeidsgivere },
    } = useSøknadContext();

    const { goBack, stepConfig } = useStepConfig(stepId);

    return (
        <SøknadStep stepId={stepId} stepConfig={stepConfig}>
            <SifGuidePanel>
                <BodyLong as="div">
                    <Heading level="2" size="xsmall" spacing={true}>
                        Vi trenger informasjon om et nytt arbeidsforhold
                    </Heading>
                    <p>
                        Vi har funnet et arbeidsforhold på deg i{' '}
                        <abbr title="Arbeidsgiver- og arbeidstakerregisteret">AA-registeret</abbr> som ikke var der da
                        du sendte inn søknad om pleiepenger. Vi trenger litt informasjon fra deg før du kan fortsette.
                    </p>
                </BodyLong>
            </SifGuidePanel>

            <Block margin="xl">
                <UkjentArbeidsforholdForm
                    stepId={stepId}
                    goBack={goBack}
                    arbeidsgivere={arbeidsgivere}
                    ukjenteArbeidsgivere={sak.ukjenteArbeidsgivere}
                    ukjentArbeidsforholdSøknadsdata={søknadsdata.ukjentArbeidsforhold}
                />
            </Block>
        </SøknadStep>
    );
};

export default UkjentArbeidsforholdStep;
