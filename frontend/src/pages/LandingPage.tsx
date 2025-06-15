import styled from '@emotion/styled';
import React, { useRef } from 'react';

import FifthSection from '@/components/Landing/FifthSection';
import FirstSection from '@/components/Landing/FirstSection';
import FourthSection from '@/components/Landing/FourthSection';
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
  first: {
    background: theme.color.mono.white,
  },
  second: {
    background: theme.color.primary[500],
  },
  third: {
    background: theme.color.gray[200],
  },
  fourth: {
    background: theme.color.gray[100],
  },
  fifth: {
    background: theme.color.mono.white,
  },
};

const LAST_SECTION_INDEX = 4;

const LandingPage = () => {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const { handleSectionClick } = useMoveSection(sectionRefs);
  useAutoLogin();

  return (
    <S.Container>
      {Object.keys(SectionColors).map((key, index) => {
        return (
          <S.Section
            height={index === LAST_SECTION_INDEX ? '20rem' : '65rem'}
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
