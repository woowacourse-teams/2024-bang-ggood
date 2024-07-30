import type { Meta, StoryObj } from '@storybook/react';

import Button from '@/components/common/Button/Button';
import Toast from '@/components/common/Toast/Toast';
import useToast from '@/store/useToast';

/**
 * Toast는 사용자에게 일정시간 동안 알림을 주는 컴포넌트입니다.
 */
const meta = {
  title: 'components/Toast',
  component: Toast,
} satisfies Meta<typeof Toast>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const { showToast } = useToast();
    return <Button label={'토스트 생성'} onClick={() => showToast('토스트가 생성되었습니다.')} />;
  },
};
