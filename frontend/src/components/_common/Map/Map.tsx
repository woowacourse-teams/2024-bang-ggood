import styled from '@emotion/styled';
import { useEffect } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
const { kakao } = window as any;

const Map = () => {
  useEffect(() => {
    const mapContainer = document.getElementById('map'); // 지도를 표시할 div
    const mapOption = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(mapContainer, mapOption); // 지도 생성
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
