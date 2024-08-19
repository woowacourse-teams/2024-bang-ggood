import styled from '@emotion/styled';

import { fadeIn } from '@/styles/animation';
import { flexCenter } from '@/styles/common';

export const ImageBox = styled.div<{ isIntersecting: boolean }>`
  width: 100%;
  ${flexCenter};
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.5s ease-out,
    transform 0.5s ease-out;

  ${({ isIntersecting }) =>
    isIntersecting &&
    `
      opacity: 1;
      transform: translateY(0);
      animation: ${fadeIn} 0.5s ease-out forwards;
  
    `}
`;
