import { TagProps } from '@navikt/ds-react';
import React from 'react';
import { Edit } from '@navikt/ds-icons';
import IconTag from './IconTag';

interface Props extends Omit<TagProps, 'variant' | 'children'> {
    children?: React.ReactNode;
    visIkon?: boolean;
}
const EndretTag: React.FunctionComponent<Props> = (props) => {
    const { children = 'Endret', visIkon, ...rest } = props;
    return (
        <IconTag {...rest} variant={'info'} icon={visIkon ? <Edit /> : undefined}>
            {children}
        </IconTag>
    );
};

export default EndretTag;
