import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';

import defaultMap from '@/assets/images/default-compare-map.webp';
import Marker from '@/components/_common/Marker/Marker';
import theme from '@/styles/theme';
import { Position } from '@/types/address';
import createKakaoMapElements from '@/utils/createKakaoMapElements';
import { getDistanceFromLatLonInKm, getMapLevel } from '@/utils/mapHelper';

import loadExternalScriptWithCallback from '../../../utils/loadScript';

/* eslint-disable @typescript-eslint/no-explicit-any */
const RoomCompareMap = ({ positions }: { positions: Position[] }) => {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  const [{ latitude: room1Latitude, longitude: room1Logitude }, { latitude: room2Latitude, longitude: room2Logitude }] =
    positions;

  const hasAddressRoom1 = room1Latitude && room1Logitude;
  const hasAddressRoom2 = room2Latitude && room2Logitude;

  useEffect(() => {
    const initializeMap = () => {
      const { kakao } = window as any;

      if (hasAddressRoom1 && !hasAddressRoom2) {
        kakao.maps.load(() => {
          if (!mapElement.current) return;
          const mapOption = {
            center: new kakao.maps.LatLng(room1Latitude, room1Logitude),
            level: 3,
          };

          const map = new kakao.maps.Map(mapElement.current, mapOption);
          mapRef.current = map;

          const { createMarker } = createKakaoMapElements();

          const marker2 = createMarker(
            kakao,
            map,
            new kakao.maps.LatLng(room1Latitude, room1Logitude),
            'primary',
            'first',
          );
          marker2.setMap(map);
        });
      }

      if (!hasAddressRoom1 && hasAddressRoom2) {
        kakao.maps.load(() => {
          if (!mapElement.current) return;
          const mapOption = {
            center: new kakao.maps.LatLng(room2Latitude, room2Logitude),
            level: 3,
          };

          const map = new kakao.maps.Map(mapElement.current, mapOption);
          mapRef.current = map;

          const { createMarker } = createKakaoMapElements();

          const marker2 = createMarker(
            kakao,
            map,
            new kakao.maps.LatLng(room2Latitude, room2Logitude),
            'secondary',
            'second',
          );
          marker2.setMap(map);
        });
      }

      if (hasAddressRoom1 && hasAddressRoom2) {
        const centerOfPosition = {
          latitude: (room1Latitude + room2Latitude) / 2,
          longitude: (room1Logitude + room2Logitude) / 2,
        };

        const diff = getDistanceFromLatLonInKm(room1Latitude, room1Logitude, room2Latitude, room2Logitude);
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
            new kakao.maps.LatLng(room1Latitude, room1Logitude),
            'primary',
            'first',
          );
          marker1.setMap(map);

          const marker2 = createMarker(
            kakao,
            map,
            new kakao.maps.LatLng(room2Latitude, room2Logitude),
            'secondary',
            'second',
          );

          marker2.setMap(map);
        });
      }
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

  if (!hasAddressRoom1 && !hasAddressRoom2) {
    return (
      <S.Box>
        <S.DefaultImgBox src={defaultMap} />
        <S.CenterText>
          주소를 설정하시면 <br />
          지도가 표시됩니다.
        </S.CenterText>
      </S.Box>
    );
  }

  return (
    <>
      {location && (
        <S.Box>
          <S.Map ref={mapElement}>
            <S.RoomMarkBox>
              <Marker
                disabled={!hasAddressRoom1}
                isCircle={false}
                color={theme.palette.yellow500}
                text="A방"
                size="medium"
                onClick={() => handleRoomMarkerClick(0)}
              />
              <Marker
                disabled={!hasAddressRoom2}
                isCircle={false}
                color={theme.palette.green500}
                text="B방"
                size="medium"
                onClick={() => handleRoomMarkerClick(1)}
              />
            </S.RoomMarkBox>
          </S.Map>
        </S.Box>
      )}
    </>
  );
};

const S = {
  Box: styled.div`
    position: relative;
    width: 100%;
    height: 20rem;

    background-color: ${({ theme }) => theme.color.gray[50]};
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

    color: ${({ theme }) => theme.color.mono.white};
    gap: 1rem;
    border-radius: 0.3rem;
  `,
  CenterText: styled.span`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
  DefaultImgBox: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
};

export default RoomCompareMap;
