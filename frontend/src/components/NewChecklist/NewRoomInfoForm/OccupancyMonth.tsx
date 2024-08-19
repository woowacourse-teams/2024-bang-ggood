import styled from '@emotion/styled';
import { useStore } from 'zustand';

import Dropdown from '@/components/_common/Dropdown/Dropdown';
import FlexBox from '@/components/_common/FlexBox/FlexBox';
import FormField from '@/components/_common/FormField/FormField';
import FormStyled from '@/components/NewChecklist/NewRoomInfoForm/styled';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';

const OccupancyMonth = () => {
  const actions = useStore(checklistRoomInfoStore, state => state.actions);
  const occupancyMonth = useStore(checklistRoomInfoStore, state => state.rawValue.occupancyMonth);
  const occupancyPeriod = useStore(checklistRoomInfoStore, state => state.rawValue.occupancyPeriod);
  const errorMessageOccupancyMonth = useStore(checklistRoomInfoStore, state => state.errorMessage.occupancyMonth);
  const errorMessageOccupancyPeriod = useStore(checklistRoomInfoStore, state => state.errorMessage.occupancyPeriod);

  return (
    <FlexBox.Vertical gap="15px">
      <FormField.Label label="입주 가능 기간" />
      <FormStyled.FieldBox>
        <FormField.Input width="medium" onChange={actions.onChange} name="occupancyMonth" value={occupancyMonth} />
        <FormStyled.FlexLabel label="월  " />
        <Dropdown
          initialValue={occupancyPeriod}
          options={['초', '중순', '말'].map(value => ({ value }))}
          onSelectSetter={(level: string) => {
            actions.set('occupancyPeriod', level);
          }}
        />
      </FormStyled.FieldBox>
      <FormField.ErrorMessage value={errorMessageOccupancyMonth || errorMessageOccupancyPeriod || ''} />
    </FlexBox.Vertical>
  );
};

const S = {
  SelectOccupancyPeriod: styled.select`
    width: 30%;
  `,
};
export default OccupancyMonth;
