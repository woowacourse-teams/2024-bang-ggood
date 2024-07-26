import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { Link, LinkProps, useMatch } from 'react-router-dom';

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
  children: { node: ReactNode; nodeActive: ReactNode; path: string }[];
}

const FooterWrapper = ({ children, ...rest }: Props) => {
  const match = useMatch('/:page');
  const currentPath = match.params.page;
  return (
    <>
      <S.EmptyBox />
      <S.Wrapper {...rest}>
        <S.FlexBox>
          {children.map(logo => (
            <div key={logo.path}>{compare(logo.path, currentPath) ? logo.nodeActive : logo.node}</div>
          ))}
        </S.FlexBox>
      </S.Wrapper>
    </>
  );
};
const compare = (path1: string, path2: string) =>
  new URL(path1, 'https://abc.com').pathname === new URL(path2, 'https://abc.com').pathname;

type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export const linkDecorator = (Logo: React.FC, path: string) => {
  const LogoLinked = (props: MakeOptional<LinkProps, 'to'>) => (
    <Link to={path} {...props}>
      <Logo />
    </Link>
  );
  return LogoLinked;
};

const Footer = Object.assign(FooterWrapper, {
  HomeLogo: linkDecorator(HomeLogo, '/'),
  LocationLogo: linkDecorator(LocationLogo, '/location'),
  ChecklistLogo: linkDecorator(ChecklistLogo, ROUTE_PATH.checklistList),
  MyPageLogo: linkDecorator(MyPageLogo, '/mypage'),
  HomeLogoActive: linkDecorator(HomeLogoActive, '/'),
  LocationLogoActive: linkDecorator(LocationLogoActive, '/location'),
  ChecklistLogoActive: linkDecorator(ChecklistLogoActive, ROUTE_PATH.checklistList),
  MyPageLogoActive: linkDecorator(MyPageLogoActive, '/mypage'),
});

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

export default Footer;
