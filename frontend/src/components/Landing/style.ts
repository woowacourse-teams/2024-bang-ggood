import styled from '@emotion/styled';

import { arrowMove, fadeIn } from '@/styles/animation';
import { flexCenter, flexColumn } from '@/styles/common';

const CS = {
  MoveUpDownAnimationBox: styled.div`
    flex-direction: column;
    margin-top: 1.5rem;
    ${flexCenter}
    position: absolute;
    bottom: 3rem;
    animation: ${arrowMove} 1s infinite;
    left: 50%;
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
  EmptyBox: styled.div<{ height: string; mobileHeight?: string }>`
    width: 100%;
    margin-top: ${({ height }) => height};

    @media (min-height < ${({ theme }) => theme.viewport.TABLET}px) {
      margin-top: ${({ mobileHeight, height }) => mobileHeight || height};
    }
  `,
  Observer: styled.div`
    height: 10px;
  `,
  Container: styled.div`
    ${flexColumn}
    line-height: 1.5;
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
  Highlight: styled.span`
    font-weight: ${({ theme }) => theme.text.weight.semiBold};
    width: fit-content;
    padding: 3px;
    background-color: ${({ theme }) => theme.palette.yellow500};
  `,
  CenterBox: styled.div`
    width: 100%;
    ${flexCenter}
  `,
  PencilIconBox: styled.div`
    position: absolute;
    right: -2rem;
    transform: scaleX(-1);
  `,
  LampIconBox: styled.div`
    position: absolute;
    margin-top: 20px;
  `,
  RelativeBox: styled.div`
    position: relative;
  `,
  IconBox: styled.div`
    position: absolute;
    left: 80px;
  `,
  ScreenShot: styled.img`
    width: 25rem;
    @media (height <= ${({ theme }) => theme.viewport.TABLET}px) {
      width: 18rem;
    }
  `,
};

export default CS;
