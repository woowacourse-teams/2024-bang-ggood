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
    padding: 16px 16px 0;
  `,
  Row: styled.div`
    width: 100%;
    box-sizing: border-box;

    ${flexRow};
    ${flexSpaceBetween};
  `,
  Title: styled.div`
    width: 200px;
    height: 25px;
    ${Skeleton}
  `,
  CardBox: styled.div`
    height: 280px;
    margin-top: 20px;
    ${flexColumn};
    ${Skeleton}
  `,
};

export default SkChecklistSection;
