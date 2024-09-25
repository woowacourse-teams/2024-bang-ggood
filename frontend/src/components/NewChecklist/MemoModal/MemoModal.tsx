import styled from '@emotion/styled';
import { useRef } from 'react';
import { useStore } from 'zustand';

import Button from '@/components/_common/Button/Button';
import Modal from '@/components/_common/Modal/Modal';
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
  const memoStoreActions = useStore(checklistRoomInfoStore, state => state.actions);
  const memo = useStore(checklistRoomInfoStore, state => state.value.memo);
  const { value: memoValue, onChange } = useInput<string>(memo || '');

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
    memoStoreActions.set('memo', memo);
    if (addModalClose) modalClose();
  };

  const handleBlur = () => {
    if (intervalRef.current !== undefined) {
      clearTimeout(intervalRef.current);
      intervalRef.current = undefined;
      handleSubmit(false);
    }
  };

  return (
    <>
      <S.EmptyBox />
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
          <Textarea
            placeholder="메모를 입력하세요."
            height={'large'}
            value={memoValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          <S.ButtonBox>
            <Button label="닫기" size="small" isSquare={true} color={'light'} onClick={() => handleSubmit(true)} />
          </S.ButtonBox>
        </S.TextareaBox>
      </Modal>
    </>
  );
};

export default MemoModal;

const S = {
  Title: styled.div`
    ${title3}
    margin-top:1rem;
  `,
  OpenBarBox: styled.div`
    ${flexCenter}
    width:100%;
    height: 2rem;
    flex-direction: column;
  `,
  OpenBar: styled.div`
    width: 100%;
    height: 2rem;
    border-radius: 0.5rem;

    background-color: ${({ theme }) => theme.palette.yellow200};
  `,
  TextareaBox: styled.div`
    position: relative;
    width: 100%;
  `,

  ButtonBox: styled.div`
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    margin-top: 1rem;
  `,
  EmptyBox: styled.div`
    width: 100%;
    height: 30rem;

    background-color: ${({ theme }) => theme.palette.background};
  `,
};
