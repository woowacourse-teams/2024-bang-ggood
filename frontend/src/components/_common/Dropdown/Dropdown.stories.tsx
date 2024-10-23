import type { Meta, StoryObj } from '@storybook/react';

import Dropdown from '@/components/_common/Dropdown/Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'components/Dropdown',
  component: Dropdown,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialValue: '선택1',
    options: [{ value: '선택1' }, { value: '선택2' }],
  },
};
