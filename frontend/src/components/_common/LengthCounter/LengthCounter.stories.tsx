import type { Meta, StoryObj } from '@storybook/react';

import LengthCounter from '@/components/_common/LengthCounter/LengthCounter';

/**
 * LengthCounter 전체 (개수/글자) 중 현재 (몇 개인지/글자수)를 알려주는 컴포넌트 입니다..
 */
const meta = {
  title: 'components/SelectionCounter',
  component: LengthCounter,
  parameters: {
    args: {
      size: '400px',
    },
  },
} satisfies Meta<typeof LengthCounter>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { currentCount: 3, totalCount: 10 },
};
