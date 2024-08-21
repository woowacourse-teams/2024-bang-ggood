import styled from '@emotion/styled';
import React from 'react';
import { Link, LinkProps, useLocation } from 'react-router-dom';

import FooterButton from '@/components/_common/Footer/FooterButton';
import { ROUTE_PATH } from '@/constants/routePath';
import { FOOTER_SIZE } from '@/constants/style';

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

const isSameURL = (path1: string, path2: string) =>
  new URL(path1, 'https://abc.com').pathname === new URL(path2, 'https://abc.com').pathname;

type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

const FooterLinkButton = (Logo: JSX.Element, LogoActive: JSX.Element, path: string) => {
  const LogoLinked = (props: MakeOptional<LinkProps, 'to'>) => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
      <Link to={path} {...props}>
        {isSameURL(path, currentPath) ? LogoActive : Logo}
      </Link>
    );
  };
  return LogoLinked;
};

const Footer = Object.assign(FooterWrapper, {
  Home: FooterLinkButton(<FooterButton logo="home" />, <FooterButton logo="home" isActive />, ROUTE_PATH.home),
  Checklist: FooterLinkButton(
    <FooterButton logo="checklist" />,
    <FooterButton logo="checklist" isActive />,
    ROUTE_PATH.checklistList,
  ),
  Article: FooterLinkButton(
    <FooterButton logo="article" />,
    <FooterButton logo="article" isActive />,
    ROUTE_PATH.article,
  ),
  Profile: FooterLinkButton(
    <FooterButton logo="profile" />,
    <FooterButton logo="profile" isActive />,
    ROUTE_PATH.myPage,
  ),
});

export default Footer;

const S = {
  EmptyBox: styled.div`
    height: ${FOOTER_SIZE}rem;
  `,
  Wrapper: styled.footer`
    display: flex;
    position: fixed;
    bottom: 0%;
    width: 100%;
    height: ${FOOTER_SIZE}rem;
    padding: 0.8rem 1.6rem 1.6rem;

    background-color: ${({ theme }) => theme.palette.white};
    max-width: 60rem;
    align-items: flex-start;
    box-sizing: border-box;

    box-shadow: 0 -0.4rem 1rem 0 rgb(0 0 0 / 3%);
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
