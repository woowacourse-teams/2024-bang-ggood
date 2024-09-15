import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import { useStore } from 'zustand';

import { BangBangCryIcon } from '@/assets/assets';
import Button from '@/components/_common/Button/Button';
import { LoadingSpinner } from '@/components/_common/LoadingSpinner/LoadingSpinner';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';
import { flexCenter } from '@/styles/common';
import { Position } from '@/types/address';
import createKakaoMapElements from '@/utils/createKakaoMapElements';
import loadExternalScriptWithCallback from '@/utils/loadScript';

type RealTimeLocationState = 'loading' | 'failure' | 'success';

interface Props {
  position: Position;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const RealTimeMap = ({ position, setPosition }: Props) => {
  const mapRef = useRef<any | null>(null);
  const markerRef = useRef<any | null>(null);
  const infoWindowRef = useRef<any | null>(null);
  const mapElement = useRef(null);
  const actions = useStore(checklistRoomInfoStore, state => state.actions);

  const { createMap, createMarker, createInfoWindow } = createKakaoMapElements();
  const [realTimeLocationState, setRealTimeLocationState] = useState<RealTimeLocationState>('loading');

  useEffect(() => {
    const initializeMap = () => {
      const { kakao } = window as any;

      kakao.maps.load(() => {
        /*카카오 맵 생성 */
        const map = createMap(kakao);
        mapRef.current = map;

        /*마커 생성*/
        const marker = createMarker(kakao, map, new kakao.maps.LatLng(position.lat, position.lon));
        markerRef.current = marker;

        /*인포윈도우 생성*/
        const infoWindow = createInfoWindow(kakao, map, marker);
        infoWindowRef.current = infoWindow;

        /*클릭할때 위치 변경*/
        kakao.maps.event.addListener(map, 'click', (mouseEvent: any) => {
          const latlng = mouseEvent.latLng;
          map.setCenter(latlng);
          setPosition({ lat: latlng.getLat(), lon: latlng.getLng() });

          if (markerRef.current) {
            markerRef.current.setPosition(latlng);
          }

          updateAddressFromCoords(latlng);
        });

        /* 실시간 위치 찾기 */
        const successGeolocation = (position: GeolocationPosition) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          const locPosition = new kakao.maps.LatLng(lat, lon);
          const message = `<span id="info-title">이 위치가 맞나요?</span>`;

          setPosition({ lat, lon });
          map.setCenter(locPosition);

          infoWindowRef.current.setContent(message);
          infoWindowRef.current.open(mapRef.current, markerRef.current);
          setRealTimeLocationState('success');
          updateAddressFromCoords(mapRef.current.getCenter());
        };

        const errorGeolocation = () => {
          setRealTimeLocationState('failure');
        };

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(successGeolocation, errorGeolocation);
        } else {
          errorGeolocation();
        }
      });
    };

    /*카카오 맵 스크립트 불러오고 콜백 실행*/
    loadExternalScriptWithCallback('kakaoMap', initializeMap);
  }, []);

  const updateAddressFromCoords = (coords: any) => {
    const { kakao } = window as any;

    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.coord2Address(coords.getLng(), coords.getLat(), (result: any, status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        /*1순위 : 도로명 주소 */
        if (result[0].road_address) {
          actions.set('address', result[0].road_address.address_name);
          actions.set('buildingName', result[0].road_address?.building_name || '');
        } else if (result[0].address.address_name) {
          /*2순위 : 지번 주소 */
          actions.set('address', result[0].address.address_name);
          actions.set('buildingName', result[0].road_address?.building_name || '');
        }
      }
    });
  };

  useEffect(() => {
    if (markerRef.current && mapRef.current && realTimeLocationState !== 'loading') {
      const { kakao } = window as any;

      const locPosition = new kakao.maps.LatLng(position.lat, position.lon);
      markerRef.current.setPosition(locPosition);
      mapRef.current.setCenter(locPosition);

      if (infoWindowRef.current) {
        infoWindowRef.current.open(mapRef.current, markerRef.current);
      }

      updateAddressFromCoords(locPosition);
    }
  }, [position]);

  return (
    <S.Container>
      <S.MapBox id="map" ref={mapElement}>
        {realTimeLocationState === 'loading' && (
          <S.MapEmptyBox>
            <S.InfoTextBox>
              <LoadingSpinner />
              <S.LoadingMessage>현재 위치를 찾고 있어요.</S.LoadingMessage>
            </S.InfoTextBox>
          </S.MapEmptyBox>
        )}
        {realTimeLocationState === 'failure' && (
          <S.MapEmptyBox>
            <S.InfoTextBox>
              <S.FailureIcon>
                <BangBangCryIcon />
              </S.FailureIcon>
              <div>위치를 찾을 수 없어요.</div>
              <div>위치를 허용하셨나요?</div>
              <div>주소 검색으로 위치를 찾으시겠어요?</div>
              <div>
                <S.AddressButton label="주소 검색" size="small" isSquare={true} color="dark" />
              </div>
            </S.InfoTextBox>
          </S.MapEmptyBox>
        )}
      </S.MapBox>
      <div id="message"></div>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    width: 100%;
  `,
  MapBox: styled.div`
    position: relative;
    width: 100%;
    min-height: 40rem;
  `,
  Message: styled.div`
    z-index: ${({ theme }) => theme.zIndex.MAP_MESSAGE};
    width: 10rem;
    height: 5rem;
  `,
  MapEmptyBox: styled.div`
    position: relative;
    z-index: 10;
    width: 100%;
    min-height: 40rem;

    background-color: ${({ theme }) => theme.palette.background};

    ${flexCenter}
  `,
  InfoTextBox: styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;

    text-align: center;
  `,
  LoadingMessage: styled.div`
    padding-top: 20px;
  `,
  FailureIcon: styled.div`
    width: 100%;
    ${flexCenter}
    margin-bottom:10px;
  `,
  AddressButton: styled(Button)`
    width: 50%;

    font-size: ${({ theme }) => theme.text.size.xSmall};
  `,
};

export default RealTimeMap;
