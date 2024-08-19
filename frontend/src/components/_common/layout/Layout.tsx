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
  Wrapper: styled.div<{ bgColor: string; withHeader: boolean; withFooter: boolean; withTab: boolean }>`
    box-sizing: border-box;
    overflow: hidden auto;
    ${({ withHeader, withFooter, withTab }) => getHeightStyle(withHeader, withFooter, withTab)}
    padding: 16px;

    background-color: ${({ bgColor }) => bgColor};
  `,
};

const getHeightStyle = (withHeader: boolean, withFooter: boolean, withTab: boolean) => {
  if (withHeader && withFooter) {
    return css`
      height: calc(100vh - ${HEADER_SIZE}px - ${FOOTER_SIZE}px);
    `;
  }
  if (withHeader && withTab) {
    return css`
      height: calc(100vh - ${HEADER_SIZE}px - ${TAB_SIZE}px);
    `;
  }
  if (withHeader) {
    return css`
      height: calc(100vh - ${HEADER_SIZE}px);
    `;
  }
  if (withFooter) {
    return css`
      height: calc(100vh - ${FOOTER_SIZE}px);
    `;
  }
  return css`
    height: 100vh;
  `;
};
