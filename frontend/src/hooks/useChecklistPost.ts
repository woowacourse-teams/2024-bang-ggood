import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'zustand';

import { getChecklistQuestions } from '@/apis/checklist';
import { ROUTE_PATH } from '@/constants/routePath';
import useAddChecklistQuery from '@/hooks/query/useAddChecklistQuery';
import useHandleTipBox from '@/hooks/useHandleTipBox';
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

  // 주소
  // TODO: 백엔드 상의후에 post에 추가
  const addressData = useStore(checklistAddressStore, ({ address, buildingName, jibunAddress, position }) => ({
    address,
    buildingName,
    jibunAddress,
    position,
  }));

  // 선택된 옵션
  const { selectedOptions, resetToDefaultOptions } = useOptionStore();

  /*체크리스트 답변*/
  const { checklistCategoryQnA, setAnswerInQuestion } = useChecklistStore();

  // TODO: 상수화 처리
  const { resetShowTipBox } = useHandleTipBox('OPTION');

  // TODO: query 로 변경
  useEffect(() => {
    const fetchChecklist = async () => {
      const checklist = await getChecklistQuestions();

      // 체크리스트 질문에 대한 답안지 객체 생성
      setAnswerInQuestion(checklist);
      // 옵션 선택지 리셋
      resetToDefaultOptions();
      //로컬 스토리지 팁 보이는 여부 리셋
      resetShowTipBox();
    };

    fetchChecklist();
  }, []);

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
            // TODO: 메세지 상수처리
            showToast('체크리스트가 저장되었습니다.');
            actions.reset();
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
