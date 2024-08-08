import { createContext } from 'react';

import { InputChangeEvent } from '@/components/_common/Input/Input';

interface RadioState {
  value: string;
  onChangeChild: (event: InputChangeEvent) => void;
}
const RadioContext = createContext<RadioState>({
  value: '',
  onChangeChild: () => {},
});

export default RadioContext;
