import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox';

/** hover 및 체크 시 UI가 변하는 간단한 체크박스입니다. */
const meta: Meta<typeof Checkbox> = {
  title: 'components/Checkbox',
  component: Checkbox,
  argTypes: {
    isChecked: { control: 'boolean' },
    color: { control: 'color' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const UnChecked: Story = {
  args: {
    isChecked: false,
  },
};

export const UnChecked_Hover: Story = {
  args: { isChecked: false },
  parameters: { pseudo: { hover: true } },
};

export const Checked: Story = {
  args: { isChecked: true },
};

export const Checked_Hover: Story = {
  args: { isChecked: true },
  parameters: { pseudo: { hover: true } },
};

export const UnPlus: Story = {
  args: {
    isChecked: false,
    iconType: 'plus',
  },
};

export const Plus: Story = {
  args: { isChecked: true, iconType: 'plus' },
};
