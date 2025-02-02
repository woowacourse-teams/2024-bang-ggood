import styled from '@emotion/styled';
import { CSSProperties } from 'react';

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
    width?: string;
    justify?: CSSProperties['justifyContent'];
    align?: 'center';
  }>`
    ${flexRow}
    gap:  ${({ gap }) => gap ?? '6%'};
    flex-wrap: ${({ flexWrap }) => flexWrap};
    width: ${({ width }) => width};
    justify-content: ${({ justify }) => justify};
    align-items: ${({ align }) => align};
  `,
};

export default FlexBox;
