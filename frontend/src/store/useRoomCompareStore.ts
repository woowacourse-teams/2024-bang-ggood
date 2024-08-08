import { create } from 'zustand';

interface RoomCompareState {
  rooms: Set<number>;
  addRoom: (roomId: number) => void;
  deleteRoom: (roomId: number) => void;
  toggleRoom: (roomId: number) => void;
  hasRoom: (roomId: number) => boolean;
  clear: () => void;
}

const useRoomCompareStore = create<RoomCompareState>((set, get) => ({
  rooms: new Set(),
  addRoom: (roomId: number) => {
    set(state => {
      state.rooms = state.rooms.add(roomId);
      return { ...state, rooms: state.rooms };
    });
  },
  deleteRoom: (roomId: number) => {
    set(state => {
      state.rooms.delete(roomId);
      return { ...state, rooms: new Set(state.rooms) };
    });
  },
  clear: () => {
    set({
      rooms: new Set(),
    });
  },
  hasRoom: (roomId: number) => get().rooms.has(roomId),
  toggleRoom: (roomId: number) => {
    const { addRoom, deleteRoom, hasRoom: has } = get();

    if (has(roomId)) {
      deleteRoom(roomId);
      return;
    }
    addRoom(roomId);
  },
}));

export default useRoomCompareStore;
