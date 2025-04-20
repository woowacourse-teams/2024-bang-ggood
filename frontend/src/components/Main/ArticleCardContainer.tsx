import styled from '@emotion/styled';

import ArticlePreviewCard from '@/components/Main/ArticlePreviewCard';
import SkArticleSection from '@/components/skeleton/Main/SkArticleSection';
import { MAX_ARTICLES_DISPLAY_COUNT } from '@/constants/system';
import useGetArticleListQuery from '@/hooks/query/useGetArticleListQuery';
import { flexRow } from '@/styles/common';
import { Article } from '@/types/article';

const ArticleCardContainer = () => {
  const { data: articles, isLoading } = useGetArticleListQuery();

  if (isLoading) return <SkArticleSection />;

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
  `,
};
