import { ChangeEventHandler } from 'react';
import { createStore, StoreApi } from 'zustand';

import { createFormFieldSlice, FormAction as FormFieldAction, FormFieldState } from '@/store/createFormFieldSlice';
import { Validator } from '@/utils/validators';

export type FormFieldSpec = FormFieldSpecN | FormFieldSpecS;

export interface FormFieldSpecN {
  initialValue: string;
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
export const createFormFieldStores = <StateObj extends Record<string, any>>(formSpec: FormSpec<StateObj>) => {
  const storesN = typedFromEntries(
    typedEntries(formSpec)
      .filter(([, value]) => value.type === 'number')
      .map(([key, value]) => [
        key,
        createStore(createFormFieldSlice<number>(value.initialValue, value.validators, value.type)),
      ]),
  );
  const storesS = typedFromEntries(
    typedEntries(formSpec)
      .filter(([, value]) => value.type === 'string')
      .map(([key, value]) => [
        key,
        createStore(createFormFieldSlice<string>(value.initialValue, value.validators, value.type)),
      ]),
  );

  type FieldStores = {
    readonly [k in keyof StateObj]: StoreApi<
      FormFieldState<StateObj[k]> & {
        actions: FormFieldAction;
      }
    >;
  };

  const stores = { ...storesN, ...storesS } as FieldStores;
  const set = <Name extends keyof StateObj>(name: Name, value: string) => stores[name].getState().actions.set(value);
  const resetAll = () => Object.entries(formSpec).forEach(([name]) => stores[name].getState().actions.reset());
  const setAll = (obj: Partial<StateObj>) =>
    Object.entries(obj).forEach(([name, value]) => stores[name].getState().actions.set(value));
  const getAll = () =>
    Object.entries(formSpec).reduce((prev, [name]) => ({ ...prev, [name]: stores[name].getState().value }));
  const onChange: ChangeEventHandler<HTMLInputElement> = e => set(e.target.name as keyof StateObj, e.target.value);

  return { ...stores, set, setAll, onChange, getAll, resetAll };
};
