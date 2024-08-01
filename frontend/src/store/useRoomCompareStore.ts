import { create } from 'zustand';

interface RoomCompareState {
  rooms: Set<number>;
  addRoom: (roomId: number) => void;
  deleteRoom: (roomId: number) => void;
  toggleRoom: (roomId: number) => void;
  has: (roomId: number) => boolean;
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
    const { addRoom, deleteRoom, has } = get();
    if (has(roomId)) {
      deleteRoom(roomId);
      return;
    }
    addRoom(roomId);
  },
}));

export default useRoomCompareStore;
