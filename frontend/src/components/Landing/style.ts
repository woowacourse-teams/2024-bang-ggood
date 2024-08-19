import styled from '@emotion/styled';

import { fadeIn } from '@/styles/animation';
import { flexCenter, flexColumn } from '@/styles/common';

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

export const Container = styled.div`
  ${flexColumn}
  line-height: 1.5;
`;

export const TextBox = styled.div`
  ${flexColumn};
  width: 100%;
  gap: px;
  justify-content: center;
  margin-top: 30px;
  text-align: center;
`;

export const Bold = styled.span`
  font-weight: ${({ theme }) => theme.text.weight.semiBold};
`;

export const Text = styled.div<{ margin?: number }>`
  margin: ${({ margin }) => margin ?? 5}px;
  line-height: 1.5;
  font-size: ${({ theme }) => theme.text.size.medium};
`;

export const Highlight = styled.span`
  font-weight: ${({ theme }) => theme.text.weight.semiBold};
  width: fit-content;
  padding: 3px;
  background-color: ${({ theme }) => theme.palette.yellow500};
`;
