import { useCallback, useMemo, useState } from 'react';

const DEFAULT_TOAST_DURATION = 3;
const useToast = () => {
  const [toast, setToast] = useState<string | null>(null);
  const [duration, setDuration] = useState(DEFAULT_TOAST_DURATION);

  const showToast = useCallback((message: string) => {
    setToast(message);
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return useMemo(
    () => ({
      toast,
      duration,
      showToast,
      hideToast,
      setDuration,
    }),
    [toast, duration, showToast, hideToast],
  );
};

export default useToast;
