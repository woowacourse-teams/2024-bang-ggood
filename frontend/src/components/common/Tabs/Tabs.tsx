import styled from '@emotion/styled';

import Tab from '@/components/common/Tabs/Tab';
import { useTabContext } from '@/components/common/Tabs/TabContext';

interface Props {
  tabList: TabWithCompletion[] | Tab[];
  type: 'completion' | 'normal';
}

export interface Tab {
  name: string;
  id: number;
}

export interface TabWithCompletion extends Tab {
  isCompleted: boolean;
}

const Tabs = ({ tabList, type }: Props) => {
  const { currentTabId, setCurrentTabId } = useTabContext();

  const onMoveTab = (tabId: number) => {
    setCurrentTabId(tabId);
  };

  return (
    <VisibleContainer>
      <Container>
        <FlexContainer>
          {tabList?.map(tab => {
            const { id, name } = tab;
            const isCompleted = type === 'completion' && 'isCompleted' in tab ? tab.isCompleted : null;
            return (
              <Tab
                id={id}
                name={name}
                onMoveTab={onMoveTab}
                key={id}
                active={tab.id === currentTabId}
                isCompleted={isCompleted}
              />
            );
          })}
        </FlexContainer>
      </Container>
    </VisibleContainer>
  );
};

export default Tabs;

const Container = styled.div`
  position: fixed;
  max-width: 600px;

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
`;

const VisibleContainer = styled.div`
  max-width: 600px;
`;

const FlexContainer = styled.div`
  display: inline-flex;
`;
