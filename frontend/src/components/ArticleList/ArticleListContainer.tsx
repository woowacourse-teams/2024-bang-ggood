import styled from '@emotion/styled';

import ArticleCard from '@/components/ArticleList/ArticleCard';
import useGetArticleListQuery from '@/hooks/query/useGetArticleListQuery';
import { flexColumn } from '@/styles/common';
import { Article } from '@/types/article';

const ArticleListContainer = () => {
  const { articles } = useGetArticleListQuery();

  return (
    <S.ListContainer>
      {articles.map((article: Article) => (
        <ArticleCard key={`article-${article.articleId}`} article={article} />
      ))}
    </S.ListContainer>
  );
};

export default ArticleListContainer;

const S = {
  ListContainer: styled.section`
    ${flexColumn}
    gap: .8rem;
    margin-top: 1.6rem;
  `,
};
