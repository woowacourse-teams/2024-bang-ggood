import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';

const store = checklistRoomInfoStore;
describe('useChecklistBasicInfoStore 테스트', () => {
  beforeEach(() => {
    store.getState().actions.reset();
  });

  it('모든 변수의 초기값은 undefined이다.', () => {
    expect(store.getState()).toEqual(store.getInitialState());
  });

  describe('roomName', () => {});
  it('', () => {
    store.getState().actions.update('roomName', '3');

    expect(store.getState().roomName).toBe('3');
  });

  it('20자 이하 입력 시 정상 입력된다.', () => {
    store.getState().actions.setRoomName('3'.repeat(20));

    expect(store.getState().roomName).toBe('3'.repeat(20));
    expect(store.getState().E_roomName).toBe('');
  });

  it('20자 초과 입력 시 오류메시지가 발생한다.', () => {
    store.getState().actions.setRoomName('3'.repeat(25));

    expect(store.getState().roomName).toBe(undefined);
    expect(store.getState().E_roomName).not.toBe('');
  });
});
