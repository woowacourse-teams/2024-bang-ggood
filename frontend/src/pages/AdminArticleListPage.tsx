import styled from '@emotion/styled';
import { ErrorBoundary } from 'react-error-boundary';

import ListErrorFallback from '@/components/_common/errorBoundary/ListErrorFallback';
import Layout from '@/components/_common/layout/Layout';
import AdminArticleListContainer from '@/components/Admin/Article/AdminArticleListContainer';
import SkArticleList from '@/components/skeleton/Article/SkArticleList';
import { flexRow, flexSpaceBetween, title2 } from '@/styles/common';
import theme from '@/styles/theme';
import { Suspense } from 'react';

const AdminArticleListPage = () => {
  return (
    <>
      <S.Header>
        <S.HeaderContents>
          <S.Title>아티클</S.Title>
        </S.HeaderContents>
      </S.Header>
      <Layout bgColor={theme.palette.background} withHeader withFooter>
        <ErrorBoundary FallbackComponent={ListErrorFallback}>
          <Suspense fallback={<SkArticleList />}>
            <AdminArticleListContainer />
          </Suspense>
        </ErrorBoundary>
      </Layout>
    </>
  );
};

export default AdminArticleListPage;

const S = {
  Header: styled.header`
    ${flexRow}
    justify-content: center;
    width: 100vw;
    height: 50px;
    border-bottom: 1px solid ${({ theme }) => theme.palette.grey200};
    box-sizing: border-box;
    margin-bottom: 20px;
  `,
  HeaderContents: styled.div`
    width: 120rem;
    ${flexRow}
    ${flexSpaceBetween}
    align-items: center;
  `,
  Title: styled.h1`
    ${title2}
  `,
};
