import { useStore } from 'zustand';

import FormField from '@/components/_common/FormField/FormField';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';

const RoomName = () => {
  const actions = useStore(checklistRoomInfoStore, state => state.actions);
  const roomName = useStore(checklistRoomInfoStore, state => state.rawValue.roomName);
  const errorMessage = useStore(checklistRoomInfoStore, state => state.errorMessage.roomName);

  return (
    <FormField>
      <FormField.Label label="방 이름" required={true} />
      <FormField.Input placeholder="" onChange={actions.onChange} name="roomName" value={roomName} />
      <FormField.ErrorMessage value={errorMessage} />
    </FormField>
  );
};

export default RoomName;
