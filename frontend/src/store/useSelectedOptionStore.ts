import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { DEFAULT_OPTIONS, OPTION_COUNT, OPTIONS } from '@/constants/options';

interface OptionAction {
  add: (option: number) => void;
  remove: (option: number) => void;
  set: (options: number[]) => void;
  reset: () => void;
  isSelectedOption: (optionId: number) => boolean;
  isAllSelected: () => boolean;
  addAllOptions: () => void;
  removeAll: () => void;
  getSelectedOptionsName: () => (string | undefined)[];
}
interface OptionState {
  selectedOptions: number[];
}

const useSelectedOptionStore = create<OptionState & { actions: OptionAction }>()(
  persist(
    (set, get) => ({
      selectedOptions: DEFAULT_OPTIONS,

      actions: {
        set: (options: number[]) => set({ selectedOptions: options }),
        reset: () => {
          set({ selectedOptions: DEFAULT_OPTIONS });
        },
        add: option =>
          set(state => ({
            selectedOptions: [...state.selectedOptions, option],
          })),

        isSelectedOption: optionId => get().selectedOptions.includes(optionId),

        remove: option =>
          set(state => ({
            selectedOptions: state.selectedOptions.filter(o => o !== option),
          })),

        getSelectedOptionsName: () => {
          const state = get();
          const optionsNames = state.selectedOptions.map(optionId => {
            const target = OPTIONS.find(option => option.id === optionId);
            return target?.displayName;
          });
          return optionsNames;
        },

        removeAll: () => {
          set({ selectedOptions: [] });
        },

        isAllSelected: () => {
          const state = get();
          return state.selectedOptions.length === OPTION_COUNT;
        },
        addAllOptions: () => {
          set(() => ({
            selectedOptions: Array.from({ length: OPTION_COUNT }, (_, i) => i + 1),
          }));
        },
      },
    }),
    {
      name: 'checklist-answer-option',
      getStorage: () => sessionStorage,
      partialize: state => ({
        selectedOptions: state.selectedOptions,
        // actions는 저장하지 않음
      }),
    },
  ),
);

export default useSelectedOptionStore;
