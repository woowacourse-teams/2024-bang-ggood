import { useStore } from 'zustand';

import FormField from '@/components/_common/FormField/FormField';
import Input from '@/components/_common/Input/Input';
import FormStyled from '@/components/NewChecklist/NewRoomInfoForm/styled';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';

const MaintenanceFee = () => {
  const actions = useStore(checklistRoomInfoStore, state => state.actions);
  const maintenanceFee = useStore(checklistRoomInfoStore, state => state.rawValue.maintenanceFee);
  const errorMessage = useStore(checklistRoomInfoStore, state => state.errorMessage.maintenanceFee);

  // 토큰있을때.
  return (
    <FormField>
      <FormField.Label label="관리비" htmlFor="maintenanceFee" />
      <FormStyled.FieldBox>
        <Input
          width="medium"
          placeholder=""
          onChange={actions.onChange}
          name="maintenanceFee"
          value={maintenanceFee}
          id="maintenanceFee"
        />
        <FormStyled.FlexLabel label="만원"></FormStyled.FlexLabel>
      </FormStyled.FieldBox>
      <FormField.ErrorMessage value={errorMessage} />
    </FormField>
  );
};

export default MaintenanceFee;
