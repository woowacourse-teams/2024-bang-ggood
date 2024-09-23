import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/react';

import OptionButton from '@/components/NewChecklist/Option/OptionButton/OptionButton';
import { OPTIONS } from '@/constants/options';

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
      size: '8rem',
    },
  },
} satisfies Meta<typeof OptionButton>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { option: OPTIONS[0], isSelected: true },
  decorators: [
    Story => (
      <S.Wrapper>
        <Story />
      </S.Wrapper>
    ),
  ],
};

const S = {
  Wrapper: styled.div`
    display: flex;
    width: 8rem;
    height: 8rem;
    align-items: center;
    justify-content: center;
  `,
};
