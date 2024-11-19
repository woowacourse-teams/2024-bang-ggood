import Toast from '@/components/_common/Toast/Toast';
import useToast from '@/hooks/useToast';

const ToastContainer = () => {
  const { type, toast } = useToast();

  return toast && <Toast type={type} message={toast} />;
};

export default ToastContainer;
