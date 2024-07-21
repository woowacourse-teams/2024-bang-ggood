import { createContext, useContext, useState } from 'react';

interface AccordionProps {
  id: number;
  isOpen: boolean;
}

interface AccordionContextProps {
  handleAccordionOpenChange: (id: number) => void;
  isAccordionOpen: (id: number) => boolean;
}

export const AccordionContext = createContext({} as AccordionContextProps);

export const AccordionProvider = ({ count, children }: { count: number; children: React.ReactNode }) => {
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
    throw new Error('useAccordionContext는 AccordionProvider에서 사용해야 합니다.');
  }
  return context;
};
