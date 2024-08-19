import type { StoryFn } from '@storybook/react';

const mobileDecorator = (Story: StoryFn) => (
  <div style={{ width: '600px' }}>
    <Story />
  </div>
);

export default mobileDecorator;
