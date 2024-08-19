import styled from '@emotion/styled';

import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import { flexColumn, Skeleton } from '@/styles/common';
import theme from '@/styles/theme';

const SHOW_ARTICLE_COUNT = 3;

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
  Title: styled.div`
    width: 200px;
    height: 30px;
    ${Skeleton}
  `,
  ListContainer: styled.div`
    ${flexColumn}
    gap: 12px;
    margin-top: 16px;
  `,
  ArticleCard: styled.div`
    width: 100%;
    height: 153px;
    box-sizing: border-box;
    padding: 16px;

    border-radius: 16px;
    ${Skeleton}
  `,
};
