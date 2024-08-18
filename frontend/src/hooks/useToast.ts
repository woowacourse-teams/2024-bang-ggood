import { useEffect } from 'react';

import { DEFAULT_TOAST_DURATION } from '@/constants/system';
import useToastStore, { ToastType } from '@/store/useToastStore';

interface Props {
  durationMinute?: number;
  type?: ToastType;
}

const useToast = (props?: Props) => {
  const { hideToast, toast, showToast, setColorType, colorType } = useToastStore();

  const { durationMinute = DEFAULT_TOAST_DURATION, type = 'positive' } = props || {};

  useEffect(() => {
    if (colorType !== type) {
      setColorType(type);
    }

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
