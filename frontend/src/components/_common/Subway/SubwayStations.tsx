import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { getNearSubways } from '@/apis/subway';
import SubwayStationItem from '@/components/_common/Subway/SubwayStationItem';
import { flexColumn } from '@/styles/common';
import { Position } from '@/types/address';
import { ChecklistInfo } from '@/types/checklist';
import { SubwayStation } from '@/types/subway';
import loadExternalScriptWithCallback from '@/utils/loadScript';

interface Props {
  checklist?: ChecklistInfo;
  stations: SubwayStation[];
}

const SubwayStations = ({ checklist, stations }: Props) => {
  const [nearStations, setNearStations] = useState<SubwayStation[]>(stations ?? []);

  const searchSubwayStationsByPosition = async ({ latitude, longitude }: Position) => {
    return await getNearSubways({ latitude, longitude });
  };

  const searchSubwayStationsByAddress = (address: string) => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const { kakao } = window as any;

    kakao.maps.load(() => {
      const geocoder = new kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, function (result: any, status: any) {
        /* 정상적으로 검색이 완료됐으면 */
        if (status === kakao.maps.services.Status.OK) {
          searchSubwayStationsByPosition({
            latitude: result[0].y,
            longitude: result[0].x,
          }).then(stations => {
            setNearStations(stations);
          });
        }
      });
    });
  };

  useEffect(() => {
    if (checklist) {
      const searchStations = () => {
        searchSubwayStationsByAddress(checklist.room.address!);
      };

      loadExternalScriptWithCallback('daumAddress', searchStations);
    }
  }, []);

  return (
    <>
      {nearStations?.length ? (
        <S.Box>{nearStations?.map(station => <SubwayStationItem station={station} key={station.stationName} />)}</S.Box>
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
    gap: 1rem;
  `,
};
