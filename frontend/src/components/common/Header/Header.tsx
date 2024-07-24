import styled from '@emotion/styled';
import { ReactNode } from 'react';

import ArrowBack from '@/assets/arrow-back.svg';
import Logo from '@/assets/logo.svg';
import { title3 } from '@/styles/common';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
}

const HeaderWrapper = ({ left, right, center, ...rest }: Props) => {
  return (
    <S.Wrapper {...rest}>
      <S.FlexBox>
        {left ? left : <div />}
        {center ? center : <div />}
        {right ? right : <div />}
      </S.FlexBox>
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
    ${title3}
  `,
  Text: styled.div`
    color: ${({ theme }) => theme.palette.black};
    ${title3}
  `,
};

const Header = Object.assign(HeaderWrapper, {
  Logo: () => (
    <Logo
      style={{
        cursor: 'pointer',
      }}
    />
  ),
  Backward: () => (
    <ArrowBack
      style={{
        cursor: 'pointer',
      }}
    />
  ),
  TextButton: S.TextButton,
  Text: S.Text,
});
export default Header;
