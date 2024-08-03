import { renderHook } from '@testing-library/react';
import { act } from 'react';

import useChecklistAnswer from '@/hooks/useChecklistAnswer';
import { checklistQuestions } from '@/mocks/fixtures/checklistQuestions';
import useChecklistStore from '@/store/useChecklistStore';

describe('useChecklistAnswer 테스트', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useChecklistStore());
    result.current.setAnswerInQuestion(checklistQuestions.categories);
  });
  it('Answer가 없을 때, null을 응답한다.', () => {
    const { result } = renderHook(() => useChecklistStore());
    expect(result.current.findCategoryQuestion({ categoryId: 1, questionId: 1 }).answer).toBe(null);
  });
  it('하나의 Answer가 있을 때, 선택된 Answer를 응답한다.', () => {
    const { result } = renderHook(() => useChecklistAnswer());
    const { result: store } = renderHook(() => useChecklistStore());
    act(() => {
      result.current.updateAnswer({ questionId: 1, newAnswer: 'SOSO', categoryId: 1 });
    });
    expect(store.current.findCategoryQuestion({ categoryId: 1, questionId: 1 }).answer).not.toBe('BAD');
    expect(store.current.findCategoryQuestion({ categoryId: 1, questionId: 1 }).answer).toBe('SOSO');
  });
  it('두 개의 Answer를 추가 후 하나를 삭제했을 때, 삭제된 answer는 null 반환한다.', () => {
    const { result } = renderHook(() => useChecklistAnswer());
    const { result: store } = renderHook(() => useChecklistStore());
    act(() => {
      result.current.updateAnswer({ questionId: 1, newAnswer: 'BAD', categoryId: 1 });
      result.current.updateAnswer({ questionId: 2, newAnswer: 'BAD', categoryId: 1 });
    });
    act(() => {
      result.current.updateAnswer({ questionId: 1, newAnswer: null, categoryId: 1 });
    });
    expect(store.current.findCategoryQuestion({ categoryId: 1, questionId: 1 }).answer).toBe(null);
    expect(store.current.findCategoryQuestion({ categoryId: 1, questionId: 2 }).answer).toBe('BAD');
  });
});
