import { ChangeEventHandler } from 'react';
import { StateCreator } from 'zustand';

import { Validator } from '@/utils/validators';

export interface FormFieldUnitState<Value> {
  rawValue: string;
  value: Value;
  errorMessage: string;
}

export interface FormAction {
  setInputWithValidation: (rawValue: string) => void;
  set: (rawValue: string) => void;
  onChange: ChangeEventHandler<HTMLInputElement>;
  _setAndParse: (rawValue: string) => void;
  reset: () => void;
}

export const createFormFieldSlice = <Type extends string | number>(
  initialRawValue: string,
  validators: Validator[],
  type: 'string' | 'number',
): StateCreator<FormFieldUnitState<Type> & { actions: FormAction }> => {
  return (set, get) => ({
    rawValue: initialRawValue,
    errorMessage: '',
    value: parseValue(get().rawValue, type) as Type,
    actions: {
      onChange: e => get().actions.setInputWithValidation(e.target.value),
      set: rawValue => get().actions.setInputWithValidation(rawValue),

      setInputWithValidation: (rawValue: string) => {
        const newErrorMessage = rawValue === '' ? '' : validation(rawValue, validators);
        set({ errorMessage: newErrorMessage });
        if (newErrorMessage === '') get().actions._setAndParse(rawValue); // 에러가 없으면 업데이트
      },

      reset: () => get().actions.setInputWithValidation(initialRawValue),
      _setAndParse: (rawValue: string) => set({ rawValue, value: parseValue(rawValue, type) as Type }),
    },
  });
};

function parseValue<T extends 'string' | 'number'>(value: string, type: T): T extends 'string' ? string : number;
function parseValue(value: string, type: 'string' | 'number') {
  return type === 'number' ? Number(value) : value;
}

const validation = (rawValue: string, validators: Validator[]) => {
  const newErrorMessage =
    validators
      ?.slice() //validatiors 가 런타임 때 undefined 일 경우를 대비해 ? 로 처리
      .reverse()
      .reduce((acc, { validate, errorMessage }) => (!validate(rawValue) ? errorMessage : acc), '') ?? '';
  return newErrorMessage;
};
