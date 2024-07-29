import { createContext, ReactNode, useContext, useState } from 'react';

interface ContextProps {
  currentTabId: string;
  setCurrentTabId;
}
const TabContext = createContext<ContextProps>(null);

export const TabProvider = ({ children }: { children: ReactNode }) => {
  const [currentTabId, setCurrentTabId] = useState<string>(null);

  return <TabContext.Provider value={{ currentTabId, setCurrentTabId }}>{children}</TabContext.Provider>;
};

export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useAccordionContext는 AccordionProvider에서 사용해야 합니다.');
  }
  return context;
};
