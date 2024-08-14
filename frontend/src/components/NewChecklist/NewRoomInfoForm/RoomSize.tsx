import { useStore } from 'zustand';

import FlexBox from '@/components/_common/FlexBox/FlexBox';
import FormField from '@/components/_common/FormField/FormField';
import S from '@/components/NewChecklist/NewRoomInfoForm/styled';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';

const RoomSize = () => {
  const actions = useStore(checklistRoomInfoStore, state => state.actions);
  const roomSize = useStore(checklistRoomInfoStore, state => state.rawValue.size);
  const errorMessage = useStore(checklistRoomInfoStore, state => state.errorMessage.size);

  return (
    <FormField>
      <FormField.Label label="방 크기" />
      <FlexBox.Horizontal>
        <S.FlexInput placeholder="" onChange={actions.onChange} name="size" value={roomSize} />
        <S.FlexLabel label="평"></S.FlexLabel>
      </FlexBox.Horizontal>
      <FormField.ErrorMessage value={errorMessage ?? ''} />
    </FormField>
  );
};

export default RoomSize;
