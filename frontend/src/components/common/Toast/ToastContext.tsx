import { createContext, useCallback, useContext, useState } from 'react';

import Toast from '@/components/common/Toast/Toast';

interface ToastContextProps {
  toast: string | null;
  showToast: (message: string) => void;
  hideToast: () => void;
}

/**
 * @description 전역 토스트를 보여주는 컨텍스트입니다.
 * @property {string | null} toast - 현재 표시되고 있는 토스트 메시지. 메세지가 들어가면 해당 토스트가 나타납니다.
 * @property {function(string): void} showToast - 새로운 토스트 메시지를 표시하는 함수입니다. props 로 표시하고 싶은 메세지를 전달합니다.
 * @property {function(): void} hideToast - 현재 표시되고 있는 토스트 메시지를 숨기는 함수입니다. 기본적으로 3초 뒤에 사라지도록 설정되어 있습니다.
 */

export const ToastContext = createContext({} as ToastContextProps);

const TOAST_DURATION = 3;

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
      {toast && <Toast duration={TOAST_DURATION} />}
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
