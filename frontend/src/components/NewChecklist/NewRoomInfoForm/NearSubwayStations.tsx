import { useEffect } from 'react';
import { useStore } from 'zustand';

import FlexBox from '@/components/_common/FlexBox/FlexBox';
import FormField from '@/components/_common/FormField/FormField';
import SubwayStations from '@/components/_common/Subway/SubwayStations';
import useRoomInfoUnvalidatedStore from '@/hooks/useRoomInfoUnvalidatedStore';
import roomInfoUnvalidatedStore from '@/store/roomInfoUnvalidatedStore';
import loadExternalScriptWithCallback from '@/utils/loadScript';

const NearSubwayStations = () => {
  const address = useStore(roomInfoUnvalidatedStore, state => state.address);
  const nearSubwayStation = useStore(roomInfoUnvalidatedStore, state => state.nearSubwayStation);
  const { findSubwayByAddress } = useRoomInfoUnvalidatedStore();

  useEffect(() => {
    loadExternalScriptWithCallback('kakaoMap', () => findSubwayByAddress(address));
  }, [address]);

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
