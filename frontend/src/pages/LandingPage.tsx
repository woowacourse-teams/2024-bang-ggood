import styled from '@emotion/styled';
import React, { useRef } from 'react';

import FifthSection from '@/components/Landing/FifthSection';
import FirstSection from '@/components/Landing/FirstSection';
import FourthSection from '@/components/Landing/FourthSection';
import IntroSection from '@/components/Landing/IntroSection';
import SecondSection from '@/components/Landing/SecondSection';
import ThirdSection from '@/components/Landing/ThirdSection';
import useAutoLogin from '@/hooks/useAutoLogin';
import useMoveSection from '@/hooks/useMoveSection';
import { flexColumn } from '@/styles/common';
import theme from '@/styles/theme';

interface Color {
  background: string;
}

const SectionColors: Record<string, Color> = {
  0: {
    background: theme.color.mono.white,
  },
  1: {
    background: theme.color.mono.white,
  },
  2: {
    background: theme.color.primary[500],
  },
  3: {
    background: theme.color.gray[200],
  },
  4: {
    background: theme.color.gray[100],
  },
  5: {
    background: theme.color.mono.white,
  },
};

const SMALL_SECTION_INDEX = [1, 5];

const LandingPage = () => {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const { handleSectionClick } = useMoveSection(sectionRefs);
  useAutoLogin();

  return (
    <S.Container>
      {Object.keys(SectionColors).map((key, index) => {
        return (
          <S.Section
            height={SMALL_SECTION_INDEX.includes(index) ? '30rem' : '80rem'}
            key={key}
            ref={el => (sectionRefs.current[index] = el)}
            color={SectionColors[key].background}
            onClick={e => handleSectionClick(index, e)}
          >
            {React.createElement(sections[index])}
          </S.Section>
        );
      })}
    </S.Container>
  );
};

const sections = [
  () => <FirstSection />,
  () => <IntroSection />,
  () => <SecondSection />,
  () => <ThirdSection />,
  () => <FourthSection />,
  () => <FifthSection />,
];

export default LandingPage;

const S = {
  Section: styled.section<{ color: string; height?: string }>`
    position: relative;
    ${flexColumn}
    width: 100%;
    height: ${({ height }) => (height ? height : '100dvh')};

    background-color: ${({ color }) => color};

    color: ${({ theme }) => theme.palette.black};
    justify-content: center;
  `,
  Container: styled.main`
    background-color: ${({ theme }) => theme.palette.background};
    ${flexColumn};
  `,
};
