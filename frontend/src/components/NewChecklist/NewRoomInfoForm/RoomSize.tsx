import { useStore } from 'zustand';

import FormField from '@/components/_common/FormField/FormField';
import Input from '@/components/_common/Input/Input';
import Styled from '@/components/NewChecklist/NewRoomInfoForm/styled';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';

const RoomSize = () => {
  const actions = useStore(checklistRoomInfoStore, state => state.actions);
  const roomSize = useStore(checklistRoomInfoStore, state => state.rawValue.size);
  const errorMessage = useStore(checklistRoomInfoStore, state => state.errorMessage.size);

  return (
    <FormField>
      <FormField.Label label="방 크기" />
      <Styled.FieldBox>
        <Input width="medium" placeholder="" onChange={actions.onChange} name="size" value={roomSize} />
        <Styled.FlexLabel label="평"></Styled.FlexLabel>
      </Styled.FieldBox>
      <FormField.ErrorMessage value={errorMessage ?? ''} />
    </FormField>
  );
};

export default RoomSize;
