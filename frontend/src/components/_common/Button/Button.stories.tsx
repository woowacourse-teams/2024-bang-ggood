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
    label: 'Button',
  },
};

export const DarkSquare: Story = {
  args: {
    label: 'Button',
    color: 'dark',
  },
};

export const PrimarySquare: Story = {
  args: {
    label: 'Button',
    color: 'primary',
  },
};

export const OutlinedSquare: Story = {
  args: {
    label: 'Button',
    color: 'primary',
    variant: 'outlined',
  },
};

export const DisabledSquare: Story = {
  args: {
    label: 'Button',
    disabled: true,
  },
};

/** Round Button */
export const LightRound: Story = {
  args: {
    label: 'Button',
    rounded: true,
  },
};

export const DarkRound: Story = {
  args: {
    label: 'Button',
    color: 'dark',
    rounded: true,
  },
};

export const PrimaryRound: Story = {
  args: {
    label: 'Button',
    color: 'primary',
    rounded: true,
  },
};

export const OutlinedRound: Story = {
  args: {
    label: 'Button',
    color: 'primary',
    variant: 'outlined',
    rounded: true,
  },
};

export const DisabledRound: Story = {
  args: {
    label: 'Button',
    disabled: true,
    rounded: true,
  },
};
