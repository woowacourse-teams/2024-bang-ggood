import { createStore } from 'zustand';

import { DEFAULT_POSITION } from '@/constants/map';
import { Position } from '@/types/address';
import { SubwayStation } from '@/types/subway';

interface States {
  nearSubwayStation: SubwayStation[];
  address: string;
  buildingName: string;
  position: Position;
}

interface Actions {
  set: <T extends keyof States>(name: T, value: States[T]) => void;
  resetAll: () => void;
}

const defaultStates = {
  nearSubwayStation: [],
  address: '',
  buildingName: '',
  position: DEFAULT_POSITION,
};

const roomInfoNonValidatedStore = createStore<States & { actions: Actions }>()(set => ({
  ...defaultStates,
  actions: {
    set: (name, value) => set({ [name]: value }),
    resetAll: () => set(defaultStates),
  },
}));

export default roomInfoNonValidatedStore;
