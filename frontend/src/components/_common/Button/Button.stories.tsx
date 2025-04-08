import type { Meta, StoryObj } from '@storybook/react';

import Button from '@/components/_common/Button/Button';

const meta = {
  title: 'components/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Square Button */
export const LightSquare: Story = {
  args: {
    label: '버튼',
  },
};

export const DarkSquare: Story = {
  args: {
    label: '버튼',
    color: 'dark',
  },
};

export const PrimarySquare: Story = {
  args: {
    label: '버튼',
    color: 'primary',
  },
};

export const OutlinedSquare: Story = {
  args: {
    label: '버튼',
    color: 'primary',
    variant: 'outlined',
  },
};

export const DisabledSquare: Story = {
  args: {
    label: '버튼',
    color: 'disabled',
  },
};

/** Round Button */
export const LightRound: Story = {
  args: {
    label: '버튼',
    rounded: true,
  },
};

export const DarkRound: Story = {
  args: {
    label: '버튼',
    color: 'dark',
    rounded: true,
  },
};

export const PrimaryRound: Story = {
  args: {
    label: '버튼',
    color: 'primary',
    rounded: true,
  },
};

export const OutlinedRound: Story = {
  args: {
    label: '버튼',
    color: 'primary',
    variant: 'outlined',
    rounded: true,
  },
};

export const DisabledRound: Story = {
  args: {
    label: '버튼',
    color: 'disabled',
    rounded: true,
  },
};
