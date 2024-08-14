import styled from '@emotion/styled';

import { flexColumn, flexRow, flexSpaceBetween } from '@/styles/common';

const FlexBox = {
  Vertical: styled.div<{ gap?: string }>`
    ${flexColumn}
    row-gap: ${({ gap }) => gap ?? '10px'};
    flex: auto;
  `,
  Horizontal: styled.div<{ gap?: number | string; flexWrap?: string }>`
    ${flexRow}
    ${flexSpaceBetween}
    gap: 8px ${({ gap: gap }) => gap ?? '6%'};
    ${({ flexWrap }) => (flexWrap ? 'flex-wrap:' + flexWrap + ';' : '')}
  `,
};

export default FlexBox;
