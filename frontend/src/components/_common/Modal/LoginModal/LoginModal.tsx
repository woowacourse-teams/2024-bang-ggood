import styled from '@emotion/styled';

import { BangBangIcon } from '@/assets/assets';
import EmailLoginButton from '@/components/_common/LoginButton/EmailLoginButton';
import KakaoLoginButton from '@/components/_common/LoginButton/KakaoLoginButton';
import Modal from '@/components/_common/Modal/Modal';
import { flexCenter, flexColumn, title3 } from '@/styles/common';

interface Props {
  isModalOpen: boolean;
  modalClose: () => void;
}

const LoginModal = ({ isModalOpen, modalClose }: Props) => {
  return (
    <Modal isOpen={isModalOpen} onClose={modalClose} hasCloseButton={false}>
      <Modal.body>
        <S.Container>
          <S.IconBox>
            <BangBangIcon width={70} height={70} />
          </S.IconBox>
          <S.Title>로그인 후 방끗을 이용하실 수 있어요!</S.Title>
          <S.Wrapper>
            작성한 체크리스트는<S.Accent>자동</S.Accent>으로 저장되어요!
          </S.Wrapper>
        </S.Container>
      </Modal.body>
      <Modal.footer>
        <S.Column>
          <KakaoLoginButton />
          <EmailLoginButton />
          <S.CancelButton onClick={modalClose}>다음에 로그인하기</S.CancelButton>
        </S.Column>
      </Modal.footer>
    </Modal>
  );
};

export default LoginModal;

const S = {
  IconBox: styled.div`
    display: flex;
    gap: 10px;
    margin: 20px 0;
  `,
  Container: styled.div`
    width: 100%;
    margin-top: 1rem;

    text-align: center;

    ${flexColumn}
    ${flexCenter}
  `,
  Wrapper: styled.div`
    position: relative;
    width: 100%;
  `,
  Accent: styled.span`
    width: fit-content;
    margin-left: 5px;

    font-weight: bold;
    background: ${({ theme }) => `linear-gradient(to top, ${theme.palette.yellow400} 50%, transparent 50%)`};
  `,
  Title: styled.div`
    ${title3}
    margin: .5rem 0;
  `,
  Column: styled.div`
    width: 100%;
    ${flexColumn}
    ${flexCenter}
    gap: 1rem;
  `,
  CancelButton: styled.button`
    width: fit-content;

    color: ${({ theme }) => theme.palette.grey400};
    font-size: ${({ theme }) => theme.text.size.xSmall};
    border-bottom: 1px solid ${({ theme }) => theme.palette.grey400};
  `,
};
