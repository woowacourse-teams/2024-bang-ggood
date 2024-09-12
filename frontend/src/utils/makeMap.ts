import { Position } from '@/types/address';

/* eslint-disable @typescript-eslint/no-explicit-any */
const { kakao } = window as any;

const makeMap = () => {
  const makeInitialMap = (position: Position) => {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    const mapOption = {
      center: new kakao.maps.LatLng(position.lat, position.lon),
      level: 3,
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);
    return map;
  };

  const makeCustomMarker = (map: any, position: Position) => {
    const imageSrc = 'https://github.com/user-attachments/assets/cdd2825b-407f-485a-8cc9-5d261acf815d ',
      imageSize = new kakao.maps.Size(32, 40),
      imageOption = { offset: new kakao.maps.Point(15, 45) };

    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    const marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(position.lat, position.lon),
      image: markerImage,
    });

    return marker;
  };

  const makeInfoWindow = () => {
    const infoWindow = new kakao.maps.InfoWindow({
      content: '',
      removable: true,
    });

    return infoWindow;
  };

  return { makeInitialMap, makeCustomMarker, makeInfoWindow };
};

export default makeMap;
