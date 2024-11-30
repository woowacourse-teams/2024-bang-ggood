import styled from '@emotion/styled';

import FlexBox from '@/components/_common/FlexBox/FlexBox';
import Marker from '@/components/_common/Marker/Marker';
import { flexCenter } from '@/styles/common';
import SUBWAY_LINE_PALLETE from '@/styles/subway';
import { SubwayStation } from '@/types/subway';

interface Props {
  station: SubwayStation;
  size?: 'medium' | 'small';
  textType?: 'omit' | 'full';
}

const SubwayStationItem = ({ station, size, textType = 'full' }: Props) => {
  const { stationName, stationLine, walkingTime } = station;

  return (
    <FlexBox.Horizontal gap={'0.6rem'} flexWrap="wrap">
      <FlexBox.Horizontal gap={'0.4rem'}>
        {stationLine?.map(oneLine => {
          const lineColor = SUBWAY_LINE_PALLETE[oneLine];
          const isNumberTypeSubwayName = oneLine.slice(-2) === '호선' && oneLine.length === 3;
          const name = isNumberTypeSubwayName ? oneLine.slice(0, oneLine.length - 2) : oneLine;

          return (
            <Marker
              size={size}
              text={name}
              key={oneLine}
              backgroundColor={lineColor}
              isCircle={isNumberTypeSubwayName}
            />
          );
        })}
      </FlexBox.Horizontal>
      <S.TextBox>
        {textType === 'full' ? `${stationName}까지 도보 ${walkingTime}분` : `${stationName} ${walkingTime}분`}
      </S.TextBox>
    </FlexBox.Horizontal>
  );
};

const S = {
  TextBox: styled.span`
    ${flexCenter}
  `,
};

export default SubwayStationItem;
