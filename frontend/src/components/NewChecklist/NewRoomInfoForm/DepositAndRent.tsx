import { useStore } from 'zustand';

import FlexBox from '@/components/_common/FlexBox/FlexBox';
import FormField from '@/components/_common/FormField/FormField';
import S from '@/components/NewChecklist/NewRoomInfoForm/styled';
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
      <FlexBox.Horizontal gap="10px">
        <FormField.Input onChange={actions.onChange} name="deposit" value={deposit} />
        <S.FlexLabel label=" / " />
        <FormField.Input placeholder="" onChange={actions.onChange} name="rent" value={rent} />
      </FlexBox.Horizontal>
      <FormField.ErrorMessage value={errorMessageDeposit || errorMessageRent || ''} />
    </FormField>
  );
};

export default DepositAndRent;
