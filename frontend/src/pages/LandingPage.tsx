import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { postKakaoCode } from '@/apis/login';
import FifthSection from '@/components/Landing/FifthSection';
import FirstSection from '@/components/Landing/FirstSection';
import FourthSection from '@/components/Landing/FourthSection';
import SecondSection from '@/components/Landing/SecondSection';
import ThirdSection from '@/components/Landing/ThirdSection';
import { ROUTE_PATH } from '@/constants/routePath';
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
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    const postLogin = async () => {
      if (code) {
        await postKakaoCode(code).then(async () => {
          navigate(ROUTE_PATH.main);
        });
      }
    };

    if (code) {
      postLogin();
    }
  }, []);

  return (
    <S.Container>
      <S.Section height={570} color={SectionColors.first.background}>
        <FirstSection />
      </S.Section>
      <S.Section height={680} color={SectionColors.second.background}>
        <SecondSection />
      </S.Section>
      <S.Section height={820} color={SectionColors.third.background}>
        <ThirdSection />
      </S.Section>
      <S.Section height={930} color={SectionColors.fourth.background}>
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
  Section: styled.div<{ color: string; height: number }>`
    display: flex;
    width: 100%;
    height: ${({ height }) => height}px;

    background-color: ${({ color }) => color};

    color: ${({ theme }) => theme.palette.black};
    flex-direction: column;
  `,
  Container: styled.div`
    background-color: ${({ theme }) => theme.palette.background};
    ${flexColumn};
  `,
};
