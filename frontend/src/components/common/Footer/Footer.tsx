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

const FooterWrapper = ({ children, ...rest }: Props) => {
  const match = useMatch('/:page');

  return (
    <S.Wrapper {...rest}>
      <S.FlexBox>
        {children.map(child => (
          <div key={child.path}>{child.path === match.params.page ? child.nodeActive : child.node}</div>
        ))}
      </S.FlexBox>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.footer`
    display: flex;
    position: absolute;
    bottom: 0;
    width: 100%;
    max-width: 600px;
    height: 64px;
    padding: 16px 32px;

    background-color: ${({ theme }) => theme.palette.white};
    align-items: flex-start;
    box-sizing: border-box;
  `,
  FlexBox: styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
  `,
  TextButton: styled.button`
    color: ${({ theme }) => theme.palette.black};
    font-weight: ${({ theme }) => theme.text.weight.bold};
    font-size: ${({ theme }) => theme.text.size.medium};
  `,
};

const Footer = Object.assign(FooterWrapper, {
  HomeLogo,
  LocationLogo,
  ChecklistLogo,
  MyPageLogo,
  HomeLogoActive,
  LocationLogoActive,
  ChecklistLogoActive,
  MyPageLogoActive,
});
export default Footer;
