import { useStore } from 'zustand';

import { getNearSubways } from '@/apis/subway';
import roomInfoNonValidatedStore from '@/store/roomInfoNonValidatedStore';
import roomInfoStore from '@/store/roomInfoStore';
import { Position } from '@/types/address';
/** 
useRoomInfoNonValidated : 방 기본정보에서 인풋 형식이 아니고, 검증이 필요없는 필드에 대한
함수를 모아놓은 훅입니다. (주소, 지하철, 관리비, 방구조)
* @returns 
* set : address와 buildingName을 스토어에 저장하는 함수 (roomInfoStore에 저장)
* fetchNearbySubwayStations : 가까운 지하철을 찾고 전역에 설정해주는 함수입니다.
* searchSubwayStationsByAddress : 주소를 기반으로 위도, 경도를 찾아서 지하철 역을 찾아주는 함수입니다.
*/
const useRoomInfoNonValidated = () => {
  const roomInfoNonValidated = useStore(roomInfoNonValidatedStore, state => state.actions);
  const roomInfoActions = useStore(roomInfoStore, state => state.actions);

  const set = (name: 'address' | 'buildingName', value: string) =>
    roomInfoActions.set({ [name]: { rawValue: value, errorMessage: '' } });

  const searchSubwayStationsByPosition = async ({ latitude, longitude }: Position) => {
    const nearSubways = await getNearSubways({ latitude, longitude });

    roomInfoNonValidated.set('position', { latitude, longitude });
    roomInfoNonValidated.set('nearSubwayStation', nearSubways.stations);
    return nearSubways;
  };

  const searchSubwayStationsByAddress = (address: string) => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const { kakao } = window as any;

    new kakao.maps.load(() => {
      const geocoder = new kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, function (result: any, status: any) {
        /* 정상적으로 검색이 완료됐으면*/
        if (status === kakao.maps.services.Status.OK) {
          return searchSubwayStationsByPosition({ latitude: result[0].y, longitude: result[0].x });
        }
      });
    });
  };

  return { set, searchSubwayStationsByPosition, searchSubwayStationsByAddress };
};

export default useRoomInfoNonValidated;
