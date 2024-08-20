import { createStore } from 'zustand';

import { InputChangeEvent } from '@/types/event';
import { objectMap } from '@/utils/typeFunctions';
import { AllString } from '@/utils/utilityTypes';
import { validation } from '@/utils/validation';
import { Validator } from '@/utils/validators';

const initialErrorMessages = <T extends object>(initial: Partial<T>) =>
  Object.fromEntries(Object.entries(initial).map(([key]) => [key, ''])) as AllString<T>;

interface FormAction<T> {
  onChange: (event: InputChangeEvent) => void;
  set: (name: keyof T, value: string | undefined) => void;
  setAll: (state: Partial<FormState<T>>) => void;
  resetAll: () => void;
  _reset: (name: keyof T) => void;
  _update: (name: keyof AllString<T>, value: string | undefined) => void;
  _updateErrorMsg: (field: keyof T, value: string) => void;
  _updateAfterValidation: (field: keyof T, value: string, validators: Validator[]) => void;
  _transform: (name: string, value: string) => void;
}

type FormState<T> = { rawValue: Partial<AllString<T>>; value: Partial<T>; errorMessage: AllString<T> };

const createFormStore = <T extends object>(
  initialRaw: Partial<AllString<T>>,
  validatorSet: Record<string, Validator[]>,
  valueType: AllString<T>,
) =>
  createStore<
    FormState<T> & {
      actions: FormAction<T>;
    }
  >((set, get) => ({
    rawValue: initialRaw,
    value: transformAll(initialRaw, valueType),
    errorMessage: initialErrorMessages(initialRaw),
    actions: {
      onChange: event => {
        get().actions.set(event.target.name as keyof T, event.target.value);
      },
      set: (name, value) => {
        if (value === '') {
          get().actions._reset(name);
          return;
        }

        get().actions._updateAfterValidation(name, value ?? '', validatorSet[name as string]);
      },

      resetAll: () =>
        set({
          rawValue: initialRaw,
          value: transformAll(initialRaw, valueType),
          errorMessage: initialErrorMessages(initialRaw),
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
        set({ value: { ...get().value, [name]: valueType[name as keyof T] === 'number' ? Number(value) : value } }),
    },
  }));

const transformAll = <T>(rawValues: Partial<AllString<T>>, valueType: AllString<T>) =>
  objectMap(rawValues, ([key, value]) => [
    key,
    valueType[key as keyof T] === 'number' ? Number(value) : value,
  ]) as Partial<T>;

export default createFormStore;
