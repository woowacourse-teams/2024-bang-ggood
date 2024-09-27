import { useStore } from 'zustand';

import FormField from '@/components/_common/FormField/FormField';
import FormStyled from '@/components/NewChecklist/NewRoomInfoForm/styled';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';

const DepositAndRent = () => {
  const actions = useStore(checklistRoomInfoStore, state => state.actions);
  const deposit = useStore(checklistRoomInfoStore, state => state.rawValue.deposit);
  const rent = useStore(checklistRoomInfoStore, state => state.rawValue.rent);
  const errorMessageDeposit = useStore(checklistRoomInfoStore, state => state.errorMessage.deposit);
  const errorMessageRent = useStore(checklistRoomInfoStore, state => state.errorMessage.rent);

  const errorMessage = errorMessageDeposit || errorMessageRent;

  return (
    <FormField>
      <FormField.Label label="보증금 / 월세 (만원)" />
      <FormStyled.FieldBox>
        <FormField.Input width="medium" onChange={actions.onChange} name="deposit" value={deposit} />
        <FormStyled.FlexLabel label=" / " />
        <FormField.Input width="medium" placeholder="" onChange={actions.onChange} name="rent" value={rent} />
      </FormStyled.FieldBox>
      <FormField.ErrorMessage value={errorMessage} />
    </FormField>
  );
};

export default DepositAndRent;
