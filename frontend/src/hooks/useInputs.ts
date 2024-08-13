import { useState } from 'react';

import { InputChangeEvent } from '@/types/event';

const useInputs = <T extends object>(initialValue: T) => {
  const [values, setValues] = useState(initialValue);

  const onChange = (event: InputChangeEvent) => {
    setValues(prev => ({
      ...prev,
      [event.target.name]: event.target?.type === 'number' ? parseInt(event.target.value) : event.target.value,
    }));
  };

  return { values, onChange, setValues };
};
export default useInputs;
