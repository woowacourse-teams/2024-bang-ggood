import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { TabProvider } from '@/components/_common/Tabs/TabContext';
import QuestionSelectCard from '@/components/ChecklistQuestionSelect/QuestionSelectCard/QuestionSelectCard';

import mobileDecorator from '../../../../.storybook/common';

const tabDecorator = (Story: StoryFn) => (
  <TabProvider defaultTab={0}>
    <Story />
  </TabProvider>
);

/**
 * 체크리스트 커스텀 질문 선택을 위한 버튼입니다.
 */
const meta: Meta<typeof QuestionSelectCard> = {
  title: 'components/QuestionSelectCard',
  component: QuestionSelectCard,
  decorators: [mobileDecorator, tabDecorator],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Selected: Story = {
  args: {
    question: {
      questionId: 1,
      title: '수압/배수를 확인해주세요.',
      subtitle: '화장실과 주방을 확인해주세요',
      highlights: ['수압'],
      isSelected: true,
    },
  },
};

export const Unselected: Story = {
  args: {
    question: {
      questionId: 1,
      title: '수압/배수를 확인해주세요.',
      subtitle: '화장실과 주방을 확인해주세요',
      highlights: ['수압'],
      isSelected: false,
    },
  },
};
