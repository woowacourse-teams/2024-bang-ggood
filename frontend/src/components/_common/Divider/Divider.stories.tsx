import type { Meta, StoryObj } from '@storybook/react';

import Divider from '@/components/_common/Divider/Divider';

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
      size: '40rem',
    },
    argTypes: {
      isBold: { control: 'boolean' },
    },
  },
} satisfies Meta<typeof Divider>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Vertical: Story = {
  args: { direction: 'vertical', size: '20rem' },
};

export const BoldHorizontal: Story = {
  args: { direction: 'horizontal', size: '20rem', isBold: true },
};
