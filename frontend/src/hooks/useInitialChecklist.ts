import { useEffect } from 'react';

import useGetChecklistQuestionQuery from '@/hooks/query/useGetChecklistQuestionQuery';
import useChecklistStore from '@/store/useChecklistStore';

const useInitialChecklist = () => {
  const result = useGetChecklistQuestionQuery();
  const initAnswerSheetIfEmpty = useChecklistStore(state => state.actions.initAnswerSheetIfEmpty);

  useEffect(() => {
    if (result.isSuccess && result.data) {
      initAnswerSheetIfEmpty(result.data); // 체크리스트 질문에 대한 답안지 객체 생성
    }
  }, [result.isSuccess, result.data, initAnswerSheetIfEmpty]);

  return result;
};

export default useInitialChecklist;
