import { useState } from 'react';

const useInput = <T>(initialValue: T) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value as T);
  };

  return { value, onChange, setValue };
};

export default useInput;
