// import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';
import { renderHook } from '@testing-library/react';
import { ChangeEvent } from 'react';

import { roomFormSpec } from '@/store/checklistRoomInfoStore';
import { createInputFieldStores } from '@/store/createFormStoreNew';

const stores = createInputFieldStores(roomFormSpec);
const makeEvent = (name: string, value: string) => ({ target: { name, value } }) as ChangeEvent<HTMLInputElement>;

describe('useChecklistBasicInfoStore 테스트', () => {
  beforeEach(() => {
    stores.resetAll();
  });
  

  describe('roomName', () => {
    it('20자 이하 입력 시 정상 입력된다.', () => {
      stores.onChange(makeEvent('roomName', '3'.repeat(20)));
      
      expect(stores.getByName('roomName').rawValue).toBe('3'.repeat(20));
      expect(stores.getByName('roomName').value).toBe('3'.repeat(20));
      expect(stores.getByName('roomName').errorMessage).toBe('');
    });

    it('20자 초과 입력 시 오류메시지가 발생한다.', () => {
      stores.onChange(makeEvent('roomName', '3'.repeat(20)));
      stores.onChange(makeEvent('roomName', '3'.repeat(21)));

      expect(stores.getByName('roomName').rawValue).toBe('3'.repeat(20));
      expect(stores.getByName('roomName').errorMessage).not.toBe('');
    });
  

  });
describe('보증금', () => {
    it('숫자 입력 후 빈 문자열을 설정할 경우(모두 지울 경우), 빈 문자열로 설정된다.', () => {
      stores.onChange(makeEvent('deposit', '112'));
      expect(stores.getByName('deposit').rawValue).toBe('112');

      stores.onChange(makeEvent('deposit', ''));
      expect(stores.getByName('deposit').rawValue).toBe('');
    });
  });
  describe('층수', () => {
    it('4. 을 입력해도 입력상태가 지워지지 않는다.', () => {
      stores.onChange(makeEvent('floor', '4.'));

      expect(stores.getByName('floor').rawValue).toBe('4.');
    });
  });
  describe('평수', () => {
    it('4를 입력할 수 있다.', () => {
      stores.onChange(makeEvent('size', '4'));

      expect(stores.getByName('size').rawValue).toBe('4');
      expect(stores.getByName('size').value).toBe(4);
      expect(stores.getByName('size').errorMessage).toBe('');
    });

    it('4. 을 입력해도 입력상태가 지워지지 않는다.', () => {
      stores.onChange(makeEvent('size', '4.'));

      expect(stores.getByName('size').rawValue).toBe('4.');
      expect(stores.getByName('size').errorMessage).toBe('');
    });

    it('4.1 입력시 정상 입력된다.', () => {
      stores.onChange(makeEvent('size', '4.1'));

      expect(stores.getByName('size').rawValue).toBe('4.1');
      expect(stores.getByName('size').value).toBe(4.1);
      expect(stores.getByName('size').errorMessage).toBe('');
    });

    it('훅 상황에서도 잘 동작한다.', async() => {
      
      const {result} = renderHook(()=>stores.useSelectedStore('roomName', state=>state))
      
      await result.current.actions.onChange(makeEvent('aa', '4.1'));

      await expect(result.current.rawValue).toBe('4.1');
      await expect(result.current.value).toBe('4.1');
      await expect(result.current.errorMessage).toBe('');
    });

    it('문자를 입력했을 때, 에러메시지가 발생하고 입력되지 않는다.', () => {
      stores.onChange(makeEvent('size', '4.1'));
      stores.onChange(makeEvent('size', '4.1e'));

      expect(stores.getByName('size').rawValue).toBe('4.1');
      expect(stores.getByName('size').value).toBe(4.1);
      expect(stores.getByName('size').errorMessage).not.toBe('');
    });
  });
 
  
});
