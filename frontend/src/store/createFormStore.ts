import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';

import { InputChangeEvent } from '@/types/event';
import { objectMap } from '@/utils/typeFunctions';
import { AllString } from '@/utils/utilityTypes';
import { validation } from '@/utils/validation';
import { Validator } from '@/utils/validators';

const initialErrorMessages = <T extends object>(initial: Partial<T>) =>
  Object.fromEntries(Object.entries(initial).map(([key]) => [key, ''])) as AllString<T>;

interface FormAction<T> {
  onChange: (event: InputChangeEvent) => void;
  set: <V>(name: keyof T, value: V) => void;
  setValueForced: <V>(name: string, value: V) => void;
  setAll: (state: Partial<FormState<T>>) => void;
  resetAll: () => void;
  _reset: (name: keyof T) => void;
  _update: <V>(name: keyof AllString<T>, value: V) => void;
  _updateErrorMsg: (field: keyof T, value: string) => void;
  _updateAfterValidation: (field: keyof T, value: string, validators: Validator[]) => void;
  _transform: <V>(name: string, value: V) => void;
}

type FormState<T> = { rawValue: Partial<AllString<T>>; value: Partial<T>; errorMessage: AllString<T> };

export interface FormFieldSpec {
  initialValue: string;
  type: 'string' | 'number' | 'number[]';
  validators: Validator[];
}

export type FormSpec<T> = {
  [k in keyof T as string]: FormFieldSpec;
};

const getInitialRaw = <T extends object>(formSpec: FormSpec<T>) =>
  objectMap(formSpec, ([name, { initialValue }]) => [name, initialValue]) as Partial<AllString<T>>;
const getValueType = <T extends object>(formSpec: FormSpec<T>) =>
  objectMap(formSpec, ([name, { type }]) => [name, type]) as Partial<AllString<T>>;
const getValidationSet = <T extends object>(formSpec: FormSpec<T>) =>
  objectMap(formSpec, ([name, { validators }]) => [name, validators]) as Record<keyof T, Validator[]>;

const createFormStore = <T extends object>(formSpec: FormSpec<T>, storageName: string) =>
  createStore<
    FormState<T> & {
      actions: FormAction<T>;
    }
  >()(
    persist(
      (set, get) => ({
        rawValue: getInitialRaw(formSpec),
        value: transformAll(getInitialRaw(formSpec), getValueType(formSpec)),
        errorMessage: initialErrorMessages(getInitialRaw(formSpec)),
        actions: {
          onChange: event => get().actions.set(event.target.name as keyof T, event.target.value),
          set: <V>(name: keyof T, value: V) => {
            if (value === '') {
              get().actions._reset(name);
              return;
            }

            // 타입에 따라 다르게 처리
            if (Array.isArray(value)) {
              get().actions._update(name, value);
            } else if (typeof value === 'number') {
              get().actions._updateAfterValidation(name, value.toString(), getValidationSet(formSpec)[name]);
            } else {
              get().actions._updateAfterValidation(name, value as string, getValidationSet(formSpec)[name]);
            }
          },
          setValueForced: (name, value) => set({ value: { ...get().value, [name]: value } }),
          resetAll: () =>
            set({
              rawValue: getInitialRaw(formSpec),
              value: transformAll(getInitialRaw(formSpec), getValueType(formSpec)),
              errorMessage: initialErrorMessages(getInitialRaw(formSpec)),
            }),
          setAll: set,
          _reset: name => {
            get().actions._updateErrorMsg(name, '');
            get().actions._update(name, '');
          },
          _update: (name, value) => {
            set({ rawValue: { ...get().rawValue, [name]: value } });
            get().actions._transform(name as string, value ?? '');
          },
          _updateErrorMsg: (name, value) => set({ errorMessage: { ...get().errorMessage, [name]: value } }),
          _updateAfterValidation: (name, value, validators) => {
            validation(
              name as string,
              value,
              validators,
              (name: string, value: string) => {
                get().actions._update(name as keyof AllString<T>, value);
              },
              (name: string, errorMessage: string) => {
                get().actions._updateErrorMsg(name as keyof T, errorMessage);
              },
            );
          },
          _transform: (name, value) =>
            set({
              value: {
                ...get().value,
                [name]: getValueType(formSpec)[name as keyof T] === 'number' ? Number(value) : value,
              },
            }),
        },
      }),
      {
        name: storageName,
        partialize: state => ({
          rawValue: state.rawValue,
          value: state.value,
          errorMessage: state.errorMessage,
          // actions는 저장하지 않음
        }),
      },
    ),
  );

const transformAll = <T>(rawValues: Partial<AllString<T>>, valueType: Partial<AllString<T>>) =>
  objectMap(rawValues, ([key, value]) => {
    const valueTypeForKey = valueType[key as keyof T];
    if (valueTypeForKey === 'number') {
      return [key, typeof value === 'number' ? value : Number(value)];
    } else if (valueTypeForKey === 'number[]') {
      try {
        return [key, Array.isArray(value) ? value : JSON.parse(value as string)];
      } catch (e) {
        return [key, []];
      }
    } else {
      return [key, value];
    }
  }) as Partial<T>;

export default createFormStore;
