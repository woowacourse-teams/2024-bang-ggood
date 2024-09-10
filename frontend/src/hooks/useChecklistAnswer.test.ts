import { renderHook } from '@testing-library/react';
import { act } from 'react';

import useChecklistAnswer from '@/hooks/useChecklistAnswer';
import { checklistQuestions } from '@/mocks/fixtures/checklistQuestions';
import useChecklistStore from '@/store/useChecklistStore';

describe('useChecklistAnswer 테스트', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useChecklistStore());
    act(() => result.current.initAnswerSheetIfEmpty(checklistQuestions.categories));
  });

  it('Answer가 없을 때, null을 응답한다.', () => {
    const { result } = renderHook(() => useChecklistAnswer());
    expect(result.current.findCategoryQuestion({ categoryId: 1, questionId: 1 }).answer).toBe('NONE');
  });

  it('하나의 Answer가 있을 때, 선택된 Answer를 응답한다.', () => {
    const { result } = renderHook(() => useChecklistAnswer());
    act(() => {
      result.current.updateAndToggleAnswer({ questionId: 1, newAnswer: 'NONE', categoryId: 1 });
    });
    expect(result.current.findCategoryQuestion({ categoryId: 1, questionId: 1 }).answer).not.toBe('BAD');
    expect(result.current.findCategoryQuestion({ categoryId: 1, questionId: 1 }).answer).toBe('NONE');
  });

  it('두 개의 answer 응답을 추가 후 하나를 삭제했을 때, 삭제된 answer는 null 반환한다.', () => {
    const { result } = renderHook(() => useChecklistAnswer());
    act(() => {
      result.current.updateAndToggleAnswer({ questionId: 1, newAnswer: 'BAD', categoryId: 1 });
      result.current.updateAndToggleAnswer({ questionId: 2, newAnswer: 'BAD', categoryId: 1 });
    });
    act(() => {
      result.current.updateAndToggleAnswer({ questionId: 1, newAnswer: 'NONE', categoryId: 1 });
    });
    expect(result.current.findCategoryQuestion({ categoryId: 1, questionId: 1 }).answer).toBe('NONE');
    expect(result.current.findCategoryQuestion({ categoryId: 1, questionId: 2 }).answer).toBe('BAD');
  });

  it('answer OX 버튼을 두 번 update 했을 때, answer은 NONE으로 토글된다.', () => {
    const { result } = renderHook(() => useChecklistAnswer());
    act(() => {
      result.current.updateAndToggleAnswer({ questionId: 1, newAnswer: 'BAD', categoryId: 1 });
      result.current.updateAndToggleAnswer({ questionId: 2, newAnswer: 'BAD', categoryId: 1 });
    });

    act(() => {
      result.current.updateAndToggleAnswer({ questionId: 1, newAnswer: 'BAD', categoryId: 1 });
    });

    expect(result.current.findCategoryQuestion({ categoryId: 1, questionId: 1 }).answer).toBe('NONE');
    expect(result.current.findCategoryQuestion({ categoryId: 1, questionId: 2 }).answer).toBe('BAD');
  });
});
