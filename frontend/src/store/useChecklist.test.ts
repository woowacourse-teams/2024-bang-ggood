import { act, renderHook } from '@testing-library/react';

import useChecklist from '@/store/useChecklist';

describe('useChecklistAnswer 테스트', () => {
  describe('questionSelectedAnswer 함수', () => {
    it('Answer가 없을 때, undefined를 응답한다.', () => {
      const { result } = renderHook(() => useChecklist());
      expect(result.current.questionSelectedAnswer(1)).toBe(undefined);
    });
    it('하나의 Answer가 있을 때, 선택된 Answer를 응답한다.', () => {
      const { result } = renderHook(() => useChecklist());
      act(() => {
        result.current.addAnswer({ questionId: 1, newAnswer: 2 });
      });
      expect(result.current.questionSelectedAnswer(1)).not.toBe(1);
      expect(result.current.questionSelectedAnswer(1)).toBe(2);
    });
    it('두 개의 Answer를 추가 후 하나를 삭제했을 때, 삭제된 answer는 undefined를 반환한다.', () => {
      const { result } = renderHook(() => useChecklist());
      act(() => {
        result.current.addAnswer({ questionId: 1, newAnswer: 2 });
        result.current.addAnswer({ questionId: 2, newAnswer: 3 });
      });
      act(() => {
        result.current.deleteAnswer(1);
      });
      expect(result.current.questionSelectedAnswer(1)).toBe(undefined);
      expect(result.current.questionSelectedAnswer(2)).toBe(3);
    });
  });
});
