import { useStore } from 'zustand';

import FlexBox from '@/components/_common/FlexBox/FlexBox';
import FormField from '@/components/_common/FormField/FormField';
import SubwayStations from '@/components/_common/Subway/SubwayStations';
import roomInfoUnvalidatedStore from '@/store/roomInfoUnvalidatedStore';

const NearSubwayStations = () => {
  const nearSubwayStation = useStore(roomInfoUnvalidatedStore, state => state.nearSubwayStation);

  return (
    <FlexBox.Vertical gap="1.5rem">
      <FormField.Label label="가까운 지하철" />
      <FlexBox.Vertical gap="1rem">
        <SubwayStations stations={nearSubwayStation} />
      </FlexBox.Vertical>
      <FormField.BottomEmptyBox />
    </FlexBox.Vertical>
  );
};

export default NearSubwayStations;
