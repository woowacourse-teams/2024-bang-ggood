import { createStore } from 'zustand';

import { SubwayStation } from '@/types/subway';

interface States {
  nearSubwayStation: SubwayStation[];
  address: string;
}

interface Actions {
  set: <T extends keyof States>({ name, value }: { name: T; value: States[T] }) => void;
}

const roomInfoNonInputStore = createStore<States & { actions: Actions }>()(set => ({
  nearSubwayStation: [],
  address: '',
  actions: {
    set: ({ name, value }) => set({ [name]: value }),
  },
}));

export default roomInfoNonInputStore;
