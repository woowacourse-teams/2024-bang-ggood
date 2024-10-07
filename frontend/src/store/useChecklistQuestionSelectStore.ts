import { create } from 'zustand';

import { Category, CategoryName } from '@/types/category';
import { ChecklistCategoryWithIsSelected } from '@/types/checklist';

interface ChecklistCustomState {
  selectedQuestions: number[];
  checklistAllQuestionList: ChecklistCategoryWithIsSelected[];
  validCategory: Category[];

  setChecklistAllQuestionList: (answers: ChecklistCategoryWithIsSelected[]) => void;
  getCategoryQuestions: (categoryId: number) => ChecklistCategoryWithIsSelected;
  setValidCategory: () => void;
}

/**
 * useChecklistQuestionSelectStore 체크리스트 질문 선택 페이지에서 질문 선택 상태를 관리하는 전역 상태입니다.
 */
const useChecklistQuestionSelectStore = create<ChecklistCustomState>((set, get) => ({
  selectedQuestions: [],
  checklistAllQuestionList: [],
  validCategory: [],
  /**
   * 선택된 질문들을 selectedQuestions의 포맷에 맞게 변경하여 저장하는 함수입니다.
   */
  setChecklistAllQuestionList: (categoryQuestions: ChecklistCategoryWithIsSelected[]) => {
    const defaultSelectedQuestions = categoryQuestions.flatMap(category =>
      category.questions.filter(question => question.isSelected).map(question => question.questionId),
    );
    set({ selectedQuestions: defaultSelectedQuestions, checklistAllQuestionList: categoryQuestions });
  },
  /**
   * categoryId 에 맞는 카테고리를 필터링하여 isSelected가 포함된 질문리스트들을 가져옵니다.
   */
  getCategoryQuestions: (categoryId: number) => {
    const { checklistAllQuestionList } = get();
    return checklistAllQuestionList?.filter(category => category.categoryId === categoryId)[0];
  },
  /**
   * 체크리스트의 질문 리스트에서 질문이 있는 유효한 카테고리만 필터링합니다.
   */
  setValidCategory: () => {
    const { checklistAllQuestionList } = get();
    const validCategory = checklistAllQuestionList.map(category => ({
      categoryId: category.categoryId,
      categoryName: category.categoryName as CategoryName,
    }));
    set({ validCategory });
  },
}));

export default useChecklistQuestionSelectStore;
