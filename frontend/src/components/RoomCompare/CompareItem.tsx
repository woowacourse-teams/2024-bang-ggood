import styled from '@emotion/styled';

import { flexColumn } from '@/styles/common';

interface Props {
  label?: string;
  isLabeled?: boolean;
  item: React.ReactNode;
}

const CompareItem = ({ label, isLabeled = false, item }: Props) => {
  return (
    <S.ItemContainer>
      <S.Label isLabeled={isLabeled}>{label}</S.Label>
      {item}
    </S.ItemContainer>
  );
};

export default CompareItem;

const S = {
  ItemContainer: styled.div`
    width: 100%;
    min-height: 6rem;
    ${flexColumn};
    align-items: center;
  `,
  Label: styled.div<{ isLabeled: boolean }>`
    visibility: ${({ isLabeled }) => (isLabeled ? 'visible' : 'hidden')};
    height: 1.5rem;
    margin-bottom: 0.5rem;

    color: ${({ theme }) => theme.palette.grey400};
    font-size: ${({ theme }) => theme.text.size.small};
  `,
};
