import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { TabProvider, useTabContext } from '@/components/_common/Tabs/TabContext';
import QuestionCardList from '@/components/ChecklistQuestionSelect/QuestionCardList/QuestionCardList';
import theme from '@/styles/theme';

import mobileDecorator from '../../../../.storybook/common';

/**
 * 체크리스트의 질문들이 들어가는 목록입니다.
 */
const meta: Meta<typeof QuestionCardList> = {
  title: 'components/QuestionCardList',
  component: QuestionCardList,
  parameters: {
    backgrounds: {
      default: 'grey',
      values: [
        {
          name: 'grey',
          value: theme.palette.grey100,
        },
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const tabDecorator = (Story: StoryFn) => (
  <TabProvider defaultTab={0}>
    <Story />
  </TabProvider>
);

export const Default: Story = {
  render: () => {
    const questions = [
      {
        questionId: 1,
        title: '수압/배수를 확인해주세요.',
        subtitle: '화장실과 주방을 확인해주세요',
        highlights: ['수압'],
        isSelected: true,
      },
      {
        questionId: 2,
        title: '벽과 바닥이 깨끗한가요?',
        subtitle: null,
        highlights: ['벽'],
        isSelected: false,
      },
    ];

    const { currentTabId } = useTabContext();
    return <QuestionCardList currentTabId={currentTabId} questions={questions} />;
  },
  decorators: [mobileDecorator, tabDecorator],
};
