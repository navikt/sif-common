import { BodyLong, Box, Heading } from '@navikt/ds-react';
import React from 'react';
import { Office1 } from '@navikt/ds-icons';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { ArbeidsaktivitetType, ArbeidsgiverForEndring } from '@types';
import { AppText } from '../../i18n';
import EndretTag from '../tags/EndretTag';
import NyTag from '../tags/NyTag';
import './arbeidsaktivitetBlockHeader.scss';
import AnsettelsesperioderInfo from './AnsettelsesperioderInfo';

interface Props {
    navn: string;
    arbeidsgiver?: ArbeidsgiverForEndring;
    type: ArbeidsaktivitetType;
    erUkjentAktivitet?: boolean;
    endret?: {
        tekst: string;
    };
}

const ArbeidsaktivitetBlockHeader: React.FunctionComponent<Props> = ({
    type,
    arbeidsgiver,
    navn,
    endret,
    erUkjentAktivitet,
}) => {
    return (
        <Block margin={type !== ArbeidsaktivitetType.arbeidstaker ? 'm' : 'none'}>
            <div className="arbeidsaktivitetBlockHeader">
                <div className="arbeidsaktivitetBlockHeader__icon">
                    <Office1 role="presentation" aria-hidden={true} />
                </div>
                <div className="arbeidsaktivitetBlockHeader__content">
                    <Heading level="2" size="medium">
                        {navn}
                    </Heading>
                    {type === ArbeidsaktivitetType.arbeidstaker && arbeidsgiver !== undefined ? (
                        <BodyLong as="div">
                            <Box>
                                <AppText
                                    id="arbeidsaktivitetBlockHeader.arbeidsgiver.orgnummer"
                                    values={{ orgnr: arbeidsgiver.organisasjonsnummer }}
                                />
                            </Box>
                            <AnsettelsesperioderInfo ansettelsesperioder={arbeidsgiver.ansettelsesperioder} />
                        </BodyLong>
                    ) : undefined}
                    {(endret || erUkjentAktivitet) && (
                        <Block margin="m" style={{ gap: '.5rem', display: 'flex' }}>
                            {endret && <EndretTag>{endret.tekst}</EndretTag>}
                            {erUkjentAktivitet && (
                                <NyTag>
                                    <AppText id="arbeidsaktivitetBlockHeader.nyttArbeidsforhold" />
                                </NyTag>
                            )}
                        </Block>
                    )}
                </div>
            </div>
        </Block>
    );
};

export default ArbeidsaktivitetBlockHeader;
