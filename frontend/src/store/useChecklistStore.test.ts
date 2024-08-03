import { act, renderHook } from '@testing-library/react';

import { checklistQuestions } from '@/mocks/fixtures/checklistQuestions';
import useChecklistStore from '@/store/useChecklistStore';

describe('useChecklistStore 테스트', () => {
  describe('questionSelectedAnswer 함수', () => {
    beforeEach(() => {
      const { result } = renderHook(() => useChecklistStore());
      act(() => result.current.setAnswerInQuestion(checklistQuestions.categories));
    });
    it('Answer가 없을 때, null을 응답한다.', () => {
      const { result } = renderHook(() => useChecklistStore());
      expect(result.current.questionSelectedAnswer(1)).toBe(null);
    });
    it('하나의 Answer가 있을 때, 선택된 Answer를 응답한다.', () => {
      const { result } = renderHook(() => useChecklistStore());
      act(() => {
        result.current.addAnswer({ questionId: 1, newAnswer: 'SOSO' });
      });
      expect(result.current.questionSelectedAnswer(1)).toBe('SOSO');
    });
    it('두 개의 Answer를 추가 후 하나를 삭제했을 때, 삭제된 answer는 null 반환한다.', () => {
      const { result } = renderHook(() => useChecklistStore());
      act(() => {
        result.current.addAnswer({ questionId: 1, newAnswer: 'BAD' });
      });
      act(() => {
        result.current.addAnswer({ questionId: 4, newAnswer: 'BAD' }); // QuestionId에 2는 존재하지않으므로 4로 변경
      });
      act(() => {
        result.current.deleteAnswer(1);
      });
      expect(result.current.questionSelectedAnswer(1)).toBe(null);
      expect(result.current.questionSelectedAnswer(4)).toBe('BAD');
    });
  });
});
