import styled from '@emotion/styled';
import { CSSProperties } from 'react';

interface Props {
  bgColor?: string;
  children: React.ReactNode;
  style?: CSSProperties;
}

const Layout = ({ bgColor = 'white', children, style }: Props) => {
  return (
    <S.Wrapper bgColor={bgColor} style={style}>
      {children}
    </S.Wrapper>
  );
};

export default Layout;

const S = {
  Wrapper: styled.div<{ bgColor: string }>`
    overflow: hidden auto;
    padding: 16px;

    background-color: ${({ bgColor }) => bgColor};
  `,
};
