import { useStore } from 'zustand';

import FlexBox from '@/components/_common/FlexBox/FlexBox';
import FormField from '@/components/_common/FormField/FormField';
import SubwayStations from '@/components/_common/Subway/SubwayStations';
import roomInfoNonValidatedStore from '@/store/roomInfoNonValidatedStore';

const NearSubwayStations = () => {
  const nearSubwayStation = useStore(roomInfoNonValidatedStore, state => state.nearSubwayStation);
  const position = useStore(roomInfoNonValidatedStore, state => state.position);

  return (
    <FlexBox.Vertical gap="1.5rem">
      <FormField.Label label="가까운 지하철" bold />
      <FlexBox.Vertical gap="1rem">
        {!position.latitude ? (
          <span>{'보신 방과 가까운 지하철역을 찾아드릴게요.'}</span>
        ) : (
          <SubwayStations stations={nearSubwayStation ? nearSubwayStation : []} />
        )}
      </FlexBox.Vertical>
      <FormField.BottomEmptyBox />
    </FlexBox.Vertical>
  );
};

export default NearSubwayStations;
