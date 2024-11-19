import type { Meta, StoryObj } from '@storybook/react';

import Marker from '@/components/_common/Marker/Marker';
import theme from '@/styles/theme';

const meta = {
  title: 'components/Marker',
  component: Marker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Marker 작은 텍스트 뱃지입니다.',
      },
    },
  },
} satisfies Meta<typeof Marker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isCircle: true,
    text: 'A방 위치',
    backgroundColor: theme.palette.green500,
    size: 'small',
    onClick: () => alert('click'),
  },
};

export const medium: Story = {
  args: {
    isCircle: false,
    text: 'B',
    backgroundColor: theme.palette.yellow500,
    size: 'medium',
    onClick: () => alert('click'),
  },
};
