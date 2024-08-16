import styled from '@emotion/styled';
import { useStore } from 'zustand';

import FormField from '@/components/_common/FormField/FormField';
import Input from '@/components/_common/Input/Input';
import Styled from '@/components/NewChecklist/NewRoomInfoForm/styled';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';

const RoomContractTerm = () => {
  const actions = useStore(checklistRoomInfoStore, state => state.actions);
  const contractTerm = useStore(checklistRoomInfoStore, state => state.rawValue.contractTerm);
  const errorMessage = useStore(checklistRoomInfoStore, state => state.errorMessage.contractTerm);

  return (
    <FormField>
      <FormField.Label label="계약 기간" />
      <S.FieldBox>
        <Input width="medium" placeholder="" onChange={actions.onChange} name="contractTerm" value={contractTerm} />
        <Styled.FlexLabel label="개월"></Styled.FlexLabel>
      </S.FieldBox>
      <FormField.ErrorMessage value={errorMessage ?? ''} />
    </FormField>
  );
};

const S = {
  FieldBox: styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100%;
    gap: 10px;
  `,
};

export default RoomContractTerm;
