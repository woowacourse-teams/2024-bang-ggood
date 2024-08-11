import styled from '@emotion/styled';
import { useEffect } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
const { kakao } = window as any;

const Map = () => {
  useEffect(() => {
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);

    const successGeolocation = (position: GeolocationPosition) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const locPosition = new kakao.maps.LatLng(lat, lon);
      const message = '<div style="padding:5px;">여기에 계신가요?!</div>';

      displayMarker(locPosition, message);
    };

    const errorGeolocation = () => {
      const locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
      const message = 'geolocation을 사용할수 없어요..';

      displayMarker(locPosition, message);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successGeolocation, errorGeolocation);
    } else {
      errorGeolocation();
    }

    const displayMarker = (locPosition: any, message: string) => {
      const marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
      });

      const iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

      // 인포윈도우를 생성합니다
      const infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      // 인포윈도우를 마커위에 표시합니다
      infowindow.open(map, marker);

      // 지도 중심좌표를 접속위치로 변경합니다
      map.setCenter(locPosition);
    };
  });

  return <S.Container id="map">a</S.Container>;
};

const S = {
  Container: styled.div`
    width: 400px;
    height: 400px;
  `,
};

export default Map;
