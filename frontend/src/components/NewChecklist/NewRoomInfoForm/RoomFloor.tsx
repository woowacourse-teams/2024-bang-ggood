import { useStore } from 'zustand';

import FlexBox from '@/components/_common/FlexBox/FlexBox';
import FormField from '@/components/_common/FormField/FormField';
import RadioGroup from '@/components/_common/RadioGroup/RadioGroup';
import S from '@/components/NewChecklist/NewRoomInfoForm/styled';
import { roomFloorLevels } from '@/constants/roomInfo';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';

const RoomFloor = () => {
  const actions = useStore(checklistRoomInfoStore, state => state.actions);
  const floor = useStore(checklistRoomInfoStore, state => state.rawValue.floor);
  const floorLevel = useStore(checklistRoomInfoStore, state => state.rawValue.floorLevel);
  const errorMessageFloor = useStore(checklistRoomInfoStore, state => state.errorMessage.floor);

  return (
    <FormField>
      <FormField.Label label="층수" />
      <FlexBox.Horizontal>
        <S.FlexInput placeholder="" name="floor" value={floor} onChange={actions.onChange} />
        <S.RadioGroup label="" value={floorLevel ?? ''} onChangeChild={actions.onChange}>
          {roomFloorLevels.map(floorLevel => (
            <RadioGroup.RadioButton key={floorLevel} name="floorLevel" value={floorLevel} color="green">
              {floorLevel}
            </RadioGroup.RadioButton>
          ))}
        </S.RadioGroup>
      </FlexBox.Horizontal>
      <FormField.ErrorMessage value={errorMessageFloor ?? ''} />
    </FormField>
  );
};

export default RoomFloor;
