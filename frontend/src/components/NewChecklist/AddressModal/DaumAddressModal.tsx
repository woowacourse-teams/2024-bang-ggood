import styled from '@emotion/styled';
import { useCallback, useEffect, useRef } from 'react';

import Button from '@/components/_common/Button/Button';
import Modal from '@/components/_common/Modal/Modal';
import loadPostcode from '@/components/NewChecklist/AddressModal/loadPostcode';
import useModalOpen from '@/hooks/useModalOpen';
import { Address, Postcode, PostcodeOptions } from '@/types/address';

declare global {
  interface Window {
    daum?: {
      Postcode: new (options: PostcodeOptions) => Postcode;
    };
  }
}

const scriptUrl = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

interface Props {
  setAddress: (address: string) => void;
}

const DaumAddressModal = ({ setAddress }: Props) => {
  const { isModalOpen, modalOpen, modalClose } = useModalOpen();
  const postcodeContainerRef = useRef<HTMLDivElement | null>(null);

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
        height: '600px',
        oncomplete: (data: Address) => {
          // TODO: 위도, 경도까지 보내주기
          setAddress(data.address);
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
          <div ref={postcodeContainerRef} style={{ width: '100%', marginTop: '10px' }} />
        </Modal.body>
      </Modal>
    </>
  );
};

export default DaumAddressModal;

const S = {
  AddressButton: styled(Button)`
    width: calc(50% - 10px);
    padding: 10px;

    font-size: ${({ theme }) => theme.text.size.xSmall};
  `,
};
