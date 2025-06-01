import styled from '@emotion/styled';

import ArticleCard from '@/components/ArticleList/ArticleCard';
import useGetArticleListQuery from '@/hooks/query/useGetArticleListQuery';
import { flexColumn } from '@/styles/common';
import { Article, ArticleType } from '@/types/article';

const ArticleListContainer = ({ selectKeyword }: { selectKeyword: ArticleType | '전체' }) => {
  const { articles } = useGetArticleListQuery();
  const selectedArticles = articles.filter(article => {
    if (selectKeyword === '전체') return true;
    return article.keyword === selectKeyword;
  });

  return (
    <S.ListContainer>
      {selectedArticles.map((article: Article) => (
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
