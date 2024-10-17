import { createContext, ReactNode, useContext, useState } from 'react';

import { ERROR_MESSAGE } from '@/constants/errorMessage';

interface ContextProps {
  currentTabId: number;
  setCurrentTabId: React.Dispatch<React.SetStateAction<number>>;
}

const defaultContext: ContextProps = {
  currentTabId: 0,
  setCurrentTabId: () => {},
};

const TabContext = createContext<ContextProps>(defaultContext);

interface Props {
  children: ReactNode;
  defaultTab: number;
}

export const TabProvider = ({ children, defaultTab = 0 }: Props) => {
  const [currentTabId, setCurrentTabId] = useState<number>(defaultTab);

  return <TabContext.Provider value={{ currentTabId, setCurrentTabId }}>{children}</TabContext.Provider>;
};

export const useTabContext = () => {
  const context = useContext(TabContext);

  if (!context) {
    throw new Error(ERROR_MESSAGE.USE_TAB_CONTEXT);
  }

  return context;
};
