import { create } from 'zustand';

interface OptionState {
  selectedOptions: number[];
  addOption: (option: number) => void;
  removeOption: (option: number) => void;
  isSelectedOption: (optionId: number) => boolean;
  setSelectedOptions: React.Dispatch<React.SetStateAction<number[]>>;
  isAllSelected: () => boolean;
  addAllOptions: () => void;
  removeAllOptions: () => void;
}

const OPTION_COUNT = 14;

const useOptionStore = create<OptionState>((set, get) => ({
  selectedOptions: [],

  setSelectedOptions: (options: number[]) => set({ selectedOptions: options }),

  isSelectedOption: optionId => get().selectedOptions.includes(optionId),

  addOption: option =>
    set(state => ({
      selectedOptions: [...state.selectedOptions, option],
    })),

  removeOption: option =>
    set(state => ({
      selectedOptions: state.selectedOptions.filter(o => o !== option),
    })),

  addAllOptions: () => {
    set(() => ({
      selectedOptions: Array.from({ length: OPTION_COUNT }, (_, i) => i + 1),
    }));
  },

  removeAllOptions: () => {
    set({ selectedOptions: [] });
  },

  isAllSelected: () => {
    const state = get();
    return state.selectedOptions.length === 14;
  },
}));

export default useOptionStore;
