import type { Meta, StoryObj } from '@storybook/react';

import SelectionCounter from '@/components/common/SelectionCounter/SelectionCounter';

/**
 * SelectionCounter는 전체 선택지 중 현재 몇개가 선택되었는지를 알려주는 컴포넌트입니다.
 */
const meta = {
  title: 'components/SelectionCounter',
  component: SelectionCounter,
  parameters: {
    args: {
      size: '400px',
    },
  },
} satisfies Meta<typeof SelectionCounter>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { currentCount: 3, totalCount: 10 },
};
