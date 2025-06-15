import styled from '@emotion/styled';

import AdminArticleCard from '@/components/Admin/Article/AdminArticleCard';
import { useGetArticleListSuspenseQuery } from '@/hooks/query/useGetArticleListSuspenseQuery';
import { flexColumn } from '@/styles/common';
import { Article } from '@/types/article';

const AdminArticleListContainer = () => {
  const { articles } = useGetArticleListSuspenseQuery();

  return (
    <S.ListContainer>
      {articles?.map((article: Article) => <AdminArticleCard key={article.articleId} article={article} />)}
    </S.ListContainer>
  );
};

export default AdminArticleListContainer;

const S = {
  ListContainer: styled.section`
    ${flexColumn}
    gap: 1.2rem;
    margin-top: 1.6rem;
  `,
};
