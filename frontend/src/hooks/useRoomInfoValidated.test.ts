import { renderHook } from '@testing-library/react';
import { act } from 'react';

import useRoomInfoValidated from '@/hooks/useRoomInfoValidated';
import { initialRoomInfo, roomInfoStore } from '@/store/roomInfoStore';
import { InputChangeEvent } from '@/types/event';

const makeEvent = (rawValue: string) => ({ target: { value: rawValue } }) as InputChangeEvent;
describe('새 스토어 테스트', () => {
  beforeEach(() => {
    roomInfoStore.getState().actions.reset();
  });
  it('store의 초기값이 잘 형성된다.', () => {
    const { actions: _, ...roomInfo } = { ...roomInfoStore.getState() };
    expect(roomInfo).toEqual(initialRoomInfo);
  });
  it('입력 변경이 작동한다.', () => {
    const { result } = renderHook(() => useRoomInfoValidated('roomName'));

    act(() => result.current.onChange(makeEvent('aa')));
    expect(result.current.rawValue).toBe('aa');
  });

  describe('roomName', () => {
    it('20자 이하 입력시 정삭 입력된다.', () => {
      const { result: roomName } = renderHook(() => useRoomInfoValidated('roomName'));

      act(() => roomName.current.onChange(makeEvent('a'.repeat(20))));

      expect(roomName.current.rawValue).toBe('a'.repeat(20));
      expect(roomName.current.errorMessage).toBe('');
    });
    it('roomName은 21자 이상의 입력은 방지한다', () => {
      const { result: roomName } = renderHook(() => useRoomInfoValidated('roomName'));
      expect(roomName.current.rawValue).toBe('');

      act(() => roomName.current.onChange(makeEvent('a'.repeat(21))));

      expect(roomName.current.rawValue).toBe('');
      expect(roomName.current.errorMessage.length > 0).toBe(true);
    });
  });

  describe('보증금', () => {
    it('숫자형이 아닌 입력이 들어왔을 때 입력을 방지한다.', () => {
      const { result: deposit } = renderHook(() => useRoomInfoValidated('deposit'));
      expect(deposit.current.rawValue).toBe('');

      act(() => deposit.current.onChange(makeEvent('ab')));

      expect(deposit.current.rawValue).toBe('');
      expect(deposit.current.errorMessage).not.toBe('');
    });

    it('숫자 입력 후 빈 문자열을 설정할 경우(모두 지울 경우), 빈 문자열로 설정된다.', () => {
      const { result: deposit } = renderHook(() => useRoomInfoValidated('deposit'));
      expect(deposit.current.rawValue).toBe('');

      act(() => deposit.current.onChange(makeEvent('112')));
      expect(deposit.current.rawValue).toBe('112');

      act(() => deposit.current.onChange(makeEvent('')));
      expect(deposit.current.rawValue).toBe('');
    });
  });

  describe('층수', () => {
    it('소수점을 포함해 입력("4.")해도 정상 입력된다.', () => {
      const { result: floor } = renderHook(() => useRoomInfoValidated('floor'));

      act(() => floor.current.onChange(makeEvent('4.')));

      expect(floor.current.rawValue).toBe('4.');
      expect(floor.current.errorMessage).toBe('');
    });
  });
  describe('방 크기', () => {
    it('소수("4.1")을 입력해도 정상 입력된다.', () => {
      const { result: size } = renderHook(() => useRoomInfoValidated('size'));

      act(() => size.current.onChange(makeEvent('4.1')));

      expect(size.current.rawValue).toBe('4.1');
      expect(size.current.errorMessage).toBe('');
    });
  });
});
