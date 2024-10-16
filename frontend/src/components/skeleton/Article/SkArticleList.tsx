import styled from '@emotion/styled';

import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import { flexColumn, Skeleton } from '@/styles/common';
import theme from '@/styles/theme';

const SHOW_ARTICLE_COUNT = 4;

const SkArticleList = () => {
  return (
    <>
      <Header center={<Header.Text>아티클</Header.Text>} />
      <Layout bgColor={theme.palette.background} withHeader withFooter>
        <S.Title />
        <S.ListContainer>
          {new Array(SHOW_ARTICLE_COUNT).fill(0).map((e, i) => (
            <S.ArticleCard key={i} />
          ))}
        </S.ListContainer>
      </Layout>
    </>
  );
};

export default SkArticleList;

const S = {
  Title: styled.h1`
    width: 20rem;
    height: 3rem;
    ${Skeleton}
  `,
  ListContainer: styled.section`
    ${flexColumn}
    gap: 1.2rem;
    margin-top: 1.6rem;
  `,
  ArticleCard: styled.div`
    width: 100%;
    height: 15.3rem;
    box-sizing: border-box;
    padding: 1.6rem;

    border-radius: 1.6rem;
    ${Skeleton}
  `,
};
