import styled from '@emotion/styled';
import { useStore } from 'zustand';

import Button from '@/components/_common/Button/Button';
import CounterBox from '@/components/_common/CounterBox/CounterBox';
import FormField from '@/components/_common/FormField/FormField';
import Modal from '@/components/_common/Modal/Modal';
import { MODAL_MESSAGE } from '@/constants/message';
import useMutateChecklist from '@/hooks/useMutateChecklist';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';
import { flexColumn, title3 } from '@/styles/common';
import { MutateType } from '@/types/checklist';

interface Props {
  isModalOpen: boolean;
  modalClose: () => void;
  onConfirm?: () => void;
  mutateType: MutateType;
  checklistId?: number;
}

const SubmitModalWithSummary = ({ isModalOpen, modalClose, onConfirm = () => {}, mutateType, checklistId }: Props) => {
  // const navigate = useNavigate();
  const { rawValue: roomInfo, actions } = useStore(checklistRoomInfoStore);

  // 체크리스트 작성 / 수정
  const { handleSubmitChecklist } = useMutateChecklist(mutateType, checklistId);

  const handleSaveChecklist = () => {
    handleSubmitChecklist();
    onConfirm();
    modalClose();

    // if (mutateType === 'edit' && checklistId !== undefined) {
    //   navigate(ROUTE_PATH.checklistOne(checklistId));

    //   return;
    // }
  };

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
          <Button size="full" color="dark" onClick={handleSaveChecklist} isSquare label="체크리스트 저장하기" />
        </S.Wrapper>
      </Modal.body>
    </Modal>
  );
};

export default SubmitModalWithSummary;

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
