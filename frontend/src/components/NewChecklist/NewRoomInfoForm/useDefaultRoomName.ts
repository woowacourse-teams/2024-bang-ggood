import { useEffect } from 'react';

import useGetChecklistListQuery from '@/hooks/query/useGetChecklistListQuery';
import useRoomInfoValidated from '@/hooks/useRoomInfoValidated';
import { initialRoomInfo } from '@/store/roomInfoStore';

const useDefaultRoomName = () => {
  const roomName = useRoomInfoValidated('roomName');
  const { data: checklistList } = useGetChecklistListQuery();

  // 처음에 빈문자열 설정은 폼에도 적용.
  useEffect(() => {
    if (!checklistList) return;
    if (roomName.rawValue !== initialRoomInfo.roomName.rawValue) return;
    const count = checklistList.filter(
      checklist => new Date(checklist.createdAt).getUTCDay() === new Date().getUTCDay(),
    ).length;

    const date = new Date();
    roomName.set(`${date.getMonth() + 1}월 ${date.getDate()}일 ${count}번째 방`);
  }, [checklistList]);
};

export default useDefaultRoomName;
