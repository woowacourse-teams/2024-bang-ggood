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
    <VisibleContainer>
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
    </VisibleContainer>
  );
};

export default Tabs;

const Container = styled.div`
  position: fixed;
  max-width: 600px;

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
