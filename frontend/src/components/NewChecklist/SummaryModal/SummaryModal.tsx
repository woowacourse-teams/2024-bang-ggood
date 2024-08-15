import styled from '@emotion/styled';
import { useStore } from 'zustand';

import Button from '@/components/_common/Button/Button';
import FormField from '@/components/_common/FormField/FormField';
import Modal from '@/components/_common/Modal/Modal';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';
import { flexColumn, title3 } from '@/styles/common';

interface Props {
  isModalOpen: boolean;
  modalClose: () => void;
  submitChecklist: () => void;
}

const SummaryModal = ({ isModalOpen, modalClose, submitChecklist }: Props) => {
  const { value: roomInfo, actions } = useStore(checklistRoomInfoStore);

  return (
    <Modal isOpen={isModalOpen} onClose={modalClose}>
      <Modal.body>
        <S.Wrapper>
          <S.Title>이 방에 대한 당신의 한줄평을 적어주세요!</S.Title>
          <FormField.Input
            placeholder="한줄평을 적어주세요!"
            onChange={actions.onChange}
            name="summary"
            value={roomInfo.summary}
          />
          <Button size="full" color="dark" onClick={submitChecklist} isSquare label="체크리스트 저장하기" />
        </S.Wrapper>
      </Modal.body>
    </Modal>
  );
};

export default SummaryModal;

const S = {
  Title: styled.div`
    ${title3}
    margin-top:10px;
  `,
  Wrapper: styled.div`
    ${flexColumn}
    gap: 20px;
  `,
};
