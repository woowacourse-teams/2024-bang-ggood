import styled from '@emotion/styled';
import { useState } from 'react';

import Button from '@/components/_common/Button/Button';
import Input from '@/components/_common/Input/Input';
import Map from '@/components/_common/Map/Map';
import Modal from '@/components/_common/Modal/Modal';
import useModalOpen from '@/hooks/useModalOpen';
import { Address, Position } from '@/types/address';

const RealTimeAddressModal = () => {
  const { isModalOpen, modalOpen, modalClose } = useModalOpen();
  const [position, setPosition] = useState<Position>({ lat: 30.5151763, lon: 127.1031642 });
  const [currentAddress, setCurrentAddress] = useState<Address>({
    address: '',
    buildingName: '',
    jibunAddress: '',
  });

  return (
    <>
      <S.AddressButton onClick={modalOpen} label="실시간 주소" size="small" isSquare={true} color="light" />
      {isModalOpen && (
        <Modal size="large" position="bottom" isOpen={isModalOpen} onClose={modalClose}>
          <Modal.header>실시간 주소</Modal.header>
          <Modal.body>
            <div>지도를 클릭하면 현재 위치를 움직일 수 있어요.</div>
            <S.InputBox>
              <Input
                width={'full'}
                style={{ width: '100%' }}
                placeholder={'지도를 클릭하면 현재 위치를 움직일 수 있어요.'}
                value={`${currentAddress.address} ${currentAddress.buildingName}`}
              />
              <Button label="확인" size="xSmall" isSquare={true} />
            </S.InputBox>
            <Map
              position={position}
              setPosition={setPosition}
              currentAddress={currentAddress}
              setCurrentAddress={setCurrentAddress}
            />
          </Modal.body>
        </Modal>
      )}
    </>
  );
};

export default RealTimeAddressModal;

const S = {
  AddressButton: styled(Button)`
    width: calc(50% - 10px);
    padding: 10px;

    font-size: ${({ theme }) => theme.text.size.xSmall};
  `,
  InputBox: styled.div`
    display: flex;
  `,
};
