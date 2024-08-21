import { createContext, useContext, useState } from 'react';

import { ERROR_MESSAGE } from '@/constants/errorMessage';

interface AccordionProps {
  id: number;
  isOpen: boolean;
}

interface AccordionContextProps {
  handleAccordionOpenChange: (id: number) => void;
  isAccordionOpen: (id: number) => boolean;
}

export const AccordionContext = createContext({} as AccordionContextProps);

interface AccordionProviderProps {
  count: number;
  children: React.ReactNode;
}

export const AccordionProvider = ({ count, children }: AccordionProviderProps) => {
  const [accordionOpens, setAccordionOpens] = useState<AccordionProps[]>(
    new Array(count).fill(0).map((e, i) => {
      return {
        id: i + 1,
        isOpen: true,
      };
    }),
  );

  const handleAccordionOpenChange = (id: number) => {
    const target = accordionOpens.find(accordion => accordion.id === id);
    if (!target) return;

    const newAccordionOpens = accordionOpens.map(accordion =>
      accordion.id === id ? { ...accordion, isOpen: !accordion.isOpen } : accordion,
    );

    setAccordionOpens(newAccordionOpens);
  };

  const isAccordionOpen = (id: number) => {
    const target = accordionOpens.find(accordion => accordion.id === id);
    return target ? target.isOpen : false;
  };

  const value = {
    handleAccordionOpenChange,
    isAccordionOpen,
  };

  return <AccordionContext.Provider value={value}>{children}</AccordionContext.Provider>;
};

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error(ERROR_MESSAGE.USEACCORDIONCONTEXT);
  }
  return context;
};
