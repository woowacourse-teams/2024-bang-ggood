import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { useStore } from 'zustand';

import { LoadingSpinner } from '@/components/_common/LoadingSpinner/LoadingSpinner';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';
// import checklistAddressStore from '@/store/checklistAddressStore';
import { flexCenter } from '@/styles/common';
import { Position } from '@/types/address';
import makeMap from '@/utils/makeMap';

/* eslint-disable @typescript-eslint/no-explicit-any */
const { kakao } = window as any;

const RealTimeMap = ({ setPosition, position }: { position: Position; setPosition: any }) => {
  const mapRef = useRef<any | null>(null);
  const markerRef = useRef<any | null>(null);
  const infoWindowRef = useRef<any | null>(null);

  // const { setAddress, setBuildingName } = useStore(checklistAddressStore);
  const actions = useStore(checklistRoomInfoStore, state => state.actions);

  const [isRealTimeLocationLoading, setIsRealTimeLocationLoading] = useState(true);
  const mapUtils = makeMap();

  const geocoder = new kakao.maps.services.Geocoder();

  const displayMarker = (locPosition: any, message: string) => {
    if (markerRef.current) {
      markerRef.current.setPosition(locPosition);
    } else {
      markerRef.current = new kakao.maps.Marker({
        map: mapRef.current,
        position: locPosition,
      });
    }

    if (infoWindowRef.current) {
      infoWindowRef.current.setContent(message);
      infoWindowRef.current.open(mapRef.current, markerRef.current);
    } else {
      infoWindowRef.current = new kakao.maps.InfoWindow({
        content: message,
        removable: true,
      });
      infoWindowRef.current.open(mapRef.current, markerRef.current);
    }

    mapRef.current.setCenter(locPosition);
  };

  const successGeolocation = (position: GeolocationPosition) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const locPosition = new kakao.maps.LatLng(lat, lon);
    const message = `<span id="info-title">이 위치가 맞나요?</span>`;

    setPosition({ lat, lon });
    displayMarker(locPosition, message);
    searchDetailAddrFromCoords(mapRef.current.getCenter());
    setIsRealTimeLocationLoading(false);
  };

  const errorGeolocation = () => {
    const locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
    const message = `<span id="info-title">현재 위치를 불러올 수 없어요.</span>`;

    displayMarker(locPosition, message);
    setIsRealTimeLocationLoading(false);
  };

  useEffect(() => {
    /* geolocation으로 현재 실시간 위치 받아오기*/
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successGeolocation, errorGeolocation);
    } else {
      errorGeolocation();
    }

    /*기본 지도, 마커, 인포윈도우 생성*/
    const map = mapUtils.makeInitialMap(position);
    const customMarker = mapUtils.makeCustomMarker(map, position);
    const infoWindow = mapUtils.makeInfoWindow();

    mapRef.current = map;
    markerRef.current = customMarker;
    infoWindowRef.current = infoWindow;

    /*클릭시 해당 위치로 위치 상태 변경*/
    kakao.maps.event.addListener(map, 'click', (mouseEvent: any) => {
      const latlng = mouseEvent.latLng;

      setPosition({
        lat: latlng.getLat(),
        lon: latlng.getLng(),
      });
    });
  }, []);

  /* 좌표로 법정동 상세 주소 정보를 요청*/
  const searchDetailAddrFromCoords = (coords: any) => {
    const getDetailAddress = (result: any, status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        /*1순위 : 도로명 주소 */
        if (result[0].road_address) {
          actions.set('address', result[0].road_address.address_name);
          if (result[0].road_address?.building_name) {
            actions.set('buildingName', result[0].road_address.building_name);
          } else {
            actions.set('buildingName', '');
          }
          return;
        }
        /*2순위 : 지번 주소 */
        if (result[0].address.address_name) {
          actions.set('address', result[0].address.address_name);

          if (result[0].road_address?.building_name) {
            actions.set('buildingName', result[0].road_address.building_name);
          } else {
            actions.set('buildingName', '');
          }
        }
      }
    };

    geocoder.coord2Address(coords.getLng(), coords.getLat(), getDetailAddress);
  };

  /* 위치가 수정될 때마다 마커의 위치를 옮기기 */
  useEffect(() => {
    if (markerRef.current && mapRef.current && !isRealTimeLocationLoading) {
      const locPosition = new kakao.maps.LatLng(position.lat, position.lon);
      markerRef.current.setPosition(locPosition);
      mapRef.current.setCenter(locPosition);

      /* infoWindow가 존재할 경우 닫고 제거 */
      if (infoWindowRef.current) {
        infoWindowRef.current.close();
        infoWindowRef.current = null;
      }

      searchDetailAddrFromCoords(mapRef.current.getCenter());
    }
  }, [position, markerRef]);

  return (
    <S.Container>
      <S.MapBox id="map">
        {isRealTimeLocationLoading && (
          <S.MapEmptyBox>
            <S.LoadingBox>
              <LoadingSpinner />
              <S.LoadingMessage>현재 위치를 찾고 있어요.</S.LoadingMessage>
            </S.LoadingBox>
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
  LoadingBox: styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    height: 20px;

    text-align: center;
  `,
  LoadingMessage: styled.div`
    padding-top: 20px;
  `,
};

export default RealTimeMap;
