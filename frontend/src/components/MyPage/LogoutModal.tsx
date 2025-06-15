import styled from '@emotion/styled';

import Button from '@/components/_common/Button/Button';
import Modal from '@/components/_common/Modal/Modal';
import useLogoutQuery from '@/hooks/query/useLogoutQuery';
import { flexCenter, flexRow, flexSpaceBetween } from '@/styles/common';
import { fontStyle } from '@/utils/fontStyle';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutModal = ({ isOpen, onClose }: Props) => {
  const { mutate: userLogout } = useLogoutQuery();

  const handleLogout = () => {
    userLogout();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} style={{ }}>
      <>
        <Modal.header style={{ marginBottom: `0.8rem`, padding: 0, minHeight: 0 }}>
          로그아웃하기
        </Modal.header>
        <Modal.body>
          <S.Contents>
            <span>정말 로그아웃 하시겠습니까?</span>
          </S.Contents>
        </Modal.body>
      </>
      <Modal.footer>
        <S.ButtonContainer>
          <Button label="취소하기" size="full" onClick={onClose} isSquare />
          <Button label="로그아웃하기" size="full" color="dark" onClick={handleLogout} isSquare />
        </S.ButtonContainer>
      </Modal.footer>
    </Modal>
  );
};

export default LogoutModal;

const S = {
  Contents: styled.div`
    ${flexCenter};
    gap: .5rem;
    ${({ theme }) => fontStyle(theme.font.label[1].M)};
    color: ${({theme}) => theme.color.gray[600]};
  `,
  Spacer: styled.div`
    height: 4.2rem;
  `,
  ButtonContainer: styled.div`
    ${flexRow}
    ${flexSpaceBetween}
    width: 100%;
    gap: 1rem;
  `,
};
