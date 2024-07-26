import { useCallback, useState } from 'react';

const useToast = () => {
  const [isToastShow, setIsToastShow] = useState(false);

  const showToast = useCallback(() => {
    setIsToastShow(true);
  }, []);

  const hideToast = useCallback(() => {
    setIsToastShow(false);
  }, []);

  return { showToast, hideToast, isToastShow };
};

export default useToast;
