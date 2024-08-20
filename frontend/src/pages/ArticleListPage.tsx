import styled from '@emotion/styled';

import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import ArticleCard from '@/components/ArticleList/ArticleCard';
import SkArticleList from '@/components/skeleton/Article/SkArticleList';
import useGetArticleListQuery from '@/hooks/query/useGetArticleListQuery';
import { flexColumn, title3 } from '@/styles/common';
import theme from '@/styles/theme';
import { Article } from '@/types/article';

const ArticleListPage = () => {
  const { data: articles, isLoading } = useGetArticleListQuery();

  if (isLoading) {
    return <SkArticleList />;
  }

  return (
    <>
      <Header center={<Header.Text>아티클</Header.Text>} />
      <Layout bgColor={theme.palette.background} withHeader withFooter>
        <S.Title>
          집 구하기 전 꼭 필요한 이야기 <S.Count>{articles?.length}</S.Count>
        </S.Title>
        <S.ListContainer>
          {articles?.map((article: Article) => <ArticleCard key={article.articleId} article={article} />)}
        </S.ListContainer>
      </Layout>
    </>
  );
};

export default ArticleListPage;

const S = {
  Title: styled.h1`
    ${title3}
  `,
  Count: styled.span`
    color: ${({ theme }) => theme.palette.green500};
  `,
  ListContainer: styled.div`
    ${flexColumn}
    gap: 1.2rem;
    margin-top: 1.6rem;
  `,
};
