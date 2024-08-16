import styled from '@emotion/styled';

import { flexColumn, flexRow, flexSpaceBetween } from '@/styles/common';

const FlexBox = {
  Vertical: styled.div<{ gap?: string; width?: string }>`
    ${flexColumn}
    row-gap: ${({ gap }) => gap ?? '10px'};
    flex: auto;
    ${({ width }) => width && `width:${width};`}
  `,
  Horizontal: styled.div<{ gap?: number | string; flexWrap?: string; width?: string }>`
    ${flexRow}
    ${flexSpaceBetween}
    gap: 8px ${({ gap: gap }) => gap ?? '6%'};
    ${({ flexWrap }) => flexWrap && `flex-wrap:${flexWrap};`}
    ${({ width }) => width && `width:${width};`}
  `,
};

export default FlexBox;
