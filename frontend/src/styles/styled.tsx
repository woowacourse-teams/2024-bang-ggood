import styled from '@emotion/styled';

import { flexColumn, flexRow } from '@/styles/common';

export const FlexVertical = styled.div<{ gap?: string }>`
  ${flexColumn}
  row-gap: ${({ gap }) => gap ?? '10px'};
  flex: auto;
`;
export const FlexHorizontal = styled.div<{ gap?: number | string; flexWrap?: string }>`
  ${flexRow}
  justify-content: space-between;
  gap: 8px ${({ gap: gap }) => gap ?? '6%'};
  ${({ flexWrap }) => (flexWrap ? 'flex-wrap:' + flexWrap + ';' : '')}
`;
