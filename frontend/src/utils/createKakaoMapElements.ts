/* eslint-disable @typescript-eslint/no-explicit-any */

import { DEFAULT_POSITION } from '@/constants/map';

const createKakaoMapElements = () => {
  const createMap = (kakao: any) => {
    const container = document.getElementById('map');
    if (!container) return;

    const center = new kakao.maps.LatLng(DEFAULT_POSITION.latitude, DEFAULT_POSITION.longitude);

    const options = {
      center,
      level: 3,
    };

    return new kakao.maps.Map(container, options);
  };

  const createMarker = (kakao: any, map: any, position: any) => {
    const imageSrc = 'https://github.com/user-attachments/assets/cdd2825b-407f-485a-8cc9-5d261acf815d';
    const imageSize = new kakao.maps.Size(32, 40);
    const imageOption = { offset: new kakao.maps.Point(15, 45) };
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    return new kakao.maps.Marker({
      map: map,
      position: position,
      image: markerImage,
    });
  };

  const createInfoWindow = (kakao: any, map: any, marker: any) => {
    const infoWindow = new kakao.maps.InfoWindow({
      content: '<span id="info-title">이 위치가 맞나요?</span>',
      removable: true,
    });
    infoWindow.open(map, marker);
    return infoWindow;
  };

  return { createMap, createMarker, createInfoWindow };
};

export default createKakaoMapElements;
