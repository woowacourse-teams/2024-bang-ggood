import { useStore } from 'zustand';

import FormField from '@/components/_common/FormField/FormField';
import FormStyled from '@/components/NewChecklist/NewRoomInfoForm/styled';
import checklistRoomInfoStores from '@/store/checklistRoomInfoStore';
import { checklistRoomInfostores } from '@/store/checklistRoomInfoStoreTwo';

const DepositAndRent = () => {
  const rent = useStore(checklistRoomInfoStores, state => state.rawValue.rent);
  const errorMessageRent = useStore(checklistRoomInfoStores, state => state.errorMessage.rent);

  const {actions, rawValue:deposit, errorMessage:errorMessageDeposit}=useStore(checklistRoomInfostores.findByName('deposit'))
  
  return (
    <FormField>
      <FormField.Label label="보증금 / 월세 (만원)" />
      <FormStyled.FieldBox>
        <FormField.Input width="medium" onChange={actions.onChange} name="deposit" value={deposit} />
        <FormStyled.FlexLabel label=" / " />
        <FormField.Input width="medium" placeholder="" onChange={actions.onChange} name="rent" value={rent} />
      </FormStyled.FieldBox>
      <FormField.ErrorMessage value={errorMessageDeposit || errorMessageRent || ''} />
    </FormField>
  );
};

export default DepositAndRent;
