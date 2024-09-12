import { useStore } from 'zustand';

import useAddChecklistQuery from '@/hooks/query/useAddChecklistQuery';
import usePutChecklistQuery from '@/hooks/query/usePutCheclistQuery';
import useToast from '@/hooks/useToast';
import checklistIncludedMaintenancesStore from '@/store/checklistIncludedMaintenancesStore';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';
import useChecklistStore from '@/store/useChecklistStore';
import useOptionStore from '@/store/useOptionStore';
import { ChecklistCategoryQnA, MutateType } from '@/types/checklist';

const useMutateChecklist = (mutateType: MutateType, checklistId?: number) => {
  const { showToast } = useToast({ type: 'positive' });
  const { mutate: addChecklist } = useAddChecklistQuery();
  const { mutate: putChecklist } = usePutChecklistQuery();

  // 방 기본 정보
  const { value: roomInfoAnswer, actions } = useStore(checklistRoomInfoStore);
  const includedMaintenances = useStore(checklistIncludedMaintenancesStore);

  // 선택된 옵션
  const selectedOptions = useOptionStore(state => state.selectedOptions);
  // 체크리스트 답변
  const checklistCategoryQnA = useChecklistStore(state => state.checklistCategoryQnA);

  const postData = {
    room: { ...roomInfoAnswer, ...{ includedMaintenances: includedMaintenances.value } },
    options: selectedOptions,
    questions: transformQuestions(checklistCategoryQnA),
  };

  const putData = {
    id: Number(checklistId),
    checklist: {
      room: roomInfoAnswer,
      options: selectedOptions,
      questions: transformQuestions(checklistCategoryQnA),
    },
  };

  const handleSubmitChecklist = () => {
    const postNewChecklist = () => {
      addChecklist(postData, {
        onSuccess: () => {
          showToast('체크리스트가 저장되었습니다.'); // TODO: 메세지 상수처리
          actions.resetAll();
        },
      });
    };

    const putEditedChecklist = () => {
      putChecklist(putData, {
        onSuccess: () => {
          showToast('체크리스트가 수정되었습니다.'); // TODO: 메세지 상수처리
          actions.resetAll();
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
const transformQuestions = (checklist: ChecklistCategoryQnA[]) => {
  return checklist.flatMap(category =>
    category.questions.map(question => ({
      questionId: question.questionId,
      answer: question.answer,
    })),
  );
};
