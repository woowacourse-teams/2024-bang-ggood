import '@/styles/category-sprite-image.css';

import styled from '@emotion/styled';
import React, { forwardRef } from 'react';

import { trackTabButton } from '@/service/amplitude/trackEvent';
import { flexCenter } from '@/styles/common';
import { Tab } from '@/types/tab';
import { fontStyle } from '@/utils/fontStyle';

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
    padding: 0.6rem 1.2rem;

    color: ${({ theme, active }) => (active ? theme.color.mono.black : theme.color.gray[400])};
    border-bottom: ${({ theme, active }) => active && `.2rem solid ${theme.color.mono.black}`};
    cursor: pointer;

    font-weight: 600;
  `,
  TextBox: styled.div`
    display: flex;

    ${({ theme }) => fontStyle(theme.font.body[1].B)}
    align-items: center;
    gap: 0.5rem;
  `,
  UncompletedIndicator: styled.div`
    position: absolute;
    top: 0.4rem;
    right: 0.4rem;
    width: 0.5rem;
    height: 0.5rem;
    margin-left: 0.8rem;

    background-color: ${({ theme }) => theme.color.red[300]};
    border-radius: 50%;
  `,
};
