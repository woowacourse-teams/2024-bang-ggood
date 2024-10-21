import { API_ERROR_MESSAGE } from '@/constants/messages/apiErrorMessage';

const getErrorMessage = (errorCode: string): string => {
  return API_ERROR_MESSAGE[errorCode as keyof typeof API_ERROR_MESSAGE] ?? '알 수 없는 에러가 발생했습니다.';
};

class APIError extends Error {
  statusCode: number;
  errorCode: string;
  message: string;

  constructor(statusCode: number, errorCode: string) {
    super();

    const errorMessage = getErrorMessage(errorCode);

    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.message = errorMessage;

    Object.setPrototypeOf(this, APIError.prototype);
  }
}

export default APIError;
