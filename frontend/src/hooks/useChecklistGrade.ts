import useChecklistStore from '@/store/useChecklistStore';
import { EmotionNameWithNone } from '@/types/emotionAnswer';

export interface Props {
  questionId: number;
  categoryId: number;
}

export interface UpdateGradeProps extends Props {
  newGrade: EmotionNameWithNone;
}

export interface updateMemoProps extends Props {
  newMemo: string | null;
}

const useChecklistGrade = () => {
  const { setAnswers, checklistCategoryQnA, categoryQnA } = useChecklistStore();

  const updateAndToggleGrade = ({ categoryId, questionId, newGrade }: UpdateGradeProps) => {
    const targetCategory = categoryQnA(categoryId);

    if (targetCategory) {
      const updatedCategory = {
        ...targetCategory,
        questions: targetCategory.questions.map(question => {
          if (question.questionId === questionId) {
            return { ...question, grade: question.grade === newGrade ? 'NONE' : newGrade };
          }
          return question;
        }),
      };

      const newCategories = checklistCategoryQnA.map(category =>
        category.categoryId === categoryId ? updatedCategory : category,
      );

      setAnswers(newCategories);
    }
  };
  const updateMemo = ({ categoryId, questionId, newMemo }: updateMemoProps) => {
    const targetCategory = checklistCategoryQnA.find(category => category.categoryId === categoryId);

    if (targetCategory) {
      const updatedCategory = {
        ...targetCategory,
        questions: targetCategory.questions.map(question =>
          question.questionId === questionId ? { ...question, memo: newMemo } : question,
        ),
      };

      const newCategories = checklistCategoryQnA.map(category =>
        category.categoryId === categoryId ? updatedCategory : category,
      );

      setAnswers(newCategories);
    }
  };

  const findCategoryQuestion = ({ categoryId, questionId }: Props) => {
    const targetCategory = checklistCategoryQnA?.find(category => category.categoryId === categoryId);

    if (!targetCategory) {
      throw new Error(`${categoryId}가 아이디인 카테고리를 찾을 수 없습니다.`);
    }

    const targetQuestion = targetCategory.questions.find(q => q.questionId === questionId);
    if (!targetQuestion) {
      throw new Error(`${categoryId}가 아이디인 카테고리 내에서 ${questionId}가 아이디인 질문을 찾을 수 없습니다.`);
    }

    return targetQuestion;
  };

  return { updateAndToggleGrade, updateMemo, findCategoryQuestion };
};

export default useChecklistGrade;
