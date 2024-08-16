import { useStore } from 'zustand';

import FormField from '@/components/_common/FormField/FormField';
import Input from '@/components/_common/Input/Input';
import Styled from '@/components/NewChecklist/NewRoomInfoForm/styled';
import { roomFloorLevels } from '@/constants/roomInfo';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';
import { InputChangeEvent } from '@/types/event';

const RoomFloor = () => {
  const actions = useStore(checklistRoomInfoStore, state => state.actions);
  const floor = useStore(checklistRoomInfoStore, state => state.rawValue.floor);
  const floorLevel = useStore(checklistRoomInfoStore, state => state.rawValue.floorLevel);
  const errorMessageFloor = useStore(checklistRoomInfoStore, state => state.errorMessage.floor);

  return (
    <FormField>
      <FormField.Label label="층수" />
      <Styled.FieldBox>
        <select name="floorLevel" value={floorLevel} onChange={e => actions.onChange(e as unknown as InputChangeEvent)}>
          {roomFloorLevels.map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <Input width="medium" placeholder="" name="floor" value={floor} onChange={actions.onChange} />
        <Styled.FlexLabel label="층"></Styled.FlexLabel>
      </Styled.FieldBox>
      <FormField.ErrorMessage value={errorMessageFloor ?? ''} />
    </FormField>
  );
};

export default RoomFloor;
