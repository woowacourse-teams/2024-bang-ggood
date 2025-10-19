import { createStore } from 'zustand';

interface Store {
  selectedIds: number[];
  toggleSelectedId: (id: number) => void;
}

export const selectedIdsStore = createStore<Store>((set, get) => ({
  selectedIds: [],
  toggleSelectedId: (id: number) => {
    const ids = get().selectedIds;
    set({ selectedIds: ids.includes(id) ? ids.filter(id0 => id0 !== id) : [...ids, id] });
  },
}));
