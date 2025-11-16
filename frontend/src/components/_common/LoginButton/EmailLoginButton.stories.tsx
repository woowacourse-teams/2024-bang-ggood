import type { Meta, StoryObj } from '@storybook/react';

import EmailLoginButton from './EmailLoginButton';

const meta: Meta<typeof EmailLoginButton> = {
  title: 'components/EmailLoginButton',
  component: EmailLoginButton,
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
