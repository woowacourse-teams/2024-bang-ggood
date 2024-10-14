import { useEffect } from 'react';

import useGetChecklistListQuery from '@/hooks/query/useGetChecklistListQuery';
import useRoomInfoValidated from '@/hooks/useRoomInfoValidated';
import { initialRoomInfo } from '@/store/newRoomInfoStore';

const useDefaultRoomName = () => {
  const roomName = useRoomInfoValidated('roomName');

  const { data: checklistList } = useGetChecklistListQuery();

  // 처음에 빈문자열 설정은 폼에도 적용.
  useEffect(() => {
    if (!checklistList) return;
    if (roomName !== initialRoomInfo.roomName) return;

    const count = checklistList.filter(
      checklist => new Date(checklist.createdAt).getUTCDay() === new Date().getUTCDay(),
    ).length;

    const date = new Date();
    roomName.set(`${date.getMonth() + 1}월 ${date.getDate()}일 ${count}번째 방`);
  }, [checklistList]);

  // value를 직접건드려서 N번째방 value 넣어주던 로직지웠음.
};

export default useDefaultRoomName;
