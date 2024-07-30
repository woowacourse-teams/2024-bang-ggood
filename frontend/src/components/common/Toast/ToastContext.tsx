// import { createContext, useContext } from 'react';

// import Toast from '@/components/common/Toast/Toast';
// import useToast from '@/hooks/useToast';

// export const ToastContext = createContext({} as ReturnType<typeof useToast>);

// export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
//   const { toast, hideToast, showToast } = useToast();

//   return (
//     <ToastContext.Provider value={{ toast, hideToast, showToast }}>
//       {toast && <Toast />}
//       {children}
//     </ToastContext.Provider>
//   );
// };

// export const useToastContext = () => {
//   const context = useContext(ToastContext);

//   if (!context) {
//     throw new Error('useToastContext는 ToastProvider에서 사용해야 합니다.');
//   }
//   return context;
// };
