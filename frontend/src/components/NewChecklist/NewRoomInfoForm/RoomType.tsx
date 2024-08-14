import { useCallback } from 'react';
import { useStore } from 'zustand';

import Badge from '@/components/_common/Badge/Badge';
import FormField from '@/components/_common/FormField/FormField';
import S from '@/components/NewChecklist/NewRoomInfoForm/styled';
import { roomTypes } from '@/constants/roomInfo';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';
import { FlexVertical } from '@/styles/styled';
import { RoomInfo } from '@/types/room';

const RoomType = () => {
  const actions = useStore(checklistRoomInfoStore, state => state.actions);
  const roomType = useStore(checklistRoomInfoStore, state => state.value.type);

  const handleClickTagButton = useCallback(
    (name: keyof RoomInfo, value: string) => {
      actions.set(name, value);
    },
    [actions],
  );

  return (
    <FlexVertical>
      <FormField.Label label="방 종류" />
      <S.OptionButtonContainer flexWrap="wrap">
        {roomTypes.map(type => (
          <Badge
            key={type}
            label={type}
            size="button"
            isSelected={roomType === type}
            onClick={() => handleClickTagButton('type', type)}
          />
        ))}
      </S.OptionButtonContainer>
    </FlexVertical>
  );
};

export default RoomType;
