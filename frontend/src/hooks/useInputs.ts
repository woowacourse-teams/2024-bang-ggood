import React, { useState } from 'react';

const useInputs = <T extends object>(initialValue: T) => {
  const [values, setValues] = useState(initialValue);

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues(prev => ({
      ...prev,
      [event.target.name]: event.target.type === 'number' ? parseInt(event.target.value) : event.target.value,
    }));
    console.log(event.target.name, event.target.value);
    console.log(values);
  };

  return { values, onChange, setValues };
};
export default useInputs;
