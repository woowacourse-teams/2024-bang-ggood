import { ChangeEventHandler } from 'react';
import { createStore } from 'zustand';

import { createFormFieldSlice } from '@/store/createFormFieldSlice';
import { Validator } from '@/utils/validators';

export interface FormFieldSpec {
  initialValue: string;
  type: 'string' | 'number';
  validators: Validator[];
}

export type FormSpec<T> = {
  [k in keyof T]: FormFieldSpec;
};
export const createFormFieldStores = <ObjectState extends object>(formSpec: FormSpec<ObjectState>) => {
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
