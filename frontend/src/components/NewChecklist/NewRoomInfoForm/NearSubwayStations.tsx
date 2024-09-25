import { useStore } from 'zustand';

import FlexBox from '@/components/_common/FlexBox/FlexBox';
import FormField from '@/components/_common/FormField/FormField';
import NearSubwayStationItem from '@/components/_common/SubwayStation/NearSubwayStationItem';
import roomInfoUnvalidatedStore from '@/store/roomInfoUnvalidatedStore';

const NearSubwayStations = () => {
  const { nearSubwayStation } = useStore(roomInfoUnvalidatedStore);

  return (
    <FlexBox.Vertical gap="1.5rem">
      <FormField.Label label="가까운 지하철" />
      <FlexBox.Vertical gap="1rem">
        {nearSubwayStation.length ? (
          nearSubwayStation?.map(station => <NearSubwayStationItem key={station.stationName} station={station} />)
        ) : (
          <FormField.TextBox text={'보신 방과 가까운 지하철역을 찾아드릴게요.'} />
        )}
      </FlexBox.Vertical>
      <FormField.BottomEmptyBox />
    </FlexBox.Vertical>
  );
};

export default NearSubwayStations;
