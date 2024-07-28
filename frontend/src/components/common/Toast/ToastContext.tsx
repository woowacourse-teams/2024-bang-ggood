import { createContext, useCallback, useContext, useState } from 'react';

import Toast from '@/components/common/Toast/Toast';

interface ToastContextProps {
  toast: string | null;
  showToast: (message: string) => void;
  hideToast: () => void;
}

export const ToastContext = createContext({} as ToastContextProps);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message: string) => {
    setToast(message);
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  const value = {
    toast,
    showToast,
    hideToast,
  };

  return (
    <ToastContext.Provider value={value}>
      {toast && <Toast duration={3} />}
      {children}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext는 ToastProvider에서 사용해야 합니다.');
  }
  return context;
};
