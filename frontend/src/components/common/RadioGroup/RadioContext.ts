import { createContext } from 'react';

import { InputChangeEvent } from '@/components/common/Input/Input';

interface RadioState {
  value: string;
  onChangeChild: (event: InputChangeEvent) => void;
}
const RadioContext = createContext<RadioState>({
  value: '',
  onChangeChild: () => {},
});

export default RadioContext;
