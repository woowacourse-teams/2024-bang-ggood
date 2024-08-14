import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';

const store = checklistRoomInfoStore;
describe('useChecklistBasicInfoStore 테스트', () => {
  beforeEach(() => {
    store.getState().actions.reset();
  });

  it('모든 변수의 초기값은 undefined이다.', () => {
    expect(store.getState()).toEqual(store.getInitialState());
  });

  describe('roomName', () => {
    it('20자 이하 입력 시 정상 입력된다.', () => {
      store.getState().actions.set('roomName', '3'.repeat(20));

      expect(store.getState().roomInfo.roomName).toBe('3'.repeat(20));
      expect(store.getState().errorMessage.roomName).toBe('');
    });

    it('20자 초과 입력 시 오류메시지가 발생한다.', () => {
      store.getState().actions.set('roomName', '3'.repeat(25));

      expect(store.getState().roomInfo.roomName).toBe('8월 14일 1번째 방');
      expect(store.getState().errorMessage.roomName).not.toBe('');
    });
  });
  describe('보증금', () => {
    it('숫자 입력 후 빈 문자열을 설정할 경우(모두 지울 경우), 빈 문자열로 설정된다.', () => {
      store.getState().actions.set('deposit', 112);
      expect(store.getState().roomInfo.deposit).toBe(112);

      store.getState().actions.set('deposit', '');
      expect(store.getState().roomInfo.deposit).toBe('');
    });
  });
});
