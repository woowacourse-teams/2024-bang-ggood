import styled from '@emotion/styled';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

import BoxErrorFallback from '@/components/_common/errorBoundary/BoxErrorFallback';
import ArticleCardContainer from '@/components/Main/ArticleCardContainer';
import { ROUTE_PATH } from '@/constants/routePath';
import { flexRow, flexSpaceBetween, title4 } from '@/styles/common';

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
        <ArticleCardContainer />
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
    ${flexSpaceBetween};
  `,
  Title: styled.div`
    ${title4}
  `,
  ShowMore: styled.button`
    color: ${({ theme }) => theme.palette.grey400};
    font-size: ${({ theme }) => theme.text.size.small};
    cursor: pointer;
  `,
};
