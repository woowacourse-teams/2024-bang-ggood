import { useStore } from 'zustand';

import FormField from '@/components/_common/FormField/FormField';
import FlexLabel from '@/components/NewChecklist/NewRoomInfoForm/FlexLabel';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';
import { FlexHorizontal } from '@/styles/styled';

const DepositAndRent = () => {
  const actions = useStore(checklistRoomInfoStore, state => state.actions);
  const deposit = useStore(checklistRoomInfoStore, state => state.rawValue.deposit);
  const rent = useStore(checklistRoomInfoStore, state => state.rawValue.rent);
  const errorMessageDeposit = useStore(checklistRoomInfoStore, state => state.errorMessage.deposit);
  const errorMessageRent = useStore(checklistRoomInfoStore, state => state.errorMessage.rent);

  return (
    <FormField>
      <FormField.Label label="보증금 / 월세 (만원)" />
      <FlexHorizontal gap={0}>
        <FormField.Input onChange={actions.onChange} name="deposit" value={deposit} />
        <FlexLabel label=" / " />
        <FormField.Input placeholder="" onChange={actions.onChange} name="rent" value={rent} />
      </FlexHorizontal>
      <FormField.ErrorMessage value={errorMessageDeposit || errorMessageRent || ''} />
    </FormField>
  );
};

export default DepositAndRent;

{
  /* <FormField>
          <FormField.Label label="보증금 / 월세 (만원)" />
          <FlexHorizontal gap={0}>
            <S.CustomInput onChange={actions.onChange} name="deposit" value={roomInfo.deposit} />
            <S.CustomLabel label=" / " />
            <S.CustomInput placeholder="" onChange={actions.onChange} name="rent" value={roomInfo.rent} />
          </FlexHorizontal>
          <FormField.ErrorMessage value={errorMessage.deposit || errorMessage.rent || ''} />
        </FormField> */
}
