import { useEffect } from 'react';

import useToastState from '@/store/useToastState';

const useToast = (durationMinute: number) => {
  const { hideToast, toast, showToast } = useToastState();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        hideToast();
      }, durationMinute * 1000);
      return () => clearTimeout(timer);
    }
  }, [toast, durationMinute, hideToast]);

  return { toast, showToast };
};

export default useToast;
