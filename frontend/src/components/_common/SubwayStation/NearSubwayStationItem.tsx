import styled from '@emotion/styled';

import FlexBox from '@/components/_common/FlexBox/FlexBox';
import SubwayLineIcon from '@/components/_common/SubwayStation/SubwayLineIcon/SubwayLineIcon';
import { flexCenter } from '@/styles/common';
import { SubwayStation } from '@/types/subway';

const NearSubwayStationItem = ({ station }: { station: SubwayStation }) => {
  const { stationName, stationLine, walkingTime } = station;

  return (
    <FlexBox.Horizontal gap={'6px'}>
      <FlexBox.Horizontal gap={'4px'}>
        {stationLine?.map(oneLine => <SubwayLineIcon lineName={oneLine} key={oneLine} />)}
      </FlexBox.Horizontal>
      <S.TextBox>{`${stationName}까지 도보 ${walkingTime}분`}</S.TextBox>
    </FlexBox.Horizontal>
  );
};

const S = {
  TextBox: styled.span`
    ${flexCenter}
  `,
};

export default NearSubwayStationItem;
