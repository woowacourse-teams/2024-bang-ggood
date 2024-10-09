import '@/styles/category-sprite-image.css';

import styled from '@emotion/styled';
import { useRef } from 'react';

import { checkingPageScreen, PencilIcon } from '@/assets/assets';
import CS from '@/components/Landing/style';
import { INTERSECTION_CONFIG } from '@/constants/system';
import useIntersection from '@/hooks/useIntersection';
import { boxShadow, flexCenter, flexColumn } from '@/styles/common';
import theme from '@/styles/theme';

const ThirdSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  const { isIntersecting } = useIntersection(INTERSECTION_CONFIG, ref);
  const { isIntersecting: isIntersecting2 } = useIntersection(INTERSECTION_CONFIG, ref2);

  return (
    <CS.Container>
      <CS.EmptyBox height="1rem" mobileHeight="2rem" />
      <CS.TextBox>
        <CS.Text>
          방 구할 때 어디를 봐야 할지 <br />더 이상 고민하지 마세요!
        </CS.Text>
        <CS.EmptyBox height="1rem" mobileHeight="0rem" />
        <CS.Text>
          <CS.Bold>방구하기 N년차 전문가</CS.Bold>들이 <br />
          직접 방을 보러다니면서 <br />
          <CS.Highlight>제일 중요하고 필요한 질문들</CS.Highlight>만
          <br /> 모아놨어요.
        </CS.Text>
        <CS.Observer ref={ref} />
        <CS.EmptyBox height="2rem" mobileHeight="0rem" />
        <S.CardList>
          <CS.AnimationBox isIntersecting={isIntersecting}>
            <S.Card>
              <S.Keyword color={theme.palette.blue500} className={`sprite-icon sprite-home`}>
                방 내부시설
              </S.Keyword>
              방에서 불쾌한 냄새가 나지는 않나요?
            </S.Card>
          </CS.AnimationBox>
          <CS.AnimationBox isIntersecting={isIntersecting}>
            <S.Card>
              <S.Keyword color={theme.palette.yellow500} className={`sprite-icon sprite-window`}>
                창문
              </S.Keyword>
              햇빛이 잘 들어오나요?
            </S.Card>
          </CS.AnimationBox>
          <CS.AnimationBox isIntersecting={isIntersecting}>
            <S.Card>
              <S.Keyword color={theme.palette.green500} className={`sprite-icon sprite-toilet`}>
                화장실
              </S.Keyword>
              화장실 내부에 환기 시설이 있나요?
            </S.Card>
          </CS.AnimationBox>
        </S.CardList>
        <CS.Text margin={25}>
          짧은 시간동안 <CS.Bold>O X</CS.Bold> 로<br /> <CS.Highlight>빠르게 체크해요!</CS.Highlight>
        </CS.Text>
        <CS.Observer ref={ref2} />
        <CS.AnimationBox isIntersecting={isIntersecting2}>
          <S.ChecklistImgBox>
            <img src={checkingPageScreen} />
            <CS.PencilIconBox>
              <PencilIcon width={70} height={90} />
            </CS.PencilIconBox>
          </S.ChecklistImgBox>
        </CS.AnimationBox>
      </CS.TextBox>
    </CS.Container>
  );
};

const S = {
  CardList: styled.div`
    transform: scale(1.2);
    transform-origin: center;
    ${flexColumn};
    gap: 1rem;
    align-items: center;

    @media (width <= ${({ theme }) => theme.viewport.MOBILE}px) {
      transform: none;
      transform-origin: center;
      width: 100%;
      margin-top: 0;
    }

    @media (height <= ${({ theme }) => theme.viewport.TABLET}px) {
      transform: none;
      transform-origin: center;
      width: 100%;
      margin-top: 0;
    }
  `,
  EmptyBox: styled.div`
    height: 10rem;

    @media (height <= ${({ theme }) => theme.viewport.MOBILE}px) {
      height: 2rem;
    }
  `,
  ChecklistImgBox: styled.div`
    transform: scale(1.2);
    transform-origin: center;
    ${flexCenter};
    position: relative;

    width: 250px;

    background-color: ${({ theme }) => theme.palette.background};
    border-radius: 10px;

    ${boxShadow};
    @media (height <= ${({ theme }) => theme.viewport.MOBILE}px) {
      display: none;
      transform: none;
      transform-origin: center;
    }

    @media (height <= ${({ theme }) => theme.viewport.TABLET}px) {
      transform: none;
      transform-origin: center;
    }
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

    @media (height <= ${({ theme }) => theme.viewport.TABLET}px) {
      padding: 6px 12px;

      transform: none;
      transform-origin: center;
    }
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
};
export default ThirdSection;
