import { createStore } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Position } from '@/types/address';
import { SubwayStation } from '@/types/subway';

interface States {
  nearSubwayStation: SubwayStation[];

  position: Position;
}

interface Actions {
  set: <T extends keyof States>(name: T, value: States[T]) => void;
  resetAll: () => void;
}

const defaultStates = {
  nearSubwayStation: [],
  position: { latitude: null, longitude: null },
};

const roomInfoNonValidatedStore = createStore<States & { actions: Actions }>()(
  persist(
    set => ({
      ...defaultStates,
      actions: {
        set: (name, value) => set({ [name]: value }),
        resetAll: () => set(defaultStates),
      },
    }),
    {
      name: 'roomInfo-nonvalidated',
      storage: createJSONStorage(() => sessionStorage),
      partialize: store => {
        const { actions: _, ...state } = store;
        return { ...state };
      },
    },
  ),
);

export default roomInfoNonValidatedStore;
