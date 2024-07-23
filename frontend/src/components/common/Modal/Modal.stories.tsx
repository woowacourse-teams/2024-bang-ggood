import type { Meta, StoryObj } from '@storybook/react';

import Modal from '@/components/common/Modal/Modal';

/**
 * Modal은 페이지에서 새로운 ui를 따로 보여줄때 사용할 수 있는 컴포넌트입니다.
 */
const meta = {
  title: 'components/Modal',
  component: Modal,
} satisfies Meta<typeof Modal>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <Modal isOpen={true} onClose={() => {}}>
        <Modal.header title={'하하'} />
        <Modal.Body>
          <div>aa</div>
        </Modal.Body>
      </Modal>
    );
  },
};
