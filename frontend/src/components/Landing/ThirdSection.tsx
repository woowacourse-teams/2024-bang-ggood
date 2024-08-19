import styled from '@emotion/styled';
import { useRef } from 'react';

import { PencilIcon } from '@/assets/assets';
import { Bold, Container, Highlight, ImageBox, TextBox } from '@/components/Landing/style';
import { INTERSECTION_CONFIG } from '@/constants/system';
import useIntersection from '@/hooks/useIntersection';
import { boxShadow, flexCenter, flexColumn, title4 } from '@/styles/common';
import theme from '@/styles/theme';

const ThirdSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  const { isIntersecting } = useIntersection(INTERSECTION_CONFIG, ref);
  const { isIntersecting: isIntersecting2 } = useIntersection(INTERSECTION_CONFIG, ref2);

  return (
    <Container>
      <TextBox>
        <S.Text>
          방 구할 때 어디를 봐야 할지 <br />더 이상 고민하지 마세요!
        </S.Text>
        <S.Text>
          <Bold>방구하기 N년차 전문가</Bold>들이 <br />
          직접 방을 보러다니면서 <br />
          <S.Highlight>제일 중요하고 필요한 질문들</S.Highlight>만
          <br /> 모아놨어요.
        </S.Text>
        <S.Observer ref={ref} />
        <S.CardList>
          <S.Card isIntersecting={isIntersecting}>
            <S.Keyword color={theme.palette.blue500}>
              <img src="/image/home.png" width={20} />방 내부시설
            </S.Keyword>
            방에서 불쾌한 냄새가 나지는 않나요?
          </S.Card>
          <S.Card isIntersecting={isIntersecting}>
            <S.Keyword color={theme.palette.yellow500}>
              <img src="/image/window.png" width={20} />
              창문
            </S.Keyword>
            햇빛이 잘 들어오나요?
          </S.Card>
          <S.Card isIntersecting={isIntersecting}>
            <S.Keyword color={theme.palette.green500}>
              <img src="/image/toilet.png" width={20} />
              화장실
            </S.Keyword>
            화장실 내부에 환기 시설이 있나요?
          </S.Card>
        </S.CardList>

        <S.Text margin={35}>
          짧은 시간동안 <Bold>O X</Bold> 로 <Highlight>빠르게 체크해요!</Highlight>
        </S.Text>
        <S.Observer ref={ref2} />
        <S.CenterBox>
          <S.ImageBox isIntersecting={isIntersecting2}>
            <S.PencilIconBox>
              <PencilIcon width={100} height={90} />
            </S.PencilIconBox>
            <img src="/image/checkScreenShot.png" width="300px" />
          </S.ImageBox>
        </S.CenterBox>
      </TextBox>
    </Container>
  );
};

export default ThirdSection;

const S = {
  Highlight: styled.span`
    font-weight: ${({ theme }) => theme.text.weight.semiBold};
    width: fit-content;
    padding: 3px;

    background-color: ${({ theme }) => theme.palette.yellow500};
  `,
  PencilIconBox: styled.div`
    position: absolute;
    left: 260px;
    transform: scaleX(-1);
  `,
  Observer: styled.div`
    height: 5px;
  `,
  Text: styled.div<{ margin?: number }>`
    margin: ${({ margin }) => margin ?? 5}px;
    line-height: 1.5;
    font-size: ${({ theme }) => theme.text.size.medium};
  `,
  CardList: styled.div`
    width: 100%;
    ${flexColumn};
    gap: 10px;
    align-items: center;
    margin-top: 20px;
  `,
  Card: styled(ImageBox)<{ isIntersecting: boolean }>`
    ${flexColumn}
    text-align: left;
    width: 300px;
    gap: 10px;
    box-sizing: border-box;
    border-radius: 8px;
    padding: 12px 16px;
    background-color: white;
    letter-spacing: 0.05rem;
    ${boxShadow}
  `,
  Keyword: styled.span<{ color?: string }>`
    color: white;
    ${title4}
    align-self: flex-start;
    padding: 4px 10px;
    ${flexCenter}
    gap:10px;
    color: white;

    background-color: ${({ color }) => color ?? 'white'};

    box-sizing: content-box;
    border-radius: 6px;
  `,
  ImageBox: styled(ImageBox)<{ isIntersecting: boolean }>`
    ${flexCenter}
    background-color: ${({ theme }) => theme.palette.background};
    border-radius: 10px;
    width: 320px;
    ${boxShadow}
    position: relative;
  `,
  CenterBox: styled.div`
    width: 100%;
    ${flexCenter}
  `,
};
