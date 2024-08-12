import type { Meta, StoryObj } from '@storybook/react';

import AnswerIcon from '@/components/Answer/AnswerIcon';

const meta = {
  title: 'components/AnswerIcon',
  component: AnswerIcon,
} satisfies Meta<typeof AnswerIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Good: Story = {
  args: { answer: 'GOOD' },
};

export const Bad: Story = {
  args: { answer: 'BAD' },
};
export const GoodSelected: Story = {
  args: { answer: 'GOOD', isSelected: true },
};

export const BadSelected: Story = {
  args: { answer: 'BAD', isSelected: true },
};

export const None: Story = {
  args: { answer: 'NONE' },
};
