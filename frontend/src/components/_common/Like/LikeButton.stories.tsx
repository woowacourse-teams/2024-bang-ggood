import type { Meta, StoryObj } from '@storybook/react';

import LikeButton from '@/components/_common/Like/LikeButton';

const meta: Meta<typeof LikeButton> = {
  title: 'components/LikeButton',
  component: LikeButton,
  parameters: {
    backgrounds: {
      default: 'white',
      values: [
        { name: 'white', value: '#ffffff' },
        { name: 'grey', value: '#cccccc' },
      ],
    },
  },
  argTypes: {
    checklistId: {
      control: 'number',
      description: 'The checklist ID for the like button',
    },
    isLiked: {
      control: 'boolean',
      description: 'Whether the item is liked or not',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checklistId: 1,
    isLiked: false,
  },
};

export const Liked: Story = {
  args: {
    checklistId: 2,
    isLiked: true,
  },
};

export const Loading: Story = {
  args: {
    checklistId: 3,
    isLiked: false,
  },
};
