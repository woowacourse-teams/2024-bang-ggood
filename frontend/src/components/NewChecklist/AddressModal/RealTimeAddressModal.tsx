import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useStore } from 'zustand';

import { LocationLineIcon } from '@/assets/assets';
import Button from '@/components/_common/Button/Button';
import FlexBox from '@/components/_common/FlexBox/FlexBox';
import RealTimeMap from '@/components/_common/Map/RealTimeMap';
import Modal from '@/components/_common/Modal/Modal';
import useFindNearSubway from '@/hooks/useFindNearSubway';
import useModal from '@/hooks/useModal';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';
import { title4 } from '@/styles/common';
import { Position } from '@/types/address';

const RealTimeAddressModal = () => {
  const DEFAULT_POSITION = { lat: 0, lon: 0 };
  const { isModalOpen, openModal, closeModal } = useModal();

  const [position, setPosition] = useState<Position>(DEFAULT_POSITION);
  const { address, buildingName } = useStore(checklistRoomInfoStore, state => state.rawValue);
  const roomInfoActions = useStore(checklistRoomInfoStore, state => state.actions);

  const { findNearSubway } = useFindNearSubway();

  const handleSubmitAddress = () => {
    if (position.lat && position.lon) {
      findNearSubway(position);
      closeModal();
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
      <S.AddressButton onClick={openModal} label="실시간 주소" size="small" isSquare={true} color="light" />
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
              <S.AddressText>{address ? `${address} ${buildingName}` : '주소가 여기에 표시됩니다.'}</S.AddressText>
            </FlexBox.Horizontal>

            {/* 지도 */}
            <RealTimeMap position={position} setPosition={setPosition} />
            <S.ButtonBox>
              <Button
                label="이 위치로 설정할게요."
                size="full"
                isSquare={true}
                onClick={() => handleSubmitAddress()}
                disabled={!address}
              />
            </S.ButtonBox>
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
  ButtonBox: styled.div`
    display: flex;
  `,
  AddressText: styled.span`
    ${title4}
  `,
};
