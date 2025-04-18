import type { Meta, StoryObj } from '@storybook/react';

import Input from '@/components/_common/Input/Input';

const meta: Meta<typeof Input> = {
  title: 'components/Input',
  component: Input,
  parameters: {
    backgrounds: {
      default: 'gray',
      values: [
        { name: 'gray', value: '#eee' },
        { name: 'white', value: '#ffffff' },
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Disabled: Story = {
  args: { width: 'small', value: 'Input', disabled: true },
};
export const Normal: Story = {
  args: { width: 'small', value: 'Input', variant: 'default' },
};
export const Error: Story = {
  args: { width: 'small', value: 'Input', variant: 'error' },
};
export const NoBorder: Story = {
  args: { width: 'small', value: 'Input', variant: 'no-border' },
};
export const FillWhite: Story = {
  args: { width: 'small', value: 'Input', variant: 'fill-white' },
};
