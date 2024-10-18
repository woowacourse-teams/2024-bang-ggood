import Button from '@/components/_common/Button/Button';
import Modal from '@/components/_common/Modal/Modal';
import useLogoutQuery from '@/hooks/query/useLogoutQuery';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteAccountModal = ({ isOpen, onClose }: Props) => {
  const { mutate: userLogout } = useLogoutQuery();

  const handleLogout = () => {
    userLogout();
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

export default DeleteAccountModal;
