import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';

import { Address, Position } from '@/types/address';

/* eslint-disable @typescript-eslint/no-explicit-any */
const { kakao } = window as any;

interface Props {
  currentAddress: Address;
  setCurrentAddress: React.Dispatch<React.SetStateAction<Address>>;
  position: Position;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
}

const Map = ({ position, setPosition, currentAddress, setCurrentAddress }: Props) => {
  const mapRef = useRef<any | null>(null);
  const markerRef = useRef<any | null>(null);
  const infoWindowRef = useRef<any | null>(null);

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
  };

  const errorGeolocation = () => {
    const locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
    const message = `<span id="info-title">현재 위치를 불러올 수 없어요.</span>`;

    displayMarker(locPosition, message);
  };

  /* 좌표로 법정동 상세 주소 정보를 요청합니다*/
  const searchDetailAddrFromCoords = (coords: any, callback: any) => {
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
  };

  const getDetailAddress = (result: any, status: any) => {
    if (status === kakao.maps.services.Status.OK) {
      if (result[0].address) {
        setCurrentAddress(prev => ({ ...prev, jibunAddress: result[0].address.address_name }));
      }
      if (result[0].road_address) {
        setCurrentAddress(prev => ({ ...prev, address: result[0].road_address.address_name }));
        setCurrentAddress(prev => ({ ...prev, buildingName: result[0].road_address.building_name }));
        //TODO: 빌딩 주소가 없을 때도 있음.
      }
    }
  };

  useEffect(() => {
    /*첫 지도 생성 */
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    const mapOption = {
      center: new kakao.maps.LatLng(position.lat, position.lon),
      level: 3,
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);
    mapRef.current = map;

    /*첫 커스텀 마커 생성 */
    const imageSrc = 'https://github.com/user-attachments/assets/cdd2825b-407f-485a-8cc9-5d261acf815d ',
      imageSize = new kakao.maps.Size(32, 40),
      imageOption = { offset: new kakao.maps.Point(15, 45) };

    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    const marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(position.lat, position.lon),
      image: markerImage,
    });
    markerRef.current = marker;

    /*첫 인포윈도우 생성 */
    infoWindowRef.current = new kakao.maps.InfoWindow({
      content: '<span id="info-title">이 위치가 맞나요?</span>',
      removable: true,
    });

    /*geolocation으로 현재 실시간 위치 받아오기*/
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

  /*위치가 수정될 때마다 마커의 위치를 옮기기 */
  useEffect(() => {
    if (markerRef.current && mapRef.current) {
      const locPosition = new kakao.maps.LatLng(position.lat, position.lon);
      markerRef.current.setPosition(locPosition);
      mapRef.current.setCenter(locPosition);
      infoWindowRef.current.open(mapRef.current, markerRef.current);
      searchDetailAddrFromCoords(mapRef.current.getCenter(), getDetailAddress);
    }
  }, [position]);

  return (
    <S.Container>
      <S.MapBox id="map"></S.MapBox>
      <div id="message"></div>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    width: 100%;
  `,
  MapBox: styled.div`
    width: 100%;
    min-height: 400px;
  `,
  Message: styled.div`
    z-index: 100;
    width: 100px;
    height: 50px;
  `,
};

export default Map;
