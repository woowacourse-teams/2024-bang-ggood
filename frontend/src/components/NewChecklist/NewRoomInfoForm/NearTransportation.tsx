import { useStore } from 'zustand';

import FlexBox from '@/components/_common/FlexBox/FlexBox';
import FormField from '@/components/_common/FormField/FormField';
import FormStyled from '@/components/NewChecklist/NewRoomInfoForm/styled';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';

const NearTransportation = () => {
  const station = useStore(checklistRoomInfoStore, state => state.rawValue.station);
  const walkingTime = useStore(checklistRoomInfoStore, state => state.rawValue.walkingTime);
  const errorMessageStation = useStore(checklistRoomInfoStore, state => state.errorMessage.station);
  const errorMessageWalkingTime = useStore(checklistRoomInfoStore, state => state.errorMessage.walkingTime);

  return (
    <FlexBox.Vertical gap="1.5rem">
      <FormField.Label label="가까운 교통편" />
      {station ? (
        <FormStyled.FieldBox>{`${station}역까지 도보 ${walkingTime}분`}</FormStyled.FieldBox>
      ) : (
        <FormField.TextBox text={'보신 방과 가까운 지하철역을 찾아드릴게요.'} />
      )}

      <FormField.ErrorMessage value={errorMessageStation || errorMessageWalkingTime || ''} />
    </FlexBox.Vertical>
  );
};

export default NearTransportation;
