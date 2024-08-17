import { useCallback } from 'react';
import { useStore } from 'zustand';

import Badge from '@/components/_common/Badge/Badge';
import FlexBox from '@/components/_common/FlexBox/FlexBox';
import FormField from '@/components/_common/FormField/FormField';
import FormStyled from '@/components/NewChecklist/NewRoomInfoForm/styled';
import { roomStructures } from '@/constants/roomInfo';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';
import { RoomInfo } from '@/types/room';

const RoomStructure = () => {
  const actions = useStore(checklistRoomInfoStore, state => state.actions);
  const roomStructure = useStore(checklistRoomInfoStore, state => state.rawValue.structure);

  const handleClickTagButton = useCallback(
    (name: keyof RoomInfo, value: string) => {
      actions.set(name, value);
    },
    [actions],
  );

  return (
    <FlexBox.Vertical>
      <FormField.Label label="방 구조" />
      <FormStyled.OptionButtonContainer flexWrap="wrap">
        {roomStructures.map(structure => (
          <Badge
            key={structure}
            label={structure}
            name={structure}
            size="button"
            isSelected={structure === roomStructure}
            onClick={() => handleClickTagButton('structure', structure)}
          />
        ))}
      </FormStyled.OptionButtonContainer>
      <FormField.ErrorMessage value="" /> {/* 필요없지만 레이아웃 일관성을 위해 */}
    </FlexBox.Vertical>
  );
};

export default RoomStructure;
