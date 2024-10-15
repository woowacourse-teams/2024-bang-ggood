import { useNavigate } from 'react-router-dom';
import { useStore } from 'zustand';

import { TOAST_MESSAGE } from '@/constants/message';
import useAddChecklistQuery from '@/hooks/query/useAddChecklistQuery';
import usePutChecklistQuery from '@/hooks/query/usePutCheclistQuery';
import useToast from '@/hooks/useToast';
import roomInfoNonValidatedStore from '@/store/roomInfoNonValidatedStore';
import roomInfoStore from '@/store/roomInfoStore';
import useChecklistStore from '@/store/useChecklistStore';
import useSelectedOptionStore from '@/store/useSelectedOptionStore';
import { ChecklistCategoryWithAnswer, MutateType } from '@/types/checklist';

const useMutateChecklist = (
  mutateType: MutateType,
  checklistId?: number,
  onSuccessCallback?: () => void,
  onErrorCallback?: () => void,
) => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { mutate: addChecklist } = useAddChecklistQuery();
  const { mutate: putChecklist } = usePutChecklistQuery();

  // 방 기본 정보 - validated
  const roomInfoActions = useStore(roomInfoStore, state => state.actions);
  const roomInfo = roomInfoActions.getParsedValues();

  // 방 기본 정보 - nonValidated
  const roomInfoUnvalidatedActions = useStore(roomInfoNonValidatedStore, state => state.actions);
  const roomInfoUnvalidated = useStore(roomInfoNonValidatedStore, state => state);
  // 선택된 옵션
  const selectedOptions = useSelectedOptionStore(state => state.selectedOptions);
  // 체크리스트 답변
  const checklistCategoryQnA = useChecklistStore(state => state.checklistCategoryQnA);

  const postData = {
    room: {
      ...roomInfo,
      ...roomInfoUnvalidatedActions.getFormValues(),
    },
    options: selectedOptions,
    questions: transformQuestions(checklistCategoryQnA),
    geolocation: roomInfoUnvalidated.position,
  };

  const putData = {
    id: Number(checklistId),
    checklist: {
      ...postData,
    },
  };

  const handleSubmitChecklist = () => {
    const postNewChecklist = () => {
      addChecklist(postData, {
        onSuccess: res => {
          showToast({ message: TOAST_MESSAGE.ADD });
          roomInfoActions.reset();
          roomInfoUnvalidatedActions.resetAll();
          if (onSuccessCallback) {
            onSuccessCallback();
          }
          const location = res.headers.get('location');
          if (location) navigate(location);
        },
        onError: error => {
          if (error.name === 'AUTHENTICATION_FAILED') {
            if (onErrorCallback) {
              onErrorCallback();
            }
          }
        },
      });
    };

    const putEditedChecklist = () => {
      putChecklist(putData, {
        onSuccess: res => {
          showToast({ message: TOAST_MESSAGE.EDIT });
          roomInfoActions.reset();
          roomInfoUnvalidatedActions.resetAll();
          if (onSuccessCallback) {
            onSuccessCallback();
          }

          const location = res.headers.get('location');
          if (location) navigate(location);
        },
        onError: error => {
          if (error.name === 'AUTHENTICATION_FAILED') {
            if (onErrorCallback) {
              onErrorCallback();
            }
          }
        },
      });
    };

    mutateType === 'add' && postNewChecklist();
    mutateType === 'edit' && putEditedChecklist();
  };

  return { handleSubmitChecklist };
};

export default useMutateChecklist;

// 현재 상태를 백엔드에 보내는 답안 포맷으로 바꾸는 함수
const transformQuestions = (checklist: ChecklistCategoryWithAnswer[]) => {
  return checklist.flatMap(category =>
    category.questions.map(question => ({
      questionId: question.questionId,
      answer: question.answer,
    })),
  );
};
