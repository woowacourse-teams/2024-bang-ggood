import { useNavigate } from 'react-router-dom';

import Button from '@/components/_common/Button/Button';
import Modal from '@/components/_common/Modal/Modal';
import { ROUTE_PATH } from '@/constants/routePath';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MyPageModal = ({ isOpen, onClose }: Props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO : 백엔드 로그아웃 API완성시 호출 필요.
    navigate(ROUTE_PATH.home);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.header>로그아웃</Modal.header>
      <Modal.body>정말 로그아웃 하실건가요?</Modal.body>
      <Modal.footer>
        <Button label="로그아웃" size="small" color="dark" onClick={handleLogout}></Button>
        <Button label="취소" size="small" color="light" onClick={onClose}></Button>
      </Modal.footer>
    </Modal>
  );
};

export default MyPageModal;
