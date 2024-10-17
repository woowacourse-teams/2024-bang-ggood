import React, { useEffect, useState } from 'react';

// import { ErrorStatus } from '@/utils/validation';

export enum ErrorStatus {
  INVALID_FORMAT = 'invalidFormat',
  // EXPIRED_CARD_DATE = 'expiredCardDate',
  // INVALID_MONTH = 'invalidMonth',
  // NAME_SHOULD_BE_CAPITAL = 'nameCapital',
  // DOUBLE_SPACE = 'doubleSpace',
  // ENTER_REQUIRED = 'enter',
  // IS_NOT_NUMBER = 'is_not_number',
}

export type ValidateFuncWithPropsType = (
  value: string,
  currentName: string,
) => { isValid: boolean; errorType?: string };

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

    const updateErrors = (errorType: string | undefined, isValid: boolean) => {
      setErrors(prevErrors => {
        const updatedErrors = new Set(prevErrors);
        if (isValid) {
          updatedErrors.delete(errorType!);
        } else {
          updatedErrors.add(errorType!);
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
    if (errors.size !== 0 || !value.length) {
      setIsValidated(false);
    } else {
      setIsValidated(true);
    }
  }, [errors, value]);

  return {
    value,
    setValue,
    errors,
    onChange,
    isValidated,
    setErrors,
  };
};

export default useValidateInput;
