import FormField from '@/components/_common/FormField/FormField';
import Input from '@/components/_common/Input/Input';
import FormStyled from '@/components/NewChecklist/NewRoomInfoForm/styled';
import useRoomInfoValidated from '@/hooks/useRoomInfoValidated';

const RoomSize = () => {
  const roomSize = useRoomInfoValidated('size');

  return (
    <FormField>
      <FormField.Label label="방 크기" htmlFor="size" bold />
      <FormStyled.FieldBox>
        <Input
          inputMode="decimal"
          width="medium"
          placeholder=""
          onChange={roomSize.onChange}
          name="size"
          value={roomSize.rawValue}
          id="size"
          isError={!!roomSize.errorMessage}
        />
        <FormStyled.FlexLabel label="평"></FormStyled.FlexLabel>
      </FormStyled.FieldBox>
      <FormField.ErrorMessage value={roomSize.errorMessage} />
    </FormField>
  );
};

export default RoomSize;
