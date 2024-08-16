import { createStore } from 'zustand';

import { Position } from '@/types/address';

interface AddressState {
  address: string;
  buildingName: string;
  jibunAddress: string;
  position: Position;
  setAddress: (add: string) => void;
  setJibunAddress: (add: string) => void;
  setBuildingName: (add: string) => void;
}

const useOptionStore = createStore<AddressState>(set => ({
  address: '',
  buildingName: '',
  jibunAddress: '',
  position: { lat: 0, lon: 0 },
  setAddress: (newAddress: string) => {
    set({ address: newAddress });
  },
  setJibunAddress: (newAddress: string) => {
    set({ jibunAddress: newAddress });
  },
  setBuildingName: (newAddress: string) => {
    set({ buildingName: newAddress });
  },
}));

export default useOptionStore;
