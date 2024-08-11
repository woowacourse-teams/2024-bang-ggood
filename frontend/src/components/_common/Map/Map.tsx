import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
const { kakao } = window as any;

type Position = {
  lat: number;
  lon: number;
};

const Map = () => {
  const [position, setPosition] = useState<Position>({ lat: 33.450701, lon: 126.570667 });
  const mapRef = useRef<any | null>(null);
  const markerRef = useRef<any | null>(null);

  useEffect(() => {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    const mapOption = {
      center: new kakao.maps.LatLng(position.lat, position.lon),
      level: 3,
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);
    mapRef.current = map;

    const marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(position.lat, position.lon),
    });
    markerRef.current = marker;

    const displayMarker = (locPosition: any, message: string) => {
      console.log(message);

      if (markerRef.current) {
        markerRef.current.setPosition(locPosition);
      } else {
        markerRef.current = new kakao.maps.Marker({
          map: map,
          position: locPosition,
        });
      }

      map.setCenter(locPosition);
    };

    const successGeolocation = (position: GeolocationPosition) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const locPosition = new kakao.maps.LatLng(lat, lon);
      const message = '여기에 계신가요?!';

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

    kakao.maps.event.addListener(map, 'click', (mouseEvent: any) => {
      const latlng = mouseEvent.latLng;

      setPosition({
        lat: latlng.getLat(),
        lon: latlng.getLng(),
      });

      let message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
      message += '경도는 ' + latlng.getLng() + ' 입니다';

      const resultDiv = document.getElementById('message');
      if (resultDiv) {
        resultDiv.innerHTML = message;
      }
    });
  }, []);

  useEffect(() => {
    if (markerRef.current && mapRef.current) {
      const locPosition = new kakao.maps.LatLng(position.lat, position.lon);
      markerRef.current.setPosition(locPosition);
      mapRef.current.setCenter(locPosition);
    }
  }, [position]);

  return (
    <div>
      <S.Container id="map"></S.Container>
    </div>
  );
};

const S = {
  Container: styled.div`
    width: 400px;
    height: 400px;
  `,
  Message: styled.div`
    z-index: 100;
    width: 100px;
    height: 50px;
  `,
};

export default Map;
