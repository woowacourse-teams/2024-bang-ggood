import styled from '@emotion/styled';

import SubwayStationItem from '@/components/_common/Subway/SubwayStationItem';
import { flexColumn } from '@/styles/common';
import { ChecklistInfo } from '@/types/checklist';
import { SubwayStation } from '@/types/subway';

interface Props {
  checklist?: ChecklistInfo;
  stations: SubwayStation[];
  size?: 'small' | 'medium';
  textType?: 'omit' | 'full';
}

const SubwayStations = ({ stations, size, textType = 'full' }: Props) => {
  return (
    <>
      {stations && stations.length > 0 ? (
        <S.Box>
          {stations.map(station => (
            <SubwayStationItem textType={textType} size={size} station={station} key={station.stationName} />
          ))}
        </S.Box>
      ) : (
        <span>{'주변에 가까운 지하철역이 없어요.'}</span>
      )}
    </>
  );
};

export default SubwayStations;

const S = {
  Box: styled.div`
    ${flexColumn};
    line-height: 1.5;
    gap: 0.5rem;
  `,
};
