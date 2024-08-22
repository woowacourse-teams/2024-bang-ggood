import styled from '@emotion/styled';
import { useCallback, useEffect, useRef } from 'react';
import { useStore } from 'zustand';

import Button from '@/components/_common/Button/Button';
import Modal from '@/components/_common/Modal/Modal';
import loadPostcode from '@/components/NewChecklist/AddressModal/loadPostcode';
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

const scriptUrl = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

const DaumAddressModal = () => {
  const { isModalOpen, modalOpen, modalClose } = useModalOpen();
  const postcodeContainerRef = useRef<HTMLDivElement | null>(null);
  const { setAddress, setBuildingName } = useStore(checklistAddressStore);

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
        oncomplete: (data: Address) => {
          setAddress(data.address);
          setBuildingName(data.buildingName);
          modalClose();
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
