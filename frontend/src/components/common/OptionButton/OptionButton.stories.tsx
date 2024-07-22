import type { Meta, StoryObj } from '@storybook/react';

import OptionButton from '@/components/common/OptionButton/OptionButton';

const meta = {
  title: 'components/OptionButton',
  component: OptionButton,
  parameters: {
    docs: {
      description: {
        component: 'Option버튼은 체크리스트의 다양한 옵션 아이템들을 선택할 수 있는 컴포넌트입니다.',
      },
    },
    args: {
      size: '400px',
    },
  },
} satisfies Meta<typeof OptionButton>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
