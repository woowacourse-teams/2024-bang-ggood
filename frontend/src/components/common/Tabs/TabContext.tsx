import { createContext, ReactNode, useContext, useState } from 'react';

import { Tab } from '@/components/common/Tabs/Tabs';

interface ContextProps {
  currentTabId: number;
  setCurrentTabId: React.Dispatch<React.SetStateAction<number>>;
}
const TabContext = createContext<ContextProps>(null);

export const TabProvider = ({ children, tabList }: { children: ReactNode; tabList: Tab[] }) => {
  const [currentTabId, setCurrentTabId] = useState<number>(tabList[0].id);

  return <TabContext.Provider value={{ currentTabId, setCurrentTabId }}>{children}</TabContext.Provider>;
};

export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTabContext는 TabProvider 안에서 사용해야 합니다.');
  }
  return context;
};
