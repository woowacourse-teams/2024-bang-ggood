import styled from '@emotion/styled';

import { MAX_CHECKLISTS_DISPLAY_COUNT } from '@/constants/system';
import { flexColumn, Skeleton } from '@/styles/common';

const SkChecklistSection = () => {
  return (
    <>
      {Array.from({ length: MAX_CHECKLISTS_DISPLAY_COUNT }).map((_, index) => (
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
