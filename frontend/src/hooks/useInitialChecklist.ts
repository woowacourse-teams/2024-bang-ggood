import { useEffect } from 'react';

import useDefaultRoomName from '@/components/NewChecklist/NewRoomInfoForm/useDefaultRoomName';
import useGetChecklistQuestionQuery from '@/hooks/query/useGetChecklistQuestionQuery';
import useChecklistStore from '@/store/useChecklistStore';

const useInitialChecklist = () => {
  const initAnswerSheetIfEmpty = useChecklistStore(state => state.initAnswerSheetIfEmpty);

  useDefaultRoomName();

  const result = useGetChecklistQuestionQuery();

  useEffect(() => {
    initAnswerSheetIfEmpty(result.data ?? []); // 체크리스트 질문에 대한 답안지 객체 생성
  }, [result.data]);

  return result;
};

export default useInitialChecklist;
