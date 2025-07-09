import { useNavigate } from 'react-router-dom';
import { useStore } from 'zustand';

import APIError from '@/apis/error/APIError';
import { TOAST_MESSAGE } from '@/constants/messages/message';
import useAddChecklistQuery from '@/hooks/query/useAddChecklistQuery';
import usePutChecklistQuery from '@/hooks/query/usePutChecklistQuery';
import useResetChecklist from '@/hooks/useResetChecklist';
import useToast from '@/hooks/useToast';
import roomInfoNonValidatedStore from '@/store/roomInfoNonValidatedStore';
import roomInfoStore from '@/store/roomInfoStore';
import useChecklistStore from '@/store/useChecklistStore';
import { useMemoPhotoStore } from '@/store/useMemoPhotoStore';
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
  const { resetChecklist } = useResetChecklist();

  // 방 기본 정보 - validated
  const roomInfoActions = useStore(roomInfoStore, state => state.actions);
  const roomInfo = roomInfoActions.getParsedValues();
  // 방 기본 정보 - nonValidated
  const roomInfoUnvalidated = useStore(roomInfoNonValidatedStore, state => state);
  // 선택된 옵션
  const selectedOptions = useSelectedOptionStore(state => state.selectedOptions);
  // 체크리스트 답변
  const checklistCategoryQnA = useChecklistStore(state => state.checklistCategoryQnA);
  // 이미지들
  const { photos } = useMemoPhotoStore();

  // JSON 데이터
  const jsonData = {
    room: {
      ...roomInfo,
      ...roomInfoUnvalidated.position,
    },
    options: selectedOptions,
    questions: transformQuestions(checklistCategoryQnA),
    geolocation: roomInfoUnvalidated.position,
  };

  const formData = new FormData();
  formData.append('request', new Blob([JSON.stringify(jsonData)], { type: 'application/json' }));
  photos.forEach(file => {
    formData.append('images', file);
  });

  const putFormData = new FormData();
  putFormData.append(
    'request',
    new Blob([JSON.stringify({ id: Number(checklistId), checklist: jsonData })], { type: 'application/json' }),
  );
  photos.forEach(file => {
    putFormData.append('images', file);
  });

  const handleSubmitChecklist = () => {
    const postNewChecklist = () => {
      addChecklist(formData, {
        onSuccess: res => {
          showToast({ message: TOAST_MESSAGE.ADD });
          resetChecklist();
          if (onSuccessCallback) onSuccessCallback();
          const location = res.headers.get('location');
          if (location) navigate(location);
        },
        onError: error => {
          if (!(error instanceof APIError)) return;
          if (error.errorCode === 'AUTH_TOKEN_EMPTY') {
            if (onErrorCallback) onErrorCallback();
          }
        },
      });
    };

    const putEditedChecklist = () => {
      putChecklist(
        { formData: putFormData, id: Number(checklistId) },
        {
          onSuccess: res => {
            showToast({ message: TOAST_MESSAGE.EDIT });
            resetChecklist();
            onSuccessCallback?.();
            const location = res.headers.get('location');
            if (location) navigate(location);
          },
          onError: error => {
            if (error instanceof APIError && error.errorCode === 'AUTH_TOKEN_EMPTY') {
              onErrorCallback?.();
            }
          },
        },
      );
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
