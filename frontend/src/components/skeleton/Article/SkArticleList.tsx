import styled from '@emotion/styled';

import { flexColumn, Skeleton } from '@/styles/common';

const SHOW_ARTICLE_COUNT = 4;

const SkArticleList = () => {
  return (
    <>
      <S.ListContainer>
        {new Array(SHOW_ARTICLE_COUNT).fill(0).map((e, i) => (
          <S.ArticleCard key={i} />
        ))}
      </S.ListContainer>
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
