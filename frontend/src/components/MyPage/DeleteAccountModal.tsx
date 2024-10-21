import styled from '@emotion/styled';

import Button from '@/components/_common/Button/Button';
import Modal from '@/components/_common/Modal/Modal';
import useDeleteAccount from '@/hooks/query/useDeleteAccount';
import { flexColumn, flexRow, flexSpaceBetween } from '@/styles/common';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteAccountModal = ({ isOpen, onClose }: Props) => {
  const { mutate: deleteAccount } = useDeleteAccount();

  const handleDeleteAccount = () => {
    deleteAccount();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.header>회원탈퇴</Modal.header>
      <Modal.body>
        <S.Contents>
          <span>잠깐만요! 정말 방끗을 떠나실건가요?</span>
          <span>회원탈퇴를 하면 방끗에서 작성한 체크리스트를 다시는 확인할 수 없어요</span>
        </S.Contents>
      </Modal.body>
      <Modal.footer>
        <S.ButtonContainer>
          <Button label="탈퇴하기" size="full" color="dark" onClick={handleDeleteAccount} isSquare />
          <Button label="취소하기" size="full" color="light" onClick={onClose} isSquare />
        </S.ButtonContainer>
      </Modal.footer>
    </Modal>
  );
};

export default DeleteAccountModal;

const S = {
  Contents: styled.div`
    ${flexColumn}
    gap: .5rem;
  `,
  ButtonContainer: styled.div`
    ${flexRow}
    ${flexSpaceBetween}
    width: 100%;
    gap: 1rem;
  `,
};
