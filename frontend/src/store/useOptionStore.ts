import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { DEFAULT_OPTIONS, OPTION_COUNT, OPTIONS } from '@/constants/options';

interface OptionState {
  selectedOptions: number[];
  addOption: (option: number) => void;
  removeOption: (option: number) => void;
  isSelectedOption: (optionId: number) => boolean;
  setSelectedOptions: (options: number[]) => void;
  isAllSelected: () => boolean;
  addAllOptions: () => void;
  removeAllOptions: () => void;
  resetToDefaultOptions: () => void;
  getSelectedOptionsName: () => (string | undefined)[];
}

const useOptionStore = create<OptionState>()(
  persist(
    (set, get) => ({
      selectedOptions: DEFAULT_OPTIONS,

      getSelectedOptionsName: () => {
        const state = get();
        const optionsNames = state.selectedOptions.map(optionId => {
          const target = OPTIONS.find(option => option.id === optionId);
          return target?.displayName;
        });
        return optionsNames;
      },

      resetToDefaultOptions: () => {
        set({ selectedOptions: DEFAULT_OPTIONS });
      },

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
        return state.selectedOptions.length === OPTION_COUNT;
      },
    }),
    {
      name: 'checklist-answer-option',
      partialize: state => ({
        selectedOptions: state.selectedOptions,
        // actions는 저장하지 않음
      }),
    },
  ),
);

export default useOptionStore;
