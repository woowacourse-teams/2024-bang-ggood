import { useEffect } from 'react';
import { useStore } from 'zustand';

import useGetChecklistListQuery from '@/hooks/query/useGetChecklistListQuery';
import checklistRoomInfoStore, { initialRoomInfo } from '@/store/checklistRoomInfoStore';

const useDefaultRoomName = () => {
  const actions = useStore(checklistRoomInfoStore, state => state.actions);
  const roomName = useStore(checklistRoomInfoStore, state => state.rawValue.roomName);

  const { data: checklistList } = useGetChecklistListQuery();

  // 처음에 빈문자열 설정은 폼에도 적용.
  useEffect(() => {
    if (!checklistList) return;
    if (roomName !== initialRoomInfo.roomName) return;

    const count = checklistList.filter(
      checklist => new Date(checklist.createdAt).getUTCDay() === new Date().getUTCDay(),
    ).length;

    const date = new Date();
    actions.set('roomName', `${date.getMonth() + 1}월 ${date.getDate()}일 ${count}번째 방`);
  }, [checklistList]);

  // 그이후부터는 폼은 안건드리고, 내부 value에만 적용
  useEffect(() => {
    if (!checklistList) return;
    if (roomName !== initialRoomInfo.roomName) return;

    const count = checklistList.filter(
      checklist => new Date(checklist.createdAt).getUTCDay() === new Date().getUTCDay(),
    ).length;

    const date = new Date();
    actions.setValueForced('roomName', `${date.getMonth() + 1}월 ${date.getDate()}일 ${count}번째 방`);
  }, [checklistList, roomName]);
};

export default useDefaultRoomName;
