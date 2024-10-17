import '@/styles/category-sprite-image.css';

import styled from '@emotion/styled';
import React from 'react';

import { flexCenter, title3 } from '@/styles/common';
import { Tab } from '@/types/tab';

interface Props extends Tab {
  onMoveTab: (id: number) => void;
  active: boolean;
  isCompleted?: boolean;
}

const Tab = ({ id, onMoveTab, name, active, className, isCompleted }: Props) => {
  return (
    <S.Container key={id} onClick={() => onMoveTab(id)} active={active}>
      <S.TextBox className={className && `sprite-icon ${className}`}>{name}</S.TextBox>
      {isCompleted === false && <S.UncompletedIndicator />}
    </S.Container>
  );
};

export default React.memo(Tab);

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
    ${title3}
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
