import React from 'react';

import FormField from '@/components/_common/FormField/FormField';
import useRoomInfoValidated from '@/hooks/useRoomInfoValidated';

const RoomNameDefault = () => {
  const roomName = useRoomInfoValidated('roomName');

  return (
    <FormField>
      <FormField.Label label="방 이름" htmlFor="roomName" required={true} />
      <FormField.Input
        placeholder=""
        onChange={roomName.onChange}
        name="roomName"
        id="roomName"
        value={roomName.rawValue}
      />
      <FormField.ErrorMessage value={roomName.errorMessage} />
    </FormField>
  );
};

export default React.memo(RoomNameDefault);
