import { useEffect } from 'react';

import { DEFAULT_TOAST_DURATION } from '@/constants/system';
import useToastStore, { ToastType } from '@/store/useToastStore';

interface Props {
  durationMinute?: number;
  type?: ToastType;
}

const useToast = (props?: Props) => {
  const { hideToast, toast, showToast, colorType } = useToastStore();

  const { durationMinute = DEFAULT_TOAST_DURATION } = props || {};

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        hideToast();
      }, durationMinute * 1000);
      return () => clearTimeout(timer);
    }
  }, [toast, durationMinute, hideToast]);

  return { toast, showToast, colorType };
};

export default useToast;
