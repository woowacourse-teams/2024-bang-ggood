import { useCallback } from 'react';
import { useStore } from 'zustand';

import Badge from '@/components/_common/Badge/Badge';
import FlexBox from '@/components/_common/FlexBox/FlexBox';
import FormField from '@/components/_common/FormField/FormField';
import FormStyled from '@/components/NewChecklist/NewRoomInfoForm/styled';
import { roomIncludedUtilites } from '@/constants/roomInfo';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';
import { RoomInfo } from '@/types/room';

const IncludedUtilities = () => {
  const actions = useStore(checklistRoomInfoStore, state => state.actions);
  // const includedUtilities = useStore(checklistRoomInfoStore, state => state.rawValue.includedUtilities);

  const handleClickTagButton = useCallback(
    (name: keyof RoomInfo, value: string) => {
      actions.set(name, value);
    },
    [actions],
  );

  return (
    <FlexBox.Vertical>
      <FormField.Label label="관리비 포함 항목" />
      <FormStyled.OptionButtonContainer flexWrap="wrap">
        {roomIncludedUtilites.map(utility => (
          <Badge
            key={utility}
            label={utility}
            name={utility}
            size="button"
            /* TODO : 제대로 동작하게만들기 */
            isSelected={false}
            onClick={() => handleClickTagButton('includedUtilities', utility)}
          />
        ))}
      </FormStyled.OptionButtonContainer>
    </FlexBox.Vertical>
  );
};

export default IncludedUtilities;
