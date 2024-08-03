import { useState } from 'react';

const useInput = (initialValue: string | null) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return { value, onChange };
};

export default useInput;
