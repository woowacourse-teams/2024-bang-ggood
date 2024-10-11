// import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';
import { act, renderHook } from '@testing-library/react';
import { ChangeEvent } from 'react';
import { useStore } from 'zustand';

import { roomFormSpec } from '@/store/checklistRoomInfoStore';
import { createFormFieldStores } from '@/store/createFormFieldStores';

const { resetAll, onChange, ...stores } = createFormFieldStores(roomFormSpec);
const makeEvent = (name: string, value: string) => ({ target: { name, value } }) as ChangeEvent<HTMLInputElement>;

describe('useChecklistBasicInfoStore 테스트', () => {
  beforeEach(() => {
    resetAll();
  });

  describe('roomName', () => {
    it('20자 이하 입력 시 정상 입력된다.', () => {
      onChange(makeEvent('roomName', '3'.repeat(20)));

      expect(stores.roomName.getState().rawValue).toBe('3'.repeat(20));
      expect(stores.roomName.getState().value).toBe('3'.repeat(20));
      expect(stores.roomName.getState().errorMessage).toBe('');
    });

    it('20자 초과 입력 시 오류메시지가 발생한다.', () => {
      onChange(makeEvent('roomName', '3'.repeat(20)));
      onChange(makeEvent('roomName', '3'.repeat(21)));

      expect(stores.roomName.getState().rawValue).toBe('3'.repeat(20));
      expect(stores.roomName.getState().errorMessage).not.toBe('');
    });
  });
  describe('보증금', () => {
    it('숫자 입력 후 빈 문자열을 설정할 경우(모두 지울 경우), 빈 문자열로 설정된다.', () => {
      onChange(makeEvent('deposit', '112'));
      expect(stores.deposit.getState().rawValue).toBe('112');

      onChange(makeEvent('deposit', ''));
      expect(stores.deposit.getState().rawValue).toBe('');
    });
  });
  describe('층수', () => {
    it('4. 을 입력해도 입력상태가 지워지지 않는다.', () => {
      onChange(makeEvent('floor', '4.'));

      expect(stores.floor.getState().rawValue).toBe('4.');
    });
  });
  describe('평수', () => {
    it('4를 입력할 수 있다.', () => {
      onChange(makeEvent('size', '4'));

      expect(stores.size.getState().rawValue).toBe('4');
      expect(stores.size.getState().value).toBe(4);
      expect(stores.size.getState().errorMessage).toBe('');
    });

    it('4. 을 입력해도 입력상태가 지워지지 않는다.', () => {
      onChange(makeEvent('size', '4.'));

      expect(stores.size.getState().rawValue).toBe('4.');
      expect(stores.size.getState().errorMessage).toBe('');
    });

    it('4.1 입력시 정상 입력된다.', () => {
      onChange(makeEvent('size', '4.1'));

      expect(stores.size.getState().rawValue).toBe('4.1');
      expect(stores.size.getState().value).toBe(4.1);
      expect(stores.size.getState().errorMessage).toBe('');
    });

    it('훅 상황에서도 잘 동작한다.', () => {
      const { result } = renderHook(() => useStore(stores.roomName));

      act(() => result.current.actions.onChange(makeEvent('aa', '4.1')));

      expect(result.current.rawValue).toBe('4.1');
      expect(result.current.value).toBe('4.1');
      expect(result.current.errorMessage).toBe('');
    });

    it('문자를 입력했을 때, 에러메시지가 발생하고 입력되지 않는다.', () => {
      onChange(makeEvent('size', '4.1'));
      onChange(makeEvent('size', '4.1e'));

      expect(stores.size.getState().rawValue).toBe('4.1');
      expect(stores.size.getState().value).toBe(4.1);
      expect(stores.size.getState().errorMessage).not.toBe('');
    });
  });
});
