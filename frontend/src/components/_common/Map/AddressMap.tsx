import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';

import { DEFAULT_POSITION } from '@/constants/map';

/* eslint-disable @typescript-eslint/no-explicit-any */
const { kakao } = window as any;

const AddressMap = ({ location }: { location: string }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<any | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const mapOption = {
      center: new kakao.maps.LatLng(DEFAULT_POSITION.lat, DEFAULT_POSITION.lon),
      level: 3,
    };

    // 지도를 생성합니다
    const map = new kakao.maps.Map(mapContainerRef.current, mapOption);

    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(location, (result: any, status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        /*첫 커스텀 마커 생성 */
        const imageSrc = 'https://github.com/user-attachments/assets/cdd2825b-407f-485a-8cc9-5d261acf815d ',
          imageSize = new kakao.maps.Size(32, 40),
          imageOption = { offset: new kakao.maps.Point(15, 45) };

        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

        const marker = new kakao.maps.Marker({
          map: map,
          position: coords,
          image: markerImage,
        });
        markerRef.current = marker;

        map.setCenter(coords);
      }
    });
  }, [location]);

  return (
    <S.Box>
      <S.Map ref={mapContainerRef}></S.Map>
    </S.Box>
  );
};

const S = {
  Box: styled.div`
    width: 100%;
    height: 300px;

    background-color: ${({ theme }) => theme.palette.background};
  `,
  Map: styled.div`
    width: 100%;
    height: 100%;
  `,
};

export default AddressMap;
