import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useStore } from 'zustand';

import { LocationLineIcon } from '@/assets/assets';
import Button from '@/components/_common/Button/Button';
import FlexBox from '@/components/_common/FlexBox/FlexBox';
import RealTimeMap from '@/components/_common/Map/RealTimeMap';
import Modal from '@/components/_common/Modal/Modal';
import useModal from '@/hooks/useModal';
import useRoomInfoNonValidated from '@/hooks/useRoomInfoNonValidated';
import roomInfoNonValidatedStore from '@/store/roomInfoNonValidatedStore';
import { title4 } from '@/styles/common';
import { Position } from '@/types/address';

const RealTimeAddressModal = () => {
  const DEFAULT_POSITION = { latitude: 0, longitude: 0 };

  const { set } = useRoomInfoNonValidated();
  const roomInfoUnvalidatedActions = useStore(roomInfoNonValidatedStore, state => state.actions);

  const { isModalOpen, openModal, closeModal } = useModal();

  const [position, setPosition] = useState<Position>(DEFAULT_POSITION);

  const [currentAddress, setCurrentAddress] = useState('');
  const [currentBuildingName, setCurrentBuildingName] = useState('');

  const { searchSubwayStationsByPosition } = useRoomInfoNonValidated();

  const handleSubmitAddress = () => {
    if (position.latitude && position.longitude) {
      set('address', currentAddress);
      set('buildingName', currentBuildingName);
      roomInfoUnvalidatedActions.set('position', position);

      searchSubwayStationsByPosition(position);
      closeModal();
    }
  };

  /* 모달 열릴 때 주소 정보 리셋 및 스크립트 로드 */
  useEffect(() => {
    setCurrentBuildingName('');
    setCurrentAddress('');
  }, []);

  return (
    <>
      <Button label="현위치 찾기" onClick={openModal} size="full" variant="outlined" color="dark" />
      <Modal size="large" position="bottom" isOpen={isModalOpen} onClose={closeModal}>
        <Modal.header>현위치 찾기</Modal.header>
        <Modal.body>
          <div>
            지도를 클릭하면 현재 위치를 움직일 수 있어요. <br />
          </div>
          <FlexBox.Horizontal gap={'10px'}>
            <span>
              <LocationLineIcon height={20} width={20} />
            </span>
            <S.AddressText>
              {currentAddress ? `${currentAddress} ${currentBuildingName}` : '주소가 여기에 표시됩니다.'}
            </S.AddressText>
          </FlexBox.Horizontal>

          {/* 지도 */}
          <RealTimeMap
            position={position}
            setPosition={setPosition}
            setCurrentAddress={setCurrentAddress}
            setCurrentBuildingName={setCurrentBuildingName}
            handleSubmitAddress={handleSubmitAddress}
          />
        </Modal.body>
      </Modal>
    </>
  );
};

export default RealTimeAddressModal;

const S = {
  AddressText: styled.span`
    ${title4}
  `,
};
