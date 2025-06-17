import styled from '@emotion/styled';

import { arrowMove, fadeIn } from '@/styles/animation';
import { flexCenter, flexColumn, flexSpaceBetween } from '@/styles/common';
import { fontStyle } from '@/utils/fontStyle';

const CS = {
  Container: styled.section`
    width: 100%;
    height: 100%;
    ${flexColumn}
    ${flexSpaceBetween}
   align-items: center;
    gap: 1rem;
    line-height: 1.5;
    position: relative;
  `,
  TextContainer: styled.div`
    height: 200px;
    background-color: 'red';
  `,
  Title: styled.h3`
    text-align: center;
    margin-top: 3rem;
    margin-bottom: 0.5rem;
    ${({ theme }) => fontStyle(theme.font.title[3].B)};
  `,
  BigTitle: styled.h1`
    text-align: center;
    ${({ theme }) => fontStyle(theme.font.title[1].B)};
  `,
  Desc: styled.div<{ color?: string }>`
    color: ${({ color, theme }) => (color ? color : theme.color.gray[500])};
    text-align: center;
    ${({ theme }) => fontStyle(theme.font.body[1].B)};
  `,
  CenterBox: styled.div`
    width: 100%;
    height: 100%;
    ${flexColumn}
    ${flexCenter}
    gap: 1rem;
  `,
  EmptyBox: styled.div<{ height: string; mobileHeight?: string }>`
    width: 100%;
    margin-top: ${({ height }) => height};

    @media (min-height < ${({ theme }) => theme.viewport.TABLET}px) {
      margin-top: ${({ mobileHeight, height }) => mobileHeight || height};
    }
  `,
  MoveUpDownAnimationBox: styled.div`
    flex-direction: column;
    margin-top: 1.5rem;
    ${flexCenter}
    position: absolute;
    bottom: 3rem;
    animation: ${arrowMove} 3s infinite;
  `,
  AnimationBox: styled.div<{ isIntersecting: boolean }>`
    width: 100%;
    ${flexCenter};
    opacity: 0;
    transform: translateY(2rem);
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
  `,
  Observer: styled.div`
    height: 10px;
  `,
  TextBox: styled.div`
    ${flexColumn};
    width: 100%;
    justify-content: center;
    text-align: center;
  `,
  Bold: styled.span`
    font-weight: ${({ theme }) => theme.text.weight.semiBold};
  `,
  Text: styled.div<{ margin?: number }>`
    margin: ${({ margin }) => margin ?? 5}px;
    line-height: 1.5;
    font-size: ${({ theme }) => theme.text.size.small};

    @media (height > ${({ theme }) => theme.viewport.DESKTOP}px) {
      font-size: ${({ theme }) => theme.text.size.medium};
    }
  `,
  Highlight: styled.span<{ color?: string }>`
    font-weight: ${({ theme }) => theme.text.weight.semiBold};
    width: fit-content;
    padding: 3px;
    background: ${({ theme, color }) =>
      `linear-gradient(
      to bottom,
      transparent 60%,
      ${color ? color : theme.color.primary[500]} 60%,
      ${color ? color : theme.color.primary[500]} 75%,
      transparent 75%,
      transparent 85%,
      ${color ? color : theme.color.primary[500]} 85%,
      ${color ? color : theme.color.primary[500]} 95%,
       transparent 100%
    )`};
  `,
};

export default CS;
