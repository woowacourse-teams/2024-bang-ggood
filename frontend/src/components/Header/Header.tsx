import styled from '@emotion/styled';
import { ReactNode } from 'react';

import ArrowBack from '@/assets/arrow-back.svg';
import Logo from '@/assets/logo.svg';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  left?: ReactNode;
  right?: ReactNode;
}

const HeaderWrapper = ({ left, right, ...rest }: Props) => {
  return (
    <S.Wrapper {...rest}>
      <S.FlexBox>
        {left ? left : <div />}
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
    font-weight: ${({ theme }) => theme.text.weight.bold};
    font-size: ${({ theme }) => theme.text.size.medium};
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
});
export default Header;
