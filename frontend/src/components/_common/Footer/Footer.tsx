import styled from '@emotion/styled';
import React from 'react';
import { Link, LinkProps, useLocation } from 'react-router-dom';

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
import { ROUTE_PATH } from '@/constants/routePath';

interface Props {
  children: React.ReactNode;
}

const FooterWrapper = ({ children, ...rest }: Props) => {
  return (
    <>
      <S.EmptyBox />
      <S.Wrapper {...rest}>
        <S.FlexBox>{children}</S.FlexBox>
      </S.Wrapper>
    </>
  );
};

const compare = (path1: string, path2: string) =>
  new URL(path1, 'https://abc.com').pathname === new URL(path2, 'https://abc.com').pathname;

type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

const FooterButton = (Logo: React.FC, LogoActive: React.FC, path: string) => {
  const LogoLinked = (props: MakeOptional<LinkProps, 'to'>) => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
      <Link to={path} {...props}>
        {compare(path, currentPath) ? <LogoActive /> : <Logo />}
      </Link>
    );
  };
  return LogoLinked;
};

const Footer = Object.assign(FooterWrapper, {
  HomeLogo: FooterButton(HomeLogo, HomeLogoActive, ROUTE_PATH.home),
  LocationLogo: FooterButton(LocationLogo, LocationLogoActive, ROUTE_PATH.location),
  ChecklistLogo: FooterButton(ChecklistLogo, ChecklistLogoActive, ROUTE_PATH.checklistList),
  MyPageLogo: FooterButton(MyPageLogo, MyPageLogoActive, ROUTE_PATH.myPage),
});

export default Footer;

const S = {
  EmptyBox: styled.div`
    height: 64px;
  `,
  Wrapper: styled.footer`
    display: flex;
    position: fixed;
    bottom: 0%;
    width: 100%;
    height: 64px;
    padding: 16px 32px;

    background-color: ${({ theme }) => theme.palette.white};
    max-width: 600px;
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
