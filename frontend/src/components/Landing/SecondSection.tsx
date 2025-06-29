import { useTheme } from '@emotion/react';
import { useRef } from 'react';

import { ChecklistImage, ScrollArrow } from '@/assets/assets';
import CS from '@/components/Landing/style';
import { INTERSECTION_CONFIG } from '@/constants/system';
import useIntersection from '@/hooks/useIntersection';

const SecondSection = () => {
  const theme = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  const { isIntersecting } = useIntersection(INTERSECTION_CONFIG, ref);

  return (
    <CS.Container>
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <div>
          <CS.Title>
            좋은 방을 구하는
            <br />
            <CS.Highlight color={theme.color.mono.white}>기준</CS.Highlight>을 알려드려요
          </CS.Title>
          <CS.Desc color={theme.color.gray[600]}>
            방 보러 다닐 때, 꼭 필요한 질문만 모았어요.
            <br />
            <span style={{ color: theme.color.secondary[500] }}>O</span>
            <span style={{ color: theme.color.red[400] }}>X</span>로 빠르게 체크하고, 원하는 집을 골라보세요!
          </CS.Desc>
        </div>
        <CS.Observer ref={ref} />
        <CS.AnimationBox isIntersecting={isIntersecting}>
          <ChecklistImage width={400} />
        </CS.AnimationBox>
      </div>

      <CS.MoveUpDownAnimationBox>
        <ScrollArrow aria-label="스크롤로 하단의 정보를 확인할 수 있어요" />
      </CS.MoveUpDownAnimationBox>
    </CS.Container>
  );
};

export default SecondSection;
