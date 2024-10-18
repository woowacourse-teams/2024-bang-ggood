import { create } from 'zustand';

import useGetChecklistListQuery from '@/hooks/query/useGetChecklistListQuery';

interface IsLikeFilterEnabledState {
  isLikeFiltered: boolean;
  actions: {
    toggle: () => void;
  };
}
export const useLikeFilterStore = create<IsLikeFilterEnabledState>((set, get) => ({
  isLikeFiltered: false,
  actions: { toggle: () => set({ isLikeFiltered: !get().isLikeFiltered }) },
}));

const useGetChecklistList = () => {
  const {
    isLikeFiltered,
    actions: { toggle },
  } = useLikeFilterStore();
  return { ...useGetChecklistListQuery(isLikeFiltered), isLikeFiltered, toggle };
};

export default useGetChecklistList;
