import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';

import kakaoMapImg from '@/assets/icons/map/kakaomap.webp';
import naverMapImg from '@/assets/icons/map/navermap.webp';
import { DEFAULT_POSITION } from '@/constants/map';
import createKakaoMapElements from '@/utils/createKakaoMapElements';

import loadExternalScriptWithCallback from '../../../utils/loadScript';

/* eslint-disable @typescript-eslint/no-explicit-any */

const AddressMap = ({ location }: { location: string }) => {
  const mapElement = useRef<HTMLDivElement>(null);
  const markerRef = useRef<any | null>(null);

  const { createMarker } = createKakaoMapElements();

  useEffect(() => {
    const initializeMap = () => {
      const { kakao } = window as any;

      kakao.maps.load(() => {
        if (!mapElement.current) return;
        const mapOption = {
          center: new kakao.maps.LatLng(DEFAULT_POSITION.latitude, DEFAULT_POSITION.longitude),
          level: 3,
        };

        const map = new kakao.maps.Map(mapElement.current, mapOption);

        // 주소-좌표 변환 객체 생성
        const geocoder = new kakao.maps.services.Geocoder();
        // 주소로 좌표 검색하여 해당 좌표로 중심 이동
        geocoder.addressSearch(location, (result: any, status: any) => {
          if (status === kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            const marker = createMarker(kakao, map, coords, 'primary');
            markerRef.current = marker;
            map.setCenter(coords);
          }
        });
      });
    };

    if (location) {
      loadExternalScriptWithCallback('kakaoMap', initializeMap);
    }
  }, [createMarker, location]);

  const handleOpenKakaoMap = () => {
    window.location.href = `https://map.kakao.com/?q=${location}`;
  };

  const handleOpenNaverMap = () => {
    window.location.href = `https://map.naver.com/v5/search/${location}`;
  };

  return (
    <>
      {location && (
        <S.Box>
          <S.Map ref={mapElement}>
            <S.LinkButtonBox>
              <S.LinkButton onClick={handleOpenKakaoMap} src={kakaoMapImg} />
              <S.LinkButton onClick={handleOpenNaverMap} src={naverMapImg} />
            </S.LinkButtonBox>
          </S.Map>
        </S.Box>
      )}
    </>
  );
};

const S = {
  Box: styled.div`
    width: 100%;
    height: 30rem;

    background-color: ${({ theme }) => theme.palette.background};
  `,
  Map: styled.div`
    position: relative;
    width: 100%;
    height: 100%;
  `,
  LinkButtonBox: styled.div`
    display: flex;
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 10;

    padding: 0.5rem;

    color: ${({ theme }) => theme.color.mono.white};
    gap: 1rem;
    border-radius: 0.3rem;
  `,
  LinkButton: styled.img`
    z-index: 10;
    box-shadow: 0 0.4rem 1.5rem rgb(0 0 0 / 30%);
    width: 3.5rem;
    border-radius: 50%;
    height: 3.5rem;
  `,
};

export default AddressMap;
