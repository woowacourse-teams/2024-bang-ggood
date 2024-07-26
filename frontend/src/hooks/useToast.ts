import { useCallback, useState } from 'react';

const useToast = () => {
  const [toast, setToast] = useState<{ message: string; duration: number } | null>(null);

  const showToast = useCallback((message: string, duration: number) => {
    setToast({ message, duration });
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return { showToast, hideToast, toast };
};

export default useToast;
