import type { Meta, StoryObj } from '@storybook/react';

import Badge from '@/components/_common/Badge/Badge';
import theme from '@/styles/theme';

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
    text: 'A방 위치',
    backgroundColor: theme.palette.green500,
    size: 'small',
    onClick: () => alert('click'),
    isSquare: true,
  },
};

export const medium: Story = {
  args: {
    text: 'B',
    backgroundColor: theme.palette.yellow500,
    size: 'medium',
    onClick: () => alert('click'),
    isSquare: false,
  },
};
