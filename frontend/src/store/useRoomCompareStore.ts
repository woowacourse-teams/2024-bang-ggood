import { create } from 'zustand';

interface RoomCompareState {
  rooms: Set<number>;
  addRoom: (roomId: number) => void;
  deleteRoom: (roomId: number) => void;
  toggleRoom: (roomId: number) => void;
  clear: () => void;
}
const useRoomCompareStore = create<RoomCompareState>((set, get) => ({
  rooms: new Set(),
  addRoom: (roomId: number) => {
    set(state => ({
      rooms: state.rooms.add(roomId),
    }));
  },
  deleteRoom: (roomId: number) => {
    set(state => {
      state.rooms.delete(roomId);
      return state;
    });
  },
  clear: () => {
    set({
      rooms: new Set(),
    });
  },
  has: (roomId: number) => get().rooms.has(roomId),
  toggleRoom: (roomId: number) => {
    // TODO: addRoom, deleteRoom을 여기서도 사용하는 방법 찾기 (되어야 코드짧아짐)
    const isIncluded = get().rooms.has(roomId);
    if (!isIncluded) {
      set(({ rooms }) => ({
        rooms: rooms.add(roomId),
      }));
      return;
    }

    set(({ rooms }) => {
      rooms.delete(roomId);
      return {
        rooms,
      };
    });
  },
}));

export default useRoomCompareStore;
