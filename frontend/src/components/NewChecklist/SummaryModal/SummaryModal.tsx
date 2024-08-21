import styled from '@emotion/styled';
import { useStore } from 'zustand';

import Button from '@/components/_common/Button/Button';
import CounterBox from '@/components/_common/CounterBox/CounterBox';
import FormField from '@/components/_common/FormField/FormField';
import Modal from '@/components/_common/Modal/Modal';
import { MODAL_MESSAGE } from '@/constants/message';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';
import { flexColumn, title3 } from '@/styles/common';

interface Props {
  isModalOpen: boolean;
  modalClose: () => void;
  submitChecklist: () => void;
}

const SummaryModal = ({ isModalOpen, modalClose, submitChecklist }: Props) => {
  const { rawValue: roomInfo, actions } = useStore(checklistRoomInfoStore);

  return (
    <Modal isOpen={isModalOpen} onClose={modalClose}>
      <Modal.header>
        <S.Title>{MODAL_MESSAGE.SUMMARY}</S.Title>
      </Modal.header>
      <Modal.body>
        <S.Wrapper>
          <FormField.Input
            placeholder="바쁘시면 스킵도 괜찮아요!"
            autoFocus
            onChange={actions.onChange}
            name="summary"
            value={roomInfo.summary}
            maxLength={15}
            height={'small'}
          />
          <S.CounterContainer>
            <CounterBox currentCount={roomInfo.summary?.length || 0} totalCount={15} />
          </S.CounterContainer>
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
  `,
  Wrapper: styled.div`
    position: relative;
    width: 100%;
    ${flexColumn}
    gap: 2rem;
  `,
  CounterContainer: styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
  `,
};
