import { css, keyframes } from '@emotion/react';

export const fadeIn = css`
  ${keyframes`
    from {
      opacity: 0;
      transform: translateY(100%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `}
`;

export const fadeOut = css`
  ${keyframes`
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(100%);
    }
  `}
`;

export const moveUpDown = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

export const arrowMove = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(0.3rem); 
    opacity: 0;
  }
  51% {
    transform: translateY(0.3rem); 
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;
