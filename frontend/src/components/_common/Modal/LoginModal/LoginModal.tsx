import styled from '@emotion/styled';

import { BangBangIcon } from '@/assets/assets';
import KakaoLoginButton from '@/components/_common/KakaoLogin/KakaoLoginButton';
import Modal from '@/components/_common/Modal/Modal';
import { ROUTE_PATH } from '@/constants/routePath';
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
          <S.Wrapper>작성한 체크리스트는 자동으로 저장됩니다!</S.Wrapper>
        </S.Container>
      </Modal.body>
      <Modal.footer>
        <S.Column>
          <KakaoLoginButton redirectUri="write" afterLoginPath={ROUTE_PATH.checklistList} />
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
    ${flexColumn}
    gap: 2rem;
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
