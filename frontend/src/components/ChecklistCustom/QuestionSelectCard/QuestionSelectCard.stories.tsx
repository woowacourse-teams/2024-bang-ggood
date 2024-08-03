import type { Meta, StoryObj } from '@storybook/react';

import QuestionSelectCard from '@/components/ChecklistCustom/QuestionSelectCard/QuestionSelectCard';

import mobileDecorator from '../../../../.storybook/common';

/**
 * 체크리스트의 질문을 선택할 수 있는 카드입니다.
 */
const meta: Meta<typeof QuestionSelectCard> = {
  title: 'components/QuestionSelectCard',
  component: QuestionSelectCard,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    question: {
      questionId: 1,
      title: '수압/배수를 확인해주세요.',
      subtitle: '화장실과 주방을 확인해주세요',
      isChecked: true,
    },
  },
  decorators: [mobileDecorator],
};

export const notChecked: Story = {
  args: {
    question: {
      questionId: 1,
      title: '수압/배수를 확인해주세요.',
      subtitle: null,
      isChecked: false,
    },
  },
  decorators: [mobileDecorator],
};
