import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useStore } from 'zustand';

import Button from '@/components/_common/Button/Button';
import Input from '@/components/_common/Input/Input';
import RealTimeMap from '@/components/_common/Map/RealTimeMap';
import Modal from '@/components/_common/Modal/Modal';
import useFindNearSubway from '@/hooks/useFindNearSubway';
import useModalOpen from '@/hooks/useModalOpen';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';
import { Position } from '@/types/address';

const RealTimeAddressModal = () => {
  const DEFAULT_POSITION = { lat: 0, lon: 0 };
  const { isModalOpen, modalOpen, modalClose } = useModalOpen();

  const [position, setPosition] = useState<Position>(DEFAULT_POSITION);
  const { address, buildingName } = useStore(checklistRoomInfoStore, state => state.rawValue);
  const roomInfoActions = useStore(checklistRoomInfoStore, state => state.actions);

  const { findNearSubway } = useFindNearSubway();

  const handleSubmitAddress = () => {
    if (position.lat && position.lon) {
      findNearSubway(position);
      modalClose();
    }
  };

  /* 모달 열릴 때 주소 정보 리셋 */
  useEffect(() => {
    if (isModalOpen) {
      roomInfoActions.set('address', '');
      roomInfoActions.set('buildingName', '');
    }
  }, [isModalOpen]);

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
                style={{ width: '100%', fontSize: '1.4rem' }}
                placeholder={'지도를 클릭하면 현재 위치를 움직일 수 있어요.'}
                value={`${address} ${buildingName}`}
              />
              <Button label="확인" size="xSmall" isSquare={true} onClick={() => handleSubmitAddress()} />
            </S.InputBox>
            {/* 지도 */}
            <RealTimeMap position={position} setPosition={setPosition} />
          </Modal.body>
        </Modal>
      )}
    </>
  );
};

export default RealTimeAddressModal;

const S = {
  AddressButton: styled(Button)`
    width: 50%;

    font-size: ${({ theme }) => theme.text.size.xSmall};
  `,
  InputBox: styled.div`
    display: flex;
  `,
};
