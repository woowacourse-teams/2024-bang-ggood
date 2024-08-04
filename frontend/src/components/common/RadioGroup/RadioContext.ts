import { createContext } from 'react';

import { InputChangeEvent } from '@/components/common/Input/Input';

export interface RadioState {
  value: string | null;
  onChangeChild: (event: InputChangeEvent) => void;
}
const RadioContext = createContext<RadioState>({
  value: '',
  onChangeChild: () => {},
});

export default RadioContext;
