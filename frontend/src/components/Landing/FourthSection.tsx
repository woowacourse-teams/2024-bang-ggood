import { useRef } from 'react';

import { ArticleImage, ScrollArrow } from '@/assets/assets';
import CS from '@/components/Landing/style';
import { INTERSECTION_CONFIG } from '@/constants/system';
import useIntersection from '@/hooks/useIntersection';

const FourthSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { isIntersecting } = useIntersection(INTERSECTION_CONFIG, ref);
  const ref2 = useRef<HTMLDivElement>(null);

  return (
    <CS.Container>
      <div>
        <CS.Title>
          방 구하기
          <CS.Highlight>꿀팁</CS.Highlight>을
          <br />
          보기 쉽게 정리했어요
        </CS.Title>
      </div>
      <CS.Observer ref={ref} />
      <CS.AnimationBox isIntersecting={isIntersecting}>
        <ArticleImage width={400} style={{ paddingLeft: '2rem' }} />
      </CS.AnimationBox>

      <CS.MoveUpDownAnimationBox>
        <ScrollArrow aria-label="스크롤로 하단의 정보를 확인할 수 있어요" />
      </CS.MoveUpDownAnimationBox>
    </CS.Container>
  );
};

export default FourthSection;
