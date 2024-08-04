import { createContext, ReactNode, useContext, useState } from 'react';

interface ContextProps {
  currentTabId: number;
  setCurrentTabId: React.Dispatch<React.SetStateAction<number>>;
}
const TabContext = createContext<ContextProps>(null);

export const TabProvider = ({ children, initialTab }: { children: ReactNode; initialTab: number }) => {
  const [currentTabId, setCurrentTabId] = useState<number>(initialTab);

  return <TabContext.Provider value={{ currentTabId, setCurrentTabId }}>{children}</TabContext.Provider>;
};

export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTabContext는 TabProvider 안에서 사용해야 합니다.');
  }
  return context;
};
