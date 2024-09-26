import { useStore } from 'zustand';

import { getNearSubway } from '@/apis/subway';
import roomInfoUnvalidatedStore from '@/store/roomInfoUnvalidatedStore';

/** 
roomInfoUnvalidatedStore : 방 기본정보에서 인풋 형식이 아니고, 검증이 필요없는 필드에 대한
함수를 모아놓은 훅입니다. (주소, 지하철, 관리비, 방구조)
* @returns 
* findNearSubway : 가까운 지하철을 찾고 전역에 설정해주는 함수입니다.
*/
const useRoomInfoUnvalidatedStore = () => {
  const roomInfoUnvalidatedActions = useStore(roomInfoUnvalidatedStore, state => state.actions);

  const findNearSubway = async ({ lat, lon }: { lat: number; lon: number }) => {
    const nearSubways = await getNearSubway({ lat, lon });
    roomInfoUnvalidatedActions.set('nearSubwayStation', nearSubways);
    return nearSubways;
  };

  const findSubwayByAddress = (address: string) => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const { kakao } = window as any;

    new kakao.maps.load(() => {
      const geocoder = new kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, function (result: any, status: any) {
        /* 정상적으로 검색이 완료됐으면*/
        if (status === kakao.maps.services.Status.OK) {
          return findNearSubway({ lat: result[0].y, lon: result[0].x });
        }
      });
    });
  };

  return { findNearSubway, findSubwayByAddress };
};

export default useRoomInfoUnvalidatedStore;
