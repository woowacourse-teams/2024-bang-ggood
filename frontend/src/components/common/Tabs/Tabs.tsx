import styled from '@emotion/styled';

import Tab from '@/components/common/Tabs/Tab';
import { useTabContext } from '@/components/common/Tabs/TabContext';
import { TabWithCompletion } from '@/types/tab';

interface Props {
  tabList: TabWithCompletion[];
}

const Tabs = ({ tabList }: Props) => {
  const { currentTabId, setCurrentTabId } = useTabContext();

  const onMoveTab = (tabId: number) => {
    setCurrentTabId(tabId);
  };

  return (
    <Container>
      <FlexContainer>
        {tabList?.map(tab => {
          const { isCompleted, id, name } = tab;
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
  );
};

export default Tabs;

const Container = styled.div`
  width: 100%;
  overflow-x: auto;

  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const FlexContainer = styled.div`
  display: inline-flex;
`;
