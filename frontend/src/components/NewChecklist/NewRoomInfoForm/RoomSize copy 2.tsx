import { useStore } from 'zustand';

import FormField from '@/components/_common/FormField/FormField';
import S from '@/components/NewChecklist/NewRoomInfoForm/styled';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';
import { FlexHorizontal } from '@/styles/styled';

const RoomSize = () => {
  const actions = useStore(checklistRoomInfoStore, state => state.actions);
  const roomSize = useStore(checklistRoomInfoStore, state => state.rawValue.size);
  const errorMessage = useStore(checklistRoomInfoStore, state => state.errorMessage.size);

  return (
    <FormField>
      <FormField.Label label="방 크기" />
      <FlexHorizontal>
        <S.CustomInput placeholder="" onChange={actions.onChange} name="size" value={roomSize} />
        <S.CustomLabel label="평"></S.CustomLabel>
      </FlexHorizontal>
      <FormField.ErrorMessage value={errorMessage ?? ''} />
    </FormField>
  );
};

export default RoomSize;
