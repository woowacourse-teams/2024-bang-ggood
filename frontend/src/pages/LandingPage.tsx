import styled from '@emotion/styled';

import FirstSection from '@/components/Landing/FirstSection';
import SecondSection from '@/components/Landing/SecondSection';
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
    </S.Container>
  );
};

export default LandingPage;

const S = {
  Section: styled.div<{ color: string; textColor: TextType }>`
    width: 100%;
    height: 650px;
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
