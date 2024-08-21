import { useEffect } from 'react';
import { useStore } from 'zustand';

import FormField from '@/components/_common/FormField/FormField';
import useGetChecklistListQuery from '@/hooks/query/useGetChecklistListQuery';
import checklistRoomInfoStore, { initialRoomInfo } from '@/store/checklistRoomInfoStore';

const RoomName = () => {
  const actions = useStore(checklistRoomInfoStore, state => state.actions);
  const roomName = useStore(checklistRoomInfoStore, state => state.rawValue.roomName);
  const errorMessage = useStore(checklistRoomInfoStore, state => state.errorMessage.roomName);

  const { data: checklistList } = useGetChecklistListQuery();

  useEffect(() => {
    if (!checklistList) return;
    const count = checklistList.filter(
      checklist => new Date(checklist.createdAt).getUTCDay() === new Date().getUTCDay(),
    ).length;
    if (roomName !== initialRoomInfo.roomName) return;
    const date = new Date();
    actions.set('roomName', `${date.getMonth()}월 ${date.getDay()}일 ${count + 1}번째 방`);
  }, [checklistList]);

  return (
    <FormField>
      <FormField.Label label="방 이름" required={true} />
      <FormField.Input placeholder="" onChange={actions.onChange} name="roomName" value={roomName} />
      <FormField.ErrorMessage value={errorMessage ?? ''} />
    </FormField>
  );
};

export default RoomName;
