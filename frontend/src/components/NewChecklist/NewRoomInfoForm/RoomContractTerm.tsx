import styled from '@emotion/styled';

import FormField from '@/components/_common/FormField/FormField';
import Input from '@/components/_common/Input/Input';
import FormStyled from '@/components/NewChecklist/NewRoomInfoForm/styled';
import useRoomInfoValidated from '@/hooks/useRoomInfoValidated';

const RoomContractTerm = () => {
  const contractTerm = useRoomInfoValidated('contractTerm');

  return (
    <FormField>
      <FormField.Label label="계약 기간" htmlFor="contractTerm" />
      <S.FieldBox>
        <Input
          width="medium"
          placeholder=""
          onChange={contractTerm.onChange}
          name="contractTerm"
          value={contractTerm.rawValue}
          id="contractTerm"
        />
        <FormStyled.FlexLabel label="개월"></FormStyled.FlexLabel>
      </S.FieldBox>
      <FormField.ErrorMessage value={contractTerm.errorMessage} />
    </FormField>
  );
};

const S = {
  FieldBox: styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100%;
    gap: 1rem;
  `,
};

export default RoomContractTerm;
