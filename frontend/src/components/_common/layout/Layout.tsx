import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { CSSProperties } from 'react';

import { FOOTER_SIZE, HEADER_SIZE, TAB_SIZE } from '@/constants/style';
import theme from '@/styles/theme';

interface Props {
  bgColor?: string;
  children: React.ReactNode;
  style?: CSSProperties;
  withHeader?: boolean;
  withFooter?: boolean;
  withTab?: boolean;
}

const Layout = ({
  bgColor = theme.palette.white,
  children,
  withHeader = false,
  withFooter = false,
  withTab = false,
  style,
}: Props) => {
  return (
    <S.Wrapper bgColor={bgColor} style={style} withHeader={withHeader} withFooter={withFooter} withTab={withTab}>
      {children}
    </S.Wrapper>
  );
};

export default Layout;

const S = {
  Wrapper: styled.main<{ bgColor: string; withHeader: boolean; withFooter: boolean; withTab: boolean }>`
    box-sizing: border-box;
    overflow: hidden auto;
    ${({ withHeader, withFooter, withTab }) => getHeightStyle(withHeader, withFooter, withTab)}
    padding: 1rem 1.6rem;

    background-color: ${({ bgColor }) => bgColor};
  `,
};

const getHeightStyle = (withHeader: boolean, withFooter: boolean, withTab: boolean) => {
  if (withHeader && withFooter) {
    return css`
      height: calc(100dvh - ${HEADER_SIZE}rem - ${FOOTER_SIZE}rem);
    `;
  }
  if (withHeader && withTab) {
    return css`
      height: calc(100dvh - ${HEADER_SIZE}rem - ${TAB_SIZE}rem);
    `;
  }
  if (withHeader) {
    return css`
      height: calc(100dvh - ${HEADER_SIZE}rem);
    `;
  }
  if (withFooter) {
    return css`
      height: calc(100dvh - ${FOOTER_SIZE}rem);
    `;
  }
  return css`
    height: 100dvh;
  `;
};
