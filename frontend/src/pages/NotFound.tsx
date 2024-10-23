import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { BangBangCryIcon, Error404 } from '@/assets/assets';
import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import { ROUTE_PATH } from '@/constants/routePath';
import { flexCenter, flexColumn, title3 } from '@/styles/common';

const NotFound = () => {
  const navigate = useNavigate();

  const reset = () => {
    navigate(ROUTE_PATH.home, { replace: true });
  };

  return (
    <>
      <Header left={<Header.Logo />} />
      <Layout withHeader>
        <S.Wrapper>
          <BangBangCryIcon width={150} height={150} />
          <Error404 />
          <S.TextWrapper>
            <S.Text>접근할 수 없는 페이지입니다</S.Text>
            <S.ResetButton onClick={reset}>홈으로 돌아가기</S.ResetButton>
          </S.TextWrapper>
        </S.Wrapper>
      </Layout>
    </>
  );
};

export default NotFound;

const S = {
  Wrapper: styled.div`
    ${flexColumn}
    ${flexCenter}
    width: 100%;
    height: 100%;
    gap: 1rem;
  `,
  TextWrapper: styled.div`
    ${flexColumn}
    align-items: center;
    gap: 1rem;
    margin-top: 4rem;
  `,
  Text: styled.div`
    margin-bottom: 2rem;

    font-size: ${({ theme }) => theme.text.size.medium};
  `,
  ResetButton: styled.button`
    ${flexCenter}
    gap: .5rem;
    padding: 0.8rem 1.6rem;
    border: none;

    background-color: ${({ theme }) => theme.palette.green500};

    color: ${({ theme }) => theme.palette.white};
    ${title3}
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.palette.green600};
    }
  `,
};
