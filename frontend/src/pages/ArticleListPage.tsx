import styled from '@emotion/styled';

import FooterDefault from '@/components/_common/Footer/FooterDefault';
import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import ArticleCard from '@/components/Article/ArticleCard';
import useGetArticleListQuery from '@/hooks/query/useGetArticleListQuery';
import { flexColumn, title3 } from '@/styles/common';
import theme from '@/styles/theme';
import { Article } from '@/types/article';

const ArticleListPage = () => {
  const { data: articles, isLoading } = useGetArticleListQuery();

  if (isLoading) return <div>Article Loading</div>;

  return (
    <>
      <Header left={<Header.Logo />} />
      <Layout bgColor={theme.palette.background} withHeader withFooter>
        <S.Title>
          집 구하기 전 꼭 필요한 이야기 <S.Count>{articles?.length}</S.Count>
        </S.Title>
        <S.ListContainer>
          {articles?.map((article: Article, index: number) => (
            <ArticleCard key={article.articleId} article={article} index={index} />
          ))}
        </S.ListContainer>
      </Layout>
      <FooterDefault />
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
    gap: 12px;
    margin-top: 16px;
  `,
};
