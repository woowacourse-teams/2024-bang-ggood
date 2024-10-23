import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react';

import useChecklistQuestionAnswer from '@/hooks/useChecklistQuestionAnswer';
import { checklistQuestions } from '@/mocks/fixtures/checklistQuestions';
import useChecklistStore from '@/store/useChecklistStore';

describe('useChecklistQuestionAnswer 테스트', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useChecklistStore());
    act(() => result.current.actions.reset());
    act(() => result.current.actions.initAnswerSheetIfEmpty(checklistQuestions.categories));
  });

  it('Answer가 없을 때, null을 응답한다.', () => {
    const { result } = renderHook(() => useChecklistStore());
    expect(result.current.actions.getQuestionAnswer({ categoryId: 1, questionId: 1 })).toBe('NONE');
  });

  it('Answer를 토글하면 업데이트된 Answer를 반환한다.', () => {
    const { result } = renderHook(() => useChecklistStore());
    const { result: questionResult } = renderHook(() => useChecklistQuestionAnswer());
    act(() => {
      questionResult.current.toggleAnswer({ questionId: 1, newAnswer: 'NONE', categoryId: 1 });
    });
    expect(result.current.actions.getQuestionAnswer({ categoryId: 1, questionId: 1 })).not.toBe('BAD');
    expect(result.current.actions.getQuestionAnswer({ categoryId: 1, questionId: 1 })).toBe('NONE');
  });

  it('두 개의 answer 응답을 추가 후 하나를 삭제했을 때, 삭제된 answer는 null 반환한다.', () => {
    const { result } = renderHook(() => useChecklistStore());
    const { result: questionResult } = renderHook(() => useChecklistQuestionAnswer());
    act(() => {
      questionResult.current.toggleAnswer({ questionId: 1, newAnswer: 'BAD', categoryId: 1 });
      questionResult.current.toggleAnswer({ questionId: 2, newAnswer: 'BAD', categoryId: 1 });
    });
    act(() => {
      questionResult.current.toggleAnswer({ questionId: 1, newAnswer: 'NONE', categoryId: 1 });
    });
    expect(result.current.actions.getQuestionAnswer({ categoryId: 1, questionId: 1 })).toBe('NONE');
    expect(result.current.actions.getQuestionAnswer({ categoryId: 1, questionId: 2 })).toBe('BAD');
  });

  it('answer OX 버튼을 두 번 update 했을 때, answer은 NONE으로 토글된다.', async () => {
    const { result } = renderHook(() => useChecklistStore());
    const { result: questionResult } = renderHook(() => useChecklistQuestionAnswer());

    act(() => {
      questionResult.current.toggleAnswer({ categoryId: 1, questionId: 1, newAnswer: 'BAD' });
      questionResult.current.toggleAnswer({ categoryId: 1, questionId: 2, newAnswer: 'BAD' });
      questionResult.current.toggleAnswer({ categoryId: 1, questionId: 1, newAnswer: 'BAD' });
    });

    await waitFor(() => {
      expect(result.current.actions.getQuestionAnswer({ categoryId: 1, questionId: 1 })).toBe('NONE');
      expect(result.current.actions.getQuestionAnswer({ categoryId: 1, questionId: 2 })).toBe('BAD');
    });
  });
});
