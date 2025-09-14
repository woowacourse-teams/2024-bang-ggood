import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import FlexBox from '@/components/_common/FlexBox/FlexBox';
import SubwayStationItem from '@/components/_common/Subway/SubwayStationItem';
import Text from '@/components/_common/Text/Text';
import { ROUTE_PATH } from '@/constants/routePath';
import { SubwayLineName } from '@/styles/subway';
import { Building } from '@/types/building';

function BuildingCard({ buildingId, buildingName, checklistCount, station, isLiked, thumbnail }: Building) {
  return (
    <Link to={`${ROUTE_PATH.buildingList}/${buildingId}`}>
      <FlexBox.Horizontal padding="0.8rem 0" gap="1.6rem" onClick={() => {}}>
        <S.Image alt="건물 이미지" src={thumbnail} />

        <div>
          <Text typography={text => text.body[1].B}>{buildingName}</Text>
          <Text typography={text => text.body[1].R} color={color => color.gray[400]} style={{ marginTop: '.8rem' }}>
            {' (' + checklistCount + ')'}
          </Text>

          <SubwayStationItem
            station={{
              stationName: station.name,
              stationLine: station.lines as SubwayLineName[],
              walkingTime: station.walkingTime,
            }}
          />
        </div>
      </FlexBox.Horizontal>
    </Link>
  );
}

const S = {
  Image: styled.img`
    width: 14.5rem;
    height: 12rem;
    border-radius: 0.8rem;
  `,
};

export default BuildingCard;
