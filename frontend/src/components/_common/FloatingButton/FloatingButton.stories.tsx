import type { Meta, StoryObj } from '@storybook/react';

import { PlusBlack, PlusWhite } from '@/assets/assets';
import FloatingButton from '@/components/_common/FloatingButton/FloatingButton';

const meta: Meta<typeof FloatingButton> = {
  title: 'components/FloatingButton',
  component: FloatingButton,
  decorators: [
    Story => (
      <div style={{ width: '300px', height: '200px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    color: {
      control: { type: 'select' },
      options: ['yellow', 'green', 'subGreen'],
    },

    'aria-label': { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const TextButton: Story = {
  args: {
    children: '버튼',
    size: 'medium',
    'aria-label': 'text button',
  },
};

export const IconButton: Story = {
  args: {
    children: <PlusWhite />,
    size: 'medium',
    color: 'green',
    'aria-label': 'icon button',
  },
};

export const TextIconButton: Story = {
  args: {
    children: (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem' }}>
        <PlusBlack /> 추가
      </div>
    ),
    size: 'extends',
    'aria-label': 'text and icon button',
  },
};
