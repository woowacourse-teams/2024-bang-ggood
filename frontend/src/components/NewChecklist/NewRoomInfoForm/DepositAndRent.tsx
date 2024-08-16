import { useStore } from 'zustand';

import FormField from '@/components/_common/FormField/FormField';
import Styled from '@/components/NewChecklist/NewRoomInfoForm/styled';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';

const DepositAndRent = () => {
  const actions = useStore(checklistRoomInfoStore, state => state.actions);
  const deposit = useStore(checklistRoomInfoStore, state => state.rawValue.deposit);
  const rent = useStore(checklistRoomInfoStore, state => state.rawValue.rent);
  const errorMessageDeposit = useStore(checklistRoomInfoStore, state => state.errorMessage.deposit);
  const errorMessageRent = useStore(checklistRoomInfoStore, state => state.errorMessage.rent);

  return (
    <FormField>
      <FormField.Label label="보증금 / 월세 (만원)" />
      <Styled.FieldBox>
        <FormField.Input width="medium" onChange={actions.onChange} name="deposit" value={deposit} />
        <Styled.FlexLabel label=" / " />
        <FormField.Input width="medium" placeholder="" onChange={actions.onChange} name="rent" value={rent} />
      </Styled.FieldBox>
      <FormField.ErrorMessage value={errorMessageDeposit || errorMessageRent || ''} />
    </FormField>
  );
};

export default DepositAndRent;
