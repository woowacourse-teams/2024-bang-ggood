import styled from '@emotion/styled';

import { flexColumn, Skeleton } from '@/styles/common';

export const SHOW_CHECKLIST_COUNT = 3;

const SkChecklistSection = () => {
  return (
    <>
      {Array.from({ length: SHOW_CHECKLIST_COUNT }).map((_, index) => (
        <Sk.CardBox key={index} />
      ))}
    </>
  );
};

const Sk = {
  CardBox: styled.div`
    height: 5rem;
    ${flexColumn};
    ${Skeleton}
  `,
};

export default SkChecklistSection;
