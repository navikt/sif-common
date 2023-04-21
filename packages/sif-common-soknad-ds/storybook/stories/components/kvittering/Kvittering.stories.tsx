import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import Kvittering from '../../../../src/components/kvittering/Kvittering';
import StoryWrapper from '@navikt/sif-common-core-ds/storybook/decorators/StoryWrapper';

export default {
    title: 'Component/Kvittering',
    component: Kvittering,
    decorators: [
        (Story) => (
            <StoryWrapper>
                <Story />
            </StoryWrapper>
        ),
    ],
} as Meta<typeof Kvittering>;

const Template: StoryFn<typeof Kvittering> = () => {
    return (
        <Kvittering tittel="Søknad mottatt" liste={{ tittel: 'ABC', punkter: ['Punkt 1', 'Punkt 2'] }}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. In, molestias! Assumenda error porro cum culpa
            fugiat qui mollitia aperiam veniam et, atque aliquid, rerum numquam praesentium voluptates unde quia
            nesciunt.
        </Kvittering>
    );
};

export const Default = Template.bind({});
