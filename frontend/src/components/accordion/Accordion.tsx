import AccordionHeader from '@/components/accordion/AccodionHeader';
import { AccordionProvider } from '@/components/accordion/AccordionContext';

const Accordion = ({ children }: { children: React.ReactNode }) => {
  return <AccordionProvider>{children}</AccordionProvider>;
};

Accordion.header = AccordionHeader;

export default Accordion;
