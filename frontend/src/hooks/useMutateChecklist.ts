import { useStore } from 'zustand';

import { TOAST_MESSAGE } from '@/constants/message';
import useAddChecklistQuery from '@/hooks/query/useAddChecklistQuery';
import usePutChecklistQuery from '@/hooks/query/usePutCheclistQuery';
import useToast from '@/hooks/useToast';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';
import roomInfoUnvalidatedStore from '@/store/roomInfoUnvalidatedStore';
import useChecklistStore from '@/store/useChecklistStore';
import useSelectedOptionStore from '@/store/useSelectedOptionStore';
import { ChecklistCategoryWithAnswer, MutateType } from '@/types/checklist';

const useMutateChecklist = (
  mutateType: MutateType,
  checklistId?: number,
  onSuccessCallback?: () => void,
  onErrorCallback?: () => void,
) => {
  const { showToast } = useToast({ type: 'positive' });
  const { mutate: addChecklist } = useAddChecklistQuery();
  const { mutate: putChecklist } = usePutChecklistQuery();

  // 방 기본 정보 - validated
  const roomInfoActions = useStore(checklistRoomInfoStore, state => state.actions);
  const roomInfoAnswer = useStore(checklistRoomInfoStore, state => state.value);
  // 방 기본 정보 - unValidated
  const roomInfoUnvalidatedActions = useStore(roomInfoUnvalidatedStore, state => state.actions);
  const roomInfoUnvalidated = useStore(roomInfoUnvalidatedStore, state => state);
  // 선택된 옵션
  const selectedOptions = useSelectedOptionStore(state => state.selectedOptions);
  // 체크리스트 답변
  const checklistCategoryQnA = useChecklistStore(state => state.checklistCategoryQnA);

  //스토어에서 actions을 제외한 values 만 꺼내오는 함수
  const roomInfoUnvalidatedValues = () => {
    const { actions, ...values } = roomInfoUnvalidated;
    void actions;
    return values;
  };

  const roomInfoUnvalidatedAnswer = roomInfoUnvalidatedValues();

  function removeKey<T extends object, K extends keyof T>(obj: T, key: K): Omit<T, K> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [key]: _, ...rest } = obj;
    return rest;
  }

  const roomInfoUnvalidatedAnswerWithoutSubway = removeKey(roomInfoUnvalidatedAnswer, 'nearSubwayStation');

  const formattedValues = {
    station: roomInfoUnvalidatedAnswer.nearSubwayStation[0].stationName,
    walkingTime: roomInfoUnvalidatedAnswer.nearSubwayStation[0].walkingTime,
  };

  const postData = {
    room: { ...roomInfoAnswer, ...{ ...roomInfoUnvalidatedAnswerWithoutSubway, ...formattedValues } },
    options: selectedOptions,
    questions: transformQuestions(checklistCategoryQnA),
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
        onSuccess: () => {
          showToast(TOAST_MESSAGE.ADD);
          roomInfoActions.resetAll();
          roomInfoUnvalidatedActions.resetAll();
          if (onSuccessCallback) {
            onSuccessCallback();
          }
        },
        onError: () => {
          if (onErrorCallback) {
            onErrorCallback();
          }
        },
      });
    };

    const putEditedChecklist = () => {
      putChecklist(putData, {
        onSuccess: () => {
          showToast(TOAST_MESSAGE.EDIT);
          roomInfoActions.resetAll();
          roomInfoUnvalidatedActions.resetAll();
          if (onSuccessCallback) {
            onSuccessCallback();
          }
        },
        onError: () => {
          if (onErrorCallback) {
            onErrorCallback();
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
