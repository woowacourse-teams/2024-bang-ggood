import styled from '@emotion/styled';
import { useStore } from 'zustand';

import Button from '@/components/_common/Button/Button';
import Input from '@/components/_common/Input/Input';
import RealTimeMap from '@/components/_common/Map/RealTimeMap';
import Modal from '@/components/_common/Modal/Modal';
import useModalOpen from '@/hooks/useModalOpen';
import checklistAddressStore from '@/store/checklistAddressStore';

const RealTimeAddressModal = () => {
  const { isModalOpen, modalOpen, modalClose } = useModalOpen();
  const { address, buildingName } = useStore(checklistAddressStore);

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
                style={{ width: '100%', fontSize: '14px' }}
                placeholder={'지도를 클릭하면 현재 위치를 움직일 수 있어요.'}
                value={`${address} ${buildingName}`}
              />
              <Button label="확인" size="xSmall" isSquare={true} onClick={modalClose} />
            </S.InputBox>
            {/* 지도 */}
            <RealTimeMap />
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
