import { useStore } from 'zustand';

import Dropdown from '@/components/_common/Dropdown/Dropdown';
import FlexBox from '@/components/_common/FlexBox/FlexBox';
import FormField from '@/components/_common/FormField/FormField';
import FormStyled from '@/components/NewChecklist/NewRoomInfoForm/styled';
import { roomOccupancyPeriods } from '@/constants/roomInfo';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';

const OccupancyMonth = () => {
  const actions = useStore(checklistRoomInfoStore, state => state.actions);
  const occupancyMonth = useStore(checklistRoomInfoStore, state => state.rawValue.occupancyMonth);
  const occupancyPeriod = useStore(checklistRoomInfoStore, state => state.rawValue.occupancyPeriod);

  const errorMessageOccupancyMonth = useStore(checklistRoomInfoStore, state => state.errorMessage.occupancyMonth);
  const errorMessageOccupancyPeriod = useStore(checklistRoomInfoStore, state => state.errorMessage.occupancyPeriod);
  const errorMessage = errorMessageOccupancyMonth || errorMessageOccupancyPeriod;

  return (
    <FlexBox.Vertical gap="1.5rem">
      <FormField.Label label="입주 가능일" />
      <FormStyled.FieldBox>
        <FormField.Input width="medium" onChange={actions.onChange} name="occupancyMonth" value={occupancyMonth} />
        <FormStyled.FlexLabel label="월  " />
        <Dropdown
          initialValue={occupancyPeriod}
          options={roomOccupancyPeriods.map(value => ({ value }))}
          onSelectSetter={(level: string) => {
            actions.set('occupancyPeriod', level);
          }}
        />
      </FormStyled.FieldBox>
      <FormField.ErrorMessage value={errorMessage} />
    </FlexBox.Vertical>
  );
};

export default OccupancyMonth;
