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
      <S.Section height={65} color={SectionColors.first.background}>
        <FirstSection />
      </S.Section>
      <S.Section height={75} color={SectionColors.second.background}>
        <SecondSection />
      </S.Section>
      <S.Section height={82} color={SectionColors.third.background}>
        <ThirdSection />
      </S.Section>
      <S.Section height={95} color={SectionColors.fourth.background}>
        <FourthSection />
      </S.Section>
      <S.Section height={25} color={SectionColors.fifth.background}>
        <FifthSection />
      </S.Section>
    </S.Container>
  );
};

export default LandingPage;

const S = {
  Section: styled.div<{ color: string; height: number }>`
    ${flexColumn}
    width: 100%;
    height: ${({ height }) => height}rem;

    background-color: ${({ color }) => color};

    color: ${({ theme }) => theme.palette.black};
  `,
  Container: styled.div`
    background-color: ${({ theme }) => theme.palette.background};
    ${flexColumn};
  `,
};
