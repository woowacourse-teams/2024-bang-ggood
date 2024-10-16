import useGetChecklistQuestionQuery from '@/hooks/query/useGetChecklistQuestionQuery';
import useChecklistStore from '@/store/useChecklistStore';

const useInitialChecklist = () => {
  const { data: checklist } = useGetChecklistQuestionQuery();

  const initAnswerSheetIfEmpty = useChecklistStore(state => state.actions.initAnswerSheetIfEmpty);
  initAnswerSheetIfEmpty(checklist ?? []); // 체크리스트 질문에 대한 답안지 객체 생성

  return checklist;
};

export default useInitialChecklist;
