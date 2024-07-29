import styled from '@emotion/styled';

import ChecklistQuestion from '@/components/NewChecklist/ChecklistQuestion/ChecklistQuestion';

export interface addAnswerProps {
  questionId: number;
  newAnswer: number;
}

interface Props {
  addAnswer: ({ questionId, newAnswer }: addAnswerProps) => void;
  deleteAnswer: (questionId: number) => void;
  questionSelectedAnswer: (questionId: number) => number | undefined;
  checklistQuestions: ChecklistQuestion[];
}

const NewChecklistTemplate = (props: Props) => {
  const { questionSelectedAnswer, addAnswer, deleteAnswer, checklistQuestions } = props;

  return (
    <S.ContentBox>
      {checklistQuestions?.map(question => (
        <S.QuestionBox key={`question-${question.questionId}`}>
          <ChecklistQuestion
            addAnswer={addAnswer}
            deleteAnswer={deleteAnswer}
            question={question}
            questionSelectedAnswer={questionSelectedAnswer}
          />
        </S.QuestionBox>
      ))}
    </S.ContentBox>
  );
};

export default NewChecklistTemplate;

const ContentBox = styled.div`
  display: flex;
  padding: 16px;
  gap: 10px;
  flex-direction: column;

  background-color: ${({ theme }) => theme.palette.backgroud};
  min-height: 100vh;
`;

const QuestionBox = styled.div`
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: 8px;
`;

const S = {
  ContentBox,
  QuestionBox,
};
