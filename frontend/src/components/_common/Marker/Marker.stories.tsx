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
        component: 'Marker는 작은 텍스트가 들어간 버튼 아이템입니다.',
      },
    },
  },
} satisfies Meta<typeof Marker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Line_Small: Story = {
  args: {
    isCircle: false,
    text: '수인분당선',
    color: theme.color.primary[500],
    size: 'small',
    onClick: () => alert('click'),
  },
};

export const Line_Medium: Story = {
  args: {
    isCircle: false,
    text: '수인분당선',
    color: theme.color.primary[500],
    size: 'medium',
    onClick: () => alert('click'),
  },
};

export const Number_Small: Story = {
  args: {
    isCircle: true,
    text: '2',
    color: theme.color.secondary[500],
    size: 'small',
    onClick: () => alert('click'),
  },
};

export const Number_Medium: Story = {
  args: {
    isCircle: true,
    text: '2',
    color: theme.color.secondary[500],
    size: 'medium',
    onClick: () => alert('click'),
  },
};
