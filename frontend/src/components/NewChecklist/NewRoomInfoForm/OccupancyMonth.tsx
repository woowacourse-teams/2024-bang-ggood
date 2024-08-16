import { useStore } from 'zustand';

import FlexBox from '@/components/_common/FlexBox/FlexBox';
import FormField from '@/components/_common/FormField/FormField';
import S from '@/components/NewChecklist/NewRoomInfoForm/styled';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';
import { InputChangeEvent } from '@/types/event';

const OccupancyMonth = () => {
  const actions = useStore(checklistRoomInfoStore, state => state.actions);
  const occupancyMonth = useStore(checklistRoomInfoStore, state => state.rawValue.occupancyMonth);
  const occupancyPeriod = useStore(checklistRoomInfoStore, state => state.rawValue.occupancyPeriod);
  const errorMessageOccupancyMonth = useStore(checklistRoomInfoStore, state => state.errorMessage.occupancyMonth);
  const errorMessageOccupancyPeriod = useStore(checklistRoomInfoStore, state => state.errorMessage.occupancyPeriod);

  return (
    <FlexBox.Vertical gap="15px">
      <FormField.Label label="입주 가능 기간" />
      <FlexBox.Horizontal gap="10px">
        <FormField.Input onChange={actions.onChange} name="occupancyMonth" value={occupancyMonth} />
        <S.FlexLabel label=" 월 " />
        <select
          name="occupancyPeriod"
          value={occupancyPeriod}
          onChange={e => actions.onChange(e as unknown as InputChangeEvent)}
        >
          <option value="초">초</option>
          <option value="중순">중순</option>
          <option value="말">말</option>
        </select>
      </FlexBox.Horizontal>
      <FormField.ErrorMessage value={errorMessageOccupancyMonth || errorMessageOccupancyPeriod || ''} />
    </FlexBox.Vertical>
  );
};

export default OccupancyMonth;
