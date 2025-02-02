import FormField from '@/components/_common/FormField/FormField';
import FormStyled from '@/components/NewChecklist/NewRoomInfoForm/styled';
import useRoomInfoValidated from '@/hooks/useRoomInfoValidated';

const DepositAndRent = () => {
  const deposit = useRoomInfoValidated('deposit');
  const rent = useRoomInfoValidated('rent');

  const errorMessage = deposit.errorMessage || rent.errorMessage;

  return (
    <FormField>
      <FormField.Label label="보증금 / 월세 (만원)" />
      <FormStyled.FieldBox>
        <FormField.Input
          inputMode="decimal"
          width="medium"
          onChange={deposit.onChange}
          name="deposit"
          value={deposit.rawValue}
          aria-label="보증금"
        />
        <FormStyled.FlexLabel label=" / " />
        <FormField.Input
          inputMode="decimal"
          width="medium"
          placeholder=""
          onChange={rent.onChange}
          name="rent"
          value={rent.rawValue}
          aria-label="월세"
        />
      </FormStyled.FieldBox>
      <FormField.ErrorMessage value={errorMessage} />
    </FormField>
  );
};

export default DepositAndRent;
