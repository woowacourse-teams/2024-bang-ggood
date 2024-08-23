import { useStore } from 'zustand';

import { getNearSubway } from '@/apis/subway';
import Button from '@/components/_common/Button/Button';
import FlexBox from '@/components/_common/FlexBox/FlexBox';
import FormField from '@/components/_common/FormField/FormField';
import FormStyled from '@/components/NewChecklist/NewRoomInfoForm/styled';
import checklistAddressStore from '@/store/checklistAddressStore';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';

const NearTransportation = () => {
  const actions = useStore(checklistRoomInfoStore, state => state.actions);
  const station = useStore(checklistRoomInfoStore, state => state.rawValue.station);
  const walkingTime = useStore(checklistRoomInfoStore, state => state.rawValue.walkingTime);
  const errorMessageStation = useStore(checklistRoomInfoStore, state => state.errorMessage.station);
  const errorMessageWalkingTime = useStore(checklistRoomInfoStore, state => state.errorMessage.walkingTime);

  const position = useStore(checklistAddressStore, state => state.position);

  const findNearSubway = async () => {
    const newSubway = await getNearSubway(position);
    actions.set('station', newSubway.stationName);
    actions.set('walkingTime', newSubway.walkingTime);
  };

  return (
    <FlexBox.Vertical gap="1.5rem">
      <FormField.Label label="가까운 교통편" />
      <FormStyled.FieldBox>
        <FormField.Input width="medium" onChange={actions.onChange} name="station" value={station} />
        <FormStyled.FlexLabel label=" 역까지 도보" />
        <FormField.Input
          width="small"
          placeholder=""
          onChange={actions.onChange}
          name="walkingTime"
          value={walkingTime}
        />
        <FormStyled.FlexLabel label=" 분" />
      </FormStyled.FieldBox>
      <Button label="근처 역 찾기" isSquare={true} size="xSmall" onClick={findNearSubway} />
      <FormField.ErrorMessage value={errorMessageStation || errorMessageWalkingTime || ''} />
    </FlexBox.Vertical>
  );
};

export default NearTransportation;
