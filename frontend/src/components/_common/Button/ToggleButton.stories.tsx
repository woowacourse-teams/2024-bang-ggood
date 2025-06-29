import type { Meta, StoryObj } from '@storybook/react';

import ToggleButton from '@/components/_common/Button/ToggleButton';

const meta = {
  title: 'components/ToggleButton',
  component: ToggleButton,
} satisfies Meta<typeof ToggleButton>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Square ToggleButton */
export const Default: Story = {
  args: {
    label: 'ToggleButton',
  },
};

export const SelectedButton: Story = {
  args: {
    label: 'ToggleButton',
    color: 'dark',
    selected: true,
  },
};
