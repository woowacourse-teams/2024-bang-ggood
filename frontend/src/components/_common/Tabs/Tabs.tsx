import styled from '@emotion/styled';
import { useCallback } from 'react';

import TabButton from '@/components/_common/Tabs/Tab';
import { useTabContext } from '@/components/_common/Tabs/TabContext';
import { Tab, TabWithCompletion } from '@/types/tab';

interface Props {
  tabList: TabWithCompletion[] | Tab[];
}

const Tabs = ({ tabList }: Props) => {
  const { currentTabId, setCurrentTabId } = useTabContext();

  const onMoveTab = useCallback(
    (tabId: number) => {
      setCurrentTabId(tabId);
    },
    [setCurrentTabId],
  );

  return (
    <S.VisibleContainer>
      <S.Container>
        <S.FlexContainer>
          {tabList?.map(tab => {
            const { id, name, className } = tab;
            const hasIndicator = 'hasIndicator' in tab ? tab.hasIndicator : null;

            return (
              <TabButton
                className={className}
                id={id}
                name={name}
                onMoveTab={onMoveTab}
                key={id}
                active={tab.id === currentTabId}
                hasIndicator={hasIndicator}
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
    height: 5.4rem;
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
  `,
};
