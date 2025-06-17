import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ArrowBackIcon, BangGgoodTextIcon } from '@/assets/assets';
import { ROUTE_PATH } from '@/constants/routePath';
import { HEADER_SIZE } from '@/constants/style';
import { flexCenter, title3 } from '@/styles/common';
import theme from '@/styles/theme';
import { fontStyle } from '@/utils/fontStyle';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
  isTransparent?: boolean;
  transparentRatio?: number;
}

const HeaderWrapper = ({ left, right, center, isTransparent = false, transparentRatio = 0.5, ...rest }: Props) => {
  return (
    <>
      <S.Wrapper {...rest} isTransparent={isTransparent} transparentRatio = {transparentRatio}>
        <S.FlexBox>
          <S.Left>{left}</S.Left>
          <S.Center>{center && <div>{center}</div>}</S.Center>
          <S.Right>{right}</S.Right>
        </S.FlexBox>
      </S.Wrapper>
      {!isTransparent && <S.EmptyBox />}
    </>
  );
};

const S = {
  EmptyBox: styled.div`
    height: ${HEADER_SIZE}rem;
  `,
  Wrapper: styled.header<{ isTransparent: boolean, transparentRatio: number }>`
    display: flex;
    position: fixed;
    z-index: ${({ theme }) => theme.zIndex.HEADER};
    width: 100%;
    height: ${HEADER_SIZE}rem;
    padding: 1.1rem 1.6rem;

    background-color: ${({ theme, isTransparent, transparentRatio }) => (isTransparent ? `rgba(255,255,255, ${transparentRatio})` : theme.color.mono.white)};

    max-width: 60rem;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-between;
  `,
  FlexBox: styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
  `,
  Left: styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    min-width: 5rem;

    color: ${({ theme }) => theme.color.gray[600]};
  `,
  Center: styled.div`
    ${flexCenter}
    flex: 1;

    ${({ theme }) => fontStyle(theme.font.heading[1].B)}
    color: ${({ theme }) => theme.color.mono.black};
  `,
  Right: styled.div`
    display: flex;
    justify-content: flex-end;
    min-width: 5rem;

    ${({ theme }) => fontStyle(theme.font.body[1].B)}
    color: ${({ theme }) => theme.color.gray[400]};
  `,
  TextButton: styled.button(),
  Text: styled.div`
    box-sizing: content-box;

    color: ${({ theme }) => theme.color.mono.black};
    ${title3}
  `,
  Title: styled.div`
    color: ${({ theme }) => theme.color.mono.black};
    ${({ theme }) => fontStyle(theme.font.title[3].B)}
  `,
};

const Header = Object.assign(HeaderWrapper, {
  Logo: () => {
    return (
      <Link to={ROUTE_PATH.home}>
        <BangGgoodTextIcon aria-label="방끗 로고" />
      </Link>
    );
  },
  Backward: (props: React.SVGProps<SVGSVGElement>) => {
    const navigate = useNavigate();
    const handleClick = () => navigate(-1);

    const handleKeyDown = (e: React.KeyboardEvent<SVGSVGElement>) => {
      if (e.key === 'Enter') {
        handleClick();
      }
    };

    return (
      <ArrowBackIcon
        style={{
          cursor: 'pointer',
        }}
        fill={theme.color.gray[600]}
        stroke={theme.color.gray[600]}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
        aria-label="뒤로가기"
        tabIndex={1}
      />
    );
  },
  TextButton: S.TextButton,
  Text: S.Text,
  Title: S.Title,
});

export default Header;
