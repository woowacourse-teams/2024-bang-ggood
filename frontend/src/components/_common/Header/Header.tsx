import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ArrowBack, BangGgoodTextIcon } from '@/assets/assets';
import { ROUTE_PATH } from '@/constants/routePath';
import { HEADER_SIZE } from '@/constants/style';
import { flexCenter, title3 } from '@/styles/common';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
  isTransparent?: boolean;
}

const HeaderWrapper = ({ left, right, center, isTransparent = false, ...rest }: Props) => {
  return (
    <>
      <S.Wrapper {...rest} isTransparent={isTransparent}>
        <S.FlexBox>
          <S.Left>{left ? left : <div />}</S.Left>
          <S.Center>{center ? center : <div />}</S.Center>
          <S.Right>{right ? right : <div />}</S.Right>
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
  Wrapper: styled.header<{ isTransparent: boolean }>`
    display: flex;
    position: fixed;
    z-index: ${({ theme }) => theme.zIndex.HEADER};
    width: 100%;
    height: ${HEADER_SIZE}rem;
    padding: 2rem 1.6rem 1.2rem;

    background-color: ${({ theme }) => theme.palette.white};
    opacity: ${({ isTransparent }) => isTransparent && 0.3};
    max-width: 60rem;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-between;
  `,
  FlexBox: styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
  `,
  Left: styled.div`
    display: flex;
    justify-content: flex-start;
  `,
  Center: styled.div`
    ${flexCenter}
    flex: 1;
  `,
  Right: styled.div`
    display: flex;
    justify-content: flex-end;
  `,
  TextButton: styled.button`
    color: ${({ theme }) => theme.palette.black};
    ${title3}
  `,
  Text: styled.div`
    box-sizing: content-box;

    color: ${({ theme }) => theme.palette.black};
    ${title3}
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
      <ArrowBack
        style={{
          cursor: 'pointer',
        }}
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
});

export default Header;
