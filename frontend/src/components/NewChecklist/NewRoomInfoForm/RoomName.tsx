import React from 'react';
import { useStore } from 'zustand';

import FormField from '@/components/_common/FormField/FormField';
import useDefaultRoomName from '@/components/NewChecklist/NewRoomInfoForm/useDefaultRoomName';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';

const RoomName = () => {
  useDefaultRoomName();
  const actions = useStore(checklistRoomInfoStore, state => state.actions);
  const roomName = useStore(checklistRoomInfoStore, state => state.rawValue.roomName);
  const errorMessage = useStore(checklistRoomInfoStore, state => state.errorMessage.roomName);

  return (
    <FormField>
      <FormField.Label label="방 이름" htmlFor="roomName" required={true} />
      <FormField.Input placeholder="" onChange={actions.onChange} name="roomName" id="roomName" value={roomName} />
      <FormField.ErrorMessage value={errorMessage} />
    </FormField>
  );
};

export default React.memo(RoomName);
