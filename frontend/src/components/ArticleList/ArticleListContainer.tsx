import styled from '@emotion/styled';

import ArticleCard from '@/components/ArticleList/ArticleCard';
import SkArticleList from '@/components/skeleton/Article/SkArticleList';
import useGetArticleListQuery from '@/hooks/query/useGetArticleListQuery';
import { flexColumn } from '@/styles/common';
import { Article } from '@/types/article';

const ArticleListContainer = () => {
  const { data: articles, isLoading } = useGetArticleListQuery();

  if (isLoading) return <SkArticleList />;

  return (
    <S.ListContainer>
      {articles?.map((article: Article) => <ArticleCard key={article.articleId} article={article} />)}
    </S.ListContainer>
  );
};

export default ArticleListContainer;

const S = {
  ListContainer: styled.section`
    ${flexColumn}
    gap: 1.2rem;
    margin-top: 1.6rem;
  `,
};
