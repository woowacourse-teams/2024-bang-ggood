import styled from '@emotion/styled';

import FlexBox from '@/components/_common/FlexBox/FlexBox';
import SubwayLineIcon from '@/components/_common/Subway/SubwayLineIcon/SubwayLineIcon';
import { flexCenter } from '@/styles/common';
import { SubwayStation } from '@/types/subway';

interface Props {
  station: SubwayStation;
}

const SubwayStationItem = ({ station }: Props) => {
  const { stationName, stationLine, walkingTime } = station;

  return (
    <FlexBox.Horizontal gap={'0.6rem'} flexWrap="wrap">
      <FlexBox.Horizontal gap={'0.4rem'}>
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

export default SubwayStationItem;
