import { createContext, ReactNode, RefObject, useContext, useRef, useState } from 'react';

import { ERROR_MESSAGE } from '@/constants/messages/errorMessage';
import { DefaultChecklistTabsNames, DRAG_THRESHOLD_PIXEL, remainOp } from '@/constants/tabs';
import useMouseDrag from '@/hooks/useMouseDrag';

interface ContextProps {
  currentTabId: number;
  setCurrentTabId: React.Dispatch<React.SetStateAction<number>>;
  useDragForTab: () => RefObject<HTMLElement>;
}

const TabContext = createContext<ContextProps | null>(null);

interface Props {
  children: ReactNode;
  defaultTab: number;
}

export const TabProvider = ({ children, defaultTab = 0 }: Props) => {
  const [currentTabId, setCurrentTabId] = useState<number>(defaultTab);

  // 드래그로 탭이동을 위한 훅을 리턴에 제공
  const useDragForTab = () => {
    const ref = useRef<HTMLElement>(null);
    useMouseDrag(ref, (S, E) => {
      const TAB_COUNT = DefaultChecklistTabsNames.length;

      setCurrentTabId(tabId => {
        const isLeftDrag = E.x - S.x > DRAG_THRESHOLD_PIXEL;
        const isRightDrag = S.x - E.x > DRAG_THRESHOLD_PIXEL;
        if (isLeftDrag) return remainOp(tabId - 1, TAB_COUNT);
        if (isRightDrag) return remainOp(tabId + 1, TAB_COUNT);
        return tabId;
      });
    });

    return ref;
  };

  return <TabContext.Provider value={{ currentTabId, setCurrentTabId, useDragForTab }}>{children}</TabContext.Provider>;
};

export const useTabContext = () => {
  const context = useContext(TabContext);

  if (!context) {
    throw new Error(ERROR_MESSAGE.USE_TAB_CONTEXT);
  }

  return context;
};
