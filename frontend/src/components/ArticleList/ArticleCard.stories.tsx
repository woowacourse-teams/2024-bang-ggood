import { Meta, StoryObj } from '@storybook/react';

import { Article } from '@/types/article';

import ArticleCard from './ArticleCard';

const meta: Meta<typeof ArticleCard> = {
  title: 'Components/ArticleCard',
  component: ArticleCard,
  argTypes: {
    article: {
      control: 'object',
      defaultValue: {
        articleId: 1,
        keyword: '자취 꿀팁',
        title: '자취 생활 꿀팁 10가지',
        summary: '자취 생활에 도움이 되는 꿀팁들을 소개합니다.',
        createdAt: '2023-03-10T12:00:00Z',
      } as Article,
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    article: {
      articleId: 1,
      keyword: '자취 꿀팁',
      title: '자취 생활 꿀팁 10가지',
      summary: '자취 생활에 도움이 되는 꿀팁들을 소개합니다.',
      createdAt: '2023-03-10T12:00:00Z',
    },
  },
};

export const WithLongSummary: Story = {
  args: {
    article: {
      articleId: 2,
      keyword: '생활 꿀팁',
      title: '생활 꿀팁으로 더 나은 하루 만들기',
      summary:
        '이 글에서는 다양한 생활 꿀팁을 소개합니다. 이 팁들은 매일의 생활을 조금 더 편리하고 효율적으로 만들어줄 것입니다. 집안일을 좀 더 쉽게 할 수 있는 방법부터, 자취 중에 꼭 알아두어야 할 팁들까지, 여러 가지 생활 꿀팁을 다룰 예정입니다. 다양한 방법을 통해 생활을 개선하는 팁을 확인해 보세요.',
      createdAt: '2023-06-15T15:00:00Z',
    },
  },
};
