import styled from '@emotion/styled';

import { BangBangIcon } from '@/assets/assets';
import Button from '@/components/_common/Button/Button';
import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import LogoutModal from '@/components/MyPage/LogoutModal';
import SKMyPage from '@/components/skeleton/MyPage/SKMyPage';
import useUserQuery from '@/hooks/query/useUserQuery';
import useModal from '@/hooks/useModal';
import { boxShadow, boxShadowSpread, flexCenter, flexColumn, title2 } from '@/styles/common';
import theme from '@/styles/theme';

const MyPage = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { data: user, isError, isLoading } = useUserQuery();

  if (isLoading) return <SKMyPage />;

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
              {`안녕하세요 ${isError ? '게스트' : user?.userName}님`}
            </S.Profile>
          </S.Container>
          {!isError && <Button label="로그아웃" size="full" color="dark" onClick={openModal} />}
          {isError && <Button label="로그인하러 가기" size="full" color="dark" onClick={openModal} />}
        </S.Inner>
      </Layout>
      <LogoutModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default MyPage;

const S = {
  Container: styled.div`
    max-width: 100%;
    box-sizing: border-box;
    margin: 1.6rem;
    padding: 2.4rem 1.6rem;

    border-radius: 1.6rem;
    gap: 1.2rem;

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
    width: 13.6rem;
    height: 13.6rem;

    border-radius: 50%;

    background-color: ${({ theme }) => theme.palette.yellow200};
  `,
  Profile: styled.div`
    ${flexColumn}
    row-gap:.8rem;

    ${title2}
    align-items: center;
  `,
  ButtonContainer: styled.div`
    ${flexCenter}
    column-gap:2rem;
  `,
};
