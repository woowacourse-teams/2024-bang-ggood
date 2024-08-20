import { useNavigate } from 'react-router-dom';
import { useStore } from 'zustand';

import { ROUTE_PATH } from '@/constants/routePath';
import useAddChecklistQuery from '@/hooks/query/useAddChecklistQuery';
import useToast from '@/hooks/useToast';
import checklistAddressStore from '@/store/checklistAddressStore';
import checklistIncludedUtilitiesStore from '@/store/checklistIncludedUtilitesStore';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';
import useChecklistStore from '@/store/useChecklistStore';
import useOptionStore from '@/store/useOptionStore';
import { ChecklistCategoryQnA } from '@/types/checklist';

const useChecklistPost = (summaryModalClose: () => void) => {
  const { showToast } = useToast();
  const { mutate: addChecklist } = useAddChecklistQuery();

  const navigate = useNavigate();

  // 방 기본 정보
  const { value: roomInfoAnswer, actions } = useStore(checklistRoomInfoStore);
  const includedUtilities = useStore(checklistIncludedUtilitiesStore);
  const addressData = useStore(checklistAddressStore, ({ address, buildingName, jibunAddress, position }) => ({
    address,
    buildingName,
    jibunAddress,
    position,
  }));

  // 선택된 옵션
  const selectedOptions = useOptionStore(state => state.selectedOptions);

  // 체크리스트 답변
  const checklistCategoryQnA = useChecklistStore(state => state.checklistCategoryQnA);

  const handleSubmitChecklist = () => {
    const fetchNewChecklist = () => {
      addChecklist(
        {
          room: { ...roomInfoAnswer, ...{ addressData }, ...{ includedUtilities } },
          options: selectedOptions,
          questions: transformQuestions(checklistCategoryQnA),
        },
        {
          onSuccess: () => {
            summaryModalClose();
            showToast('체크리스트가 저장되었습니다.'); // TODO: 메세지 상수처리
            actions.resetAll();
            navigate(ROUTE_PATH.checklistList);
          },
        },
      );
    };

    fetchNewChecklist();
  };

  return { handleSubmitChecklist };
};
// 현재 상태를 백엔드에 보내는 답안 포맷으로 바꾸는 함수
const transformQuestions = (checklist: ChecklistCategoryQnA[]) => {
  return checklist.flatMap(category =>
    category.questions.map(question => ({
      questionId: question.questionId,
      answer: question.answer,
    })),
  );
};

export default useChecklistPost;
