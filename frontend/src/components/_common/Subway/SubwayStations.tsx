import styled from '@emotion/styled';

import SubwayStationItem from '@/components/_common/Subway/SubwayStationItem';
import { flexColumn } from '@/styles/common';
import { ChecklistInfo } from '@/types/checklist';
import { SubwayStation } from '@/types/subway';

interface Props {
  checklist?: ChecklistInfo;
  stations: SubwayStation[];
}

const SubwayStations = ({ stations }: Props) => {
  return (
    <>
      {stations?.length ? (
        <S.Box>{stations?.map(station => <SubwayStationItem station={station} key={station.stationName} />)}</S.Box>
      ) : (
        <span>{'보신 방과 가까운 지하철역을 찾아드릴게요.'}</span>
      )}
    </>
  );
};

export default SubwayStations;

const S = {
  Box: styled.div`
    ${flexColumn};
    gap: 0.5rem;
  `,
};
