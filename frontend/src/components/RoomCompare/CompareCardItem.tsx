import styled from '@emotion/styled';
import React from 'react';

import { flexCenter, flexColumn } from '@/styles/common';

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
    gap: 1rem;
    align-items: center;
  `,
  ItemText: styled.div`
    height: 100%;

    ${flexCenter};
    font-size: ${({ theme }) => theme.text.size.small};
    line-height: 1.5rem;
  `,
  Score: styled.div`
    font-size: ${({ theme }) => theme.text.size.xSmall};
  `,
  Label: styled.div<{ isLabeled: boolean }>`
    height: 1.5rem;
    margin-bottom: 0.5rem;

    color: ${({ theme }) => theme.palette.grey500};
    font-size: ${({ theme }) => theme.text.size.xSmall};
  `,
};
