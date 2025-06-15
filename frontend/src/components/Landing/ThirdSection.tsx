import '@/styles/category-sprite-image.css';

import { useRef } from 'react';

import { EditChecklistImage, ScrollArrow } from '@/assets/assets';
import CS from '@/components/Landing/style';
import { INTERSECTION_CONFIG } from '@/constants/system';
import useIntersection from '@/hooks/useIntersection';

const ThirdSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  const { isIntersecting } = useIntersection(INTERSECTION_CONFIG, ref);
  const { isIntersecting: isIntersecting2 } = useIntersection(INTERSECTION_CONFIG, ref2);

  return (
    <CS.Container>
      <div>
        <CS.Title>
          필요한 질문은 <CS.Highlight>넣고</CS.Highlight>
          <br />
          필요없는 질문은 <CS.Highlight>빼고</CS.Highlight>
        </CS.Title>
        <CS.Desc>
          원하는 질문만 넣어서 <br />
          나만의 체크리스트를 만들어보세요.
        </CS.Desc>
      </div>
      <CS.Observer ref={ref} />
      <CS.AnimationBox isIntersecting={isIntersecting}>
        <EditChecklistImage width={400} style={{ paddingLeft: '2rem' }} />
      </CS.AnimationBox>

      <CS.MoveUpDownAnimationBox>
        <ScrollArrow aria-label="스크롤로 하단의 정보를 확인할 수 있어요" />
      </CS.MoveUpDownAnimationBox>
    </CS.Container>
  );
};

export default ThirdSection;
