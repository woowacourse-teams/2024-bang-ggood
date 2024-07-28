import type { Meta, StoryObj } from '@storybook/react';

import Toast from '@/components/common/Toast/Toast';

/**
 * 'Toast는 사용자에게 일정시간 동안 알림을 주는 컴포넌트입니다.'
 */
const meta = {
  title: 'components/Toast',
  component: Toast,
} satisfies Meta<typeof Toast>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // message: '돈까스가 도착했습니다.',
    // onClose: () => {},
    duration: 3000,
  },
};
