import { useStore } from 'zustand';

import { getNearSubway } from '@/apis/subway';
import checklistAddressStore from '@/store/checklistAddressStore';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';

const useFindNearSubway = () => {
  const position = useStore(checklistAddressStore, state => state.position);
  const actions = useStore(checklistRoomInfoStore, state => state.actions);

  const findNearSubway = async () => {
    const newSubway = await getNearSubway(position);

    actions.set('station', newSubway.stationName);
    actions.set('walkingTime', newSubway.walkingTime);
  };

  return { findNearSubway };
};

export default useFindNearSubway;
