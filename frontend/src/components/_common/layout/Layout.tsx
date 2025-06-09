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
  fitContent?: boolean;
}

const Layout = ({
  bgColor = theme.palette.white,
  children,
  withHeader = false,
  withFooter = false,
  withTab = false,
  fitContent = false,
  style,
}: Props) => {
  return (
    <S.Wrapper
      bgColor={bgColor}
      style={style}
      withHeader={withHeader}
      withFooter={withFooter}
      withTab={withTab}
      fitContent={fitContent}
    >
      {children}
    </S.Wrapper>
  );
};

export default Layout;

const S = {
  Wrapper: styled.main<{
    bgColor: string;
    withHeader: boolean;
    withFooter: boolean;
    withTab: boolean;
    fitContent: boolean;
  }>`
    box-sizing: border-box;
    overflow: hidden auto;
    ${({ withHeader, withFooter, withTab, fitContent }) => getHeightStyle(withHeader, withFooter, withTab, fitContent)}
    padding: 1rem 1.6rem;

    background-color: ${({ bgColor }) => bgColor};
  `,
};

const getHeightStyle = (withHeader: boolean, withFooter: boolean, withTab: boolean, fitContent: boolean) => {
  if (fitContent) {
    return css`
      height: fit-content;
    `;
  }
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
