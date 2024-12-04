import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { User } from '@/types/user';

interface UserState {
  user: User;
  setUser: (user: User) => void;
}

const useUserStore = create<UserState>()(
  persist(
    set => ({
      user: {
        userId: 0,
        userName: '',
        userEmail: '',
        createdAt: '',
        userType: 'GUEST',
      },

      setUser: (newUser: User) => {
        set(() => ({ user: { ...newUser } }));
      },
    }),
    {
      name: 'user-info',
      partialize(state) {
        return { user: state.user };
      },
    },
  ),
);

export default useUserStore;
