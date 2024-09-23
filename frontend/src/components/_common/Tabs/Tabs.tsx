import styled from '@emotion/styled';

import Tab from '@/components/_common/Tabs/Tab';
import { useTabContext } from '@/components/_common/Tabs/TabContext';

interface Props {
  tabList: TabWithCompletion[] | Tab[];
}

export interface Tab {
  name: string;
  id: number;
  className?: string;
}

export interface TabWithCompletion extends Tab {
  hasIndicator: boolean;
}

const Tabs = ({ tabList }: Props) => {
  const { currentTabId, setCurrentTabId } = useTabContext();

  const onMoveTab = (tabId: number) => {
    setCurrentTabId(tabId);
  };

  return (
    <S.VisibleContainer>
      <S.Container>
        <S.FlexContainer>
          {tabList?.map(tab => {
            const { id, name, className } = tab;
            const hasIndicator = 'hasIndicator' in tab ? tab.hasIndicator : null;

            return (
              <Tab
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
  VisibleContainer: styled.div`
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
