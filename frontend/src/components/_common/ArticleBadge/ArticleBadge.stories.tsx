import type { Meta, StoryObj } from '@storybook/react';

import ArticleBadge from './ArticleBadge';

const meta = {
  title: 'components/ArticleBadge',
  component: ArticleBadge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'ArticleBadge 아티클 타입을 알려주는 뱃지입니다.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'select',
      options: ['계약 꿀팁', '자취 일기', '생활 꿀팁', '동네 추천', '방끗 활용법', '우테코 생활', '자취 꿀팁'],
    },
  },
} satisfies Meta<typeof ArticleBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '계약 꿀팁',
  },
};
