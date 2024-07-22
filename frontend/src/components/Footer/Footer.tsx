import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { useMatch } from 'react-router-dom';

import {
  ChecklistLogo,
  ChecklistLogoActive,
  HomeLogo,
  HomeLogoActive,
  LocationLogo,
  LocationLogoActive,
  MyPageLogo,
  MyPageLogoActive,
} from '@/assets/assets';

interface Props {
  children: { node: ReactNode; nodeActive: ReactNode; path: string }[];
}

// By detecting url param, active corresponding button with path
const FooterWrapper = ({ children, ...rest }: Props) => {
  const match = useMatch('/:page');

  return (
    <S.Wrapper {...rest}>
      <S.FlexBox>{children.map(child => (child.path === match.params.page ? child.nodeActive : child.node))}</S.FlexBox>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.header`
    display: flex;
    width: 100%;
    height: 64px;
    padding: 16px;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-between;

    background-color: ${({ theme }) => theme.palette.white};
  `,
  FlexBox: styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
  `,
  TextButton: styled.button`
    color: ${({ theme }) => theme.palette.black};
    font-weight: ${({ theme }) => theme.text.weight.bold};
    font-size: ${({ theme }) => theme.text.size.medium};
  `,
};

const Header = Object.assign(FooterWrapper, {
  HomeLogo,
  LocationLogo,
  ChecklistLogo,
  MyPageLogo,
  HomeLogoActive,
  LocationLogoActive,
  ChecklistLogoActive,
  MyPageLogoActive,
});
export default Header;
