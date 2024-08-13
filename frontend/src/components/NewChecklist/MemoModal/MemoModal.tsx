import styled from '@emotion/styled';
import { useRef } from 'react';
import { useStore } from 'zustand';

import Button from '@/components/_common/Button/Button';
import Modal from '@/components/_common/Modal/Modal';
import SelectionCounter from '@/components/_common/SelectionCounter/SelectionCounter';
import Textarea from '@/components/_common/Textarea/Textarea';
import { DEFAULT_TOAST_DURATION } from '@/constants/system';
import useInput from '@/hooks/useInput';
import useToast from '@/hooks/useToast';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';
import { flexCenter, title3 } from '@/styles/common';
import theme from '@/styles/theme';

interface Props {
  isModalOpen: boolean;
  modalClose: () => void;
}

const MemoModal = ({ isModalOpen, modalClose }: Props) => {
  const intervalRef = useRef<number | undefined>(undefined);
  const { actions } = useStore(checklistRoomInfoStore);
  const { showToast } = useToast(DEFAULT_TOAST_DURATION);
  const { value: memo, onChange } = useInput<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);

    if (intervalRef.current !== undefined) {
      clearTimeout(intervalRef.current);
    }

    intervalRef.current = window.setTimeout(() => {
      handleSubmit();
    }, 2000);
  };

  const handleSubmit = () => {
    actions.set('memo', memo);
    showToast('메모가 저장되었습니다.');
  };

  const handleBlur = () => {
    if (intervalRef.current !== undefined) {
      clearTimeout(intervalRef.current);
      intervalRef.current = undefined;
      handleSubmit();
    }
  };

  return (
    <Modal isOpen={isModalOpen} onClose={modalClose} hasDim={false} position="bottom" color={theme.palette.white}>
      <S.OpenBarBox onClick={modalClose}>
        <S.OpenBar />
      </S.OpenBarBox>
      <Modal.header>
        <S.Title> 메모 작성</S.Title>
      </Modal.header>
      <S.CounterBox>
        <SelectionCounter currentCount={memo.length} totalCount={500} />
      </S.CounterBox>
      <S.TextareaBox>
        <Textarea height={'large'} value={memo} onChange={handleInputChange} onBlur={handleBlur} />
      </S.TextareaBox>
      <S.ButtonBox>
        <Button label="저장" size="full" isSquare={true} color={'light'} onClick={handleSubmit} />
      </S.ButtonBox>
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
    flex-direction: column;
    margin-bottom: 10px;
  `,
  OpenBar: styled.div`
    width: 100px;
    height: 5px;
    border-radius: 2.5px;

    background-color: ${({ theme }) => theme.palette.grey400};
  `,
  TextareaBox: styled.div`
    position: relative;
    width: 100%;
  `,
  CounterBox: styled.div`
    position: absolute;
    right: 30px;
    bottom: 80px;
    z-index: 100;
  `,
  ButtonBox: styled.div`
    width: 100%;
    margin-top: 10px;
  `,
};
export default MemoModal;
