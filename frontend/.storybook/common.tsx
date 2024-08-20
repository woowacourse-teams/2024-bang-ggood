import type { StoryFn } from '@storybook/react';

const mobileDecorator = (Story: StoryFn) => (
  <div style={{ width: '60rem' }}>
    <Story />
  </div>
);

export default mobileDecorator;
