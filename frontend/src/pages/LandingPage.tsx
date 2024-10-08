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
    background: theme.palette.background,
  },
  fifth: {
    background: theme.palette.yellow200,
  },
};

const LandingPage = () => {
  return (
    <S.Container>
      <S.Section color={SectionColors.first.background}>
        <FirstSection />
      </S.Section>
      <S.Section color={SectionColors.second.background}>
        <SecondSection />
      </S.Section>
      <S.Section color={SectionColors.third.background}>
        <ThirdSection />
      </S.Section>
      <S.Section color={SectionColors.fourth.background}>
        <FourthSection />
      </S.Section>
      <S.Section color={SectionColors.fifth.background}>
        <FifthSection />
      </S.Section>
    </S.Container>
  );
};

export default LandingPage;

const S = {
  Section: styled.section<{ color: string }>`
    ${flexColumn}
    width: 100%;
    height: 100dvh;

    background-color: ${({ color }) => color};

    color: ${({ theme }) => theme.palette.black};
  `,
  Container: styled.main`
    background-color: ${({ theme }) => theme.palette.background};
    ${flexColumn};
  `,
};
