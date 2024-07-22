import type { Meta, StoryObj } from '@storybook/react';

import Badge from '@/components/badge/Badge';

const meta = {
  title: 'components/Badge',
  component: Badge,
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
