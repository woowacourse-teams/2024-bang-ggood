import styled from '@emotion/styled';
import { useRef } from 'react';
import { useStore } from 'zustand';

import { Search } from '@/assets/assets';
import Button from '@/components/_common/Button/Button';
import Modal from '@/components/_common/Modal/Modal';
import useModal from '@/hooks/useModal';
import useRoomInfoUnvalidatedStore from '@/hooks/useRoomInfoUnvalidatedStore';
import roomInfoUnvalidatedStore from '@/store/roomInfoUnvalidatedStore';
import { Address, Postcode, PostcodeOptions } from '@/types/address';
import loadExternalScriptWithCallback from '@/utils/loadScript';

declare global {
  interface Window {
    daum?: {
      Postcode: new (options: PostcodeOptions) => Postcode;
    };
  }
}

const DaumAddressModal = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const postcodeContainerRef = useRef<HTMLDivElement | null>(null);

  const { findSubwayByAddress } = useRoomInfoUnvalidatedStore();
  const roomInfoUnvalidatedActions = useStore(roomInfoUnvalidatedStore, state => state.actions);

  const handleAddress = () => {
    openModal();
    loadExternalScriptWithCallback('daumAddress', openPostcodeEmbed);
  };

  // findSubwayByAddress(data);

  // const findPosition = (data: Address) => {
  //   /* eslint-disable @typescript-eslint/no-explicit-any */
  //   const { kakao } = window as any;

  //   new kakao.maps.load(() => {
  //     const geocoder = new kakao.maps.services.Geocoder();

  //     geocoder.addressSearch(data.address, function (result: any, status: any) {
  //       /* 정상적으로 검색이 완료됐으면*/
  //       if (status === kakao.maps.services.Status.OK) {
  //         findNearSubway({ lat: result[0].y, lon: result[0].x });
  //       }
  //       closeModal();
  //     });
  //   });
  // };

  const openPostcodeEmbed = () => {
    if (window.daum?.Postcode && postcodeContainerRef.current) {
      new window.daum.Postcode({
        width: '100%',
        height: '60rem',
        oncomplete: async (data: Address) => {
          roomInfoUnvalidatedActions.set('address', data.address);
          roomInfoUnvalidatedActions.set('buildingName', data.buildingName);

          loadExternalScriptWithCallback('kakaoMap', () => findSubwayByAddress(data.address));
          closeModal();
        },
      }).embed(postcodeContainerRef.current, { q: '' });
    } else {
      console.error('Daum Postcode is not loaded yet');
    }
  };

  return (
    <>
      <S.AddressButton
        onClick={handleAddress}
        label="주소 검색"
        size="full"
        isSquare={true}
        color="dark"
        Icon={Search}
      />
      <Modal position="bottom" isOpen={isModalOpen} onClose={closeModal}>
        <Modal.header>주소 검색</Modal.header>
        <Modal.body>
          <div ref={postcodeContainerRef} style={{ width: '100%', marginTop: '1rem' }} />
        </Modal.body>
      </Modal>
    </>
  );
};

export default DaumAddressModal;

const S = {
  AddressButton: styled(Button)`
    width: 50%;
    height: 4.2rem;
    padding: 0.4rem;

    font-size: ${({ theme }) => theme.text.size.xSmall};
  `,
  EmptyBox: styled.div`
    width: 100%;
    height: 20px;
  `,
};
