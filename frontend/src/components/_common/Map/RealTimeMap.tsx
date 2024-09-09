import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { useStore } from 'zustand';

import checklistAddressStore from '@/store/checklistAddressStore';
import { flexCenter } from '@/styles/common';
import makeMap from '@/utils/makeMap';

/* eslint-disable @typescript-eslint/no-explicit-any */
const { kakao } = window as any;

const RealTimeMap = () => {
  const mapRef = useRef<any | null>(null);
  const markerRef = useRef<any | null>(null);
  const infoWindowRef = useRef<any | null>(null);

  const { setAddress, setBuildingName, setPosition, position } = useStore(checklistAddressStore);

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
          setAddress(result[0].road_address.address_name);
          if (result[0].road_address?.building_name) {
            setBuildingName(result[0]?.road_address?.building_name);
          } else {
            setBuildingName('');
          }
          return;
        }
        /*2순위 : 지번 주소 */
        if (result[0].address.address_name) {
          setAddress(result[0].address.address_name);
          if (result[0].road_address?.building_name) {
            setBuildingName(result[0].road_address.building_name);
          } else {
            setBuildingName('');
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
      infoWindowRef.current.open(mapRef.current, markerRef.current);
      searchDetailAddrFromCoords(mapRef.current.getCenter());
    }
  }, [position, markerRef]);

  return (
    <S.Container>
      <>
        <S.MapBox id="map">
          <S.MapEmptyBox>지도 준비 중</S.MapEmptyBox>
        </S.MapBox>
        <div id="message"></div>
      </>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    width: 100%;
  `,
  MapBox: styled.div`
    width: 100%;
    min-height: 40rem;
  `,
  Message: styled.div`
    z-index: ${({ theme }) => theme.zIndex.MAP_MESSAGE};
    width: 10rem;
    height: 5rem;
  `,
  MapEmptyBox: styled.div`
    width: 100%;
    min-height: 40rem;

    background-color: ${({ theme }) => theme.palette.background};
    ${flexCenter}
  `,
  LoadingSpinner: styled.div`
    z-index: 100;
    transform: translate(-50%, -50%);
  `,
};

export default RealTimeMap;
