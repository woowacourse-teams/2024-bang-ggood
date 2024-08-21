import { useEffect } from 'react';
import { useStore } from 'zustand';

import useGetChecklistListQuery from '@/hooks/query/useGetChecklistListQuery';
import checklistRoomInfoStore, { initialRoomInfo } from '@/store/checklistRoomInfoStore';

const useDefaultRoomName = () => {
  const actions = useStore(checklistRoomInfoStore, state => state.actions);
  const roomName = useStore(checklistRoomInfoStore, state => state.rawValue.roomName);

  const { data: checklistList } = useGetChecklistListQuery();

  useEffect(() => {
    if (!checklistList) return;

    const count = checklistList.filter(
      checklist => new Date(checklist.createdAt).getUTCDay() === new Date().getUTCDay(),
    ).length;

    if (roomName !== initialRoomInfo.roomName) return;

    const date = new Date();
    actions.set('roomName', `${date.getMonth() + 1}월 ${date.getDate()}일 ${count}번째 방`);
  }, [checklistList]);
};

export default useDefaultRoomName;
