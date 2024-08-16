import { useStore } from 'zustand';

import FlexBox from '@/components/_common/FlexBox/FlexBox';
import FormField from '@/components/_common/FormField/FormField';
import Styled from '@/components/NewChecklist/NewRoomInfoForm/styled';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';

const NearTransportation = () => {
  const actions = useStore(checklistRoomInfoStore, state => state.actions);
  const station = useStore(checklistRoomInfoStore, state => state.rawValue.station);
  const walkingTime = useStore(checklistRoomInfoStore, state => state.rawValue.walkingTime);
  const errorMessageStation = useStore(checklistRoomInfoStore, state => state.errorMessage.station);
  const errorMessageWalkingTime = useStore(checklistRoomInfoStore, state => state.errorMessage.walkingTime);

  return (
    <FlexBox.Vertical gap="15px">
      <FormField.Label label="가까운 교통편" />
      <Styled.FieldBox>
        <FormField.Input width="medium" onChange={actions.onChange} name="station" value={station} />
        <Styled.FlexLabel label=" 역  " />
        <FormField.Input width="medium" placeholder="" onChange={actions.onChange} name="rent" value={walkingTime} />
        <Styled.FlexLabel label=" 분 거리  " />
      </Styled.FieldBox>
      <FormField.ErrorMessage value={errorMessageStation || errorMessageWalkingTime || ''} />
    </FlexBox.Vertical>
  );
};

export default NearTransportation;
