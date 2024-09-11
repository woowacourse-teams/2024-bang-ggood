import { createStore } from 'zustand';

const initialValue: number[] = [];

interface IncludedMaintenances {
  value: number[];
}

interface Action {
  actions: {
    set: (a: number[]) => void;
    reset: () => void;
    toggle: (id: number) => void;
    includes: (id: number) => boolean;
    add: (id: number) => void;
    remove: (id: number) => void;
  };
}

const checklistIncludedMaintenancesStore = createStore<IncludedMaintenances & Action>((set, get) => ({
  value: initialValue,
  actions: {
    set: a => set({ value: a }),
    reset: () => set({ value: initialValue }),
    toggle: id => {
      if (get().actions.includes(id)) {
        get().actions.remove(id);
        return;
      }
      get().actions.add(id);
    },
    includes: id => get().value.includes(id),
    add: id => {
      const ids = get().value;
      ids.push(id);
      set({ value: ids.slice() });
    },
    remove: id => set({ value: get().value.filter(i => i !== id) }),
  },
}));

export default checklistIncludedMaintenancesStore;
