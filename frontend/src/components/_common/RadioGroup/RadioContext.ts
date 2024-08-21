import { createContext } from 'react';

import { InputChangeEvent } from '@/types/event';

interface RadioState {
  value: string;
  onChangeChild: (event: InputChangeEvent) => void;
}

const RadioContext = createContext<RadioState>({
  value: '',
  onChangeChild: () => {},
});

export default RadioContext;
