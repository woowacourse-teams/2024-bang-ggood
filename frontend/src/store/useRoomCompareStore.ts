import { create } from 'zustand';

interface RoomCompareState {
  rooms: Set<number>;
  addRoom: (roomId: number) => void;
  deleteRoom: (roomId: number) => void;
  clear: () => void;
}
const useRoomCompareStore = create<RoomCompareState>(set => ({
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
}));

export default useRoomCompareStore;
