import type { Meta, StoryObj } from '@storybook/react';

import QuestionCardList from '@/components/ChecklistCustom/QuestionCardList/QuestionCardList';
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

export const Default: Story = {
  args: {
    questions: [
      {
        questionId: 1,
        title: '수압/배수를 확인해주세요.',
        subtitle: '화장실과 주방을 확인해주세요',
        isChecked: true,
      },
      {
        questionId: 2,
        title: '벽과 바닥이 깨끗한가요?',
        subtitle: null,
        isChecked: false,
      },
    ],
    currentTabId: 1,
  },
  decorators: [mobileDecorator],
};
