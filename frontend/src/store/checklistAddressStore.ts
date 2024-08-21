import { createStore } from 'zustand';

interface AddressState {
  address: string;
  buildingName: string;
  position: { lat: number; lon: number };
  setAddress: (add: string) => void;
  setBuildingName: (add: string) => void;
}

const checklistAddressStore = createStore<AddressState>(set => ({
  address: '',
  buildingName: '',
  position: { lat: 0, lon: 0 },

  setAddress: (newAddress: string) => {
    set({ address: newAddress });
  },
  setBuildingName: (newAddress: string) => {
    set({ buildingName: newAddress });
  },
}));

export default checklistAddressStore;
