import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import Button from '@/components/_common/Button/Button';

import Modal, { ModalProps } from './Modal';

export default {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    isOpen: { control: 'boolean' },
    onClose: { action: 'closed' },
    size: {
      control: {
        type: 'select',
        options: ['small', 'large'],
      },
    },
    position: {
      control: {
        type: 'select',
        options: ['center', 'bottom', 'top'],
      },
    },
    hasCloseButton: { control: 'boolean' },
  },
} as Meta;

const Template: StoryFn<ModalProps> = (args: ModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
    if (args.onClose) args.onClose();
  };

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Button label="모달 열기" onClick={handleOpen} />
      <Modal {...args} isOpen={isModalOpen} onClose={handleClose}>
        <Modal.header title="모달 제목" />
        <Modal.body>
          <div style={{ fontSize: '1.4rem' }}>
            저희 조는 우주, 제이드, 제제, 시소, 헤일리, 리안, 카피로 이루어져 있습니다. 모두 방끗이라는 이름에 걸맞게
            귀여운 친구들이죠. 저희들과 친구를 하고 싶으신가요?
          </div>
        </Modal.body>
        {args.hasCloseButton && (
          <Modal.footer>
            <Button label="너무, 좋죠!" onClick={handleClose} size="small" />
            <Button label="앗, 그건  좀...!" onClick={handleClose} color="dark" size="small" />
          </Modal.footer>
        )}
      </Modal>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  isOpen: false,
  size: 'large',
  position: 'center',
  hasCloseButton: true,
};

export const BottomModal = Template.bind({});
BottomModal.args = {
  isOpen: false,
  position: 'bottom',
  hasCloseButton: true,
};
