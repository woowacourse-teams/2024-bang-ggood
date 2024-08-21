import styled from '@emotion/styled';

import Article from '@/assets/icons/footer/Article';
import Checklist from '@/assets/icons/footer/Checklist';
import Home from '@/assets/icons/footer/Home';
import Profile from '@/assets/icons/footer/Profile';
import { flexColumn } from '@/styles/common';
import theme from '@/styles/theme';

type LogoType = 'home' | 'checklist' | 'article' | 'profile';

interface Props {
  logo: LogoType;
  isActive?: boolean;
}

const FooterButton = ({ logo, isActive = false }: Props) => {
  const stroke = isActive ? theme.palette.yellow600 : theme.palette.grey400;
  const fill = isActive ? theme.palette.yellow600 : theme.palette.grey400;

  return (
    <S.Wrapper>
      {logo === 'home' && (
        <>
          <Home stroke={stroke} fill={stroke} />
          <S.Text isActive={isActive}>홈</S.Text>
        </>
      )}
      {logo === 'checklist' && (
        <>
          <Checklist stroke={stroke} fill={fill} />
          <S.Text isActive={isActive}>체크리스트</S.Text>
        </>
      )}
      {logo === 'article' && (
        <>
          <Article stroke={stroke} fill={fill} />
          <S.Text isActive={isActive}>아티클</S.Text>
        </>
      )}
      {logo === 'profile' && (
        <>
          <Profile stroke={stroke} fill={fill} />
          <S.Text isActive={isActive}>마이페이지</S.Text>
        </>
      )}
    </S.Wrapper>
  );
};

export default FooterButton;

const S = {
  Wrapper: styled.div`
    ${flexColumn}
    gap: .5rem;
    align-items: center;
  `,
  Text: styled.div<{ isActive: boolean }>`
    color: ${({ isActive, theme }) => (isActive ? theme.palette.yellow600 : theme.palette.grey400)};
    font-size: ${({ theme }) => theme.text.size.xxSmall};
  `,
};
