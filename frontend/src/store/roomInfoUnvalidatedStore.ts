import { createStore } from 'zustand';

import { SubwayStation } from '@/types/subway';

interface States {
  nearSubwayStation: SubwayStation[];
  address: string;
  buildingName: string;
}

interface Actions {
  set: <T extends keyof States>(name: T, value: States[T]) => void;
}

const roomInfoUnvalidatedStore = createStore<States & { actions: Actions }>()(set => ({
  nearSubwayStation: [],
  address: '',
  buildingName: '',
  actions: {
    set: (name, value) => set({ [name]: value }),
  },
}));

export default roomInfoUnvalidatedStore;
