import React, { useEffect, useState } from 'react';

import { VALIDATION_ERROR_MESSAGE, ValidationError } from '@/constants/message/validationErrorMessage';

export type ValidationReturnType = {
  isValid: boolean;
  errorType: ValidationError;
};

export type ValidateFuncWithPropsType = (value: string, currentName: string) => ValidationReturnType;

export type InputChangeCallbackType = (value: string) => string;
interface Props {
  initialValue: string;
  validates: ValidateFuncWithPropsType[];
  inputChangeCallbacks?: InputChangeCallbackType[];
}

const useValidateInput = ({ initialValue, validates }: Props) => {
  const [value, setValue] = useState(initialValue);
  const [errors, setErrors] = useState<Set<string>>(new Set());
  const [isValidated, setIsValidated] = useState(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const newValue = value;

    setValue(newValue);

    const updateErrors = (errorType: string, isValid: boolean) => {
      setErrors(prevErrors => {
        const updatedErrors = new Set(prevErrors);
        if (isValid) {
          updatedErrors.delete(errorType);
        } else {
          updatedErrors.add(errorType);
        }
        return updatedErrors;
      });
    };

    validates.forEach(validate => {
      const errorResult = validate(newValue, name);
      updateErrors(errorResult.errorType, errorResult.isValid);
    });
  };

  useEffect(() => {
    setIsValidated(errors.size === 0 && value.length > 0);
  }, [errors, value]);

  const getErrorMessage = () => {
    if (errors.size === 0) return '';
    return VALIDATION_ERROR_MESSAGE[Array.from(errors)[0] as ValidationError];
  };

  return {
    value,
    setValue,
    onChange,
    isValidated,
    setErrors,
    getErrorMessage,
  };
};

export default useValidateInput;
