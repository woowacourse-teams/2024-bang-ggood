import type { Meta, StoryObj } from '@storybook/react';

import FaceIcon from '@/components/common/FaceMark/FaceIcon';

const meta = {
  title: 'components/FaceIcon',
  component: FaceIcon,
} satisfies Meta<typeof FaceIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Round Button */
export const Good: Story = {
  args: { emotion: 'GOOD' },
};
export const Soso: Story = {
  args: { emotion: 'SOSO' },
};
export const Bad: Story = {
  args: { emotion: 'BAD' },
};
export const GoodFill: Story = {
  args: { emotion: 'GOOD', isFilled: true },
};
export const SosoFill: Story = {
  args: { emotion: 'SOSO', isFilled: true },
};
export const BadFill: Story = {
  args: { emotion: 'BAD', isFilled: true },
};
