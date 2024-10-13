import { renderHook } from '@testing-library/react';
import { act } from 'react';

import useValidatedStore, { initialRoomInfo, newRoomInfoStore } from '@/store/newRoomInfoStore';
import { InputChangeEvent } from '@/types/event';

const makeChangeEvent = (rawValue: string) => ({ target: { value: rawValue } }) as InputChangeEvent;
describe('새 스토어 테스트', () => {
  it('store의 초기값이 잘 형성된다.', () => {
    const { actions: _, ...roomInfo } = { ...newRoomInfoStore.getState() };
    expect(roomInfo).toEqual(initialRoomInfo);
  });

  it('입력 변경이 잘 작동한다.', () => {
    const { result } = renderHook(() => useValidatedStore('roomName'));

    act(() => result.current.onChange(makeChangeEvent('aa')));
    expect(result.current.rawValue).toBe('aa');
  });

  it('roomName은 21자 이상의 입력은 방지한다', () => {
    const { result: roomName } = renderHook(() => useValidatedStore('floor'));
    expect(roomName.current.rawValue).toBe('');

    act(() => roomName.current.onChange(makeChangeEvent('a'.repeat(21))));

    expect(roomName.current.rawValue).toBe('');
    expect(roomName.current.errorMessage.length > 0).toBe(true);
  });

  it('deposit은 숫자형이 아닌 입력이 들어왔을 때 입력을 방지한다.', () => {
    const { result: deposit } = renderHook(() => useValidatedStore('deposit'));
    expect(deposit.current.rawValue).toBe('');

    act(() => deposit.current.onChange(makeChangeEvent('ab')));

    expect(deposit.current.rawValue).toBe('');
    expect(deposit.current.errorMessage.length > 0).toBe(true);
  });
});
