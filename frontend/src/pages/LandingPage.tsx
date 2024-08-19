import styled from '@emotion/styled';

import FirstSection from '@/components/Landing/FirstSection';
import FourthSection from '@/components/Landing/FourthSection';
import SecondSection from '@/components/Landing/SecondSection';
import ThirdSection from '@/components/Landing/ThirdSection';
import { flexColumn } from '@/styles/common';
import theme from '@/styles/theme';

type TextType = 'dark' | 'light';
interface Color {
  background: string;
  textType: TextType;
}
const SectionColors: Record<string, Color> = {
  first: {
    background: theme.palette.white,
    textType: 'dark',
  },
  second: {
    background: theme.palette.yellow100,
    textType: 'dark',
  },
  third: {
    background: theme.palette.green100,
    textType: 'dark',
  },
  fourth: {
    background: theme.palette.white,
    textType: 'dark',
  },
};

const LandingPage = () => {
  return (
    <S.Container>
      <S.Section color={SectionColors.first.background} textColor={SectionColors.first.textType}>
        <FirstSection />
      </S.Section>
      <S.Section color={SectionColors.second.background} textColor={SectionColors.second.textType}>
        <SecondSection />
      </S.Section>
      <S.Section height={760} color={SectionColors.third.background} textColor={SectionColors.third.textType}>
        <ThirdSection />
      </S.Section>
      <S.Section height={830} color={SectionColors.fourth.background} textColor={SectionColors.fourth.textType}>
        <FourthSection />
      </S.Section>
    </S.Container>
  );
};

export default LandingPage;

const S = {
  Section: styled.div<{ color: string; textColor: TextType; height?: number }>`
    width: 100%;
    height: ${({ height }) => height ?? 680}px;
    background-color: ${({ color }) => color ?? 'white'};
    display: flex;
    flex-direction: column;
    gap: 20px;
    color: ${({ textColor }) => (textColor === 'light' ? 'white' : 'black')};
  `,
  Container: styled.div`
    background-color: ${({ theme }) => theme.palette.background};
    ${flexColumn};
    gap: 20px;
  `,
};
