import type { Meta, StoryObj } from '@storybook/react';

import Checkbox from '@/components/common/Checkbox/Checkbox';
import theme from '@/styles/theme';

/** hover 및 체크 시 UI가 변하는 간단한 체크박스입니다. */
const meta: Meta<typeof Checkbox> = {
  title: 'components/Checkbox',
  component: Checkbox,
  parameters: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const UnChecked: Story = {
  args: { isChecked: false },
};
export const Hover: Story = {
  args: { isChecked: false },
  parameters: { pseudo: { hover: true } },
};
export const Checked: Story = {
  args: { isChecked: true },
};

export const GreyChecked: Story = {
  args: { isChecked: true, color: theme.palette.grey300, hoverBorderColor: theme.palette.grey400 },
};
