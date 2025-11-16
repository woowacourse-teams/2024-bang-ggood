import type { Meta, StoryObj } from '@storybook/react';

import KakaoLoginButton from './KakaoLoginButton';

const meta: Meta<typeof KakaoLoginButton> = {
  title: 'components/KakaoLoginButton',
  component: KakaoLoginButton,
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
