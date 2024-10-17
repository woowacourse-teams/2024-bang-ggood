import { create } from 'zustand';

import useGetChecklistListQuery from '@/hooks/query/useGetChecklistListQuery';

interface IsLikeFilterEnabledState {
  isEnabled: boolean;
  actions: {
    toggle: () => void;
  };
}
export const useLikeFilterStore = create<IsLikeFilterEnabledState>((set, get) => ({
  isEnabled: false,
  actions: { toggle: () => set({ isEnabled: !get().isEnabled }) },
}));

const useGetChecklistList = () => {
  const {
    isEnabled,
    actions: { toggle },
  } = useLikeFilterStore();
  return { ...useGetChecklistListQuery(isEnabled), isEnabled, toggle };
};

export default useGetChecklistList;
