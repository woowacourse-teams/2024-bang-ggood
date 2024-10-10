import styled from '@emotion/styled';
import React, { useRef } from 'react';

import FifthSection from '@/components/Landing/FifthSection';
import FirstSection from '@/components/Landing/FirstSection';
import FourthSection from '@/components/Landing/FourthSection';
import SecondSection from '@/components/Landing/SecondSection';
import ThirdSection from '@/components/Landing/ThirdSection';
import useMoveSection from '@/hooks/useMoveSection';
import { flexColumn } from '@/styles/common';
import theme from '@/styles/theme';

interface Color {
  background: string;
}

const SectionColors: Record<string, Color> = {
  first: {
    background: theme.palette.white,
  },
  second: {
    background: theme.palette.yellow100,
  },
  third: {
    background: theme.palette.green100,
  },
  fourth: {
    background: theme.palette.background,
  },
  fifth: {
    background: theme.palette.yellow200,
  },
};

const LAST_SECTION_INDEX = 4;

const LandingPage = () => {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const { handleSectionClick } = useMoveSection(sectionRefs);

  return (
    <S.Container>
      {Object.keys(SectionColors).map((key, index) => {
        return (
          <S.Section
            height={index === LAST_SECTION_INDEX ? '30rem' : undefined}
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
  () => <SecondSection />,
  () => <ThirdSection />,
  () => <FourthSection />,
  () => <FifthSection />,
];

export default LandingPage;

const S = {
  Section: styled.section<{ color: string; height?: string }>`
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
