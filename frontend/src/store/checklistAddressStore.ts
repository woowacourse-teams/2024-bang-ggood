import { createStore } from 'zustand';

import { DEFAULT_POSITION } from '@/constants/map';
import { Position } from '@/types/address';

interface AddressState {
  address: string;
  buildingName: string;
  position: Position;
  setAddress: (add: string) => void;
  setBuildingName: (add: string) => void;
  setPosition: (position: Position) => void;
}

const checklistAddressStore = createStore<AddressState>(set => ({
  address: '',
  buildingName: '',
  position: DEFAULT_POSITION,

  setAddress: (newAddress: string) => {
    set({ address: newAddress });
  },
  setBuildingName: (newAddress: string) => {
    set({ buildingName: newAddress });
  },
  setPosition: (position: Position) => {
    set({ position });
  },
}));

export default checklistAddressStore;
