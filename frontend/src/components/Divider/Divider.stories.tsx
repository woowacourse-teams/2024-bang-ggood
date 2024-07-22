import type { Meta, StoryObj } from '@storybook/react';

import Divider from '@/components/Divider/Divider';

const meta = {
  title: 'components/Divider',
  component: Divider,
  parameters: {
    docs: {
      description: {
        component: 'Divider 컴포넌트는 아이템을 각각 분리해주는 선 요소입니다.',
      },
    },
    args: {
      size: '400px',
    },
  },
} satisfies Meta<typeof Divider>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Vertical: Story = {
  args: { direction: 'vertical', size: '200px' },
};
