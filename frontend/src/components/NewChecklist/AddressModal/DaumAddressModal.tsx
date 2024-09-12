import styled from '@emotion/styled';
import { useCallback, useEffect, useRef } from 'react';
import { useStore } from 'zustand';

import Button from '@/components/_common/Button/Button';
import Modal from '@/components/_common/Modal/Modal';
import loadPostcode from '@/components/NewChecklist/AddressModal/loadPostcode';
import useFindNearSubway from '@/hooks/useFindNearSubway';
import useModal from '@/hooks/useModal';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';
import { Address, Postcode, PostcodeOptions } from '@/types/address';

declare global {
  interface Window {
    daum?: {
      Postcode: new (options: PostcodeOptions) => Postcode;
    };
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const { kakao } = window as any;

const scriptUrl = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

const DaumAddressModal = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const postcodeContainerRef = useRef<HTMLDivElement | null>(null);
  const actions = useStore(checklistRoomInfoStore, state => state.actions);

  const { findNearSubway } = useFindNearSubway();

  useEffect(() => {
    loadPostcode(scriptUrl).catch(error => {
      console.error('Failed to load Daum postcode script:', error);
    });
  }, []);

  const openPostcodeEmbed = useCallback(() => {
    openModal();
    if (window.daum?.Postcode && postcodeContainerRef.current) {
      new window.daum.Postcode({
        width: '100%',
        height: '60rem',
        oncomplete: async (data: Address) => {
          actions.set('address', data.address);
          actions.set('buildingName', data.buildingName);

          const geocoder = new kakao.maps.services.Geocoder();

          geocoder.addressSearch(data.address, function (result: any, status: any) {
            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {
              findNearSubway({ lat: result[0].y, lon: result[0].x });
            }
          });
          closeModal();
        },
      }).embed(postcodeContainerRef.current, { q: '' });
    } else {
      console.error('Daum Postcode is not loaded yet');
    }
  }, []);

  return (
    <>
      <S.AddressButton size="xSmall" color="dark" label="주소 검색" isSquare={true} onClick={openPostcodeEmbed} />
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

    font-size: ${({ theme }) => theme.text.size.xSmall};
  `,
  EmptyBox: styled.div`
    width: 100%;
    height: 20px;
  `,
};
