
import { useStore } from 'zustand';

import FormField from '@/components/_common/FormField/FormField';
import { checklistRoomInfostores } from '@/store/checklistRoomInfoStoreTwo';

const RoomName = () => {
  const {actions, rawValue:roomName, errorMessage}=useStore(checklistRoomInfostores.findByName('roomName'));
  
  return (
    <FormField>
      <FormField.Label label="방 이름" required={true} />
      <FormField.Input placeholder="" onChange={actions.onChange} name="roomName" value={roomName} />
      <FormField.ErrorMessage value={errorMessage ?? ''} />
    </FormField>
  );
};

export default RoomName;
