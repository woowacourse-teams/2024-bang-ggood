import styled from '@emotion/styled';

import FifthSection from '@/components/Landing/FifthSection';
import FirstSection from '@/components/Landing/FirstSection';
import FourthSection from '@/components/Landing/FourthSection';
import SecondSection from '@/components/Landing/SecondSection';
import ThirdSection from '@/components/Landing/ThirdSection';
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
    background: 'tranparent',
  },
  fifth: {
    background: theme.palette.yellow200,
  },
};

const LandingPage = () => {
  return (
    <S.Container>
      <S.Section height={600} color={SectionColors.first.background}>
        <FirstSection />
      </S.Section>
      <S.Section color={SectionColors.second.background}>
        <SecondSection />
      </S.Section>
      <S.Section height={820} color={SectionColors.third.background}>
        <ThirdSection />
      </S.Section>
      <S.Section height={900} color={SectionColors.fourth.background}>
        <FourthSection />
      </S.Section>
      <S.Section height={250} color={SectionColors.fifth.background}>
        <FifthSection />
      </S.Section>
    </S.Container>
  );
};

export default LandingPage;

const S = {
  Section: styled.div<{ color: string; height?: number }>`
    width: 100%;
    height: ${({ height }) => height ?? 680}px;
    background-color: ${({ color }) => (typeof color === 'string' ? color : color)};
    display: flex;
    flex-direction: column;
    gap: 20px;
    color: black;
  `,
  Container: styled.div`
    background-color: ${({ theme }) => theme.palette.background};
    ${flexColumn};
    gap: 20px;
  `,
};
