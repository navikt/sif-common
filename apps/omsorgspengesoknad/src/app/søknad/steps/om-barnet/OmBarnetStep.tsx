import { Alert } from '@navikt/ds-react';
import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { getRequiredFieldValidator, getYesOrNoValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { StepId } from '../../../types/StepId';
import { SøkersRelasjonTilBarnet } from '../../../types/SøkersRelasjonTilBarnet';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import AnnetBarnpart from './form-parts/AnnetBarnPart';
import VelgRegistrertBarn from './form-parts/VelgRegistrertBarn';
import { getOmBarnetStepInitialValues, getOmBarnetSøknadsdataFromFormValues } from './omBarnetStepUtils';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import { BarnSammeAdresse } from '../../../types/BarnSammeAdresse';

export enum OmBarnetFormFields {
    barnetSøknadenGjelder = 'barnetSøknadenGjelder',
    søknadenGjelderEtAnnetBarn = 'søknadenGjelderEtAnnetBarn',
    barnetsNavn = 'barnetsNavn',
    barnetsFødselsnummer = 'barnetsFødselsnummer',
    barnetsFødselsdato = 'barnetsFødselsdato',
    søkersRelasjonTilBarnet = 'søkersRelasjonTilBarnet',
    sammeAdresse = 'sammeAdresse',
    kroniskEllerFunksjonshemming = 'kroniskEllerFunksjonshemming',
}

export interface OmBarnetFormValues {
    [OmBarnetFormFields.barnetSøknadenGjelder]?: string;
    [OmBarnetFormFields.søknadenGjelderEtAnnetBarn]?: boolean;
    [OmBarnetFormFields.barnetsNavn]: string;
    [OmBarnetFormFields.barnetsFødselsnummer]: string;
    [OmBarnetFormFields.barnetsFødselsdato]: string;
    [OmBarnetFormFields.søkersRelasjonTilBarnet]?: SøkersRelasjonTilBarnet;
    [OmBarnetFormFields.sammeAdresse]?: BarnSammeAdresse;
    [OmBarnetFormFields.kroniskEllerFunksjonshemming]?: YesOrNo;
}

const { FormikWrapper, Form, YesOrNoQuestion, RadioGroup } = getTypedFormComponents<
    OmBarnetFormFields,
    OmBarnetFormValues,
    ValidationError
>();

const OmBarnetStep = () => {
    const intl = useIntl();
    const {
        state: { søknadsdata, registrerteBarn },
    } = useSøknadContext();

    const stepId = StepId.OM_BARNET;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

    const { goBack } = useStepNavigation(step);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: OmBarnetFormValues) => {
        const OmBarnetSøknadsdata = getOmBarnetSøknadsdataFromFormValues(values, { registrerteBarn });
        if (OmBarnetSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadOmBarnet(OmBarnetSøknadsdata)];
        }
        return [];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        stepId,
        (state: SøknadContextState) => {
            return lagreSøknadState(state);
        },
    );

    const harIkkeBarn = registrerteBarn.length === 0;

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getOmBarnetStepInitialValues(søknadsdata, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={({
                    values: {
                        barnetSøknadenGjelder,
                        søknadenGjelderEtAnnetBarn,
                        kroniskEllerFunksjonshemming,
                        sammeAdresse,
                        søkersRelasjonTilBarnet,
                    },
                }) => {
                    return (
                        <>
                            <PersistStepFormValues stepId={stepId} />
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                                includeValidationSummary={true}
                                submitPending={isSubmitting}
                                onBack={goBack}
                                runDelayedFormValidation={true}>
                                {harIkkeBarn === false && (
                                    <VelgRegistrertBarn
                                        registrerteBarn={registrerteBarn}
                                        søknadenGjelderEtAnnetBarn={søknadenGjelderEtAnnetBarn}
                                    />
                                )}
                                {(søknadenGjelderEtAnnetBarn || harIkkeBarn) && (
                                    <FormBlock>
                                        <AnnetBarnpart />
                                    </FormBlock>
                                )}
                                {(barnetSøknadenGjelder !== undefined || søknadenGjelderEtAnnetBarn || harIkkeBarn) && (
                                    <>
                                        <FormBlock>
                                            <RadioGroup
                                                name={OmBarnetFormFields.sammeAdresse}
                                                legend={intlHelper(intl, 'steg.omBarnet.spm.sammeAdresse')}
                                                radios={[
                                                    {
                                                        label: intlHelper(intl, 'steg.omBarnet.spm.sammeAdresse.ja'),
                                                        value: BarnSammeAdresse.JA,
                                                    },
                                                    {
                                                        label: intlHelper(
                                                            intl,
                                                            'steg.omBarnet.spm.sammeAdresse.jaDeltBosted',
                                                        ),
                                                        value: BarnSammeAdresse.JA_DELT_BOSTED,
                                                    },
                                                    {
                                                        label: intlHelper(intl, 'steg.omBarnet.spm.sammeAdresse.nei'),
                                                        value: BarnSammeAdresse.NEI,
                                                    },
                                                ]}
                                                validate={getRequiredFieldValidator()}
                                                data-testid="sammeAdresse"
                                                description={
                                                    <ExpandableInfo
                                                        title={intlHelper(
                                                            intl,
                                                            'steg.omBarnet.spm.sammeAdresse.hvaBetyrDette',
                                                        )}>
                                                        {intlHelper(
                                                            intl,
                                                            'steg.omBarnet.spm.sammeAdresse.hvaBetyrDette.info',
                                                        )}
                                                    </ExpandableInfo>
                                                }
                                            />
                                        </FormBlock>
                                        {sammeAdresse === BarnSammeAdresse.NEI &&
                                            søkersRelasjonTilBarnet !== SøkersRelasjonTilBarnet.FOSTERFORELDER && (
                                                <FormBlock margin="l">
                                                    <Alert variant="info">
                                                        {intlHelper(intl, 'steg.omBarnet.spm.sammeAdresse.neiAlert')}
                                                    </Alert>
                                                </FormBlock>
                                            )}
                                        <FormBlock>
                                            <YesOrNoQuestion
                                                name={OmBarnetFormFields.kroniskEllerFunksjonshemming}
                                                legend={intlHelper(
                                                    intl,
                                                    'steg.omBarnet.spm.kroniskEllerFunksjonshemmende',
                                                )}
                                                data-testid="kroniskEllerFunksjonshemming"
                                                validate={getYesOrNoValidator()}
                                            />
                                        </FormBlock>
                                        {kroniskEllerFunksjonshemming === YesOrNo.NO && (
                                            <FormBlock margin="l">
                                                <Alert variant="info">
                                                    {intlHelper(intl, 'steg.omBarnet.alert.ikkeKroniskSykdom')}
                                                </Alert>
                                            </FormBlock>
                                        )}
                                    </>
                                )}
                            </Form>
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default OmBarnetStep;
