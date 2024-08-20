import styled from '@emotion/styled';

import { flexRow, flexSpaceBetween, Skeleton } from '@/styles/common';

const SkArticleSection = () => {
  return (
    <>
      <S.Row>
        <S.Title />
      </S.Row>
      <S.CardList>
        {new Array(3).fill(0).map((e, i) => (
          <S.CardWrapper key={i}>
            <S.Card />
          </S.CardWrapper>
        ))}
      </S.CardList>
    </>
  );
};

export default SkArticleSection;

const S = {
  Row: styled.div`
    width: 100%;
    box-sizing: border-box;

    padding: 1.6rem 1.6rem 0;
    ${flexRow};
    ${flexSpaceBetween};
  `,
  Title: styled.div`
    width: 20rem;
    height: 2.5rem;
    ${Skeleton}
  `,
  CardList: styled.div`
    box-sizing: border-box;
    max-width: 60rem;
    overflow: hidden;

    min-width: 100%;
    ${flexRow}
    padding: 1.6rem;
    gap: 1.6rem;
  `,
  CardWrapper: styled.div`
    ${Skeleton}

    display: inline-block;
    overflow: hidden;
    width: 19rem;

    flex: 0 0 auto;

    &:first-of-type {
      padding-left: 1.6rem;
    }
  `,
  Card: styled.div`
    position: relative;
    width: 19rem;
    height: 18rem;
    padding: 1.6rem;
    ${Skeleton}

    box-sizing: border-box;
    border-radius: 2.4rem;
  `,
};