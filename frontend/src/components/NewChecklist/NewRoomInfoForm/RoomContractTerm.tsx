import { useStore } from 'zustand';

import { NewChecklistFormField } from '@/components/NewChecklist/NewChecklistFormField';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';
import { FlexHorizontal } from '@/styles/styled';

const RoomContractTerm = () => {
  const actions = useStore(checklistRoomInfoStore, state => state.actions);
  const contractTerm = useStore(checklistRoomInfoStore, state => state.rawValue.contractTerm);
  const errorMessage = useStore(checklistRoomInfoStore, state => state.errorMessage.contractTerm);

  return (
    <FlexHorizontal>
      <NewChecklistFormField
        label="계약 기간 (개월)"
        value={contractTerm}
        name="contractTerm"
        errorMessage={errorMessage}
        onChange={actions.onChange}
      />
    </FlexHorizontal>
  );
};

export default RoomContractTerm;
