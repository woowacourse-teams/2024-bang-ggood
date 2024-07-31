import styled from '@emotion/styled';

import { useTabContext } from '@/components/common/Tabs/TabContext';
import ChecklistQuestion from '@/components/NewChecklist/ChecklistQuestion/ChecklistQuestion';
import useChecklist from '@/store/useChecklist';

export interface addAnswerProps {
  questionId: number;
  newAnswer: number;
}

// interface Props {
//   ///questionSelectedAnswer: (questionId: number) => EmotionType | undefined;
//   // checklistQuestions: ChecklistQuestion[];
// }

const NewChecklistTemplate = () => {
  const { currentTabId } = useTabContext();

  const { checklistQuestions } = useChecklist();

  const targetCategoryQuestions = checklistQuestions.filter(category => category.categoryId === currentTabId)[0];

  return (
    <S.ContentBox>
      {targetCategoryQuestions.questions.map(question => (
        <S.QuestionBox key={`question-${question.questionId}`}>
          <ChecklistQuestion question={question} />
        </S.QuestionBox>
      ))}
    </S.ContentBox>
  );
};

export default NewChecklistTemplate;

const ContentBox = styled.div`
  display: flex;
  padding: 0 16px;
  padding-top: 60px;
  padding-bottom: 16px;

  background-color: ${({ theme }) => theme.palette.background};
  gap: 10px;
  flex-direction: column;
  min-height: calc(100vh - 70px);
`;

const QuestionBox = styled.div`
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: 8px;
`;

const S = {
  ContentBox,
  QuestionBox,
};
