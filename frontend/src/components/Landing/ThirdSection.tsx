import { useRef } from 'react';

import { PencilIcon } from '@/assets/assets';
import S from '@/components/Landing/style';
import { INTERSECTION_CONFIG } from '@/constants/system';
import useIntersection from '@/hooks/useIntersection';
import theme from '@/styles/theme';
import checkScreenshotImgUrl from '/image/checkScreenShot.png';

import homeImgUrl from '../../../public/image/home.png';
import toiletImgUrl from '../../../public/image/toilet.png';
import windowImgUrl from '../../../public/image/window.png';

const ThirdSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  const { isIntersecting } = useIntersection(INTERSECTION_CONFIG, ref);
  const { isIntersecting: isIntersecting2 } = useIntersection(INTERSECTION_CONFIG, ref2);

  return (
    <S.Container>
      <S.TextBox>
        <S.Text>
          방 구할 때 어디를 봐야 할지 <br />더 이상 고민하지 마세요!
        </S.Text>
        <S.EmptyBox height={10} />
        <S.Text>
          <S.Bold>방구하기 N년차 전문가</S.Bold>들이 <br />
          직접 방을 보러다니면서 <br />
          <S.Highlight>제일 중요하고 필요한 질문들</S.Highlight>만
          <br /> 모아놨어요.
        </S.Text>
        <S.Observer ref={ref} />
        <S.CardList>
          <S.AnimationBox isIntersecting={isIntersecting}>
            <S.Card>
              <S.Keyword color={theme.palette.blue500}>
                <img src={homeImgUrl} width={20} />방 내부시설
              </S.Keyword>
              방에서 불쾌한 냄새가 나지는 않나요?
            </S.Card>
          </S.AnimationBox>
          <S.AnimationBox isIntersecting={isIntersecting}>
            <S.Card>
              <S.Keyword color={theme.palette.yellow500}>
                <img src={windowImgUrl} width={20} />
                창문
              </S.Keyword>
              햇빛이 잘 들어오나요?
            </S.Card>
          </S.AnimationBox>
          <S.AnimationBox isIntersecting={isIntersecting}>
            <S.Card>
              <S.Keyword color={theme.palette.green500}>
                <img src={toiletImgUrl} width={20} />
                화장실
              </S.Keyword>
              화장실 내부에 환기 시설이 있나요?
            </S.Card>
          </S.AnimationBox>
        </S.CardList>
        <S.EmptyBox height={10} />
        <S.Text margin={25}>
          짧은 시간동안 <S.Bold>O X</S.Bold> 로 <S.Highlight>빠르게 체크해요!</S.Highlight>
        </S.Text>
        <S.Observer ref={ref2} />
        <S.AnimationBox isIntersecting={isIntersecting2}>
          <S.ChecklistImgBox>
            <img src={checkScreenshotImgUrl} />
            <S.PencilIconBox>
              <PencilIcon width={70} height={90} />
            </S.PencilIconBox>
          </S.ChecklistImgBox>
        </S.AnimationBox>
      </S.TextBox>
    </S.Container>
  );
};

export default ThirdSection;
