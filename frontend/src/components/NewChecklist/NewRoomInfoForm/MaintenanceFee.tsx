import { useStore } from 'zustand';

import FormField from '@/components/_common/FormField/FormField';
import Input from '@/components/_common/Input/Input';
import IncludedMaintenances from '@/components/NewChecklist/NewRoomInfoForm/IncludedMaintenances';
import FormStyled from '@/components/NewChecklist/NewRoomInfoForm/styled';
import checklistRoomInfoStores from '@/store/checklistRoomInfoStore';

const MaintenanceFee = () => {
  const actions = useStore(checklistRoomInfoStores, state => state.actions);
  const maintenanceFee = useStore(checklistRoomInfoStores, state => state.rawValue.maintenanceFee);
  const errorMessage = useStore(checklistRoomInfoStores, state => state.errorMessage.maintenanceFee);

  return (
    <FormField>
      <FormField.Label label="관리비" />
      <FormStyled.FieldBox>
        <Input width="medium" placeholder="" onChange={actions.onChange} name="maintenanceFee" value={maintenanceFee} />
        <FormStyled.FlexLabel label="만원"></FormStyled.FlexLabel>
      </FormStyled.FieldBox>
      <FormField.ErrorMessage value={errorMessage ?? ''} />
      <IncludedMaintenances />
    </FormField>
  );
};

export default MaintenanceFee;
