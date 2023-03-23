import { Tag } from '@navikt/ds-react';
import React from 'react';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';

interface Props {
    dagerMedFerie: Date[] | undefined;
    dagerMedFjernetFerie: Date[] | undefined;
}

const DagerMedFerieTags = ({ dagerMedFerie = [], dagerMedFjernetFerie = [] }: Props) => {
    if (dagerMedFjernetFerie.length + dagerMedFerie.length > 0) {
        return (
            <Block margin="s">
                {dagerMedFerie?.length > 0 && (
                    <Tag variant="success" size="small" style={{ marginRight: '.5rem', marginBottom: '.25rem' }}>
                        Ferie registrert
                    </Tag>
                )}
                {dagerMedFjernetFerie?.length > 0 && (
                    <Tag variant="error" size="small">
                        Ferie fjernet
                    </Tag>
                )}
            </Block>
        );
    }
    return null;
};

export default DagerMedFerieTags;
