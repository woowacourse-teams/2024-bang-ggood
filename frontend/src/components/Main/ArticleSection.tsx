import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import ArticlePreviewCard from '@/components/Main/ArticlePreviewCard';
import { ROUTE_PATH } from '@/constants/routePath';
import useGetArticleQuery from '@/hooks/query/useGetArticleQuery';
import { flexRow, flexSpaceBetween, title4 } from '@/styles/common';
import { Article } from '@/types/article';

const ArticleSection = () => {
  const navigate = useNavigate();
  const { data: articles, isLoading } = useGetArticleQuery();

  const handleClickShowMore = () => {
    navigate(ROUTE_PATH.article);
  };

  if (isLoading) return <div>Article Loading</div>;

  return (
    <>
      <S.Row>
        <S.Title>집 구하기 전 꼭 필요한 이야기</S.Title>
        <S.ShowMore onClick={handleClickShowMore}>더보기</S.ShowMore>
      </S.Row>
      <S.CardList>
        {articles?.slice(0, 4).map((article: Article, index: number) => (
          <S.CardWrapper key={article.articleId}>
            <ArticlePreviewCard index={index} article={article} />
          </S.CardWrapper>
        ))}
      </S.CardList>
    </>
  );
};

export default ArticleSection;

const S = {
  Row: styled.div`
    width: 100%;
    box-sizing: border-box;

    padding: 16px 16px 0;
    ${flexRow};
    ${flexSpaceBetween};
  `,
  Title: styled.div`
    ${title4}
  `,
  ShowMore: styled.div`
    color: ${({ theme }) => theme.palette.grey400};
    font-size: ${({ theme }) => theme.text.size.small};
  `,
  CardList: styled.div`
    box-sizing: border-box;

    min-width: 100%;
    ${flexRow}
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    padding: 16px;
    gap: 16px;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  `,
  CardWrapper: styled.div`
    display: inline-block;
    width: 190px;
    scroll-snap-align: start;
    flex: 0 0 auto;

    &:first-of-type {
      padding-left: 16px;
    }
  `,
};
