import styled from '@emotion/styled';
import { useCallback, useEffect, useRef } from 'react';

import TabButton from '@/components/_common/Tabs/TabButton';
import { useTabContext } from '@/components/_common/Tabs/TabContext';
import { Tab, TabWithCompletion } from '@/types/tab';

interface Props {
  tabList: TabWithCompletion[] | Tab[];
}

const Tabs = ({ tabList }: Props) => {
  const { currentTabId, setCurrentTabId } = useTabContext();

  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (tabRefs.current[currentTabId]) {
      tabRefs.current[currentTabId]?.focus();
    }
  }, [currentTabId]);

  const onMoveTab = useCallback(
    (tabId: number) => {
      setCurrentTabId(tabId);
    },
    [setCurrentTabId],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = tabList.findIndex(tab => tab.id === currentTabId);

    if (e.key === 'ArrowRight') {
      if (currentIndex === tabList.length - 1) return;
      const nextIndex = (currentIndex + 1) % tabList.length;
      setCurrentTabId(tabList[nextIndex].id);
    } else if (e.key === 'ArrowLeft') {
      if (currentIndex === 0) return;
      const prevIndex = (currentIndex - 1 + tabList.length) % tabList.length;
      setCurrentTabId(tabList[prevIndex].id);
    }
  };

  return (
    <S.VisibleContainer role="navigation" aria-label="탭 내비게이션">
      <S.Container>
        <S.FlexContainer role="tablist" onKeyDown={handleKeyDown}>
          {tabList?.map((tab, index) => {
            const { id, name, className } = tab;
            const isCompleted = 'isCompleted' in tab ? tab.isCompleted : undefined;

            return (
              <TabButton
                ref={el => (tabRefs.current[index - 1] = el)}
                className={className}
                id={id}
                name={name}
                onMoveTab={onMoveTab}
                key={id}
                active={tab.id === currentTabId}
                tabIndex={tab.id === currentTabId ? 0 : -1}
                aria-selected={tab.id === currentTabId}
                isCompleted={isCompleted}
              />
            );
          })}
        </S.FlexContainer>
      </S.Container>
      <S.EmptyBox />
    </S.VisibleContainer>
  );
};

export default Tabs;

const S = {
  VisibleContainer: styled.nav`
    max-width: 60rem;
  `,
  EmptyBox: styled.div`
    height: 5.6rem;
  `,
  Container: styled.div`
    position: fixed;
    max-width: 60rem;

    z-index: ${({ theme }) => theme.zIndex.TABS};
    width: 100%;

    background-color: ${({ theme }) => theme.palette.white};

    white-space: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  `,
  FlexContainer: styled.div`
    display: inline-flex;
    gap: 1rem;
    margin: 0.8rem 1.6rem;
  `,
};
