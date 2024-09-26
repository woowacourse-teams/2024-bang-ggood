import '@/styles/category-sprite-image.css';

import styled from '@emotion/styled';

import { flexCenter } from '@/styles/common';

interface Props {
  id: number;
  onMoveTab: (id: number) => void;
  name: string;
  active: boolean;
  hasIndicator: boolean | null;
  className?: string;
}

const Tab = ({ id, onMoveTab, name, active, hasIndicator, className }: Props) => {
  return (
    <S.Container key={id} onClick={() => onMoveTab(id)} active={active}>
      <S.TextBox className={className && `sprite-icon ${className}`}>{name}</S.TextBox>
      {hasIndicator && hasIndicator !== null && <S.UncompletedIndicator />}
    </S.Container>
  );
};

export default Tab;

const S = {
  Container: styled.div<{ active: boolean }>`
    position: relative;
    z-index: ${({ theme }) => theme.zIndex.TABS};
    ${flexCenter};
    margin-top: 1rem;
    padding: 1rem 1.6rem;

    color: ${({ theme, active }) => (active ? theme.palette.yellow600 : theme.palette.black)};
    font-weight: ${({ theme }) => theme.text.weight.bold};
    cursor: pointer;
    border-bottom: ${({ active, theme }) =>
      active ? `.3rem solid ${theme.palette.yellow400}` : `.3rem solid ${theme.palette.yellow100}`};
  `,
  TextBox: styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
  `,
  UncompletedIndicator: styled.div`
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: 0.5rem;
    height: 0.5rem;
    margin-left: 0.8rem;

    background-color: ${({ theme }) => theme.palette.grey400};
    border-radius: 50%;
  `,
};
