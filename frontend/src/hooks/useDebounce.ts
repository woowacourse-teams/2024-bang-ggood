import { useEffect, useState } from 'react';

interface Props<T> {
  value: T;
  delay?: number;
}

const useDebounce = <T>({ value, delay = 1000 }: Props<T>) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
