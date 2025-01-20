import { Alert, Box, VStack } from '@navikt/ds-react';
import { erKortArbeidsuke, getDagerTekst } from '../../../utils';
import { Arbeidsuke } from '../../../types';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { AppText } from '../../../i18n';
import { dateFormatter } from '@navikt/sif-common-utils';

interface Props {
    arbeidsuke: Arbeidsuke;
    arbeidsgivernavn: string;
}

const KortUkeInfo = ({ arbeidsuke }: { arbeidsuke: Arbeidsuke }) => (
    <Box>
        <AppText id="endreArbeidstidForm.kortUke.info" values={{ dager: getDagerTekst(arbeidsuke.periode) }} />
    </Box>
);

const IkkeAnsattInfo = ({ arbeidsuke, arbeidsgivernavn }: { arbeidsuke: Arbeidsuke; arbeidsgivernavn: string }) => (
    <VStack gap="4">
        <Box>
            Kort uke - du er ikke registrert som ansatt hos {arbeidsgivernavn} alle dagene denne uken. Dager du ikke er
            registrert som ansatt er:{' '}
            <strong>{arbeidsuke.dagerIkkeAnsatt.map((d) => dateFormatter.dayDateShortMonth(d)).join(',')}</strong>.
        </Box>
        <Box>Hvis dette ikke stemmer, må du ta kontakt med {arbeidsgivernavn}.</Box>
    </VStack>
);

const KortUkeEllerIkkeAnsattInformasjon = ({ arbeidsuke, arbeidsgivernavn }: Props) => {
    const gjelderKortUke = erKortArbeidsuke(arbeidsuke.periode);

    if (gjelderKortUke && arbeidsuke.dagerIkkeAnsatt.length === 0) {
        return (
            <Block margin="xl">
                <KortUkeInfo arbeidsuke={arbeidsuke} />
            </Block>
        );
    }
    if (!gjelderKortUke && arbeidsuke.dagerIkkeAnsatt.length > 0) {
        return (
            <Block margin="xl">
                <Alert variant="info" inline={false}>
                    <IkkeAnsattInfo arbeidsgivernavn={arbeidsgivernavn} arbeidsuke={arbeidsuke} />
                </Alert>
            </Block>
        );
    }
    if (gjelderKortUke && arbeidsuke.dagerIkkeAnsatt.length > 0) {
        return (
            <Block margin="xl">
                <Alert variant="info" inline={false}>
                    <VStack gap="6">
                        <KortUkeInfo arbeidsuke={arbeidsuke} />
                        <IkkeAnsattInfo arbeidsgivernavn={arbeidsgivernavn} arbeidsuke={arbeidsuke} />
                    </VStack>
                </Alert>
            </Block>
        );
    }
    return null;
};

export default KortUkeEllerIkkeAnsattInformasjon;
