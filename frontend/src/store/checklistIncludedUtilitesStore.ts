import { createStore } from 'zustand';

import { IncludedUtilities } from '@/types/room';

const initialValue: IncludedUtilities = {
  water: false,
  electricity: false,
  internet: false,
  gas: false,
};

interface Action {
  actions: {
    set: (a: IncludedUtilities) => void;
    reset: () => void;
    toggle: (name: keyof IncludedUtilities) => void;
  };
}

const checklistIncludedUtilitiesStore = createStore<IncludedUtilities & Action>((set, get) => ({
  ...initialValue,
  actions: {
    set: a => set(a),
    reset: () => set(initialValue),
    toggle: name => set({ [name]: !get()[name] }),
  },
}));
export default checklistIncludedUtilitiesStore;
