import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';

import { BangBangCryIcon } from '@/assets/assets';
import Button from '@/components/_common/Button/Button';
import { LoadingSpinner } from '@/components/_common/LoadingSpinner/LoadingSpinner';
import { DEFAULT_POSITION } from '@/constants/map';
import { flexCenter } from '@/styles/common';
import { Position } from '@/types/address';
import createKakaoMapElements from '@/utils/createKakaoMapElements';
import loadExternalScriptWithCallback from '@/utils/loadScript';

type RealTimeLocationState = 'loading' | 'failure' | 'success';

interface Props {
  position: Position;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  setCurrentAddress: React.Dispatch<React.SetStateAction<string>>;
  setCurrentBuildingName: React.Dispatch<React.SetStateAction<string>>;
  handleSubmitAddress: () => void;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const RealTimeMap = ({
  position,
  setPosition,
  setCurrentAddress,
  setCurrentBuildingName,
  handleSubmitAddress,
}: Props) => {
  const mapRef = useRef<any | null>(null);
  const markerRef = useRef<any | null>(null);
  const infoWindowRef = useRef<any | null>(null);
  const mapElement = useRef(null);

  const { createMarker, createInfoWindow } = createKakaoMapElements();
  const [realTimeLocationState, setRealTimeLocationState] = useState<RealTimeLocationState>('loading');

  const initializeMap = () => {
    const { kakao } = window as any;

    kakao.maps.load(() => {
      /*카카오 맵 생성 */
      const mapOption = {
        center: new kakao.maps.LatLng(DEFAULT_POSITION.latitude, DEFAULT_POSITION.longitude),
        level: 3,
      };

      const map = new kakao.maps.Map(mapElement.current, mapOption);
      mapRef.current = map;

      /*마커 생성*/
      const marker = createMarker(kakao, map, new kakao.maps.LatLng(position.latitude, position.longitude), 'primary');
      markerRef.current = marker;

      /*인포윈도우 생성*/
      const infoWindow = createInfoWindow(kakao, map, marker);
      infoWindowRef.current = infoWindow;

      /*클릭할때 위치 변경*/
      kakao.maps.event.addListener(map, 'click', (mouseEvent: any) => {
        const latlng = mouseEvent.latLng;
        map.setCenter(latlng);
        setPosition({ latitude: latlng.getLat(), longitude: latlng.getLng() });

        if (markerRef.current) {
          markerRef.current.setPosition(latlng);
        }

        updateAddressFromCoords(latlng);
      });
      /* 실시간 위치 찾기 */
      const successGeolocation = (position: GeolocationPosition) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const locPosition = new kakao.maps.LatLng(latitude, longitude);
        const message = `<span id="info-title">이 위치가 맞나요?</span>`;

        setPosition({ latitude, longitude });
        map.setCenter(locPosition);
        setRealTimeLocationState('success');

        infoWindowRef.current.setContent(message);
        infoWindowRef.current.open(mapRef.current, markerRef.current);
        updateAddressFromCoords(mapRef.current.getCenter());
      };

      const errorGeolocation = () => {
        setRealTimeLocationState('failure');
      };

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successGeolocation, errorGeolocation);
      } else {
        errorGeolocation();
      }
    });
  };

  useEffect(() => {
    /*카카오 맵 스크립트 불러오고 콜백 실행*/
    loadExternalScriptWithCallback('kakaoMap', initializeMap);
  }, []);

  const updateAddressFromCoords = (coords: any) => {
    const { kakao } = window as any;

    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.coord2Address(coords.getLng(), coords.getLat(), (result: any, status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        /*1순위 : 도로명 주소 */
        if (result[0].road_address) {
          setCurrentAddress(result[0].road_address.address_name);
        } else if (result[0].address.address_name) {
          /*2순위 : 지번 주소 */
          setCurrentAddress(result[0].address.address_name);
        }
        setCurrentBuildingName(result[0].road_address?.building_name || '');
      }
    });
  };

  useEffect(() => {
    if (markerRef.current && mapRef.current && realTimeLocationState !== 'loading') {
      const { kakao } = window as any;

      const locPosition = new kakao.maps.LatLng(position.latitude, position.longitude);
      markerRef.current.setPosition(locPosition);
      mapRef.current.setCenter(locPosition);

      if (infoWindowRef.current) {
        infoWindowRef.current.open(mapRef.current, markerRef.current);
      }

      updateAddressFromCoords(locPosition);
    }
  }, [position]);

  const onClickKakaoMap = () => loadExternalScriptWithCallback('kakaoMap', initializeMap);

  return (
    <S.Container>
      <S.Map id="map" ref={mapElement}>
        {realTimeLocationState === 'loading' && (
          <S.MapEmptyBox>
            <S.InfoTextBox>
              <LoadingSpinner />
              <S.LoadingMessage tabIndex={0}>
                <div>현재 위치를 찾고 있어요.</div>
                <div>위치 권한을 허용해 주세요.</div>
              </S.LoadingMessage>
            </S.InfoTextBox>
          </S.MapEmptyBox>
        )}
        {realTimeLocationState === 'failure' && (
          <S.MapEmptyBox>
            <S.InfoTextBox>
              <S.FailureIcon>
                <BangBangCryIcon />
              </S.FailureIcon>
              <div>현재 위치를 찾을 수 없어요.</div>
              <div>위치를 허용하셨는지 확인 후,</div>
              <div>다시 시도해 주세요.</div>
              <S.RetryButtonBox size={'xSmall'} color={'dark'} onClick={onClickKakaoMap} label="다시 시도" />
            </S.InfoTextBox>
          </S.MapEmptyBox>
        )}
      </S.Map>
      <div id="message"></div>
      {realTimeLocationState === 'success' && (
        <S.ButtonBox>
          <Button label="이 위치로 설정할게요." size="full" isSquare={true} onClick={() => handleSubmitAddress()} />
        </S.ButtonBox>
      )}
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    width: 100%;
  `,
  Map: styled.div`
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
  RetryButtonBox: styled(Button)`
    margin-top: 2rem;
  `,
  InfoTextBox: styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 100;
    width: 80%;

    text-align: center;
    transform: translate(-50%, -50%);
  `,
  LoadingMessage: styled.div`
    padding-top: 2rem;
  `,
  FailureIcon: styled.div`
    width: 100%;
    ${flexCenter}
    margin-bottom:1rem;
  `,
  AddressButton: styled(Button)`
    width: 50%;

    font-size: ${({ theme }) => theme.text.size.xSmall};
  `,
  ButtonBox: styled.div`
    display: flex;
    margin-top: 1rem;
  `,
};

export default RealTimeMap;
