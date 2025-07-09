import create from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface MemoPhotoStore {
  photos: string[];
  addPhotos: (newPhotos: string[]) => void;
  clearPhotos: () => void;
}

export const useMemoPhotoStore = create<MemoPhotoStore>()(
  persist(
    set => ({
      photos: [],
      addPhotos: newPhotos =>
        set(state => ({
          photos: [...state.photos, ...newPhotos].slice(0, 10),
        })),
      clearPhotos: () => set({ photos: [] }),
    }),
    {
      name: 'memo-photos',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
