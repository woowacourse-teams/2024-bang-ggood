import { createContext, PropsWithChildren, useContext, useState } from 'react';

interface AccordionProps {
  id: number;
  isOpen: boolean;
}

interface AccordionContextProps {
  handleAccordionOpenChange: (id: number) => void;
  isAccordionOpen: (id: number) => boolean;
}

export const AccordionContext = createContext({} as AccordionContextProps);

export const AccordionProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [accordionOpens, setAccordionOpens] = useState<AccordionProps[]>([]);

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

export const useAccordionContext = () => useContext(AccordionContext);
