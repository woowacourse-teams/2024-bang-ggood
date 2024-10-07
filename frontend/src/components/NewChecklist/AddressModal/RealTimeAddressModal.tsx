import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useStore } from 'zustand';

import { Location, LocationLineIcon } from '@/assets/assets';
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
  const DEFAULT_POSITION = { lat: 0, lon: 0 };

  const roomInfoUnvalidatedActions = useStore(roomInfoNonValidatedStore, state => state.actions);

  const { isModalOpen, openModal, closeModal } = useModal();

  const [position, setPosition] = useState<Position>(DEFAULT_POSITION);

  const [currentAddress, setCurrentAddress] = useState('');
  const [currentBuildingName, setCurrentBuildingName] = useState('');

  const { searchSubwayStationsByPosition } = useRoomInfoNonValidated();

  const handleSubmitAddress = () => {
    if (position.lat && position.lon) {
      roomInfoUnvalidatedActions.set('address', currentAddress);
      roomInfoUnvalidatedActions.set('buildingName', currentBuildingName);

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
      <S.AddressButton
        onClick={openModal}
        label="실시간 주소"
        size="full"
        isSquare={true}
        color="light"
        Icon={Location}
      />
      {isModalOpen && (
        <Modal size="large" position="bottom" isOpen={isModalOpen} onClose={closeModal}>
          <Modal.header>실시간 주소</Modal.header>
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
      )}
    </>
  );
};

export default RealTimeAddressModal;

const S = {
  AddressButton: styled(Button)`
    width: 50%;
    height: 4.2rem;
    padding: 0.4rem;

    font-size: ${({ theme }) => theme.text.size.xSmall};
  `,
  AddressText: styled.span`
    ${title4}
  `,
};
