import styled from '@emotion/styled';

import { flexColumn, flexRow } from '@/styles/common';

const FlexBox = {
  Vertical: styled.div<{ gap?: string; width?: string }>`
    ${flexColumn}
    row-gap: ${({ gap }) => gap ?? '1rem'};
    flex: auto;
    ${({ width }) => width && `width:${width};`}
  `,
  Horizontal: styled.div<{ gap?: number | string; flexWrap?: string; width?: string; type?: 'spaceBetween' | 'row' }>`
    ${flexRow}
    gap: .8rem ${({ gap: gap }) => gap ?? '6%'};
    ${({ flexWrap }) => flexWrap && `flex-wrap:${flexWrap};`}
    ${({ width }) => width && `width:${width};`}
  `,
};

export default FlexBox;
