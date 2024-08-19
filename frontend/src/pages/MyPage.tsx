import styled from '@emotion/styled';

import { BangBangIcon } from '@/assets/assets';
import Button from '@/components/_common/Button/Button';
import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import MyPageModal from '@/components/MyPage/MyPageModal';
import useModalOpen from '@/hooks/useModalOpen';
import { boxShadow, boxShadowSpread, flexCenter, flexColumn, title2 } from '@/styles/common';
import theme from '@/styles/theme';

const MyPage = () => {
  const { isModalOpen, modalOpen, modalClose } = useModalOpen();

  return (
    <>
      <Header center={<Header.Text>마이페이지</Header.Text>} />

      <Layout bgColor={theme.palette.background} withFooter withHeader>
        <S.Inner>
          <S.Container style={{ width: '100%' }}>
            <S.Profile>
              <S.ProfileIcon>
                <BangBangIcon width="100" height="100" />
              </S.ProfileIcon>
              안녕하세요 닉네임님
            </S.Profile>
          </S.Container>
          <S.Button label="로그아웃" size="small" color="dark" onClick={modalOpen}></S.Button>
        </S.Inner>
      </Layout>

      <MyPageModal isOpen={isModalOpen} onClose={modalClose} />
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

    background-color: ${({ theme }) => theme.palette.white};
    ${boxShadow};
    ${flexColumn};
    ${boxShadowSpread}
  `,
  Inner: styled.div`
    ${flexCenter}
    ${flexColumn}
  `,
  ProfileIcon: styled.div`
    ${flexCenter}
    overflow: hidden;
    width: 136px;
    height: 136px;

    border-radius: 50%;

    background-color: ${({ theme }) => theme.palette.yellow200};
  `,
  Profile: styled.div`
    ${flexColumn}
    row-gap:8px;

    ${title2}
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
