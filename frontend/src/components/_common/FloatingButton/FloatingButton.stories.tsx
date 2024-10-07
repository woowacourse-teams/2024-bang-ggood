import type { Meta, StoryObj } from '@storybook/react';

import { PlusBlack, PlusWhite } from '@/assets/assets';
import FloatingButton from '@/components/_common/FloatingButton/FloatingButton';

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
  tags: ['autodocs'],
  parameters: {
    docs: {
      inlineStories: true,
      iframeHeight: 600,
      description: {
        component: 'Floating 버튼은 하단에 새 체크리스트 추가 기능을 위한 컴포넌트입니다.',
      },
    },
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
        <PlusBlack /> 추가
      </div>
    ),
    size: 'extends',
    'aria-label': 'text and icon button',
  },
};
