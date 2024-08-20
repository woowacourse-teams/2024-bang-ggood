import useGetChecklistQuestionQuery from '@/hooks/query/useGetChecklistQuestionQuery';
import useHandleTipBox from '@/hooks/useHandleTipBox';
import useChecklistStore from '@/store/useChecklistStore';
import useOptionStore from '@/store/useOptionStore';

const useInitialChecklist = () => {
  const setAnswerInQuestion = useChecklistStore(state => state.setAnswerInQuestion);
  const resetToDefaultOptions = useOptionStore(state => state.resetToDefaultOptions);
  const { resetShowTipBox } = useHandleTipBox('OPTION'); // TODO: 상수화 처리

  const { data, isLoading, isError, error } = useGetChecklistQuestionQuery();
  if (isLoading) return { data, isLoading, isError, error };
  setAnswerInQuestion(data); // 체크리스트 질문에 대한 답안지 객체 생성
  resetToDefaultOptions(); // 옵션 선택지 리셋
  resetShowTipBox(); // 로컬 스토리지 팁 보이는 여부 리셋
  return { data, isLoading, isError, error };
};

export default useInitialChecklist;
