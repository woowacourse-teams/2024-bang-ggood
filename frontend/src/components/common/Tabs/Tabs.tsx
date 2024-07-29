import styled from '@emotion/styled';
import { useState } from 'react';

import { flexCenter } from '@/styles/common';

interface Props {
  tabList: Tab[];
}

export type Tab = {
  name: string;
  id: string;
  content: React.ReactNode;
};

const Tabs = ({ tabList }: Props) => {
  const [currentTabId, setCurrentTabId] = useState(tabList[0].id);

  const renderContent = () => {
    const targetTab = tabList.filter(tab => tab.id === currentTabId)[0];
    if (!targetTab) throw new Error('해당 탭이 존재하지 않습니다.');
    return targetTab.content;
  };

  const onMoveTab = (tabId: string) => {
    setCurrentTabId(tabId);
  };

  return (
    <Container>
      <FlexContainer>
        {tabList?.map(tab => (
          <Tab key={tab.id} onClick={() => onMoveTab(tab.id)} active={tab.id === currentTabId}>
            {tab.name}
          </Tab>
        ))}
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
  display: inline-block;
  z-index: ${({ theme }) => theme.zIndex.TABS} ${flexCenter};
  margin-right: 10px;
  padding: 10px 20px;

  color: ${({ theme, active }) => (active ? theme.palette.yellow600 : theme.palette.black)};
  font-weight: ${({ active, theme }) => (active ? theme.text.weight.bold : theme.text.weight.medium)};
  cursor: pointer;
  border-bottom: ${({ active, theme }) =>
    active ? `3px solid ${theme.palette.yellow400}` : `3px solid ${theme.palette.yellow100}`};

  &:hover {
    background-color: ${({ theme, active }) => (active ? theme.palette.yellow400 : '#ddd')};
  }
`;
