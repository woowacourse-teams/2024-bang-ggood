import { useEffect } from 'react';

import useGetChecklistQuestionQuery from '@/hooks/query/useGetChecklistQuestionQuery';
import useChecklistStore from '@/store/useChecklistStore';

const useInitialChecklist = () => {
  const initAnswerSheetIfEmpty = useChecklistStore(state => state.actions.initAnswerSheetIfEmpty);

  const result = useGetChecklistQuestionQuery();

  useEffect(() => {
    initAnswerSheetIfEmpty(result.data ?? []); // 체크리스트 질문에 대한 답안지 객체 생성
  }, [result.data]);

  return result;
};

export default useInitialChecklist;
