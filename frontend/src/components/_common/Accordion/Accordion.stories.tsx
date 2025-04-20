import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/react';

import Accordion from '@/components/_common/Accordion/Accordion';
import { flexSpaceBetween, title4 } from '@/styles/common';
import theme from '@/styles/theme';

/**
 * Accordion 컴포넌트는 아이템을 확장하$여 보여줄 수 있는 컴포넌트입니다.
 */
const meta = {
  title: 'components/Accordion',
  component: Accordion,
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
} satisfies Meta<typeof Accordion>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <Accordion totalCount={1}>
        <Accordion.header id={1} text="Title" />
        <Accordion.body id={1}>
          <S.Content>카테고리의 내용이 있습니다.</S.Content>
        </Accordion.body>
      </Accordion>
    );
  },
  args: { totalCount: 1 },
};

const S = {
  Content: styled.div`
    ${flexSpaceBetween}
    width: 100%;
    padding: 1rem;
    gap: 1rem;

    ${title4}
    background-color: ${({ theme }) => theme.palette.white};
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
  `,
};
