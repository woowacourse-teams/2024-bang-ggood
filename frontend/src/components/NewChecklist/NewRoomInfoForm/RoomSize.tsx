import FormField from '@/components/_common/FormField/FormField';
import Input from '@/components/_common/Input/Input';
import FormStyled from '@/components/NewChecklist/NewRoomInfoForm/styled';
import useRoomInfoValidated from '@/hooks/useRoomInfoValidated';

const RoomSize = () => {
  const roomSize = useRoomInfoValidated('size');

  return (
    <FormField>
      <FormField.Label label="방 크기" htmlFor="size" />
      <FormStyled.FieldBox>
        <Input width="medium" placeholder="" onChange={roomSize.onChange} name="size" value={roomSize} id="size" />
        <FormStyled.FlexLabel label="평"></FormStyled.FlexLabel>
      </FormStyled.FieldBox>
      <FormField.ErrorMessage value={roomSize.errorMessage} />
    </FormField>
  );
};

export default RoomSize;
