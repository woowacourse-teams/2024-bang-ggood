import { create } from 'zustand';

interface OptionState {
  selectedOptions: number[];
  addOption: (option: number) => void;
  removeOption: (option: number) => void;
  isSelectedOption: (optionId: number) => boolean;
  setSelectedOptions: React.Dispatch<React.SetStateAction<number[]>>;
  isAllSelected: () => boolean;
  addAllOptions: () => void;
}

const useOptionStore = create<OptionState>((set, get) => ({
  selectedOptions: [],

  setSelectedOptions: (options: number[]) => set({ selectedOptions: options }),

  isSelectedOption: (optionId: number) => {
    const state = get();
    return state.selectedOptions.includes(optionId);
  },

  addAllOptions: () => {
    set(() => ({
      selectedOptions: Array.from({ length: 10 }, (_, i) => i + 1),
    }));
  },

  isAllSelected: () => {
    const state = get();
    return state.selectedOptions.length === 14;
  },

  addOption: option =>
    set(state => ({
      selectedOptions: [...state.selectedOptions, option],
    })),

  removeOption: option =>
    set(state => ({
      selectedOptions: state.selectedOptions.filter(o => o !== option),
    })),
}));

export default useOptionStore;
