import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';

import Badge from '@/components/_common/Badge/Badge';
import Button from '@/components/_common/Button/Button';
import theme from '@/styles/theme';
import { Position } from '@/types/address';
import createKakaoMapElements from '@/utils/createKakaoMapElements';
import { getDistanceFromLatLonInKm, getMapLevel } from '@/utils/mapHelper';

import loadExternalScriptWithCallback from '../../../utils/loadScript';

/* eslint-disable @typescript-eslint/no-explicit-any */
const RoomCompareMap = ({ positions }: { positions: Position[] }) => {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    const initializeMap = () => {
      const { kakao } = window as any;

      const centerOfPosition = {
        latitude: (positions[0].latitude + positions[1].latitude) / 2,
        longitude: (positions[0].longitude + positions[1].longitude) / 2,
      };

      const diff = getDistanceFromLatLonInKm(
        positions[0].latitude,
        positions[0].longitude,
        positions[1].latitude,
        positions[1].longitude,
      );

      /* 두 지점의 거리를 재서 적당한 Map level 설정 */
      const mapLevel = getMapLevel(diff);

      kakao.maps.load(() => {
        if (!mapElement.current) return;
        const mapOption = {
          center: new kakao.maps.LatLng(centerOfPosition.latitude, centerOfPosition.longitude),
          level: mapLevel,
        };

        const map = new kakao.maps.Map(mapElement.current, mapOption);
        mapRef.current = map;

        const { createMarker } = createKakaoMapElements();

        const marker1 = createMarker(
          kakao,
          map,
          new kakao.maps.LatLng(positions[0].latitude, positions[0].longitude),
          'primary',
          'first',
        );

        const marker2 = createMarker(
          kakao,
          map,
          new kakao.maps.LatLng(positions[1].latitude, positions[1].longitude),
          'secondary',
          'second',
        );

        marker1.setMap(map);
        marker2.setMap(map);
      });
    };

    if (location) {
      loadExternalScriptWithCallback('kakaoMap', initializeMap);
    }
  }, [location]);

  const handleRoomMarkerClick = (positionIndex: number) => {
    const move = () => {
      const { kakao } = window as any;

      const moveLatLon = new kakao.maps.LatLng(positions[positionIndex].latitude, positions[positionIndex].longitude);
      mapRef.current.setLevel(4);
      mapRef.current.panTo(moveLatLon);
    };

    if (mapRef.current) {
      loadExternalScriptWithCallback('kakaoMap', move);
    }
  };

  return (
    <>
      {location && (
        <S.Box>
          <S.Map ref={mapElement}>
            <S.RoomMarkBox>
              <Button label={'A'} isSquare={true} size={'xSmall'} />
              <Badge isSquare={false} backgroundColor={theme.palette.green500} text={'B'} />
            </S.RoomMarkBox>
          </S.Map>
        </S.Box>
      )}
    </>
  );
};

const S = {
  Box: styled.div`
    width: 100%;
    height: 20rem;

    background-color: ${({ theme }) => theme.palette.background};
  `,
  Map: styled.div`
    position: relative;
    width: 100%;
    height: 100%;
  `,
  RoomMarkBox: styled.div`
    display: flex;
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 10;

    padding: 0.5rem;

    color: ${({ theme }) => theme.palette.white};
    gap: 1rem;
    border-radius: 0.3rem;
  `,
};

export default RoomCompareMap;
