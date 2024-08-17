import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { CSSProperties } from 'react';

import { FOOTER_SIZE, HEADER_SIZE } from '@/constants/style';
import theme from '@/styles/theme';

interface Props {
  bgColor?: string;
  children: React.ReactNode;
  style?: CSSProperties;
  withHeader?: boolean;
  withFooter?: boolean;
}

const Layout = ({ bgColor = theme.palette.white, children, withHeader = false, withFooter = false, style }: Props) => {
  return (
    <S.Wrapper bgColor={bgColor} style={style} withHeader={withHeader} withFooter={withFooter}>
      {children}
    </S.Wrapper>
  );
};

export default Layout;

const S = {
  Wrapper: styled.div<{ bgColor: string; withHeader: boolean; withFooter: boolean }>`
    box-sizing: border-box;
    overflow: hidden auto;
    ${({ withHeader, withFooter }) => getHeightStyle(withHeader, withFooter)}
    padding: 16px;

    background-color: ${({ bgColor }) => bgColor};
  `,
};

const getHeightStyle = (withHeader: boolean, withFooter: boolean) => {
  if (withHeader && withFooter) {
    return css`
      height: calc(100vh - ${HEADER_SIZE}px - ${FOOTER_SIZE}px);
    `;
  }
  if (withHeader) {
    return css`
      height: calc(100vh - ${HEADER_SIZE});
    `;
  }
  if (withFooter) {
    return css`
      height: calc(100vh - ${FOOTER_SIZE});
    `;
  }
  return css`
    height: 100vh;
  `;
};
