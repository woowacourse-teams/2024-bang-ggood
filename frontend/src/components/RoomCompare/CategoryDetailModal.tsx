import Modal from '@/components/_common/Modal/Modal';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

const CategoryDetailModal = ({ isOpen, closeModal }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Modal.header>카테고리 비교</Modal.header>
      <Modal.body>
        <div>카테고리 비교 내용이 들어갑니다.</div>
      </Modal.body>
    </Modal>
  );
};

export default CategoryDetailModal;
