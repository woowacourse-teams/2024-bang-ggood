import styled from '@emotion/styled';

import ArticlePreviewCard from '@/components/Main/ArticlePreviewCard';
import { MAX_ARTICLES_DISPLAY_COUNT } from '@/constants/system';
import { useGetArticleListSuspenseQuery } from '@/hooks/query/useGetArticleListSuspenseQuery';
import { flexRow } from '@/styles/common';
import { Article } from '@/types/article';

const ArticleCardContainer = () => {
  const { articles } = useGetArticleListSuspenseQuery();

  return (
    <S.CardList>
      {articles?.slice(0, MAX_ARTICLES_DISPLAY_COUNT).map((article: Article, index: number) => (
        <S.CardWrapper key={article.articleId}>
          <ArticlePreviewCard index={index} article={article} />
        </S.CardWrapper>
      ))}
    </S.CardList>
  );
};

export default ArticleCardContainer;

const S = {
  CardList: styled.article`
    box-sizing: border-box;

    min-width: 100%;
    ${flexRow}
    overflow-x: scroll;
    scroll-snap-type: x mandatory;

    padding: 1.6rem;
    gap: 1rem;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  `,
  CardWrapper: styled.div`
    display: inline-block;
    scroll-snap-align: start;
    flex: 0 0 auto;

    &:first-of-type {
      padding-left: 1.6rem;
    }
  `,
};
