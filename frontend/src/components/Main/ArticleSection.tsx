import styled from '@emotion/styled';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

import BoxErrorFallback from '@/components/_common/errorBoundary/BoxErrorFallback';
import ArticleCardContainer from '@/components/Main/ArticleCardContainer';
import SkArticleSection from '@/components/skeleton/Main/SkArticleSection';
import { ROUTE_PATH } from '@/constants/routePath';
import { flexRow, flexSpaceBetween } from '@/styles/common';
import { fontStyle } from '@/utils/fontStyle';

const ArticleSection = () => {
  const navigate = useNavigate();

  const handleClickShowMore = () => {
    navigate(ROUTE_PATH.articleList);
  };

  return (
    <>
      <S.Row>
        <S.Title>방 구하기 전 꼭 필요한 이야기</S.Title>
        <S.ShowMore onClick={handleClickShowMore}>더보기</S.ShowMore>
      </S.Row>
      <ErrorBoundary FallbackComponent={BoxErrorFallback}>
        <Suspense fallback={<SkArticleSection />}>
          <ArticleCardContainer />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default ArticleSection;

const S = {
  Row: styled.div`
    width: 100%;
    box-sizing: border-box;

    padding: 1rem 1.6rem 0;
    ${flexRow};
    align-items: center;
    ${flexSpaceBetween};
  `,
  Title: styled.div`
    ${({ theme }) => fontStyle(theme.font.heading[2].B)}
  `,
  ShowMore: styled.button`
    color: ${({ theme }) => theme.color.gray[600]};
    ${({ theme }) => fontStyle(theme.font.body[1].B)}
    cursor: pointer;
  `,
};
