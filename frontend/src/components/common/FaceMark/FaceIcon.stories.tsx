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
  args: { emotion: 'good' },
};
export const Soso: Story = {
  args: { emotion: 'soso' },
};
export const Bad: Story = {
  args: { emotion: 'bad' },
};
export const GoodFill: Story = {
  args: { emotion: 'good', isFilled: true },
};
export const SosoFill: Story = {
  args: { emotion: 'soso', isFilled: true },
};
export const BadFill: Story = {
  args: { emotion: 'bad', isFilled: true },
};
