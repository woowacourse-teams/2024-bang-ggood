import { ChangeEventHandler } from 'react';
import { createStore, StateCreator } from 'zustand';

import { Validator } from '@/utils/validators';

interface InputFieldNumericState {
  rawValue: string;
  value: string | number;
  errorMessage: string;
}

interface Action {
  setInputWithValidation: (rawValue: string) => void;
  set: (rawValue: string) => void;
  onChange: ChangeEventHandler<HTMLInputElement>;
  _setAndParse: (rawValue: string) => void;
  reset: () => void;
}

type InputFieldState = InputFieldNumericState & { actions: Action };

export const createFormFieldSlice =
  (initialRawValue: string, validators: Validator[], type: 'string' | 'number'): StateCreator<InputFieldState> =>
  (set, get) => ({
    rawValue: initialRawValue,
    errorMessage: '',
    value: parseValue(initialRawValue, type),
    actions: {
      onChange: e => get().actions.setInputWithValidation(e.target.value),
      set: rawValue => get().actions.setInputWithValidation(rawValue),

      setInputWithValidation: (rawValue: string) => {
        const newErrorMessage = rawValue === '' ? '' : validation(rawValue, validators);
        set({ errorMessage: newErrorMessage });
        if (newErrorMessage === '') get().actions._setAndParse(rawValue); // 에러가 없으면 업데이트
      },

      reset: () => get().actions.setInputWithValidation(initialRawValue),
      _setAndParse: (rawValue: string) => set({ rawValue, value: parseValue(rawValue, type) }),
    },
  });

const parseValue = (value: string, type: 'string' | 'number') => (type === 'number' ? Number(value) : value);

export interface FormFieldSpec {
  initialValue: string;
  type: 'string' | 'number';
  validators: Validator[];
}

export type FormSpec<T> = {
  [k in keyof T]: FormFieldSpec;
};

export const createInputFieldStores = <ObjectState extends object>(formSpec: FormSpec<ObjectState>) => {
  const storeList = Object.entries<FormFieldSpec>(formSpec).map(([key, value]) => ({
    name: key,
    store: createStore(createFormFieldSlice(value.initialValue, value.validators, value.type)),
  }));

  const findByName = (name: keyof ObjectState) => storeList.find(store => store.name === name)!.store; // 존재함이 보장되므로 ! 사용.
  const setByName = (name: keyof ObjectState, rawValue: string) => {
    const foundStore = findByName(name);
    foundStore.getState().actions.setInputWithValidation(rawValue);
  };

  // as 쓴 이유 : JS의 Object.entries 함수는 value에 대해 하나의 타입을 가정하고 만들어줬기때문에 지금은 써줘야 함.
  const setAll = (rawValueObj: ObjectState) =>
    Object.entries(rawValueObj).forEach(([name, rawValue]) => setByName(name as keyof ObjectState, rawValue)); // 인자 - (키: name, 밸류: rawValue인 객체)
  const resetAll = () =>
    Object.entries(formSpec).map(([name]) =>
      findByName(name as keyof ObjectState)
        .getState()
        .actions.reset(),
    );
  const getStates = () => Object.fromEntries(storeList.map(store => [store.name, store.store.getState()]));

  const onChange: ChangeEventHandler<HTMLInputElement> = e => {
    setByName(e.target.name as keyof ObjectState, e.target.value);
  };

  return { onChange, findByName, getStates, setAll, resetAll };
};

const validation = (rawValue: string, validators: Validator[]) => {
  const newErrorMessage =
    validators
      ?.slice() //validatiors 가 런타임 때 undefined 일 경우를 대비해 ? 로 처리
      .reverse()
      .reduce((acc, { validate, errorMessage }) => (!validate(rawValue) ? errorMessage : acc), '') ?? '';
  return newErrorMessage;
};
