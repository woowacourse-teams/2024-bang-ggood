import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import { useStore } from 'zustand';

import Button from '@/components/_common/Button/Button';
import Modal from '@/components/_common/Modal/Modal';
import { useTabContext } from '@/components/_common/Tabs/TabContext';
import Textarea from '@/components/_common/Textarea/Textarea';
import useInput from '@/hooks/useInput';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';
import { flexCenter, title3 } from '@/styles/common';
import theme from '@/styles/theme';

interface Props {
  isModalOpen: boolean;
  modalClose: () => void;
}

const MemoModal = ({ isModalOpen, modalClose }: Props) => {
  const intervalRef = useRef<number | undefined>(undefined);
  const { actions, roomInfo } = useStore(checklistRoomInfoStore);
  const { value: memo, onChange } = useInput<string>(roomInfo.memo || '');
  const { currentTabId } = useTabContext();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);

    if (intervalRef.current !== undefined) {
      clearTimeout(intervalRef.current);
    }

    intervalRef.current = window.setTimeout(() => {
      handleSubmit(false);
    }, 2000);
  };

  const handleSubmit = (addModalClose: boolean) => {
    actions.set('memo', memo);
    if (addModalClose) modalClose();
  };

  const handleBlur = () => {
    if (intervalRef.current !== undefined) {
      clearTimeout(intervalRef.current);
      intervalRef.current = undefined;
      handleSubmit(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.marginBottom = '300px';
    } else {
      document.body.style.marginBottom = '0px';
    }
  }, [isModalOpen, currentTabId]);

  return (
    <Modal
      hasCloseButton={false}
      isOpen={isModalOpen}
      onClose={modalClose}
      hasDim={false}
      position="bottom"
      color={theme.palette.white}
    >
      <S.OpenBarBox onClick={modalClose}>
        <S.OpenBar />
      </S.OpenBarBox>
      <S.TextareaBox>
        <Textarea autoFocus height={'large'} value={memo} onChange={handleInputChange} onBlur={handleBlur} />
        <S.ButtonBox>
          <Button label="닫기" size="small" isSquare={true} color={'light'} onClick={() => handleSubmit(true)} />
        </S.ButtonBox>
      </S.TextareaBox>
    </Modal>
  );
};

const S = {
  Title: styled.div`
    ${title3}
    margin-top:10px;
  `,
  OpenBarBox: styled.div`
    ${flexCenter}
    width:100%;
    height: 20px;
    flex-direction: column;
  `,
  OpenBar: styled.div`
    width: 100%;
    height: 20px;
    border-radius: 5px;

    background-color: ${({ theme }) => theme.palette.yellow300};
  `,
  TextareaBox: styled.div`
    position: relative;
    width: 100%;
  `,

  ButtonBox: styled.div`
    position: absolute;
    right: 10px;
    bottom: 10px;
    margin-top: 10px;
  `,
};
export default MemoModal;
