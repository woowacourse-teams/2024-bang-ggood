import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { BangBangIcon } from '@/assets/assets';
import Button from '@/components/_common/Button/Button';
import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import Modal from '@/components/_common/Modal/Modal';
import { ROUTE_PATH } from '@/constants/routePath';
import useModalOpen from '@/hooks/useModalOpen';
import { boxShadow, boxShadowSpread, flexCenter, flexColumn } from '@/styles/common';
import theme from '@/styles/theme';

const MyPage = () => {
  const { isModalOpen, modalOpen, modalClose } = useModalOpen();
  const navigate = useNavigate();
  const handleLogout = () => {
    // TODO : 백엔드 로그아웃 API완성시 호출 필요.
    navigate(ROUTE_PATH.home);
  };
  return (
    <>
      <Header center={<Header.Text>마이페이지</Header.Text>} />
      <Layout bgColor={theme.palette.background} withFooter withHeader>
        <S.Container>
          <S.Profile>
            <S.ProfileIcon>
              <BangBangIcon width="100" height="100" />
            </S.ProfileIcon>
            닉네임
            <S.Button label="로그아웃" size="small" color="dark" onClick={modalOpen}></S.Button>
          </S.Profile>
        </S.Container>
      </Layout>

      <Modal isOpen={isModalOpen} onClose={modalClose}>
        <Modal.header>로그아웃</Modal.header>
        <Modal.body>정말 로그아웃 하실건가요?</Modal.body>
        <Modal.footer>
          <Button label="로그아웃" size="small" color="dark" onClick={handleLogout}></Button>
          <Button label="취소" size="small" color="light" onClick={modalClose}></Button>
        </Modal.footer>
      </Modal>
    </>
  );
};

const S = {
  Container: styled.div`
    max-width: 100%;
    box-sizing: border-box;
    margin: 16px;
    padding: 24px 16px;

    border-radius: 16px;
    gap: 12px;
    ${boxShadow};
    ${flexColumn};
    ${boxShadowSpread}
  `,
  ProfileIcon: styled.div`
    ${flexCenter}
    overflow: hidden;
    width: 136px;
    height: 136px;

    border-radius: 50%;
    padding-left: 1%; /* 중앙에 있어도 왼쪽으로 쏠린느낌이라 보정 */

    background-color: ${({ theme }) => theme.palette.yellow200};
  `,
  Profile: styled.div`
    ${flexColumn}
    row-gap:8px;

    font-weight: ${({ theme }) => theme.text.weight.semiBold};
    font-size: ${({ theme }) => theme.text.size.large};
    align-items: center;
  `,
  Button: styled(Button)`
    width: 150px;
  `,
  ButtonContainer: styled.div`
    ${flexCenter}
    column-gap:20px
  `,
};

export default MyPage;
