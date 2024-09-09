import styled from '@emotion/styled';
import { useCallback, useEffect, useRef } from 'react';
import { useStore } from 'zustand';

import Button from '@/components/_common/Button/Button';
import Modal from '@/components/_common/Modal/Modal';
import loadPostcode from '@/components/NewChecklist/AddressModal/loadPostcode';
import useFindNearSubway from '@/hooks/useFindNearSubway';
import useModalOpen from '@/hooks/useModalOpen';
import checklistAddressStore from '@/store/checklistAddressStore';
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
  const { isModalOpen, modalOpen, modalClose } = useModalOpen();
  const postcodeContainerRef = useRef<HTMLDivElement | null>(null);
  const { setAddress, setBuildingName, setPosition } = useStore(checklistAddressStore);
  const { findNearSubway } = useFindNearSubway();

  useEffect(() => {
    loadPostcode(scriptUrl).catch(error => {
      console.error('Failed to load Daum postcode script:', error);
    });
  }, []);

  const openPostcodeEmbed = useCallback(() => {
    modalOpen();
    if (window.daum?.Postcode && postcodeContainerRef.current) {
      new window.daum.Postcode({
        width: '100%',
        height: '60rem',
        oncomplete: async (data: Address) => {
          setAddress(data.address);
          setBuildingName(data.buildingName);

          const geocoder = new kakao.maps.services.Geocoder();

          geocoder.addressSearch(data.address, function (result: any, status: any) {
            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {
              setPosition({ lat: result[0].y, lon: result[0].x });
            }
          });

          modalClose();

          await findNearSubway();
        },
      }).embed(postcodeContainerRef.current, { q: '' });
    } else {
      console.error('Daum Postcode is not loaded yet');
    }
  }, []);

  return (
    <>
      <S.AddressButton size="xSmall" color="dark" label="주소 검색" isSquare={true} onClick={openPostcodeEmbed} />
      <Modal position="bottom" isOpen={isModalOpen} onClose={modalClose}>
        <Modal.header>주소 검색</Modal.header>
        <Modal.body>
          <S.EmptyBox />
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
