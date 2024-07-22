import type { Meta, StoryObj } from '@storybook/react';

import Button from '@/components/Button/Button';

const meta = {
  title: 'components/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Round Button */
export const LightRound: Story = {
  args: {
    label: '버튼',
  },
};

export const DarkRound: Story = {
  args: {
    label: '버튼',
    color: 'dark',
  },
};

export const DisabledRound: Story = {
  args: {
    label: '버튼',
    color: 'disabled',
  },
};

/** Square Button */
export const LightSquare: Story = {
  args: {
    label: '버튼',
    isSquare: true,
  },
};

export const DarkSquare: Story = {
  args: {
    label: '버튼',
    color: 'dark',
    isSquare: true,
  },
};

export const DisabledSquare: Story = {
  args: {
    label: '버튼',
    color: 'disabled',
    isSquare: true,
  },
};
