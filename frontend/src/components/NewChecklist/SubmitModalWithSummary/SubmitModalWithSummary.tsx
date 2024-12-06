import styled from '@emotion/styled';
import { ChangeEvent } from 'react';

import Button from '@/components/_common/Button/Button';
import CounterBox from '@/components/_common/CounterBox/CounterBox';
import FormField from '@/components/_common/FormField/FormField';
import Modal from '@/components/_common/Modal/Modal';
import { MODAL_MESSAGE } from '@/constants/messages/message';
import useMutateChecklist from '@/hooks/useMutateChecklist';
import useRoomInfoValidated from '@/hooks/useRoomInfoValidated';
import { trackSubmitChecklist } from '@/service/amplitude/trackEvent';
import { flexColumn, title3 } from '@/styles/common';
import { MutateType } from '@/types/checklist';

interface Props {
  isModalOpen: boolean;
  modalClose: () => void;
  onConfirm?: () => void;
  onError?: () => void;
  mutateType: MutateType;
  checklistId?: number;
}

const SubmitModalWithSummary = ({
  isModalOpen,
  modalClose,
  onConfirm = () => {},
  onError = () => {},
  mutateType,
  checklistId,
}: Props) => {
  const summary = useRoomInfoValidated('summary');

  // 체크리스트 작성 / 수정
  const { handleSubmitChecklist } = useMutateChecklist(
    mutateType,
    checklistId,
    () => succeedPost(),
    () => failedPost(),
  );

  const handleSaveChecklist = () => {
    trackSubmitChecklist();
    handleSubmitChecklist();
  };

  const succeedPost = () => {
    onConfirm();
    modalClose();
  };

  const failedPost = () => {
    modalClose();
    onError();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 15) summary.onChange(e);
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
            onChange={handleChange}
            name="summary"
            value={summary.rawValue}
            maxLength={15}
            height={'small'}
          />
          <S.CounterContainer>
            <CounterBox currentCount={summary.rawValue?.length || 0} totalCount={15} />
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
