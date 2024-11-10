import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';

import { Position } from '@/types/address';
import createKakaoMapElements from '@/utils/createKakaoMapElements';

import loadExternalScriptWithCallback from '../../../utils/loadScript';

/* eslint-disable @typescript-eslint/no-explicit-any */

const CompareMap = ({ positions }: { positions: Position[] }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeMap = () => {
      const { kakao } = window as any;

      const centerOfPosition = {
        latitude: (positions[0].latitude + positions[1].latitude) / 2,
        longitude: (positions[0].longitude + positions[1].longitude) / 2,
      };

      function getDistanceFromLatLonInKm(lat1: number, lng1: number, lat2: number, lng2: number) {
        function deg2rad(deg: any) {
          return deg * (Math.PI / 180);
        }
        const R = 6371;
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lng2 - lng1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d;
      }

      const diff = getDistanceFromLatLonInKm(
        positions[0].latitude,
        positions[0].longitude,
        positions[1].latitude,
        positions[1].longitude,
      );

      // 거리에 따른 적절한 지도 level 설정
      const getMapLevel = (distance: number) => {
        if (distance < 0.5) return 3;
        if (distance < 0.7) return 4;
        if (distance < 1) return 5;
        if (distance < 3) return 6;
        if (distance < 5) return 7;
        if (distance < 12) return 9;
        return 10;
      };

      const mapLevel = getMapLevel(diff);

      kakao.maps.load(() => {
        if (!mapContainerRef.current) return;
        const mapOption = {
          center: new kakao.maps.LatLng(centerOfPosition.latitude, centerOfPosition.longitude),
          level: mapLevel,
        };
        const map = new kakao.maps.Map(mapContainerRef.current, mapOption);

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

  return (
    <>
      {location && (
        <S.Box>
          <S.Map ref={mapContainerRef}></S.Map>
        </S.Box>
      )}
    </>
  );
};

const S = {
  Box: styled.div`
    width: 100%;
    height: 30rem;

    background-color: ${({ theme }) => theme.palette.background};
  `,
  Map: styled.div`
    position: relative;
    width: 100%;
    height: 100%;
  `,
  LinkButtonBox: styled.div`
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
  LinkButton: styled.img`
    z-index: 10;
    box-shadow: 0 0.4rem 1.5rem rgb(0 0 0 / 30%);
    width: 3.5rem;
    border-radius: 50%;
    height: 3.5rem;
  `,
};

export default CompareMap;
