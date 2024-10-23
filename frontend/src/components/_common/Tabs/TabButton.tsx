import '@/styles/category-sprite-image.css';

import styled from '@emotion/styled';
import React, { forwardRef } from 'react';

import { trackTabButton } from '@/service/amplitude/trackEvent';
import { flexCenter, title3 } from '@/styles/common';
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
