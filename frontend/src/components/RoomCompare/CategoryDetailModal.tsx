import { useSearchParams } from 'react-router-dom';

import Modal from '@/components/_common/Modal/Modal';
import useGetRoomCategoryDetailQuery from '@/hooks/query/useGetRoomCategoryDetail';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

const CategoryDetailModal = ({ isOpen, closeModal }: Props) => {
  const [searchParams] = useSearchParams();
  const roomId = Number(searchParams.get('roomId')) || 1;
  const categoryId = Number(searchParams.get('categoryId')) || 1;
  const { data } = useGetRoomCategoryDetailQuery({ roomId, categoryId });

  console.log('data', data);

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
