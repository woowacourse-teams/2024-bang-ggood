import { useStore } from 'zustand';

import { getNearSubway } from '@/apis/subway';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';

const useFindNearSubway = () => {
  const actions = useStore(checklistRoomInfoStore, state => state.actions);

  const findNearSubway = async ({ lat, lon }: { lat: number; lon: number }) => {
    const newSubway = await getNearSubway({ lat, lon });

    actions.set('station', newSubway.stationName);
    actions.set('walkingTime', newSubway.walkingTime);
  };

  return { findNearSubway };
};

export default useFindNearSubway;
