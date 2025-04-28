import styled from '@emotion/styled';
import React from 'react';

import { flexCenter, flexColumn } from '@/styles/common';
import theme from '@/styles/theme';
import { fontStyle } from '@/utils/fontStyle';

interface Props {
  label?: string;
  isLabeled?: boolean;
  item: React.ReactNode;
  height?: number;
}

const CompareCardItem = ({ label, isLabeled = false, item, height }: Props) => {
  return (
    <S.ItemContainer height={height}>
      <S.Label isLabeled={isLabeled}>{label}</S.Label>
      <S.ItemText>{item}</S.ItemText>
    </S.ItemContainer>
  );
};

export default CompareCardItem;

const S = {
  ItemContainer: styled.div<{ height?: number }>`
    width: 100%;
    height: ${({ height }) => height && height}rem;
    ${flexColumn};
    gap: 0.8rem;
    align-items: flex-start;
    box-sizing: border-box;
    padding: 0 1.6rem;
  `,
  ItemText: styled.div`
    height: 100%;
    ${flexCenter};
    ${fontStyle(theme.font.headline[2].B)});
  `,
  Score: styled.div`
    font-size: ${({ theme }) => theme.text.size.xSmall};
  `,
  Label: styled.div<{ isLabeled: boolean }>`
    height: 2.4rem;

    color: ${({ theme }) => theme.palette.grey500};
    ${fontStyle(theme.font.headline[2].R)});
  `,
};
