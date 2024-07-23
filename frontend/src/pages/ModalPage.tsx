import Modal from '@/components/common/Modal/Modal';

export const ModalPage = () => {
  return (
    <Modal isOpen={true} onClose={() => {}}>
      <Modal.header title={'aaa'} />
    </Modal>
  );
};
