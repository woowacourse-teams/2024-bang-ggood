import type { Meta, StoryObj } from '@storybook/react';

import { Plus } from '@/assets/assets';
import FloatingButton from '@/components/button/FloatingButton';

const meta: Meta<typeof FloatingButton> = {
  title: 'components/FloatingButton',
  component: FloatingButton,
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
    children: <Plus />,
    size: 'medium',
    color: 'green',
    'aria-label': 'icon button',
  },
};

export const TextIconButton: Story = {
  args: {
    children: (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
        <Plus /> 추가
      </div>
    ),
    size: 'extends',
    'aria-label': 'text and icon button',
  },
};
