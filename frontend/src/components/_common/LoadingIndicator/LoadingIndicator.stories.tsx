import type { Meta, StoryObj } from '@storybook/react';

import { LoadingIndicator } from './LoadingIndicator';

const meta: Meta<typeof LoadingIndicator> = {
  title: 'components/LoadingIndicator',
  component: LoadingIndicator,
  parameters: {
    backgrounds: {
      default: 'white',
      values: [
        { name: 'white', value: '#ffffff' },
        { name: 'grey', value: '#cccccc' },
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
