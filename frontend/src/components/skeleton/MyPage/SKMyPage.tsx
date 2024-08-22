import styled from '@emotion/styled';

import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import { boxShadow, boxShadowSpread, flexCenter, flexColumn } from '@/styles/common';
import theme from '@/styles/theme';

const SKMyPage = () => {
  return (
    <>
      <Header center={<Header.Text>마이페이지</Header.Text>} />
      <Layout bgColor={theme.palette.background} withFooter withHeader>
        <S.Inner>
          <S.Container>
            <S.SkeletonProfileIcon />
            <S.SkeletonText width="80%" />
            <S.SkeletonText width="60%" />
          </S.Container>
          <S.SkeletonButton />
        </S.Inner>
      </Layout>
    </>
  );
};

export default SKMyPage;

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

  SkeletonProfileIcon: styled.div`
    width: 13.6rem;
    height: 13.6rem;
    border-radius: 50%;

    background-color: ${({ theme }) => theme.palette.grey300};
  `,
  SkeletonText: styled.div<{ width: string }>`
    width: ${({ width }) => width};
    height: 2rem;
    margin-top: 0.8rem;

    background-color: ${({ theme }) => theme.palette.grey300};
    border-radius: 0.4rem;
  `,
  SkeletonButton: styled.div`
    width: 15rem;
    height: 4rem;
    margin-top: 1.6rem;

    background-color: ${({ theme }) => theme.palette.grey300};
    border-radius: 0.8rem;
  `,
};
