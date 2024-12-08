import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { User } from '@/types/user';

interface UserState {
  user: User;
  setUser: (user: User) => void;
  reset: () => void;
}

const initialUser: User = {
  userId: 0,
  userName: '',
  userEmail: '',
  createdAt: '',
  userType: 'GUEST',
};

const useUserStore = create<UserState>()(
  persist(
    set => ({
      user: { ...initialUser },

      setUser: (newUser: User) => {
        set(() => ({ user: { ...newUser } }));
      },

      reset: () => {
        set(() => ({ user: { ...initialUser } }));
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
