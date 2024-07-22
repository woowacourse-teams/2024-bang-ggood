import type { Meta, StoryObj } from '@storybook/react';

import Badge from '@/components/common/Badge/Badge';

const meta = {
  title: 'components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Badge는 방의 상태를 나타내는 작은 뱃지입니다.',
      },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '✨ 청결해요',
    type: 'long',
  },
};

export const ClickableBadge: Story = {
  args: {
    label: '🏠 방 컨디션이 좋아요',
    type: 'button',
    onClick: () => alert('click'),
  },
};
