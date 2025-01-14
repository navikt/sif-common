import { StoryFormikWrapper } from '@components/StoryFormikWrapper';

export const withFormikWrapper = (Story, args) => (
    <StoryFormikWrapper {...args}>
        <Story />
    </StoryFormikWrapper>
);
