import styled from '@emotion/styled';

import { flexColumn, flexRow } from '@/styles/common';

const FlexBox = {
  Vertical: styled.div<{ gap?: string; width?: string }>`
    ${flexColumn}
    row-gap: ${({ gap }) => gap ?? '1rem'};
    flex: auto;
    ${({ width }) => width && `width:${width};`}
  `,
  Horizontal: styled.div<{
    gap?: number | string;
    flexWrap?: string;
    flex?: string;
    width?: string;
    justify?: 'space-between' | 'space-around' | 'center';
    align?: 'center';
  }>`
    ${flexRow}
    gap:  ${({ gap }) => gap ?? '6%'};
    ${({ flexWrap }) => flexWrap && `flex-wrap:${flexWrap};`}
    ${({ width }) => width && `width:${width};`}
    ${({ flex }) => flex && `flex:${flex};`}
    ${({ justify }) => justify && `justify-content:${justify};`}
    ${({ align }) => align && `align-items:${align};`}
  `,
};

export default FlexBox;
