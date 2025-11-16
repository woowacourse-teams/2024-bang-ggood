import type { Meta, StoryObj } from '@storybook/react';

import FaceIcon from '@/components/_common/FaceIcon/FaceIcon';

const meta = {
  title: 'components/FaceIcon',
  component: FaceIcon,
} satisfies Meta<typeof FaceIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Good: Story = {
  args: {
    emotion: 'GOOD',
  },
};

export const Soso: Story = {
  args: {
    emotion: 'SOSO',
  },
};

export const Bad: Story = {
  args: {
    emotion: 'BAD',
  },
};

export const None: Story = {
  args: {
    emotion: 'NONE',
  },
};
