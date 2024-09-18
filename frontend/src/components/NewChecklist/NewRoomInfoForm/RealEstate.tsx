import { useStore } from 'zustand';

import { NewChecklistFormField } from '@/components/NewChecklist/NewChecklistFormField';
import checklistRoomInfoStores from '@/store/checklistRoomInfoStore';

const RealEstate = () => {
  const actions = useStore(checklistRoomInfoStores, state => state.actions);
  const realEstate = useStore(checklistRoomInfoStores, state => state.rawValue.realEstate);
  const errorMessage = useStore(checklistRoomInfoStores, state => state.errorMessage.realEstate);

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
