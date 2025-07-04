import styled from '@emotion/styled';
import { useRef } from 'react';

import Button from '@/components/_common/Button/Button';
import Modal from '@/components/_common/Modal/Modal';
import useModal from '@/hooks/useModal';
import useRoomInfoNonValidated from '@/hooks/useRoomInfoNonValidated';
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
  const { set } = useRoomInfoNonValidated();

  const { searchSubwayStationsByAddress } = useRoomInfoNonValidated();

  const handleClickAddress = () => {
    loadExternalScriptWithCallback('daumAddress', openPostcodeEmbed);
    openModal();
  };

  const openPostcodeEmbed = () => {
    if (window.daum?.Postcode && postcodeContainerRef.current) {
      new window.daum.Postcode({
        width: '100%',
        height: '60rem',
        oncomplete: async (data: Address) => {
          set('address', data.address);
          set('buildingName', data.buildingName);

          loadExternalScriptWithCallback('kakaoMap', () => searchSubwayStationsByAddress(data.address));
          closeModal();
        },
      }).embed(postcodeContainerRef.current, { q: '' });
    } else {
      console.error('Daum Postcode is not loaded yet');
    }
  };

  return (
    <>
      <Button label="주소 검색" onClick={handleClickAddress} size="full" variant="outlined" color="dark" />
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
    height: 4.5rem;
    padding: 0.4rem;

    font-size: ${({ theme }) => theme.text.size.small};
  `,
  EmptyBox: styled.div`
    width: 100%;
    height: 20px;
  `,
};
