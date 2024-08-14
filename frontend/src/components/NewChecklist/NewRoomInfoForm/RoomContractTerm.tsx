import { useStore } from 'zustand';

import FlexBox from '@/components/_common/FlexBox/FlexBox';
import { NewChecklistFormField } from '@/components/NewChecklist/NewChecklistFormField';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';

const RoomContractTerm = () => {
  const actions = useStore(checklistRoomInfoStore, state => state.actions);
  const contractTerm = useStore(checklistRoomInfoStore, state => state.rawValue.contractTerm);
  const errorMessage = useStore(checklistRoomInfoStore, state => state.errorMessage.contractTerm);

  return (
    <FlexBox.Horizontal>
      <NewChecklistFormField
        label="계약 기간 (개월)"
        value={contractTerm}
        name="contractTerm"
        errorMessage={errorMessage}
        onChange={actions.onChange}
      />
    </FlexBox.Horizontal>
  );
};

export default RoomContractTerm;
