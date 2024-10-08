import { useRef } from 'react';

import { LampIcon } from '@/assets/assets';
import TopButton from '@/components/_common/TopButton/TopButton';
import ArticleCard from '@/components/ArticleList/ArticleCard';
import S from '@/components/Landing/style';
import { INTERSECTION_CONFIG } from '@/constants/system';
import useIntersection from '@/hooks/useIntersection';
import { articleList } from '@/mocks/fixtures/articleList';

const FifthSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { isIntersecting: isIntersecting2 } = useIntersection(INTERSECTION_CONFIG, ref);

  return (
    <S.Container>
      <S.TextBox>
        <S.Text margin={30}>
          방 구하기 초보라 아무것도 모르겠다면,
          <br />
          <S.Highlight>집 구하기 꿀팁이 담긴 아티클</S.Highlight>을
          <br /> 읽으면서 방 구하기 고수가 되어보아요!
          <S.Observer ref={ref} />
          <S.EmptyBox height={'2rem'} />
          <S.AnimationBox isIntersecting={isIntersecting2}>
            <div>
              <ArticleCard article={articleList.articles[2]} />
            </div>
          </S.AnimationBox>
        </S.Text>
        <S.RelativeBox>
          <S.Text>
            <S.Bold>방끗</S.Bold>과 함께 당신에게 <br />
            <S.Highlight>딱 맞는 집을 찾는 여정</S.Highlight>을 <br />
            시작해 볼까요?
          </S.Text>
          <S.IconBox>
            <LampIcon width={80} />
          </S.IconBox>
          <S.EmptyBox height={'2rem'} />
          <S.CenterBox>
            <TopButton text={'시작하기!'} />
          </S.CenterBox>
        </S.RelativeBox>
      </S.TextBox>
    </S.Container>
  );
};

export default FifthSection;
