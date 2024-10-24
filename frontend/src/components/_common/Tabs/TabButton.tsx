import '@/styles/category-sprite-image.css';

import styled from '@emotion/styled';
import React, { forwardRef } from 'react';

import { trackTabButton } from '@/service/amplitude/trackEvent';
import { flexCenter } from '@/styles/common';
import { Tab } from '@/types/tab';

interface Props extends Tab {
  onMoveTab: (id: number) => void;
  active: boolean;
  isCompleted?: boolean;
  tabIndex?: number;
}

const TabButton = forwardRef<HTMLDivElement, Props>(
  ({ id, onMoveTab, name, active, className, isCompleted, ...rest }, ref) => {
    const handleClickTab = () => {
      trackTabButton(name);
      onMoveTab(id);
    };

    return (
      <S.Container
        className={`tab ${className || ''}`}
        onClick={handleClickTab}
        active={active}
        role="tab"
        ref={ref}
        {...rest}
      >
        <S.TextBox className={className ? `sprite-icon ${className}` : ''}>{name}</S.TextBox>
        {isCompleted === false && <S.UncompletedIndicator />}
      </S.Container>
    );
  },
);

TabButton.displayName = 'TabButton';

export default React.memo(TabButton);

const S = {
  Container: styled.div<{ active: boolean }>`
    position: relative;
    z-index: ${({ theme }) => theme.zIndex.TABS};

    ${flexCenter};
    padding: 1rem 1.6rem;
    border: ${({ active, theme }) => `.3rem solid ${active ? theme.palette.yellow400 : theme.palette.background}`};

    background-color: ${({ theme, active }) => (active ? theme.palette.yellow100 : theme.palette.background)};

    border-radius: 10px;

    color: ${({ theme, active }) => (active ? theme.palette.yellow600 : theme.palette.black)};
    cursor: pointer;

    font-weight: 600;
  `,
  TextBox: styled.div`
    display: flex;

    font-size: 1.8rem;
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

    background-color: ${({ theme }) => theme.palette.grey300};
    border-radius: 50%;
  `,
};
