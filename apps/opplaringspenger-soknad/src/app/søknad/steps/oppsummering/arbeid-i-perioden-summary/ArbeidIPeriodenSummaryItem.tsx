import { Heading } from '@navikt/ds-react';
import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { DateRange } from '@navikt/sif-common-formik-ds';
import { dateToISODate, ISODurationToDecimalDuration } from '@navikt/sif-common-utils';
import TidEnkeltdager from '../../../../components/tid-enkeltdager/TidEnkeltdager';
import {
    ArbeidIPeriodeApiData,
    ArbeidsforholdApiData,
    TidEnkeltdagApiData,
} from '../../../../types/søknadApiData/SøknadApiData';
import { JobberIPeriodeSvar } from '../../arbeidstid/ArbeidstidTypes';
import { AppText } from '../../../../i18n';

interface Props {
    periode: DateRange;
    valgteDatoer: Date[];
    arbeidIPeriode: ArbeidIPeriodeApiData;
    normaltimerUke: number;
    harFlereArbeidsforhold: boolean;
}

export interface ArbeidIPeriodenSummaryItemType extends ArbeidsforholdApiData {
    tittel: string;
}

const fjernDagerIkkeSøktForOgUtenArbeidstid = (enkeltdager: TidEnkeltdagApiData[], valgteDatoer: Date[]) => {
    const isoValgteDatoer = valgteDatoer.map(dateToISODate);
    return enkeltdager.filter(({ dato, tid }) => {
        return isoValgteDatoer.includes(dato) && ISODurationToDecimalDuration(tid) !== 0;
    });
};

const ArbeidIPeriodeSummaryItem: React.FC<Props> = ({ arbeidIPeriode, valgteDatoer, harFlereArbeidsforhold }) => {
    return (
        <>
            {harFlereArbeidsforhold && (
                <>
                    {(arbeidIPeriode.jobberIPerioden === JobberIPeriodeSvar.heltFravær ||
                        arbeidIPeriode.jobberIPerioden === JobberIPeriodeSvar.somVanlig) && (
                        <p style={{ marginTop: 0 }}>
                            <AppText
                                id={`oppsummering.arbeidIPeriode.jobberIPerioden.${arbeidIPeriode.jobberIPerioden}`}
                            />
                        </p>
                    )}
                    {arbeidIPeriode.jobberIPerioden === JobberIPeriodeSvar.redusert && (
                        <p style={{ marginTop: 0 }}>
                            <AppText
                                id={`oppsummering.arbeidIPeriode.jobberIPerioden.${arbeidIPeriode.jobberIPerioden}`}
                            />
                        </p>
                    )}
                </>
            )}
            {arbeidIPeriode.jobberIPerioden === JobberIPeriodeSvar.redusert && arbeidIPeriode.enkeltdager && (
                <Block margin="xl">
                    <Heading size="xsmall" level="4" spacing={true}>
                        <AppText id="oppsummering.arbeidIPeriode.jobberIPerioden.dagerJegSkalJobbe.heading" />
                    </Heading>
                    <TidEnkeltdager
                        dager={fjernDagerIkkeSøktForOgUtenArbeidstid(arbeidIPeriode.enkeltdager, valgteDatoer)}
                        renderAsAccordion={false}
                        headingLevel="5"
                    />
                </Block>
            )}
        </>
    );
};

export default ArbeidIPeriodeSummaryItem;
