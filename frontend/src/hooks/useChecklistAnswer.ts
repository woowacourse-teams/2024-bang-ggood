import useChecklistStore from '@/store/useChecklistStore';
import { EmotionType } from '@/types/emotionAnswer';

const useChecklistAnswer = () => {
  const { setAnswers, checklistCategoryQnA } = useChecklistStore();

  const addAnswer = ({ questionId, newAnswer }: { questionId: number; newAnswer: EmotionType }) => {
    const newCategories = checklistCategoryQnA.map(category => ({
      ...category,
      questions: category.questions.map(question =>
        question.questionId === questionId ? { ...question, answer: newAnswer } : question,
      ),
    }));
    setAnswers(newCategories);
  };

  const deleteAnswer = (questionId: number) => {
    const newCategories = checklistCategoryQnA.map(category => ({
      ...category,
      questions: category.questions.map(question =>
        question.questionId === questionId ? { ...question, answer: null } : question,
      ),
    }));
    setAnswers(newCategories);
  };

  const questionSelectedAnswer = (targetId: number) => {
    for (const category of checklistCategoryQnA) {
      const targetQuestion = category.questions.find(q => q.questionId === targetId);
      if (targetQuestion) {
        return targetQuestion.answer;
      }
    }
    return null;
  };

  return { addAnswer, deleteAnswer, questionSelectedAnswer };
};

export default useChecklistAnswer;
