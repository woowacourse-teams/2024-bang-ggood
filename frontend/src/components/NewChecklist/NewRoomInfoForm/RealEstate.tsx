import { useStore } from 'zustand';

import { NewChecklistFormField } from '@/components/NewChecklist/NewChecklistFormField';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';

const RealEstate = () => {
  const actions = useStore(checklistRoomInfoStore, state => state.actions);
  const realEstate = useStore(checklistRoomInfoStore, state => state.rawValue.realEstate);
  const errorMessage = useStore(checklistRoomInfoStore, state => state.errorMessage.realEstate);

  return (
    <NewChecklistFormField
      label="부동산 이름"
      onChange={actions.onChange}
      value={realEstate}
      errorMessage={errorMessage}
      name="realEstate"
    />
  );
};

export default RealEstate;
