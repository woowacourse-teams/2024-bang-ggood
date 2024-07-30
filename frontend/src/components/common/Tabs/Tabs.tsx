import styled from '@emotion/styled';

import { useTabContext } from '@/components/common/Tabs/TabContext';
import { flexCenter } from '@/styles/common';
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
            <Tab key={id} onClick={() => onMoveTab(tab.id)} active={tab.id === currentTabId}>
              {name}
              {!isCompleted && <UncompletedIndicator />}
            </Tab>
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

const Tab = styled.div<{ active: boolean }>`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.TABS};
  ${flexCenter};
  margin-top: 10px;
  margin-right: 6px;
  padding: 10px 16px;

  color: ${({ theme, active }) => (active ? theme.palette.yellow600 : theme.palette.black)};
  font-weight: ${({ active, theme }) => (active ? theme.text.weight.bold : theme.text.weight.medium)};
  cursor: pointer;
  border-bottom: ${({ active, theme }) =>
    active ? `3px solid ${theme.palette.yellow400}` : `3px solid ${theme.palette.yellow100}`};
`;

const UncompletedIndicator = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 5px;
  height: 5px;
  margin-left: 8px;

  background-color: ${({ theme }) => theme.palette.grey400};
  border-radius: 50%;
`;
