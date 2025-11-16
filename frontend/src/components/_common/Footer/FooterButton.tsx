import styled from '@emotion/styled';

import Article from '@/assets/icons/footer/Article';
import Building from '@/assets/icons/footer/Building';
import Checklist from '@/assets/icons/footer/Checklist';
import Home from '@/assets/icons/footer/Home';
import Profile from '@/assets/icons/footer/Profile';
import { flexColumn } from '@/styles/common';
import theme from '@/styles/theme';

type LogoType = 'home' | 'checklist' | 'article' | 'profile' | 'building-list';

interface Props {
  logo: LogoType;
  isActive?: boolean;
}

const FooterButton = ({ logo, isActive = false }: Props) => {
  const stroke = isActive ? theme.color.primary[500] : theme.color.gray[400];
  const fill = isActive ? theme.color.primary[200] : theme.color.gray[100];

  return (
    <S.Wrapper>
      {logo === 'home' && (
        <>
          <Home width={24} height={24} stroke={stroke} fill={fill} aria-label="홈 바로가기" />
          <S.Text isActive={isActive}>홈</S.Text>
        </>
      )}
      {logo === 'checklist' && (
        <>
          <Checklist width={24} height={24} stroke={stroke} fill={fill} aria-label="체크리스트 바로가기" />
          <S.Text isActive={isActive}>체크리스트</S.Text>
        </>
      )}
      {logo === 'article' && (
        <>
          <Article width={24} height={24} stroke={stroke} fill={fill} aria-label="아티클 바로가기" />
          <S.Text isActive={isActive}>아티클</S.Text>
        </>
      )}
      {logo === 'profile' && (
        <>
          <Profile width={24} height={24} stroke={stroke} fill={fill} aria-label="마이페이지 바로가기" />
          <S.Text isActive={isActive}>마이페이지</S.Text>
        </>
      )}
      {logo === 'building-list' && (
        <>
          <Building width={24} height={24} stroke={stroke} fill={fill} aria-label="마이페이지 바로가기" />
          <S.Text isActive={isActive}>건물리스트</S.Text>
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
    color: ${({ isActive, theme }) => (isActive ? theme.color.primary[500] : theme.color.gray[400])};
  `,
};
