import { act, renderHook } from '@testing-library/react';

import useRoomCompareStore from '@/store/useRoomCompareStore';

describe('useRoomCompareStore 테스트', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useRoomCompareStore());
    act(() => result.current.clear());
  });
  it('clear를 실행하면, rooms는 빈 Set이 된다.', () => {
    const { result } = renderHook(() => useRoomCompareStore());

    expect(result.current.rooms.size).toBe(0);
  });
  it('하나를 추가했을 때, rooms에 추가한 id가 추가된다.', () => {
    const { result } = renderHook(() => useRoomCompareStore());

    act(() => result.current.addRoom(2));

    expect(result.current.rooms.size).toBe(1);
  });
  it('2개 추가후 하나 삭제시, 삭제한 id는 rooms에서 제거된다.', () => {
    const { result } = renderHook(() => useRoomCompareStore());

    act(() => result.current.addRoom(3));
    act(() => result.current.addRoom(4));
    act(() => result.current.deleteRoom(3));

    expect(result.current.rooms).toEqual(new Set([4]));
  });
});
