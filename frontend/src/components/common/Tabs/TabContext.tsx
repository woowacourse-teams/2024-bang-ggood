import { createContext, ReactNode, useContext, useState } from 'react';

interface ContextProps {
  currentTabId: number;
  setCurrentTabId: React.Dispatch<React.SetStateAction<number>>;
}

const defaultContext: ContextProps = {
  currentTabId: 0,
  setCurrentTabId: () => {},
};

const TabContext = createContext<ContextProps>(defaultContext);

export const TabProvider = ({ children, defaultTab = 0 }: { children: ReactNode; defaultTab: number }) => {
  const [currentTabId, setCurrentTabId] = useState<number>(defaultTab);

  return <TabContext.Provider value={{ currentTabId, setCurrentTabId }}>{children}</TabContext.Provider>;
};

export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTabContext는 TabProvider 안에서 사용해야 합니다.');
  }
  return context;
};
