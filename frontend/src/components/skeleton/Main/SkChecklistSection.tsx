import styled from '@emotion/styled';

import { flexColumn, flexRow, flexSpaceBetween, Skeleton } from '@/styles/common';

export const SHOW_CHECKLIST_COUNT = 3;

const SkChecklistSection = () => {
  return (
    <Sk.Wrapper>
      <Sk.Row>
        <Sk.Title />
      </Sk.Row>
      <Sk.CardBox />
    </Sk.Wrapper>
  );
};

const Sk = {
  Wrapper: styled.div`
    padding: 1.6rem 1.6rem 0;
  `,
  Row: styled.div`
    width: 100%;
    box-sizing: border-box;

    ${flexRow};
    ${flexSpaceBetween};
  `,
  Title: styled.div`
    width: 20rem;
    height: 2.5rem;
    ${Skeleton}
  `,
  CardBox: styled.div`
    height: 28rem;
    margin-top: 2rem;
    ${flexColumn};
    ${Skeleton}
  `,
};

export default SkChecklistSection;
