import FormField from '@/components/_common/FormField/FormField';
import Input from '@/components/_common/Input/Input';
import FormStyled from '@/components/NewChecklist/NewRoomInfoForm/styled';
import useRoomInfoValidated from '@/hooks/useRoomInfoValidated';

const MaintenanceFee = () => {
  const maintenanceFee = useRoomInfoValidated('maintenanceFee');

  return (
    <FormField>
      <FormField.Label label="관리비" htmlFor="maintenanceFee" />
      <FormStyled.FieldBox>
        <Input
          width="medium"
          placeholder=""
          onChange={maintenanceFee.onChange}
          name="maintenanceFee"
          value={maintenanceFee.rawValue}
          id="maintenanceFee"
        />
        <FormStyled.FlexLabel label="만원"></FormStyled.FlexLabel>
      </FormStyled.FieldBox>
      <FormField.ErrorMessage value={maintenanceFee.errorMessage} />
    </FormField>
  );
};

export default MaintenanceFee;
