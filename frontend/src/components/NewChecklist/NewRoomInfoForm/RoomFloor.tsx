import { useStore } from 'zustand';

import Dropdown from '@/components/_common/Dropdown/Dropdown';
import FormField from '@/components/_common/FormField/FormField';
import Input from '@/components/_common/Input/Input';
import FormStyled from '@/components/NewChecklist/NewRoomInfoForm/styled';
import { roomFloorLevels } from '@/constants/roomInfo';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';

const RoomFloor = () => {
  const actions = useStore(checklistRoomInfoStore, state => state.actions);
  const floor = useStore(checklistRoomInfoStore, state => state.rawValue.floor);
  const floorLevel = useStore(checklistRoomInfoStore, state => state.rawValue.floorLevel);
  const errorMessageFloor = useStore(checklistRoomInfoStore, state => state.errorMessage.floor);

  const handleClickDropdown = (level: string) => {
    actions.set('floorLevel', level);
    if (level === '반지하/지하') {
      actions.set('floor', '');
    }
  };
  return (
    <FormField>
      <FormField.Label label="층수" />
      <FormStyled.FieldBox>
        <Dropdown
          initialValue={floorLevel}
          options={roomFloorLevels.map(value => ({ value }))}
          onSelectSetter={handleClickDropdown}
        />
        <Input
          width="medium"
          disabled={floorLevel === '반지하/지하'}
          placeholder=""
          name="floor"
          value={floor}
          onChange={actions.onChange}
        />
        <FormStyled.FlexLabel label="층"></FormStyled.FlexLabel>
      </FormStyled.FieldBox>
      <FormField.ErrorMessage value={errorMessageFloor} />
    </FormField>
  );
};

export default RoomFloor;
