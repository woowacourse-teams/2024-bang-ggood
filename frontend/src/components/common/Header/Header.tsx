import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowBack from '@/assets/arrow-back.svg';
import Logo from '@/assets/logo.svg';
import { linkDecorator } from '@/components/common/Footer/Footer';
import { title2 } from '@/styles/common';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
}

const HeaderWrapper = ({ left, right, center, ...rest }: Props) => {
  return (
    <S.Wrapper {...rest}>
      <S.FlexBox>
        <S.Left>{left ? left : <div />}</S.Left>
        <S.Center>{center ? center : <div />}</S.Center>
        <S.Right>{right ? right : <div />}</S.Right>
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
  `,
  Left: styled.div`
    display: flex;
    justify-content: flex-start;
    flex: 1;
  `,
  Center: styled.div`
    ${flexCenter}
    flex: 1;
  `,
  Right: styled.div`
    display: flex;
    justify-content: flex-end;
    flex: 1;
  `,
  TextButton: styled.button`
    color: ${({ theme }) => theme.palette.black};
    ${title2}
  `,
  Text: styled.div`
    color: ${({ theme }) => theme.palette.black};
    ${title2}
  `,
};

const Header = Object.assign(HeaderWrapper, {
  Logo: linkDecorator(Logo, '/'),
  Backward: (props: React.SVGProps<SVGSVGElement>) => {
    const navigate = useNavigate();
    const handleClick = () => navigate(-1);
    return (
      <ArrowBack
        style={{
          cursor: 'pointer',
        }}
        onClick={handleClick}
        {...props}
      />
    );
  },
  TextButton: S.TextButton,
  Text: S.Text,
});
export default Header;
