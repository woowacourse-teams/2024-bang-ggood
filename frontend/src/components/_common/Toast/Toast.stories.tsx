import type { Meta, StoryObj } from '@storybook/react';

import Button from '@/components/_common/Button/Button';
import Toast from '@/components/_common/Toast/Toast';
import ToastContainer from '@/components/_common/Toast/ToastContainer';
import useToast from '@/hooks/useToast';

/**
 * Toast는 사용자에게 일정시간 동안 알림을 주는 컴포넌트입니다.
 */
const meta: Meta<typeof Toast> = {
  title: 'components/Toast',
  component: ToastContainer,
  decorators: [
    Story => (
      <>
        <ToastContainer />
        <Story />
      </>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Confirm: Story = {
  render: () => {
    const { showToast } = useToast();

    return (
      <div style={{ height: '100px' }}>
        <Button
          label="토스트 생성"
          onClick={() => showToast({ message: '토스트가 생성되었습니다.', type: 'confirm' })}
        />
      </div>
    );
  },
};

export const Error: Story = {
  render: () => {
    const { showToast } = useToast();

    return (
      <div style={{ height: '100px' }}>
        <Button
          label="토스트 생성"
          onClick={() =>
            showToast({ message: '에러 토스트가 생성되었습니다. \n잠시 후 다시 시도해 주세요.', type: 'error' })
          }
        />
      </div>
    );
  },
};
