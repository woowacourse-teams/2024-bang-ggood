import styled from '@emotion/styled';

import { fadeIn, moveUpDown } from '@/styles/animation';
import { boxShadow, flexCenter, flexColumn } from '@/styles/common';

const S = {
  /* common */
  AnimationBox: styled.div<{ isIntersecting: boolean }>`
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
  `,
  EmptyBox: styled.div<{ height: number }>`
    width: 100%;
    height: ${({ height }) => height}px;
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
    margin-top: 30px;
    text-align: center;
  `,
  Bold: styled.span`
    font-weight: ${({ theme }) => theme.text.weight.semiBold};
  `,
  Text: styled.div<{ margin?: number }>`
    margin: ${({ margin }) => margin ?? 5}px;
    line-height: 1.5;
    font-size: ${({ theme }) => theme.text.size.medium};
  `,
  Highlight: styled.span`
    font-weight: ${({ theme }) => theme.text.weight.semiBold};
    width: fit-content;
    padding: 3px;
    background-color: ${({ theme }) => theme.palette.yellow500};
  `,
  /*first */
  SubtitleText: styled.div`
    font-size: ${({ theme }) => theme.text.size.large};
  `,
  LogoBox: styled.div`
    width: 100%;
    align-items: center;
    height: 370px;
    padding-top: 80px;
    gap: 25px;
    ${flexColumn}
  `,
  CheckIconBox: styled.div`
    position: absolute;
    top: 15px;
    right: 78px;
  `,
  TextWrapper: styled.div`
    display: flex;
    position: relative;
    width: 280px;

    font-size: 18px;
    line-height: 1.4;
    flex-direction: column;
    align-items: center;
    justify-content: left;
  `,
  ButtonWrapper: styled.div`
    ${flexCenter}
    ${flexColumn}
    width: calc(100% - 4rem);
    margin: 0 2rem;
    box-sizing: border-box;

    gap: 1rem;
  `,
  GuestLoginButton: styled.button`
    width: 100%;
    height: 5rem;
    border: 3px solid ${({ theme }) => theme.palette.yellow500};
    box-sizing: border-box;

    font-size: ${({ theme }) => theme.text.size.medium};
    border-radius: 0.8rem;
    cursor: pointer;
  `,
  SubText: styled.div`
    font-size: ${({ theme }) => theme.text.size.small};
  `,
  MoreBox: styled.div`
    width: 100%;
    padding-top: 40px;
    gap: 10px;
    ${flexColumn}
    align-items: center;

    color: ${({ theme }) => theme.palette.grey500};
  `,
  MoveUpDownAnimationBox: styled.div`
    height: 40px;

    animation: ${moveUpDown} 1s infinite;
  `,
  /*second */
  CardList: styled.div`
    width: 100%;
    ${flexColumn};
    gap: 10px;
    align-items: center;
    margin-top: 20px;
  `,
  Card: styled.div`
    width: 300px;
    ${flexColumn};
    padding: 12px 16px;

    background-color: white;

    letter-spacing: 0.05rem;
    text-align: left;

    gap: 10px;
    box-sizing: border-box;
    border-radius: 8px;

    ${boxShadow}
  `,
  Keyword: styled.span<{ color?: string }>`
    align-self: flex-start;
    padding: 4px 10px;
    ${flexCenter}
    gap:10px;

    background-color: ${({ color, theme }) => color ?? theme.palette.white};

    color: ${({ theme }) => theme.palette.white};

    box-sizing: content-box;
    border-radius: 6px;
  `,
  CenterBox: styled.div`
    width: 100%;
    ${flexCenter}
  `,
  /*fourth section*/
  ChecklistImgBox: styled.div`
    ${flexCenter};
    position: relative;

    width: 320px;

    background-color: ${({ theme }) => theme.palette.background};
    border-radius: 10px;
    ${boxShadow};
  `,
  PencilIconBox: styled.div`
    position: absolute;
    left: 280px;
    transform: scaleX(-1);
  `,
  LampIconBox: styled.div`
    position: absolute;
    margin-top: 20px;
  `,
  /*fifth section*/
  RelativeBox: styled.div`
    position: relative;
  `,
  IconBox: styled.div`
    position: absolute;
    left: 80px;
  `,
};

export default S;
