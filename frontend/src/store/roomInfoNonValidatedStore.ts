import { createStore } from 'zustand';

import { SubwayStation } from '@/types/subway';

interface States {
  nearSubwayStation: SubwayStation[];
  address: string;
  buildingName: string;
}

interface Actions {
  set: <T extends keyof States>(name: T, value: States[T]) => void;
  resetAll: () => void;
}

const defaultStates = {
  nearSubwayStation: [],
  address: '',
  buildingName: '',
};

const roomInfoNonValidatedStore = createStore<States & { actions: Actions }>()(set => ({
  ...defaultStates,
  actions: {
    set: (name, value) => set({ [name]: value }),
    resetAll: () => set(defaultStates),
  },
}));

export default roomInfoNonValidatedStore;
