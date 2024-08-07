import { renderHook } from '@testing-library/react';
import { act } from 'react';

import useChecklistGrade from '@/hooks/useChecklistGrade';
import { checklistQuestions } from '@/mocks/fixtures/checklistQuestions';
import useChecklistStore from '@/store/useChecklistStore';

describe('useChecklistGrade 테스트', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useChecklistStore());
    result.current.setAnswerInQuestion(checklistQuestions.categories);
  });
  it('Answer가 없을 때, null을 응답한다.', () => {
    const { result } = renderHook(() => useChecklistGrade());
    expect(result.current.findCategoryQuestion({ categoryId: 1, questionId: 1 }).grade).toBe('NONE');
  });
  it('하나의 Answer가 있을 때, 선택된 Answer를 응답한다.', () => {
    const { result } = renderHook(() => useChecklistGrade());
    act(() => {
      result.current.updateAndToggleGrade({ questionId: 1, newGrade: 'SOSO', categoryId: 1 });
    });
    expect(result.current.findCategoryQuestion({ categoryId: 1, questionId: 1 }).grade).not.toBe('BAD');
    expect(result.current.findCategoryQuestion({ categoryId: 1, questionId: 1 }).grade).toBe('SOSO');
  });
  it('두 개의 emotion 응답을 추가 후 하나를 삭제했을 때, 삭제된 answer는 null 반환한다.', () => {
    const { result } = renderHook(() => useChecklistGrade());
    act(() => {
      result.current.updateAndToggleGrade({ questionId: 1, newGrade: 'BAD', categoryId: 1 });
      result.current.updateAndToggleGrade({ questionId: 2, newGrade: 'BAD', categoryId: 1 });
    });
    act(() => {
      result.current.updateAndToggleGrade({ questionId: 1, newGrade: 'NONE', categoryId: 1 });
    });
    expect(result.current.findCategoryQuestion({ categoryId: 1, questionId: 1 }).grade).toBe('NONE');
    expect(result.current.findCategoryQuestion({ categoryId: 1, questionId: 2 }).grade).toBe('BAD');
  });
  it('emotion을 두 번 update 했을 때, emotion은 NONE으로 토글된다.', () => {
    const { result } = renderHook(() => useChecklistGrade());
    act(() => {
      result.current.updateAndToggleGrade({ questionId: 1, newGrade: 'BAD', categoryId: 1 });
      result.current.updateAndToggleGrade({ questionId: 2, newGrade: 'BAD', categoryId: 1 });
    });

    act(() => {
      result.current.updateAndToggleGrade({ questionId: 1, newGrade: 'BAD', categoryId: 1 });
    });

    expect(result.current.findCategoryQuestion({ categoryId: 1, questionId: 1 }).grade).toBe('NONE');
    expect(result.current.findCategoryQuestion({ categoryId: 1, questionId: 2 }).grade).toBe('BAD');
  });
});
