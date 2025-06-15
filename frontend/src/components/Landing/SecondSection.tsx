import { useRef } from 'react';

import { ChecklistImage, ScrollArrow } from '@/assets/assets';
import CS from '@/components/Landing/style';
import { INTERSECTION_CONFIG } from '@/constants/system';
import useIntersection from '@/hooks/useIntersection';
import { flexCenter, flexColumn } from '@/styles/common';
import { fontStyle } from '@/utils/fontStyle';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

const SecondSection = () => {
  const theme = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  const { isIntersecting } = useIntersection(INTERSECTION_CONFIG, ref);

  return (
    <S.Container>
      <div>
        <S.Title>
          좋은 방을 구하는
          <br />
          기준을 알려드려요
        </S.Title>
        <S.Desc>
          방 보러 다닐 때, 꼭 필요한 질문만 모았어요.
          <br />
          <span style={{ color: theme.color.secondary[500] }}>O</span>
          <span style={{ color: theme.color.red[400] }}>X</span>로 빠르게 체크하고, 원하는 집을 골라보세요!
        </S.Desc>
      </div>
      <CS.Observer ref={ref} />
      <CS.AnimationBox isIntersecting={isIntersecting}>
        <ChecklistImage width={400} />
      </CS.AnimationBox>

      <CS.MoveUpDownAnimationBox>
        <ScrollArrow aria-label="스크롤로 하단의 정보를 확인할 수 있어요" />
      </CS.MoveUpDownAnimationBox>
    </S.Container>
  );
};

export default SecondSection;

const S = {
  Container: styled.section`
    ${flexColumn}
    ${flexCenter}
    gap: 1rem;
  `,
  Title: styled.h3`
    text-align: center;
    ${({ theme }) => fontStyle(theme.font.title[3].B)}
  `,
  Desc: styled.div`
    text-align: center;
    ${({ theme }) => fontStyle(theme.font.body[1].B)}
  `,
};
