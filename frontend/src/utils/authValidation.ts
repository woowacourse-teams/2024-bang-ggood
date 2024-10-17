import { ValidationReturnType } from '@/hooks/useValidateInput';

const REGEX = {
  EMAIL: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PASSWORD: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
};

export const validateEmail = (value: string): ValidationReturnType => {
  const regex = REGEX.EMAIL;
  if (!regex.test(value)) {
    return { errorType: 'INVALID_FORMAT_EMAIL', isValid: false };
  }
  return { errorType: 'INVALID_FORMAT_EMAIL', isValid: true };
};

export const validatePassword = (value: string): ValidationReturnType => {
  const regex = REGEX.PASSWORD;
  if (!regex.test(value)) {
    return { errorType: 'INVALID_FORMAT_PASSWORD', isValid: false };
  }
  return { errorType: 'INVALID_FORMAT_PASSWORD', isValid: true };
};

export const validatePasswordConfirm = (value: string, password: string): ValidationReturnType => {
  if (value !== password) {
    return { errorType: 'NOT_MATCH_PASSWORD', isValid: false };
  }
  return { errorType: 'NOT_MATCH_PASSWORD', isValid: true };
};

export const validateLength = (value: string, minLength: number, maxLength: number): ValidationReturnType => {
  if (value.length < minLength || value.length > maxLength) {
    return { errorType: 'INVALID_NAME_LENGTH', isValid: false };
  }
  return { errorType: 'INVALID_NAME_LENGTH', isValid: true };
};
