import { dateFormatter, MaybeDateRange, sortMaybeDateRange } from '@navikt/sif-common-utils';
import { AppText, useAppIntl } from '../../i18n';
import { Box, List } from '@navikt/ds-react';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';

interface Props {
    ansettelsesperioder: MaybeDateRange[];
}

const Ansettelsesperiode = ({ periode }: { periode: MaybeDateRange }) => {
    return (
        <>
            {periode.from && (
                <AppText
                    id="arbeidsaktivitetBlockHeader.arbeidsgiver.ansattFom"
                    values={{ dato: dateFormatter.full(periode.from) }}
                />
            )}
            {periode.to && (
                <AppText
                    id="arbeidsaktivitetBlockHeader.arbeidsgiver.ansattTom"
                    values={{ dato: dateFormatter.full(periode.to) }}
                />
            )}
        </>
    );
};

const AnsettelsesperioderInfo = ({ ansettelsesperioder }: Props) => {
    const { text } = useAppIntl();
    return ansettelsesperioder.length === 1 ? (
        <Ansettelsesperiode periode={ansettelsesperioder[0]} />
    ) : (
        <ExpandableInfo title={text('arbeidsaktivitetBlockHeader.arbeidsgiver.ansettelsesperioder')}>
            <Box marginBlock="0 6">
                <List>
                    {ansettelsesperioder
                        .sort(sortMaybeDateRange)
                        .reverse()
                        .map((periode, index) => {
                            return (
                                <List.Item key={index}>
                                    <Ansettelsesperiode periode={periode} />
                                </List.Item>
                            );
                        })}
                </List>
            </Box>
        </ExpandableInfo>
    );
};

export default AnsettelsesperioderInfo;
