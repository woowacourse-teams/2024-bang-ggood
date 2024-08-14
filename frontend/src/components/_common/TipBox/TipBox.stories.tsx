import type { Meta, StoryObj } from '@storybook/react';

import TipBox from '@/components/_common/TipBox/TipBox';

/**
 * TipBox는 가이드를 주는 팁이 담긴 박스 컴포넌트입니다.
 */
const meta = {
  title: 'components/TipBox',
  component: TipBox,
} satisfies Meta<typeof TipBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { tipText: '' },
};
