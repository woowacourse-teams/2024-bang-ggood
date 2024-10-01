import { ChangeEventHandler } from 'react';
import { createStore } from 'zustand';

import { createFormFieldSlice } from '@/store/createFormFieldSlice';
import { Validator } from '@/utils/validators';

export type FormFieldSpec = FormFieldSpecN | FormFieldSpecS;

export interface FormFieldSpecN {
  initialValue: number;
  type: 'number';
  validators: Validator[];
}
export interface FormFieldSpecS {
  initialValue: string;
  type: 'string';
  validators: Validator[];
}

export type FormSpec<T> = {
  [k in keyof T]: FormFieldSpec;
};

function typedEntries<T extends object>(obj: T): [keyof T, T[keyof T]][] {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}
function typedFromEntries<K extends string | number | symbol, V>(entries: [K, V][]): Record<K, V> {
  return Object.fromEntries(entries) as Record<K, V>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createFormFieldStores = <ObjectState extends Record<string, any>>(formSpec: FormSpec<ObjectState>) => {
  const stores = typedFromEntries(
    typedEntries(formSpec).map(([key, value]) => [
      key,
      createStore(createFormFieldSlice<typeof value.initialValue>(value.initialValue, value.validators, value.type)),
    ]),
  );

  // as 쓴 이유 : JS의 Object.entries 함수는 value에 대해 하나의 타입을 가정하고 만들어줬기때문에 지금은 써줘야 함.
  const setAllWithValidation = (rawValueObj: ObjectState) =>
    Object.entries(rawValueObj).forEach(([name, rawValue]) => set(name, rawValue)); // 인자 - (키: name, 밸류: rawValue인 객체)
  const resetAll = () => Object.entries(formSpec).forEach(([name]) => stores[name].getState().actions.reset());

  const onChange: ChangeEventHandler<HTMLInputElement> = e => {
    set(e.target.name as keyof ObjectState, e.target.value);
  };
  const set = <Name extends keyof ObjectState>(name: Name, value: string) => stores[name].getState().actions.set(value);

  return { ...stores, set, onChange, setAllWithValidation, resetAll };
};
