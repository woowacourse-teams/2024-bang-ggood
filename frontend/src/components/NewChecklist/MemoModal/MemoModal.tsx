import styled from '@emotion/styled';
import { useRef } from 'react';

import { CloseIcon } from '@/assets/assets';
import Button from '@/components/_common/Button/Button';
import Modal from '@/components/_common/Modal/Modal';
import Textarea from '@/components/_common/Textarea/Textarea';
import useInput from '@/hooks/useInput';
import useRoomInfoValidated from '@/hooks/useRoomInfoValidated';
import { flexCenter, flexColumn, flexRow, title3 } from '@/styles/common';
import theme from '@/styles/theme';

interface Props {
  isModalOpen: boolean;
  modalClose: () => void;
}

const MemoModal = ({ isModalOpen, modalClose }: Props) => {
  const intervalRef = useRef<number | undefined>(undefined);
  const memo = useRoomInfoValidated('memo');
  const { value: memoValue, onChange } = useInput<string>(memo.rawValue || '');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e);
    if (intervalRef.current !== undefined) {
      clearTimeout(intervalRef.current);
    }

    intervalRef.current = window.setTimeout(() => {
      handleSubmit(false);
    }, 2000);
  };

  const handleSubmit = (addModalClose: boolean) => {
    memo.set(memoValue);
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
        backgroundColor={theme.color.gray[200]}
      >
        <S.Container>
          <S.ButtonWrapper>
            <Button label="메모" onClick={() => handleSubmit(true)} rounded size="full" />
            <S.IconButton onClick={() => handleSubmit(true)}>
              <CloseIcon />
            </S.IconButton>
          </S.ButtonWrapper>

          <S.TextareaBox>
            <Textarea
              placeholder="메모를 입력하세요."
              height="large"
              value={memoValue}
              onChange={handleInputChange}
              onBlur={handleBlur}
              transparent
            />
          </S.TextareaBox>
        </S.Container>
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
  Container: styled.div`
    ${flexColumn}
    ${flexCenter}
  `,
  ButtonWrapper: styled.div`
    ${flexRow}
    ${flexCenter}
    width: 100%;
  `,
  IconButton: styled.div`
    padding: 1.6rem;
    cursor: pointer;
  `,
  TextareaBox: styled.div`
    position: relative;
    width: 100%;
  `,
  EmptyBox: styled.div`
    width: 100%;
    height: 30rem;

    background-color: ${({ theme }) => theme.palette.background};
  `,
};
