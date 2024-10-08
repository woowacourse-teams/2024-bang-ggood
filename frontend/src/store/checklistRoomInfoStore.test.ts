import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';
import { InputChangeEvent } from '@/types/event';

const store = checklistRoomInfoStore;
const makeEvent = (name: string, value: string) => ({ target: { name, value } }) as InputChangeEvent;

describe('useChecklistBasicInfoStore 테스트', () => {
  beforeEach(() => {
    store.getState().actions.resetAll();
  });

  it('모든 변수의 초기값이 적용된다.', () => {
    expect(store.getState()).toEqual(store.getInitialState());
  });

  describe('방 이름', () => {
    it('20자 이하 입력 시 정상 입력된다.', () => {
      store.getState().actions.onChange(makeEvent('roomName', '3'.repeat(20)));

      expect(store.getState().rawValue.roomName).toBe('3'.repeat(20));
      expect(store.getState().value.roomName).toBe('3'.repeat(20));
      expect(store.getState().errorMessage.roomName).toBe('');
    });

    it('20자 초과 입력 시 오류메시지가 발생한다.', () => {
      store.getState().actions.onChange(makeEvent('roomName', '3'.repeat(20)));
      store.getState().actions.onChange(makeEvent('roomName', '3'.repeat(21)));

      expect(store.getState().rawValue.roomName).toBe('3'.repeat(20));
      expect(store.getState().errorMessage.roomName).not.toBe('');
    });
  });

  describe('보증금', () => {
    it('숫자 입력 후 빈 문자열을 설정할 경우(모두 지울 경우), 빈 문자열로 설정된다.', () => {
      store.getState().actions.onChange(makeEvent('deposit', '112'));
      expect(store.getState().rawValue.deposit).toBe('112');

      store.getState().actions.onChange(makeEvent('deposit', ''));
      expect(store.getState().rawValue.deposit).toBe('');
    });
  });

  describe('관리비', () => {
    it('관리비 입력 필드에는 숫자만 입력 가능하다.', () => {
      store.getState().actions.onChange(makeEvent('maintenanceFee', '관리비'));
      expect(store.getState().rawValue.maintenanceFee).toBe('');

      store.getState().actions.onChange(makeEvent('maintenanceFee', '123'));
      expect(store.getState().rawValue.maintenanceFee).toBe('123');
    });
  });

  describe('관리비 포함 항목', () => {
    it('선택한 관리비 항목 종류만을 가지고 있는다.', () => {
      store.getState().actions.set('includedMaintenances', [1]);
      expect(store.getState().value.includedMaintenances).toStrictEqual([1]);

      store.getState().actions.set('includedMaintenances', [1, 2]);
      expect(store.getState().value.includedMaintenances).toStrictEqual([1, 2]);
    });
  });

  describe('층수', () => {
    it('4. 을 입력해도 입력상태가 지워지지 않는다.', () => {
      store.getState().actions.onChange(makeEvent('floor', '4.'));

      expect(store.getState().rawValue.floor).toBe('4.');
    });
  });

  describe('평수', () => {
    it('4를 입력할 수 있다.', () => {
      store.getState().actions.onChange(makeEvent('size', '4'));

      expect(store.getState().rawValue.size).toBe('4');
      expect(store.getState().value.size).toBe(4);
      expect(store.getState().errorMessage.size).toBe('');
    });

    it('4. 을 입력해도 입력상태가 지워지지 않는다.', () => {
      store.getState().actions.onChange(makeEvent('size', '4.'));

      expect(store.getState().rawValue.size).toBe('4.');
      expect(store.getState().errorMessage.size).toBe('');
    });

    it('4.1 입력시 정상 입력된다.', () => {
      store.getState().actions.onChange(makeEvent('size', '4.1'));

      expect(store.getState().rawValue.size).toBe('4.1');
      expect(store.getState().value.size).toBe(4.1);
      expect(store.getState().errorMessage.size).toBe('');
    });

    it('문자를 입력했을 때, 에러메시지가 발생하고 입력되지 않는다.', () => {
      store.getState().actions.onChange(makeEvent('size', '4.1'));
      store.getState().actions.onChange(makeEvent('size', '4.1e'));

      expect(store.getState().rawValue.size).toBe('4.1');
      expect(store.getState().value.size).toBe(4.1);
      expect(store.getState().errorMessage.size).not.toBe('');
    });
  });
});
