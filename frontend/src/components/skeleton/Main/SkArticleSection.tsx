import styled from '@emotion/styled';

import { flexRow, flexSpaceBetween, Skeleton } from '@/styles/common';

const SkArticleSection = () => {
  return (
    <>
      <Sk.Row>
        <Sk.Title />
      </Sk.Row>
      <Sk.CardList>
        {new Array(3).fill(0).map((e, i) => (
          <Sk.CardWrapper key={i}>
            <Sk.Card />
          </Sk.CardWrapper>
        ))}
      </Sk.CardList>
    </>
  );
};

export default SkArticleSection;

const Sk = {
  Row: styled.div`
    width: 100%;
    box-sizing: border-box;

    padding: 16px 16px 0;
    ${flexRow};
    ${flexSpaceBetween};
  `,
  Title: styled.div`
    width: 200px;
    height: 25px;
    ${Skeleton}
  `,
  CardList: styled.div`
    box-sizing: border-box;
    max-width: 600px;
    overflow: hidden;

    min-width: 100%;
    ${flexRow}
    padding: 16px;
    gap: 16px;
  `,
  CardWrapper: styled.div`
    ${Skeleton}

    display: inline-block;
    overflow: hidden;
    width: 190px;

    flex: 0 0 auto;

    &:first-of-type {
      padding-left: 16px;
    }
  `,
  Card: styled.div`
    position: relative;
    width: 190px;
    height: 180px;
    padding: 16px;
    ${Skeleton}

    box-sizing: border-box;
    border-radius: 24px;
  `,
};
