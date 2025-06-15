import Dropdown from '@/components/_common/Dropdown/Dropdown';
import FlexBox from '@/components/_common/FlexBox/FlexBox';
import FormField from '@/components/_common/FormField/FormField';
import FormStyled from '@/components/NewChecklist/NewRoomInfoForm/styled';
import { roomOccupancyPeriods } from '@/constants/roomInfo';
import useRoomInfoValidated from '@/hooks/useRoomInfoValidated';

const OccupancyMonth = () => {
  const occupancyMonth = useRoomInfoValidated('occupancyMonth');
  const occupancyPeriod = useRoomInfoValidated('occupancyPeriod');
  const errorMessage = occupancyMonth.errorMessage || occupancyPeriod.errorMessage;

  return (
    <FlexBox.Vertical gap="1.5rem">
      <FormField.Label label="입주 가능일" htmlFor="occupancyMonth" bold />
      <FormStyled.FieldBox>
        <FormField.Input
          inputMode="decimal"
          width="medium"
          onChange={occupancyMonth.onChange}
          name="occupancyMonth"
          value={occupancyMonth.rawValue}
          id="occupancyMonth"
          isError={!!occupancyMonth.errorMessage}
        />
        <FormStyled.FlexLabel label="월  " />
        <Dropdown
          id="occupancyPeriod"
          initialValue={occupancyPeriod.rawValue}
          options={roomOccupancyPeriods.map(value => ({ value }))}
          onSelectSetter={(level: string) => occupancyPeriod.set(level)}
        />
      </FormStyled.FieldBox>
      <FormField.ErrorMessage value={errorMessage} />
    </FlexBox.Vertical>
  );
};

export default OccupancyMonth;
