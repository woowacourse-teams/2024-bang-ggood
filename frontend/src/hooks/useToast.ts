import { useEffect } from 'react';

import useToastStore from '@/store/useToastStore';

const useToast = (durationMinute: number) => {
  const { hideToast, toast, showToast } = useToastStore();

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
