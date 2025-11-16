import styled from '@emotion/styled';

import Button from '@/components/_common/Button/Button';
import Modal from '@/components/_common/Modal/Modal';
import useDeleteAccount from '@/hooks/query/useDeleteAccount';
import { flexCenter, flexColumn, flexRow, flexSpaceBetween } from '@/styles/common';
import { fontStyle } from '@/utils/fontStyle';

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
      <Modal.header style={{ marginBottom: `0.8rem`, padding: 0, minHeight: 0 }}>
        회원탈퇴
      </Modal.header>
      <Modal.body>
        <S.Contents>
          <span style={{whiteSpace: 'pre-wrap', textAlign: 'center'}}>
            {'잠깐만요! 정말 방끗을 떠나실건가요?\n회원탈퇴를 하면 방끗에서 작성한\n체크리스트를 다시는 확인할 수 없어요'}
          </span>
        </S.Contents>
      </Modal.body>
      <Modal.footer>
        <S.ButtonContainer>
          <Button label="취소하기" size="full" color="light" onClick={onClose} />
          <Button label="탈퇴하기" size="full" color="dark" onClick={handleDeleteAccount} />
        </S.ButtonContainer>
      </Modal.footer>
    </Modal>
  );
};

export default DeleteAccountModal;

const S = {
  Contents: styled.div`
    margin-top: 1rem;
    ${flexColumn}
    ${flexCenter}
    ${({ theme }) => fontStyle(theme.font.label[1].M)};
    color: ${({theme}) => theme.color.gray[600]};
  `,
  ButtonContainer: styled.div`
    ${flexRow}
    ${flexSpaceBetween}
    width: 100%;
    gap: 1rem;
  `,
};
