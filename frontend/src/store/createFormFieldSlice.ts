import { ChangeEventHandler } from 'react';
import { StateCreator } from 'zustand';

import { Validator } from '@/utils/validators';

interface FormFieldNumericState {
  rawValue: string;
  value: number;
  errorMessage: string;
}
interface FormFieldStringState {
  rawValue: string;
  value: string;
  errorMessage: string;
}

interface FormFieldBothState {
  rawValue: string;
  value: string;
  errorMessage: string;
}

interface FormFieldUnitState<Value> {
  rawValue: string;
  value: Value;
  errorMessage: string;
}

interface Action {
  setInputWithValidation: (rawValue: string) => void;
  set: (rawValue: string) => void;
  onChange: ChangeEventHandler<HTMLInputElement>;
  _setAndParse: (rawValue: string) => void;
  reset: () => void;
}

export type FormFieldState = (FormFieldNumericState | FormFieldStringState) & { actions: Action };

export const createFormFieldSlice =
  (initialRawValue: string, validators: Validator[], type: 'string' | 'number'): StateCreator<FormFieldBothState & {actions:Action}> =>
  (set, get) => ({
    rawValue: initialRawValue,
    errorMessage: '',
    value: type==='string'? get().rawValue:parseValue0(get().rawValue),
    actions: {
      onChange: e => get().actions.setInputWithValidation(e.target.value),
      set: rawValue => get().actions.setInputWithValidation(rawValue),

      setInputWithValidation: (rawValue: string) => {
        const newErrorMessage = rawValue === '' ? '' : validation(rawValue, validators);
        set({ errorMessage: newErrorMessage });
        if (newErrorMessage === '') get().actions._setAndParse(rawValue); // 에러가 없으면 업데이트
      },

      reset: () => get().actions.setInputWithValidation(initialRawValue),
      _setAndParse: (rawValue: string) => set({ rawValue, value: type==='string'? rawValue:parseValue0(rawValue) }),
    },
  });

function parseValue(value: string, type: 'string'): string;
function parseValue(value: string, type: 'number'): number;
function parseValue(value: string, type: 'string' | 'number') {
  return type === 'number' ? Number(value) : value;
}

const parseValue1 = <Type extends 'string' | 'number'>(
  value: string,
  type: Type,
): Type extends 'string' ? string : number =>
  (type === 'number' ? Number(value) : value) as Type extends 'string' ? string : number;

function parseValue2(value: string, type: 'string' | 'number') {
  return type === 'number' ? Number(value) : value;
}

// function parseValue3(value: string, type: 'string'): string;
// function parseValue3(value: string, type: 'number'): number;
// function parseValue3(value: string, type: 'string' | 'number') {
//   return type === 'number' ? Number(value) : value;
// }
const a = parseValue('absc', 'string');
const b = parseValue('absc', 'number');

const parseValue0 = (value:string) =>Number(value);
const validation = (rawValue: string, validators: Validator[]) => {
  const newErrorMessage =
    validators
      ?.slice() //validatiors 가 런타임 때 undefined 일 경우를 대비해 ? 로 처리
      .reverse()
      .reduce((acc, { validate, errorMessage }) => (!validate(rawValue) ? errorMessage : acc), '') ?? '';
  return newErrorMessage;
};
