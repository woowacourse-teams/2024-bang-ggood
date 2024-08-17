import { DEFAULT_TOAST_DURATION } from '@/constants/system';
import HttpError from '@/error/HttpError';
import useToast from '@/hooks/useToast';

const useHandleQueryError = (error: HttpError) => {
  const { showToast } = useToast(DEFAULT_TOAST_DURATION);

  const handleError = () => {
    showToast(error.message);
  };

  return { handleError };
};

export default useHandleQueryError;
