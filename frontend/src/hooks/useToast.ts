import { useEffect } from 'react';

import { DEFAULT_TOAST_DURATION } from '@/constants/system';
import useToastStore from '@/store/useToastStore';

interface Props {
  durationMinute?: number;
}

const useToast = (props?: Props) => {
  const { toast, type, showToast, hideToast } = useToastStore();

  const { durationMinute = DEFAULT_TOAST_DURATION } = props || {};

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        hideToast();
      }, durationMinute * 1000);
      return () => clearTimeout(timer);
    }
  }, [toast, durationMinute, hideToast]);

  return { toast, type, showToast };
};

export default useToast;
